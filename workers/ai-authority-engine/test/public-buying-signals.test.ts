import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import worker from "../src/index"
import { type AppBindings, loadConfig } from "../src/config/env"
import { classifySignal, recommendServices } from "../src/domains/public-buying-signals/classification"
import {
  ConfiguredPublicFeedProvider,
  createBuyingSignalProviderRegistry
} from "../src/domains/public-buying-signals/providers"
import {
  BuyingSignalRepository,
  IngestionRunRepository,
  OpportunityRepository,
  OpportunityScoreRepository,
  OrganizationRepository,
  SignalSourceRepository
} from "../src/domains/public-buying-signals/repositories"
import { calculateOpportunityScore } from "../src/domains/public-buying-signals/scoring"
import { PublicBuyingSignalService } from "../src/domains/public-buying-signals/service"
import type {
  BuyingSignalRecord,
  IngestionRunRecord,
  OpportunityRecord,
  OpportunityScoreRecord,
  OrganizationRecord,
  PublicSignalCandidate,
  SignalSourceRecord
} from "../src/domains/public-buying-signals/types"
import { generateOpenApi } from "../src/openapi/openapi"
import { Logger } from "../src/logger/logger"
import type { D1Database, D1PreparedStatement, ExecutionContext, KVNamespace, Queue } from "../src/types/cloudflare"

type Row = Record<string, unknown>

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

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
    if (sql.includes("from buying_signals where id"))
      return (this.database.signals.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("where opportunities.id")) return (this.enrichOpportunity(String(this.values[0])) as T) ?? null
    if (sql.includes("from opportunities where id"))
      return (this.database.opportunities.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from organizations where id"))
      return (this.database.organizations.get(String(this.values[0])) as T | undefined) ?? null
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    if (sql.includes("from signal_sources"))
      return { results: this.sorted(this.database.sources.values(), "updated_at") as T[], success: true }
    if (sql.includes("from buying_signals where organization_id")) {
      return {
        results: Array.from(this.database.signals.values()).filter(
          (row) => row.organization_id === this.values[0]
        ) as T[],
        success: true
      }
    }
    if (sql.includes("from buying_signals"))
      return { results: this.sorted(this.database.signals.values(), "detected_at") as T[], success: true }
    if (sql.includes("from opportunities"))
      return {
        results: this.sorted(this.database.opportunities.values(), "updated_at").map((row) =>
          this.enrichOpportunity(String(row.id))
        ) as T[],
        success: true
      }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into signal_sources"))
      this.database.sources.set(String(this.values[0]), this.sourceRow())
    else if (sql.startsWith("insert into organizations"))
      this.database.organizations.set(String(this.values[0]), this.organizationRow())
    else if (sql.startsWith("insert into buying_signals"))
      this.database.signals.set(String(this.values[0]), this.signalRow())
    else if (sql.startsWith("insert into opportunities"))
      this.database.opportunities.set(String(this.values[0]), this.opportunityRow())
    else if (sql.startsWith("insert into opportunity_scores")) this.database.scores.push(this.scoreRow())
    else if (sql.startsWith("insert into ingestion_runs")) this.database.runs.set(String(this.values[0]), this.runRow())
    else if (sql.startsWith("update ingestion_runs")) this.updateRun()
    return { success: true }
  }

  private sorted(values: Iterable<Row>, field: string): Row[] {
    return Array.from(values).sort((left, right) => String(right[field]).localeCompare(String(left[field])))
  }

  private enrichOpportunity(id: string): Row | null {
    const opportunity = this.database.opportunities.get(id)
    if (!opportunity) return null
    const organization = this.database.organizations.get(String(opportunity.organization_id))
    const signal = this.database.signals.get(String(opportunity.primary_signal_id))
    const source = signal ? this.database.sources.get(String(signal.source_id)) : undefined
    const score = this.database.scores.find((row) => row.opportunity_id === opportunity.id)
    return {
      ...opportunity,
      organization_name: organization?.name,
      score: score?.score,
      source_name: source?.name,
      signal_type: signal?.event_type
    }
  }

  private sourceRow(): Row {
    return {
      id: this.values[0],
      name: this.values[1],
      category: this.values[2],
      endpoint: this.values[3],
      enabled: this.values[4],
      metadata_json: this.values[5],
      created_at: this.values[6],
      updated_at: this.values[7]
    }
  }

  private organizationRow(): Row {
    return {
      id: this.values[0],
      name: this.values[1],
      website_url: this.values[2],
      industry: this.values[3],
      location: this.values[4],
      company_size: this.values[5],
      technologies_json: this.values[6],
      metadata_json: this.values[7],
      created_at: this.values[8],
      updated_at: this.values[9]
    }
  }

  private signalRow(): Row {
    return {
      id: this.values[0],
      source_id: this.values[1],
      organization_id: this.values[2],
      event_type: this.values[3],
      title: this.values[4],
      summary: this.values[5],
      url: this.values[6],
      published_at: this.values[7],
      detected_at: this.values[8],
      location: this.values[9],
      technologies_json: this.values[10],
      confidence_score: this.values[11],
      raw_json: this.values[12]
    }
  }

  private opportunityRow(): Row {
    return {
      id: this.values[0],
      organization_id: this.values[1],
      primary_signal_id: this.values[2],
      status: this.values[3],
      title: this.values[4],
      explanation: this.values[5],
      recommended_services_json: this.values[6],
      created_at: this.values[7],
      updated_at: this.values[8]
    }
  }

  private scoreRow(): Row {
    return {
      id: this.values[0],
      opportunity_id: this.values[1],
      score: this.values[2],
      factors_json: this.values[3],
      explanation: this.values[4],
      created_at: this.values[5]
    }
  }

  private runRow(): Row {
    return {
      id: this.values[0],
      status: this.values[1],
      started_at: this.values[2],
      completed_at: this.values[3],
      source_count: this.values[4],
      signal_count: this.values[5],
      opportunity_count: this.values[6],
      error_message: this.values[7]
    }
  }

  private updateRun(): void {
    const row = this.database.runs.get(String(this.values[5]))
    if (!row) return
    row.status = this.values[0]
    row.completed_at = this.values[1]
    row.signal_count = this.values[2]
    row.opportunity_count = this.values[3]
    row.error_message = this.values[4]
  }
}

class MemoryD1 implements D1Database {
  readonly sources = new Map<string, Row>()
  readonly organizations = new Map<string, Row>()
  readonly signals = new Map<string, Row>()
  readonly opportunities = new Map<string, Row>()
  readonly scores: Row[] = []
  readonly runs = new Map<string, Row>()

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
  async send(_message: unknown): Promise<void> {}
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
    PUBLISHER_WEBSITE_BASE_URL: "https://www.vistabylara.com",
    PUBLIC_BUYING_SIGNAL_FEEDS: "Dubai Launches|press-releases|https://signals.test/feed.json",
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function localFetch(): typeof fetch {
  return async () =>
    new Response(
      JSON.stringify([
        {
          organizationName: "Dubai Retail Group",
          organizationWebsiteUrl: "https://dubairetail.example",
          industry: "retail ecommerce",
          location: "Dubai UAE",
          companySize: "201-500",
          technologies: ["Shopify", "Google Ads"],
          title: "Dubai Retail Group launches Shopify e-commerce platform",
          summary: "The Dubai retailer launched a new online store and is hiring a PPC specialist for UAE growth.",
          url: "https://signals.test/dubai-retail-shopify",
          publishedAt: new Date().toISOString()
        }
      ]),
      { status: 200, headers: { "content-type": "application/json" } }
    )
}

function sourceRecord(): SignalSourceRecord {
  return {
    id: "press-dubai-launches",
    name: "Dubai Launches",
    category: "press-releases",
    endpoint: "https://signals.test/feed.json",
    enabled: true,
    metadata: { publicOnly: true },
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  }
}

function organizationRecord(): OrganizationRecord {
  return {
    id: "dubai-retail-group",
    name: "Dubai Retail Group",
    websiteUrl: "https://dubairetail.example",
    industry: "retail ecommerce",
    location: "Dubai UAE",
    companySize: "201-500",
    technologies: ["Shopify", "Google Ads"],
    metadata: {},
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  }
}

function signalRecord(): BuyingSignalRecord {
  return {
    id: "signal-1",
    sourceId: "press-dubai-launches",
    organizationId: "dubai-retail-group",
    eventType: "shopify-adoption",
    title: "Dubai Retail Group launches Shopify e-commerce platform",
    summary: "The Dubai retailer launched a new online store.",
    url: "https://signals.test/dubai-retail-shopify",
    publishedAt: "2026-07-01T00:00:00.000Z",
    detectedAt: "2026-07-01T00:00:00.000Z",
    location: "Dubai UAE",
    technologies: ["Shopify"],
    confidenceScore: 0.9,
    raw: {}
  }
}

function opportunityRecord(): OpportunityRecord {
  return {
    id: "opportunity-1",
    organizationId: "dubai-retail-group",
    primarySignalId: "signal-1",
    status: "open",
    title: "Dubai Retail Group: shopify adoption",
    explanation: "Public Shopify adoption signal.",
    recommendedServices: ["Shopify and AI e-commerce infrastructure"],
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  }
}

function createService(db: MemoryD1): PublicBuyingSignalService {
  globalThis.fetch = localFetch()
  const config = loadConfig(createEnv({ DB: db }))
  return new PublicBuyingSignalService(
    createBuyingSignalProviderRegistry(config.publicBuyingSignalFeeds),
    new SignalSourceRepository(db),
    new OrganizationRepository(db),
    new BuyingSignalRepository(db),
    new OpportunityRepository(db),
    new OpportunityScoreRepository(db),
    new IngestionRunRepository(db),
    new Logger(config)
  )
}

describe("public buying signal migration", () => {
  it("creates every Phase 10 table", () => {
    const sql = readFileSync(resolve("migrations/0008_public_buying_signal_intelligence.sql"), "utf8")

    for (const table of [
      "buying_signals",
      "signal_sources",
      "organizations",
      "opportunities",
      "opportunity_scores",
      "ingestion_runs"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("public buying signal classification and scoring", () => {
  it("classifies public commercial events and explains opportunity scores", () => {
    const candidate: PublicSignalCandidate = {
      source: sourceRecord(),
      organizationName: "Dubai Retail Group",
      organizationWebsiteUrl: "https://dubairetail.example",
      organizationIndustry: "retail",
      organizationLocation: "Dubai UAE",
      companySize: "201-500",
      technologies: ["Shopify"],
      title: "Dubai Retail Group launches Shopify e-commerce platform",
      summary: "The brand is hiring a Google Ads specialist for a UAE online store.",
      url: "https://signals.test/dubai-retail-shopify",
      publishedAt: new Date().toISOString(),
      raw: {}
    }
    const classification = classifySignal(candidate)
    const score = calculateOpportunityScore(
      signalRecord(),
      organizationRecord(),
      2,
      new Date("2026-07-02T00:00:00.000Z")
    )

    expect(classification.eventType).toBe("shopify-adoption")
    expect(recommendServices(classification.eventType, ["Shopify"])).toContain(
      "Shopify and AI e-commerce infrastructure"
    )
    expect(score.score).toBeGreaterThan(0.8)
    expect(score.explanation).toContain("Dubai Retail Group")
  })
})

describe("public buying signal providers", () => {
  it("discovers candidates from configured public JSON and RSS feeds", async () => {
    const jsonProvider = new ConfiguredPublicFeedProvider(
      { name: "Launch JSON", category: "press-releases", endpoint: "https://signals.test/feed.json" },
      localFetch()
    )
    const rssProvider = new ConfiguredPublicFeedProvider(
      { name: "Launch RSS", category: "public-rss-feeds", endpoint: "https://signals.test/feed.xml" },
      async () =>
        new Response(
          "<rss><channel><item><title>Dubai AI firm announces expansion</title><description>Hiring AI engineers in Dubai UAE.</description><link>https://signals.test/rss</link><pubDate>2026-07-01T00:00:00.000Z</pubDate></item></channel></rss>",
          {
            status: 200,
            headers: { "content-type": "application/rss+xml" }
          }
        )
    )

    expect(await jsonProvider.discover({ limit: 10 })).toHaveLength(1)
    expect((await rssProvider.discover({ limit: 10 }))[0]?.organizationName).toContain("Dubai AI firm")
  })
})

describe("public buying signal repositories and service", () => {
  it("stores sources, organizations, signals, opportunities, scores, and ingestion runs", async () => {
    const db = new MemoryD1()
    const score: OpportunityScoreRecord = {
      id: "score-1",
      opportunityId: "opportunity-1",
      score: 0.91,
      factors: {
        commercialRelevance: 1,
        industryFit: 1,
        uaeGccRelevance: 1,
        recency: 1,
        companySize: 0.75,
        technologyMatch: 1,
        multipleSignalConfirmation: 0.9
      },
      explanation: "Strong public buying signal.",
      createdAt: "2026-07-01T00:00:00.000Z"
    }
    const run: IngestionRunRecord = {
      id: "run-1",
      status: "running",
      startedAt: "2026-07-01T00:00:00.000Z",
      completedAt: null,
      sourceCount: 1,
      signalCount: 0,
      opportunityCount: 0,
      errorMessage: null
    }

    await new SignalSourceRepository(db).upsert(sourceRecord())
    await new OrganizationRepository(db).upsert(organizationRecord())
    await new BuyingSignalRepository(db).create(signalRecord())
    await new OpportunityRepository(db).create(opportunityRecord())
    await new OpportunityScoreRepository(db).create(score)
    await new IngestionRunRepository(db).create(run)
    await new IngestionRunRepository(db).update({
      ...run,
      status: "completed",
      completedAt: "2026-07-01T00:01:00.000Z",
      signalCount: 1,
      opportunityCount: 1
    })

    expect(await new SignalSourceRepository(db).list(10)).toHaveLength(1)
    expect((await new OrganizationRepository(db).findById("dubai-retail-group"))?.name).toBe("Dubai Retail Group")
    expect(await new BuyingSignalRepository(db).list(10)).toHaveLength(1)
    expect(await new BuyingSignalRepository(db).countForOrganization("dubai-retail-group")).toBe(1)
    expect(await new OpportunityRepository(db).list(10)).toHaveLength(1)
    expect(db.scores).toHaveLength(1)
    expect(db.runs.get("run-1")?.status).toBe("completed")
  })

  it("scans configured public sources and creates scored opportunities", async () => {
    const db = new MemoryD1()
    const result = await createService(db).scan("req-1")

    expect(result.signals).toHaveLength(1)
    expect(result.opportunities[0]?.score.score).toBeGreaterThan(0.8)
    expect(await new OpportunityRepository(db).list(10)).toHaveLength(1)
    expect(await new SignalSourceRepository(db).list(10)).toHaveLength(1)
  })
})

describe("public buying signal REST API and scheduler", () => {
  it("serves every Phase 10 endpoint", async () => {
    globalThis.fetch = localFetch()
    const env = createEnv()
    const headers = { "x-api-key": "secret", "content-type": "application/json" }

    const scan = await worker.fetch(
      new Request("https://worker.test/signals/scan", { method: "POST", headers, body: "{}" }),
      env,
      { waitUntil: () => undefined }
    )
    const signals = await worker.fetch(new Request("https://worker.test/signals", { headers }), env, {
      waitUntil: () => undefined
    })
    const signalId = Array.from((env.DB as MemoryD1).signals.keys())[0] ?? ""
    const signal = await worker.fetch(new Request(`https://worker.test/signals/${signalId}`, { headers }), env, {
      waitUntil: () => undefined
    })
    const opportunities = await worker.fetch(new Request("https://worker.test/opportunities", { headers }), env, {
      waitUntil: () => undefined
    })
    const opportunityId = Array.from((env.DB as MemoryD1).opportunities.keys())[0] ?? ""
    const opportunity = await worker.fetch(
      new Request(`https://worker.test/opportunities/${opportunityId}`, { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const sources = await worker.fetch(new Request("https://worker.test/sources", { headers }), env, {
      waitUntil: () => undefined
    })
    const denied = await worker.fetch(new Request("https://worker.test/signals"), env, { waitUntil: () => undefined })

    expect(scan.status).toBe(201)
    expect(signals.status).toBe(200)
    expect(signal.status).toBe(200)
    expect(opportunities.status).toBe(200)
    expect(opportunity.status).toBe(200)
    expect(sources.status).toBe(200)
    expect(denied.status).toBe(401)
  })

  it("runs scheduled public signal ingestion through Wrangler cron configuration", async () => {
    globalThis.fetch = localFetch()
    const promises: Promise<unknown>[] = []
    const env = createEnv({ PUBLIC_BUYING_SIGNAL_CRON_ENABLED: "true" })
    const context: ExecutionContext = {
      waitUntil(promise: Promise<unknown>) {
        promises.push(promise)
      }
    }

    worker.scheduled({ cron: "*/15 * * * *", scheduledTime: Date.now() }, env, context)
    await Promise.all(promises)

    expect((env.DB as MemoryD1).signals.size).toBe(1)
    expect((env.DB as MemoryD1).opportunities.size).toBe(1)
    expect((env.DB as MemoryD1).runs.size).toBe(1)
  })

  it("publishes Phase 10 endpoints in OpenAPI", () => {
    const paths = generateOpenApi(loadConfig(createEnv()), "https://worker.test").paths as Record<string, unknown>

    expect(paths["/signals"]).toBeDefined()
    expect(paths["/opportunities/{id}"]).toBeDefined()
  })
})
