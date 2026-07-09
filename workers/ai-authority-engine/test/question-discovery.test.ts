import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { loadConfig, type AppBindings } from "../src/config/env"
import { extractEntities } from "../src/domains/question-discovery/entities"
import { classifyIntent } from "../src/domains/question-discovery/intent"
import {
  canonicalizeQuestion,
  deduplicateQuestions,
  detectLanguage,
  generateSlug,
  removeStopWords
} from "../src/domains/question-discovery/normalization"
import {
  BingAutosuggestProvider,
  DiscoveryProviderRegistry,
  GoogleSearchConsoleProvider,
  InternalSeedProvider,
  ManualImportProvider,
  ProviderRateLimiter,
  YouTubeSuggestProvider
} from "../src/domains/question-discovery/providers"
import {
  EntityRepository,
  ProviderRepository,
  QuestionRepository
} from "../src/domains/question-discovery/repositories"
import { calculatePriorityScore } from "../src/domains/question-discovery/scoring"
import { QuestionDiscoveryService } from "../src/domains/question-discovery/service"
import type { DiscoveryRunRequest, EntityDefinition, QuestionRecord } from "../src/domains/question-discovery/types"
import { Logger } from "../src/logger/logger"
import { KvJsonStore } from "../src/storage/kv-store"
import type { D1Database, D1PreparedStatement, ExecutionContext, KVNamespace, Queue } from "../src/types/cloudflare"

type Row = Record<string, unknown>

class MemoryStatement implements D1PreparedStatement {
  private values: unknown[] = []

  constructor(
    private readonly database: MemoryD1,
    private readonly query: string
  ) {}

  bind(...values: unknown[]): D1PreparedStatement {
    this.values = values
    return this
  }

  async first<T>(): Promise<T | null> {
    const normalized = this.query.toLowerCase()
    if (normalized.includes("from questions where id")) {
      return (this.database.questions.get(String(this.values[0])) as T | undefined) ?? null
    }
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const normalized = this.query.toLowerCase()
    if (normalized.includes("from questions")) {
      const limit = Number(this.values[0] ?? 50)
      const offset = Number(this.values[1] ?? 0)
      const results = Array.from(this.database.questions.values())
        .sort((left, right) => Number(right.priority_score) - Number(left.priority_score))
        .slice(offset, offset + limit) as T[]
      return { results, success: true }
    }
    if (normalized.includes("from discovery_runs")) {
      const limit = Number(this.values[0] ?? 20)
      const results = Array.from(this.database.runs.values())
        .sort((left, right) => String(right.started_at).localeCompare(String(left.started_at)))
        .slice(0, limit) as T[]
      return { results, success: true }
    }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const normalized = this.query.toLowerCase()
    if (normalized.startsWith("insert into questions")) {
      this.upsertQuestion()
      return { success: true }
    }
    if (normalized.startsWith("insert into discovery_runs")) {
      this.database.runs.set(String(this.values[0]), {
        id: this.values[0],
        seed: this.values[1],
        status: this.values[2],
        providers_json: this.values[3],
        question_count: this.values[4],
        error_message: this.values[5],
        started_at: this.values[6],
        finished_at: this.values[7]
      })
      return { success: true }
    }
    if (normalized.startsWith("update discovery_runs")) {
      const id = String(this.values[4])
      const existing = this.database.runs.get(id)
      if (existing) {
        this.database.runs.set(id, {
          ...existing,
          status: this.values[0],
          question_count: this.values[1],
          error_message: this.values[2],
          finished_at: this.values[3]
        })
      }
      return { success: true }
    }
    if (normalized.startsWith("insert into providers")) {
      this.database.providers.set(String(this.values[0]), {
        name: this.values[0],
        enabled: this.values[1],
        last_run_at: this.values[2]
      })
      return { success: true }
    }
    if (normalized.startsWith("insert into entities")) {
      this.database.entities.set(String(this.values[0]), {
        key: this.values[0],
        label: this.values[1],
        aliases_json: this.values[2],
        updated_at: this.values[3]
      })
      return { success: true }
    }
    return { success: true }
  }

  private upsertQuestion(): void {
    const canonical = String(this.values[2])
    const existing = Array.from(this.database.questions.values()).find((row) => row.canonical_question === canonical)
    const row = {
      id: existing?.id ?? this.values[0],
      question: this.values[1],
      canonical_question: this.values[2],
      slug: this.values[3],
      language: this.values[4],
      market: this.values[5],
      intent: this.values[6],
      priority_score: this.values[7],
      search_demand: this.values[8],
      freshness_score: this.values[9],
      existing_coverage_score: this.values[10],
      entities_json: this.values[11],
      source_provider: this.values[12],
      source_run_id: this.values[13],
      first_seen_at: existing?.first_seen_at ?? this.values[14],
      last_seen_at: this.values[15]
    }
    this.database.questions.set(String(row.id), row)
  }
}

class MemoryD1 implements D1Database {
  readonly questions = new Map<string, Row>()
  readonly runs = new Map<string, Row>()
  readonly providers = new Map<string, Row>()
  readonly entities = new Map<string, Row>()

  prepare(query: string): D1PreparedStatement {
    return new MemoryStatement(this, query)
  }
}

class MemoryKv implements KVNamespace {
  readonly values = new Map<string, string>()

  async get(key: string): Promise<string | null> {
    return this.values.get(key) ?? null
  }

  async put(key: string, value: string): Promise<void> {
    this.values.set(key, value)
  }

  async delete(key: string): Promise<void> {
    this.values.delete(key)
  }
}

class MemoryQueue implements Queue {
  readonly messages: unknown[] = []

  async send(message: unknown): Promise<void> {
    this.messages.push(message)
  }
}

function createEnv(overrides: Partial<AppBindings> = {}): AppBindings {
  return {
    NODE_ENV: "test",
    SERVICE_NAME: "vista-ai-authority-engine",
    SERVICE_VERSION: "1.0.0",
    AUTH_ISSUER: "issuer",
    AUTH_AUDIENCE: "audience",
    AUTH_SHARED_SECRET: "secret",
    LOG_LEVEL: "error",
    RATE_LIMIT_MAX: "120",
    RATE_LIMIT_WINDOW_SECONDS: "60",
    OPENAPI_TITLE: "Vista AI Authority Engine",
    OPENAPI_VERSION: "1.0.0",
    INTERNAL_SEED_QUESTIONS: [
      "Why is AI not recommending my Dubai business",
      "How can Vista by Lara improve AI visibility in UAE",
      "What is generative engine optimization for Shopify UAE"
    ].join("\n"),
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function discoveryRequest(overrides: Partial<DiscoveryRunRequest> = {}): DiscoveryRunRequest {
  return {
    seed: "AI visibility Dubai",
    market: "AE",
    language: "en",
    providers: ["internal-seed"],
    limit: 25,
    manualQuestions: [],
    ...overrides
  }
}

function questionRecord(overrides: Partial<QuestionRecord> = {}): QuestionRecord {
  return {
    id: "question-1",
    question: "Why is AI not recommending my Dubai business?",
    canonicalQuestion: "why ai recommending dubai business",
    slug: "why-ai-recommending-dubai-business",
    language: "en",
    market: "AE",
    intent: "commercial",
    priorityScore: 82,
    searchDemand: 0.7,
    freshnessScore: 0.8,
    existingCoverageScore: 0.1,
    entities: [{ key: "dubai", label: "Dubai", matchedText: "Dubai" }],
    sourceProvider: "internal-seed",
    sourceRunId: "run-1",
    firstSeenAt: "2026-06-30T00:00:00.000Z",
    lastSeenAt: "2026-06-30T00:00:00.000Z",
    ...overrides
  }
}

describe("question normalization", () => {
  it("canonicalizes, detects language, generates slugs, removes stop words, and deduplicates", () => {
    expect(
      detectLanguage(
        "\u0643\u064a\u0641 \u062a\u0638\u0647\u0631 \u0634\u0631\u0643\u0629 \u0641\u064a \u062f\u0628\u064a"
      )
    ).toBe("ar")
    expect(canonicalizeQuestion("  What is AI Visibility in Dubai?  ")).toBe("what is ai visibility in dubai")
    expect(removeStopWords("the ai visibility in dubai")).toBe("ai visibility dubai")
    expect(generateSlug("What is AI Visibility in Dubai?")).toBe("what-is-ai-visibility-dubai")
    expect(
      deduplicateQuestions([
        { question: "What is AI visibility in Dubai?", sourceProvider: "manual-import" },
        { question: "what is ai visibility in dubai", sourceProvider: "internal-seed" }
      ])
    ).toHaveLength(1)
  })
})

describe("question intelligence engines", () => {
  it("extracts configured entities and classifies intent", () => {
    const customEntities: EntityDefinition[] = [{ key: "difc", label: "DIFC", aliases: ["DIFC"] }]

    expect(
      extractEntities("Vista by Lara improves Shopify AI visibility in Dubai").map((entity) => entity.key)
    ).toEqual(["vista-by-lara", "dubai", "shopify", "ai-visibility"])
    expect(extractEntities("DIFC AI authority", customEntities)[0]?.label).toBe("DIFC")
    expect(classifyIntent("how to improve AI visibility")).toBe("informational")
    expect(classifyIntent("best GEO agency Dubai pricing")).toBe("commercial")
    expect(classifyIntent("hire AI automation agency UAE")).toBe("transactional")
    expect(classifyIntent("Vista by Lara login")).toBe("navigational")
  })

  it("scores questions with weighted UAE and AI relevance", () => {
    const score = calculatePriorityScore({
      intent: "commercial",
      entities: [
        { key: "dubai", label: "Dubai", matchedText: "Dubai" },
        { key: "ai-visibility", label: "AI Visibility", matchedText: "AI visibility" }
      ],
      searchDemand: 0.8,
      freshnessScore: 0.9,
      existingCoverageScore: 0.2
    })

    expect(score).toBeGreaterThan(0.7)
    expect(score).toBeLessThanOrEqual(1)
  })
})

describe("discovery providers", () => {
  it("returns internal and manual provider questions", async () => {
    const request = discoveryRequest({ manualQuestions: ["Can Vista by Lara improve Shopify GEO in Dubai?"] })

    expect(await new InternalSeedProvider(["Why is AI visibility important in Dubai?"]).discover(request)).toHaveLength(
      1
    )
    expect((await new ManualImportProvider().discover(request))[0]?.sourceProvider).toBe("manual-import")
  })

  it("adapts Bing Autosuggest, YouTube Suggest, and Search Console responses through replaceable fetch functions", async () => {
    const bingFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({ suggestionGroups: [{ searchSuggestions: [{ displayText: "AI visibility agency Dubai" }] }] }),
        { status: 200 }
      )
    const youtubeFetch: typeof fetch = async () =>
      new Response(JSON.stringify(["AI visibility", ["GEO strategy Dubai"]]), { status: 200 })
    const searchConsoleFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({ rows: [{ keys: ["why AI is not recommending my UAE business"], impressions: 22 }] }),
        { status: 200 }
      )

    expect(
      (await new BingAutosuggestProvider("https://bing.test", 1000, "key", bingFetch).discover(discoveryRequest()))[0]
        ?.question
    ).toBe("AI visibility agency Dubai")
    expect(
      (await new YouTubeSuggestProvider("https://youtube.test", 1000, youtubeFetch).discover(discoveryRequest()))[0]
        ?.question
    ).toBe("GEO strategy Dubai")
    expect(
      (
        await new GoogleSearchConsoleProvider(
          "https://gsc.test",
          1000,
          "token",
          "https://www.vistabylara.com/",
          searchConsoleFetch
        ).discover(discoveryRequest())
      )[0]?.question
    ).toBe("why AI is not recommending my UAE business")
  })

  it("enforces provider rate limits", async () => {
    const limiter = new ProviderRateLimiter(new KvJsonStore(new MemoryKv()), 1, 60)

    await limiter.enforce("internal-seed")
    await expect(limiter.enforce("internal-seed")).rejects.toThrow("rate limit exceeded")
  })
})

describe("question discovery repositories", () => {
  it("persists questions, providers, and entities in D1 repositories", async () => {
    const db = new MemoryD1()
    const questions = new QuestionRepository(db)
    const providers = new ProviderRepository(db)
    const entities = new EntityRepository(db)

    await questions.upsert(questionRecord())
    await providers.upsert({ name: "internal-seed", enabled: true, lastRunAt: "2026-06-30T00:00:00.000Z" })
    await entities.upsertMany([{ key: "dubai", label: "Dubai", aliases: ["Dubai"] }])

    expect((await questions.findById("question-1"))?.slug).toBe("why-ai-recommending-dubai-business")
    expect(await questions.list(10, 0)).toHaveLength(1)
    expect(db.providers.get("internal-seed")?.enabled).toBe(1)
    expect(db.entities.get("dubai")?.label).toBe("Dubai")
  })
})

describe("question discovery service and API", () => {
  it("runs discovery end-to-end with concrete provider registry and D1 persistence", async () => {
    const db = new MemoryD1()
    const registry = new DiscoveryProviderRegistry()
    registry.register(new InternalSeedProvider(["Why is AI not recommending my Dubai business?"]))
    const config = loadConfig(createEnv({ DB: db }))
    const service = new QuestionDiscoveryService(
      registry,
      new ProviderRateLimiter(new KvJsonStore(new MemoryKv()), 10, 60),
      new QuestionRepository(db),
      new (await import("../src/domains/question-discovery/repositories")).DiscoveryRunRepository(db),
      new ProviderRepository(db),
      new EntityRepository(db),
      new Logger(config)
    )

    const run = await service.runDiscovery(discoveryRequest(), "request-1")

    expect(run.status).toBe("completed")
    expect(run.questionCount).toBe(1)
    expect((await service.listQuestions(10, 0))[0]?.entities.map((entity) => entity.key)).toContain("dubai")
  })

  it("serves every Question Discovery REST endpoint with authentication and request IDs", async () => {
    const env = createEnv()
    const headers = { "x-api-key": "secret", "content-type": "application/json", "x-request-id": "req-api" }
    const created = await worker.fetch(
      new Request("https://worker.test/questions", {
        method: "POST",
        headers,
        body: JSON.stringify({ question: "Can Vista by Lara improve AI visibility in Dubai?", market: "AE" })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const run = await worker.fetch(
      new Request("https://worker.test/discover/run", {
        method: "POST",
        headers,
        body: JSON.stringify(
          discoveryRequest({
            providers: ["manual-import"],
            manualQuestions: ["How does GEO improve Shopify revenue in UAE?"]
          })
        )
      }),
      env,
      { waitUntil: () => undefined }
    )
    const questions = await worker.fetch(new Request("https://worker.test/questions?limit=10", { headers }), env, {
      waitUntil: () => undefined
    })
    const createdBody = (await created.json()) as { data: { question: QuestionRecord }; meta: { requestId: string } }
    const detail = await worker.fetch(
      new Request(`https://worker.test/questions/${createdBody.data.question.id}`, { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const status = await worker.fetch(new Request("https://worker.test/discover/status", { headers }), env, {
      waitUntil: () => undefined
    })
    const stats = await worker.fetch(new Request("https://worker.test/stats", { headers }), env, {
      waitUntil: () => undefined
    })
    const denied = await worker.fetch(new Request("https://worker.test/questions"), env, { waitUntil: () => undefined })

    expect(created.status).toBe(201)
    expect(run.status).toBe(201)
    expect(questions.status).toBe(200)
    expect(detail.status).toBe(200)
    expect(status.status).toBe(200)
    expect(stats.status).toBe(200)
    expect(denied.status).toBe(401)
    expect(createdBody.meta.requestId).toBe("req-api")
  })

  it("runs scheduled discovery through Wrangler cron configuration", async () => {
    const promises: Promise<unknown>[] = []
    const env = createEnv({ QUESTION_DISCOVERY_CRON_SEED: "AI visibility Dubai" })
    const context: ExecutionContext = {
      waitUntil(promise: Promise<unknown>) {
        promises.push(promise)
      }
    }

    worker.scheduled({ cron: "0 */6 * * *", scheduledTime: Date.now() }, env, context)
    await Promise.all(promises)

    expect((env.DB as MemoryD1).runs.size).toBe(1)
    expect((env.DB as MemoryD1).questions.size).toBeGreaterThan(0)
  })
})
