import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { loadConfig, type AppBindings } from "../src/config/env"
import {
  AiProviderCheckRepository,
  GenerationJobRepository,
  PromptTemplateRepository
} from "../src/domains/ai-generation/repositories"
import { AiGenerationService } from "../src/domains/ai-generation/service"
import type {
  AiGenerationProvider,
  GeneratedDraft,
  GenerationContentType,
  ProviderGenerationRequest,
  ProviderGenerationResult
} from "../src/domains/ai-generation/types"
import { createDefaultPromptTemplate, inheritPrompt, renderPrompt } from "../src/domains/ai-generation/prompts"
import {
  AiProviderRegistry,
  AnthropicGenerationProvider,
  GoogleAiGenerationProvider,
  OpenAiGenerationProvider
} from "../src/domains/ai-generation/providers"
import { RagContextBuilder } from "../src/domains/ai-generation/rag"
import { validateGeneratedDraft } from "../src/domains/ai-generation/validation"
import { AiBudgetManager } from "../src/operations/cost-management"
import { KvJsonStore } from "../src/storage/kv-store"
import {
  ContentAuditRepository,
  ContentRepository,
  ContentVersionRepository,
  EditorialQueueRepository,
  InternalLinkRepository,
  PublicationQueueRepository,
  ReviewQueueRepository
} from "../src/domains/content-pipeline/repositories"
import { ContentPipelineService } from "../src/domains/content-pipeline/service"
import type { ContentRecord } from "../src/domains/content-pipeline/types"
import { QuestionRepository } from "../src/domains/question-discovery/repositories"
import type { QuestionRecord } from "../src/domains/question-discovery/types"
import { Logger } from "../src/logger/logger"
import type { AuthorityQueueMessage } from "../src/queues/queue-client"
import type {
  D1Database,
  D1PreparedStatement,
  ExecutionContext,
  KVNamespace,
  Message,
  MessageBatch,
  Queue
} from "../src/types/cloudflare"

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
    const sql = this.query.toLowerCase()
    if (sql.includes("from ai_generation_jobs"))
      return (this.database.jobs.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from ai_prompt_templates where content_type")) {
      const contentType = String(this.values[0])
      return (
        (Array.from(this.database.prompts.values()).find(
          (row) => row.content_type === contentType && row.active === 1
        ) as T | undefined) ?? null
      )
    }
    if (sql.includes("from ai_prompt_templates where id"))
      return (this.database.prompts.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from content where id"))
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from questions where id"))
      return (this.database.questions.get(String(this.values[0])) as T | undefined) ?? null
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    const limit = Number(this.values[0] ?? 50)
    if (sql.includes("from ai_generation_jobs"))
      return { results: Array.from(this.database.jobs.values()).slice(0, limit) as T[], success: true }
    if (sql.includes("from content order"))
      return { results: Array.from(this.database.content.values()).slice(0, limit) as T[], success: true }
    if (sql.includes("from questions"))
      return { results: Array.from(this.database.questions.values()).slice(0, limit) as T[], success: true }
    if (sql.includes("from editorial_queue"))
      return { results: Array.from(this.database.editorialQueue.values()).slice(0, limit) as T[], success: true }
    if (sql.includes("from publication_queue"))
      return { results: Array.from(this.database.publicationQueue.values()).slice(0, limit) as T[], success: true }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into ai_generation_jobs")) this.insertJob()
    else if (sql.startsWith("update ai_generation_jobs")) this.updateJob()
    else if (sql.startsWith("insert into ai_prompt_templates")) this.insertPrompt()
    else if (sql.startsWith("insert into ai_provider_checks"))
      this.database.providerChecks.push(this.providerCheckRow())
    else if (sql.startsWith("insert into content (")) this.insertContent()
    else if (sql.startsWith("update content set")) this.updateContent()
    else if (sql.startsWith("insert into content_versions")) this.database.versions.push(this.versionRow())
    else if (sql.startsWith("insert into editorial_queue"))
      this.database.editorialQueue.set(String(this.values[0]), this.editorialQueueRow())
    else if (sql.startsWith("insert into review_queue")) this.database.reviewQueue.set(String(this.values[0]), {})
    else if (sql.startsWith("insert into publication_queue"))
      this.database.publicationQueue.set(String(this.values[0]), {})
    else if (sql.startsWith("insert into content_audit_events")) this.database.auditEvents.push(this.auditRow())
    else if (sql.startsWith("delete from internal_links"))
      this.database.internalLinks = this.database.internalLinks.filter(
        (row) => row.source_content_id !== this.values[0]
      )
    else if (sql.startsWith("insert into internal_links")) this.database.internalLinks.push(this.internalLinkRow())
    return { success: true }
  }

  private insertJob(): void {
    this.database.jobs.set(String(this.values[0]), {
      id: this.values[0],
      content_id: this.values[1],
      question_id: this.values[2],
      status: this.values[3],
      content_type: this.values[4],
      question: this.values[5],
      provider: this.values[6],
      model: this.values[7],
      prompt_template_id: this.values[8],
      prompt_version: this.values[9],
      rag_context_json: this.values[10],
      generated_content_json: this.values[11],
      validation_json: this.values[12],
      generation_metadata_json: this.values[13],
      retry_count: this.values[14],
      max_retries: this.values[15],
      cancellation_reason: this.values[16],
      error_message: this.values[17],
      started_at: this.values[18],
      completed_at: this.values[19],
      created_at: this.values[20],
      updated_at: this.values[21]
    })
  }

  private updateJob(): void {
    const id = String(this.values[12])
    const existing = this.database.jobs.get(id)
    if (!existing) return
    this.database.jobs.set(id, {
      ...existing,
      content_id: this.values[0],
      status: this.values[1],
      rag_context_json: this.values[2],
      generated_content_json: this.values[3],
      validation_json: this.values[4],
      generation_metadata_json: this.values[5],
      retry_count: this.values[6],
      cancellation_reason: this.values[7],
      error_message: this.values[8],
      started_at: this.values[9],
      completed_at: this.values[10],
      updated_at: this.values[11]
    })
  }

  private insertPrompt(): void {
    this.database.prompts.set(String(this.values[0]), {
      id: this.values[0],
      name: this.values[1],
      version: this.values[2],
      content_type: this.values[3],
      parent_id: this.values[4],
      system_prompt: this.values[5],
      user_prompt: this.values[6],
      variables_json: this.values[7],
      active: this.values[8],
      created_at: this.values[9],
      updated_at: this.values[10]
    })
  }

  private insertContent(): void {
    this.database.content.set(String(this.values[0]), {
      id: this.values[0],
      title: this.values[1],
      slug: this.values[2],
      status: this.values[3],
      content_type: this.values[4],
      language: this.values[5],
      canonical_url: this.values[6],
      target_keyword: this.values[7],
      entities_json: this.values[8],
      internal_links_json: this.values[9],
      schema_type: this.values[10],
      reading_time_minutes: this.values[11],
      word_count: this.values[12],
      seo_metadata_json: this.values[13],
      ai_summary: this.values[14],
      publishing_targets_json: this.values[15],
      body: this.values[16],
      current_version: this.values[17],
      scheduled_at: this.values[18],
      created_at: this.values[19],
      updated_at: this.values[20]
    })
  }

  private updateContent(): void {
    const id = String(this.values[19])
    const existing = this.database.content.get(id)
    if (!existing) return
    this.database.content.set(id, {
      ...existing,
      title: this.values[0],
      slug: this.values[1],
      status: this.values[2],
      content_type: this.values[3],
      language: this.values[4],
      canonical_url: this.values[5],
      target_keyword: this.values[6],
      entities_json: this.values[7],
      internal_links_json: this.values[8],
      schema_type: this.values[9],
      reading_time_minutes: this.values[10],
      word_count: this.values[11],
      seo_metadata_json: this.values[12],
      ai_summary: this.values[13],
      publishing_targets_json: this.values[14],
      body: this.values[15],
      current_version: this.values[16],
      scheduled_at: this.values[17],
      updated_at: this.values[18]
    })
  }

  private versionRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      version_number: this.values[2],
      title: this.values[3],
      body: this.values[4],
      metadata_json: this.values[5],
      created_by: this.values[6],
      created_at: this.values[7]
    }
  }

  private editorialQueueRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      priority: this.values[3],
      assigned_to: this.values[4],
      due_at: this.values[5],
      created_at: this.values[6],
      updated_at: this.values[7]
    }
  }

  private auditRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      action: this.values[2],
      from_status: this.values[3],
      to_status: this.values[4],
      actor: this.values[5],
      metadata_json: this.values[6],
      created_at: this.values[7]
    }
  }

  private internalLinkRow(): Row {
    return {
      id: this.values[0],
      source_content_id: this.values[1],
      target_content_id: this.values[2],
      target_url: this.values[3],
      anchor_text: this.values[4],
      created_at: this.values[5]
    }
  }

  private providerCheckRow(): Row {
    return {
      id: this.values[0],
      provider: this.values[1],
      status: this.values[2],
      latency_ms: this.values[3],
      model: this.values[4],
      error_message: this.values[5],
      checked_at: this.values[6]
    }
  }
}

class MemoryD1 implements D1Database {
  readonly jobs = new Map<string, Row>()
  readonly prompts = new Map<string, Row>()
  readonly providerChecks: Row[] = []
  readonly content = new Map<string, Row>()
  readonly questions = new Map<string, Row>()
  readonly versions: Row[] = []
  readonly editorialQueue = new Map<string, Row>()
  readonly reviewQueue = new Map<string, Row>()
  readonly publicationQueue = new Map<string, Row>()
  internalLinks: Row[] = []
  readonly auditEvents: Row[] = []

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

class MemoryQueue implements Queue<AuthorityQueueMessage> {
  readonly messages: AuthorityQueueMessage[] = []

  async send(message: AuthorityQueueMessage): Promise<void> {
    this.messages.push(message)
  }
}

class DeterministicProvider implements AiGenerationProvider {
  readonly name = "openai" as const
  calls = 0

  constructor(private readonly draft: GeneratedDraft = generatedDraft()) {}

  async generate(_request: ProviderGenerationRequest): Promise<ProviderGenerationResult> {
    this.calls += 1
    return { draft: this.draft, model: "deterministic-model", provider: this.name, tokenUsage: { totalTokens: 1200 } }
  }

  async test(): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }> {
    return { ok: true, latencyMs: 1, errorMessage: null }
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
    AI_GENERATION_PROVIDER: "openai",
    AI_GENERATION_MODEL: "gpt-test",
    OPENAI_API_KEY: "key",
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function questionRecord(): QuestionRecord {
  return {
    id: "question-1",
    question: "Why is AI not recommending my Dubai business?",
    canonicalQuestion: "why is ai not recommending my dubai business",
    slug: "why-ai-not-recommending-dubai-business",
    language: "en",
    market: "AE",
    intent: "commercial",
    priorityScore: 0.9,
    searchDemand: 0.8,
    freshnessScore: 0.8,
    existingCoverageScore: 0.1,
    entities: [{ key: "dubai", label: "Dubai", matchedText: "Dubai" }],
    sourceProvider: "manual-import",
    sourceRunId: "run-1",
    firstSeenAt: "2026-06-30T00:00:00.000Z",
    lastSeenAt: "2026-06-30T00:00:00.000Z"
  }
}

function contentRecord(overrides: Partial<ContentRecord> = {}): ContentRecord {
  return {
    id: "content-1",
    title: "AI Visibility Dubai Guide",
    slug: "ai-visibility-dubai-guide",
    status: "APPROVED",
    contentType: "Authority Article",
    language: "en",
    canonicalUrl: "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
    targetKeyword: "AI visibility Dubai",
    entities: ["Vista by Lara", "Dubai", "UAE", "AI Visibility"],
    internalLinks: [{ targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }],
    schemaType: "TechArticle",
    readingTimeMinutes: 8,
    wordCount: 1500,
    seoMetadata: { title: "AI Visibility Dubai", description: "Dubai AI visibility guide." },
    aiSummary: "Internal guide for AI visibility in Dubai.",
    publishingTargets: ["website"],
    body: "Approved internal guidance about Dubai AI visibility.",
    currentVersion: 1,
    scheduledAt: null,
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z",
    ...overrides
  }
}

function generatedDraft(overrides: Partial<GeneratedDraft> = {}): GeneratedDraft {
  const body = Array.from({ length: 900 }, (_, index) => (index % 9 === 0 ? "Dubai" : "authority")).join(" ")
  return {
    title: "Why AI Is Not Recommending Your Dubai Business",
    slug: "why-ai-not-recommending-your-dubai-business",
    body: `# Why AI Is Not Recommending Your Dubai Business\n\n${body}`,
    outline: ["Why AI visibility fails", "How Vista by Lara improves authority"],
    seoTitle: "AI Visibility Dubai | Vista by Lara",
    seoDescription: "A Dubai authority guide grounded in Vista by Lara internal context.",
    aiSummary: "Explains internal authority gaps that reduce AI visibility in Dubai.",
    schemaType: "TechArticle",
    entities: ["Vista by Lara", "Dubai", "UAE", "AI Visibility"],
    internalLinks: [{ targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }],
    wordCount: 910,
    readingTimeMinutes: 5,
    ...overrides
  }
}

function seedContent(db: MemoryD1, record = contentRecord()): void {
  db.content.set(record.id, {
    id: record.id,
    title: record.title,
    slug: record.slug,
    status: record.status,
    content_type: record.contentType,
    language: record.language,
    canonical_url: record.canonicalUrl,
    target_keyword: record.targetKeyword,
    entities_json: JSON.stringify(record.entities),
    internal_links_json: JSON.stringify(record.internalLinks),
    schema_type: record.schemaType,
    reading_time_minutes: record.readingTimeMinutes,
    word_count: record.wordCount,
    seo_metadata_json: JSON.stringify(record.seoMetadata),
    ai_summary: record.aiSummary,
    publishing_targets_json: JSON.stringify(record.publishingTargets),
    body: record.body,
    current_version: record.currentVersion,
    scheduled_at: record.scheduledAt,
    created_at: record.createdAt,
    updated_at: record.updatedAt
  })
}

function seedQuestion(db: MemoryD1): void {
  const record = questionRecord()
  db.questions.set(record.id, {
    id: record.id,
    question: record.question,
    canonical_question: record.canonicalQuestion,
    slug: record.slug,
    language: record.language,
    market: record.market,
    intent: record.intent,
    priority_score: record.priorityScore,
    search_demand: record.searchDemand,
    freshness_score: record.freshnessScore,
    existing_coverage_score: record.existingCoverageScore,
    entities_json: JSON.stringify(record.entities),
    source_provider: record.sourceProvider,
    source_run_id: record.sourceRunId,
    first_seen_at: record.firstSeenAt,
    last_seen_at: record.lastSeenAt
  })
}

function createService(
  db: MemoryD1,
  provider: AiGenerationProvider = new DeterministicProvider()
): AiGenerationService {
  const registry = new AiProviderRegistry()
  registry.register(provider)
  const content = new ContentRepository(db)
  const config = loadConfig(createEnv({ DB: db }))
  return new AiGenerationService(
    registry,
    new GenerationJobRepository(db),
    new PromptTemplateRepository(db),
    new AiProviderCheckRepository(db),
    new QuestionRepository(db),
    content,
    new ContentPipelineService(
      content,
      new ContentVersionRepository(db),
      new EditorialQueueRepository(db),
      new ReviewQueueRepository(db),
      new PublicationQueueRepository(db),
      new InternalLinkRepository(db),
      new ContentAuditRepository(db),
      new Logger(config)
    ),
    "openai",
    "gpt-test",
    30000,
    new Logger(config),
    new AiBudgetManager(new KvJsonStore(new MemoryKv()), config, new Logger(config))
  )
}

function providerJson(): string {
  return JSON.stringify(generatedDraft())
}

describe("AI generation migrations and prompt system", () => {
  it("creates generation job, prompt, and provider check tables", () => {
    const sql = readFileSync(resolve("migrations/0003_ai_generation.sql"), "utf8")

    expect(sql).toContain("create table if not exists ai_generation_jobs")
    expect(sql).toContain("create table if not exists ai_prompt_templates")
    expect(sql).toContain("create table if not exists ai_provider_checks")
  })

  it("renders versioned prompts with inheritance", () => {
    const parent = createDefaultPromptTemplate("Authority Article", "2026-06-30T00:00:00.000Z")
    const child = { ...parent, id: "child", parentId: parent.id, systemPrompt: "", variables: ["question"] }
    const inherited = inheritPrompt(child, parent)

    expect(inherited.systemPrompt).toBe(parent.systemPrompt)
    expect(renderPrompt("Question: {question}", { question: "AI visibility Dubai" })).toBe(
      "Question: AI visibility Dubai"
    )
  })
})

describe("AI providers", () => {
  it("adapts OpenAI, Anthropic, and Google AI provider responses", async () => {
    const openAiFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({ choices: [{ message: { content: providerJson() } }], usage: { total_tokens: 10 } }),
        { status: 200 }
      )
    const anthropicFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          content: [{ type: "text", text: providerJson() }],
          usage: { input_tokens: 5, output_tokens: 6 }
        }),
        { status: 200 }
      )
    const googleFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: providerJson() }] } }],
          usageMetadata: { totalTokenCount: 11 }
        }),
        { status: 200 }
      )

    expect(
      (await new OpenAiGenerationProvider("https://openai.test", "key", openAiFetch).generate(providerRequest())).draft
        .slug
    ).toContain("dubai")
    expect(
      (
        await new AnthropicGenerationProvider("https://anthropic.test", "key", anthropicFetch).generate(
          providerRequest()
        )
      ).provider
    ).toBe("anthropic")
    expect(
      (
        await new GoogleAiGenerationProvider("https://google.test/{model}", "key", googleFetch).generate(
          providerRequest()
        )
      ).provider
    ).toBe("google-ai")
  })
})

describe("RAG and validation", () => {
  it("retrieves internal context and validates generated drafts", async () => {
    const db = new MemoryD1()
    seedQuestion(db)
    seedContent(db)
    const rag = await new RagContextBuilder(new QuestionRepository(db), new ContentRepository(db)).build(
      "Why is AI visibility important in Dubai?"
    )
    const validation = validateGeneratedDraft({
      draft: generatedDraft(),
      minWordCount: 800,
      ragContext: rag,
      existingContent: []
    })

    expect(rag.approvedQuestions[0]).toContain("Dubai")
    expect(rag.relatedContent[0]?.title).toBe("AI Visibility Dubai Guide")
    expect(rag.entities).toContain("Dubai")
    expect(validation.errors).toHaveLength(0)
    expect(validation.score).toBeGreaterThan(0.8)
  })
})

describe("AI generation service and repositories", () => {
  it("creates, processes, stores, lists, tests, and cancels generation jobs", async () => {
    const db = new MemoryD1()
    seedQuestion(db)
    seedContent(db)
    const provider = new DeterministicProvider()
    const service = createService(db, provider)

    const completed = await service.createJob(generationInput(false), "editor", "req-1")
    const queued = await service.createJob(generationInput(true), "editor", "req-2")
    const cancelled = await service.cancelJob(queued.id, "No longer needed", "req-3")
    const check = await service.testProvider("req-4")

    expect(completed.status).toBe("completed")
    expect(completed.contentId).toBeTruthy()
    expect(cancelled.status).toBe("cancelled")
    expect(check.ok).toBe(true)
    expect(await service.listJobs(10)).toHaveLength(2)
    expect(provider.calls).toBe(1)
    expect(db.providerChecks).toHaveLength(1)
  })

  it("records retry state when provider execution fails", async () => {
    const db = new MemoryD1()
    seedQuestion(db)
    seedContent(db)
    const provider: AiGenerationProvider = {
      name: "openai",
      async generate() {
        throw new Error("Provider unavailable")
      },
      async test() {
        return { ok: false, latencyMs: 1, errorMessage: "Provider unavailable" }
      }
    }
    const service = createService(db, provider)
    const queued = await service.createJob(generationInput(true), "editor", "req-1")
    const retried = await service.processJob(queued.id, "queue", "req-2", 800)

    expect(retried.status).toBe("queued")
    expect(retried.retryCount).toBe(1)
  })
})

describe("AI generation REST API and queue", () => {
  it("serves generation endpoints and enqueues asynchronous jobs", async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ choices: [{ message: { content: providerJson() } }], usage: { total_tokens: 10 } }),
        { status: 200 }
      )
    try {
      const env = createEnv()
      seedQuestion(env.DB as MemoryD1)
      seedContent(env.DB as MemoryD1)
      const headers = { "x-api-key": "secret", "content-type": "application/json" }
      const syncResponse = await worker.fetch(
        new Request("https://worker.test/generate", {
          method: "POST",
          headers,
          body: JSON.stringify(generationInput(false))
        }),
        env,
        { waitUntil: () => undefined }
      )
      const asyncResponse = await worker.fetch(
        new Request("https://worker.test/generate", {
          method: "POST",
          headers,
          body: JSON.stringify(generationInput(true))
        }),
        env,
        { waitUntil: () => undefined }
      )
      const jobsResponse = await worker.fetch(new Request("https://worker.test/generate/jobs", { headers }), env, {
        waitUntil: () => undefined
      })
      const providersResponse = await worker.fetch(
        new Request("https://worker.test/generate/providers", { headers }),
        env,
        { waitUntil: () => undefined }
      )
      const providerTestResponse = await worker.fetch(
        new Request("https://worker.test/generate/providers/test", { method: "POST", headers, body: "{}" }),
        env,
        {
          waitUntil: () => undefined
        }
      )
      const asyncBody = (await asyncResponse.json()) as { data: { job: { id: string } } }
      const detailResponse = await worker.fetch(
        new Request(`https://worker.test/generate/jobs/${asyncBody.data.job.id}`, { headers }),
        env,
        {
          waitUntil: () => undefined
        }
      )
      const cancelResponse = await worker.fetch(
        new Request(`https://worker.test/generate/jobs/${asyncBody.data.job.id}/cancel`, {
          method: "POST",
          headers,
          body: JSON.stringify({ reason: "test" })
        }),
        env,
        { waitUntil: () => undefined }
      )
      const denied = await worker.fetch(new Request("https://worker.test/generate"), env, {
        waitUntil: () => undefined
      })

      expect(syncResponse.status).toBe(201)
      expect(asyncResponse.status).toBe(202)
      expect((env.AUTHORITY_QUEUE as MemoryQueue).messages[0]?.type).toBe("ai-generation.run")
      expect(jobsResponse.status).toBe(200)
      expect(detailResponse.status).toBe(200)
      expect(cancelResponse.status).toBe(200)
      expect(providersResponse.status).toBe(200)
      expect(providerTestResponse.status).toBe(200)
      expect(denied.status).toBe(401)
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it("processes generation queue messages", async () => {
    const originalFetch = globalThis.fetch
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ choices: [{ message: { content: providerJson() } }], usage: { total_tokens: 10 } }),
        { status: 200 }
      )
    try {
      const env = createEnv()
      seedQuestion(env.DB as MemoryD1)
      seedContent(env.DB as MemoryD1)
      const service = createService(env.DB as MemoryD1)
      const queued = await service.createJob(generationInput(true), "editor", "req-queue")
      const message: Message<AuthorityQueueMessage> = {
        body: {
          id: queued.id,
          type: "ai-generation.run",
          timestamp: new Date().toISOString(),
          payload: { jobId: queued.id, minWordCount: 800 }
        },
        ack() {
          ;(this as Message<AuthorityQueueMessage> & { acknowledged?: boolean }).acknowledged = true
        },
        retry() {
          ;(this as Message<AuthorityQueueMessage> & { retried?: boolean }).retried = true
        }
      }
      const batch: MessageBatch<AuthorityQueueMessage> = { queue: "authority", messages: [message] }
      const promises: Promise<unknown>[] = []
      const context: ExecutionContext = {
        waitUntil(promise: Promise<unknown>) {
          promises.push(promise)
        }
      }

      worker.queue(batch, env, context)
      await Promise.all(promises)

      expect((message as Message<AuthorityQueueMessage> & { acknowledged?: boolean }).acknowledged).toBe(true)
    } finally {
      globalThis.fetch = originalFetch
    }
  })
})

describe("AI generation performance", () => {
  it("builds RAG context within a bounded local execution window", async () => {
    const db = new MemoryD1()
    seedQuestion(db)
    for (let index = 0; index < 40; index += 1)
      seedContent(db, contentRecord({ id: `content-${String(index)}`, slug: `content-${String(index)}` }))
    const started = Date.now()

    await new RagContextBuilder(new QuestionRepository(db), new ContentRepository(db)).build("AI visibility Dubai")

    expect(Date.now() - started).toBeLessThan(100)
  })
})

function providerRequest(): ProviderGenerationRequest {
  return { model: "gpt-test", systemPrompt: "Return JSON", userPrompt: "Return JSON", timeoutMs: 30000 }
}

function generationInput(asyncValue: boolean): {
  question: string
  questionId: string | null
  contentId: string | null
  contentType: GenerationContentType
  minWordCount: number
  language: "en"
  targetKeyword: string
  async: boolean
} {
  return {
    question: "Why is AI not recommending my Dubai business?",
    questionId: null,
    contentId: null,
    contentType: "Authority Article",
    minWordCount: 800,
    language: "en",
    targetKeyword: "AI visibility Dubai",
    async: asyncValue
  }
}
