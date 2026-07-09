import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { type AppBindings, loadConfig } from "../src/config/env"
import { ContentRepository } from "../src/domains/content-pipeline/repositories"
import type { ContentRecord } from "../src/domains/content-pipeline/types"
import { generateOpenApi } from "../src/openapi/openapi"
import { Logger } from "../src/logger/logger"
import type { D1Database, D1PreparedStatement, ExecutionContext, KVNamespace, Queue } from "../src/types/cloudflare"
import { createVisibilityProviderRegistry } from "../src/domains/visibility-intelligence/providers"
import {
  ValidationRunRepository,
  VisibilityContextRepository,
  VisibilityRecommendationRepository,
  VisibilityScoreRepository,
  VisibilitySnapshotRepository
} from "../src/domains/visibility-intelligence/repositories"
import { VisibilityIntelligenceService } from "../src/domains/visibility-intelligence/service"
import type {
  ValidationRunRecord,
  VisibilityRecommendationRecord,
  VisibilityScoreRecord,
  VisibilitySnapshotRecord
} from "../src/domains/visibility-intelligence/types"

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
    if (sql.includes("from content where id")) {
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    }
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    if (sql.includes("from content order"))
      return { results: this.ordered(this.database.content.values()) as T[], success: true }
    if (sql.includes("from visibility_snapshots"))
      return { results: this.ordered(this.database.snapshots.values()) as T[], success: true }
    if (sql.includes("from visibility_scores where metric")) {
      const metric = String(this.values[0])
      return {
        results: this.ordered(this.database.scores.filter((row) => row.metric === metric)) as T[],
        success: true
      }
    }
    if (sql.includes("from visibility_recommendations"))
      return { results: this.ordered(this.database.recommendations) as T[], success: true }
    if (sql.includes("from validation_runs"))
      return { results: this.ordered(this.database.runs.values(), "started_at") as T[], success: true }
    if (sql.includes("from geo_reports")) return { results: this.ordered(this.database.reports) as T[], success: true }
    if (sql.includes("from schema_documents"))
      return { results: this.ordered(this.database.schemas) as T[], success: true }
    if (sql.includes("from entity_graph")) return { results: this.database.entities as T[], success: true }
    if (sql.includes("from publish_history"))
      return { results: this.ordered(this.database.publishHistory) as T[], success: true }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into visibility_snapshots"))
      this.database.snapshots.set(String(this.values[0]), this.snapshotRow())
    else if (sql.startsWith("insert into visibility_scores")) this.database.scores.push(this.scoreRow())
    else if (sql.startsWith("insert into visibility_recommendations"))
      this.database.recommendations.push(this.recommendationRow())
    else if (sql.startsWith("insert into validation_runs"))
      this.database.runs.set(String(this.values[0]), this.runRow())
    else if (sql.startsWith("update validation_runs")) this.updateRun()
    return { success: true }
  }

  private ordered(values: Iterable<Row>, field = "created_at"): Row[] {
    return Array.from(values).sort((left, right) => String(right[field]).localeCompare(String(left[field])))
  }

  private snapshotRow(): Row {
    return {
      id: this.values[0],
      status: this.values[1],
      aggregate_score: this.values[2],
      provider_results_json: this.values[3],
      metrics_json: this.values[4],
      created_at: this.values[5]
    }
  }

  private scoreRow(): Row {
    return {
      id: this.values[0],
      snapshot_id: this.values[1],
      metric: this.values[2],
      score: this.values[3],
      daily_change: this.values[4],
      weekly_change: this.values[5],
      monthly_change: this.values[6],
      created_at: this.values[7]
    }
  }

  private recommendationRow(): Row {
    return {
      id: this.values[0],
      snapshot_id: this.values[1],
      content_id: this.values[2],
      severity: this.values[3],
      category: this.values[4],
      message: this.values[5],
      action: this.values[6],
      created_at: this.values[7]
    }
  }

  private runRow(): Row {
    return {
      id: this.values[0],
      status: this.values[1],
      started_at: this.values[2],
      completed_at: this.values[3],
      provider_count: this.values[4],
      error_message: this.values[5]
    }
  }

  private updateRun(): void {
    const id = String(this.values[3])
    const row = this.database.runs.get(id)
    if (!row) return
    row.status = this.values[0]
    row.completed_at = this.values[1]
    row.error_message = this.values[2]
  }
}

class MemoryD1 implements D1Database {
  readonly content = new Map<string, Row>()
  readonly snapshots = new Map<string, Row>()
  readonly scores: Row[] = []
  readonly recommendations: Row[] = []
  readonly runs = new Map<string, Row>()
  readonly reports: Row[] = []
  readonly schemas: Row[] = []
  readonly entities: Row[] = []
  readonly publishHistory: Row[] = []

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
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function contentRecord(overrides: Partial<ContentRecord> = {}): ContentRecord {
  return {
    id: "content-1",
    title: "AI Visibility Dubai Guide",
    slug: "ai-visibility-dubai-guide",
    status: "PUBLISHED",
    contentType: "Authority Article",
    language: "en",
    canonicalUrl: "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
    targetKeyword: "AI visibility Dubai",
    entities: ["Vista by Lara", "Dubai", "UAE", "AI Visibility"],
    internalLinks: [
      { targetUrl: "https://www.vistabylara.com/services/ai-automation", anchorText: "AI automation Dubai" }
    ],
    schemaType: "TechArticle",
    readingTimeMinutes: 8,
    wordCount: 1500,
    seoMetadata: {
      title: "AI Visibility Dubai | Vista",
      description: "Dubai AI visibility authority guide for UAE brands."
    },
    aiSummary: "Dubai-focused guide for AI visibility and entity confidence.",
    publishingTargets: ["website"],
    body: "# AI Visibility Dubai Guide",
    currentVersion: 1,
    scheduledAt: null,
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z",
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

function seedVisibilitySignals(db: MemoryD1): void {
  db.reports.push({
    id: "geo-1",
    content_id: "content-1",
    score: 0.94,
    validation_json: JSON.stringify({ aiRetrievalReady: true, schemaComplete: true }),
    updated_at: "2026-06-30T00:00:00.000Z",
    created_at: "2026-06-30T00:00:00.000Z"
  })
  db.schemas.push({
    id: "schema-1",
    content_id: "content-1",
    updated_at: "2026-06-30T00:00:00.000Z",
    created_at: "2026-06-30T00:00:00.000Z"
  })
  db.entities.push({
    id: "entity-1",
    source_content_ids_json: JSON.stringify(["content-1"]),
    confidence_score: 1
  })
  db.publishHistory.push({
    id: "publish-1",
    content_id: "content-1",
    created_at: "2026-06-30T00:00:00.000Z"
  })
}

function createService(db: MemoryD1): VisibilityIntelligenceService {
  const config = loadConfig(createEnv({ DB: db }))
  return new VisibilityIntelligenceService(
    createVisibilityProviderRegistry(),
    new ContentRepository(db),
    new VisibilityContextRepository(db),
    new VisibilitySnapshotRepository(db),
    new VisibilityScoreRepository(db),
    new VisibilityRecommendationRepository(db),
    new ValidationRunRepository(db),
    config.publisherWebsiteBaseUrl,
    new Logger(config)
  )
}

describe("AI visibility migration", () => {
  it("creates every AI Visibility Intelligence table", () => {
    const sql = readFileSync(resolve("migrations/0006_ai_visibility_intelligence.sql"), "utf8")

    for (const table of [
      "visibility_snapshots",
      "visibility_scores",
      "visibility_recommendations",
      "validation_runs"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("AI visibility providers", () => {
  it("measures all supported visibility sources and emits actionable gaps", async () => {
    const context = {
      content: [
        contentRecord(),
        contentRecord({
          id: "content-2",
          slug: "ai-service",
          contentType: "Service Page",
          status: "APPROVED_FOR_PUBLISHING",
          canonicalUrl: null,
          entities: ["Dubai"],
          internalLinks: []
        })
      ],
      geoReports: [
        { contentId: "content-1", score: 0.94, validation: { aiRetrievalReady: true, schemaComplete: true } }
      ],
      schemaContentIds: ["content-1"],
      entityContentIds: ["content-1"],
      publishedContentIds: ["content-1"],
      aiResourceContentIds: ["content-1"],
      websiteBaseUrl: "https://www.vistabylara.com"
    }
    const results = await Promise.all(
      createVisibilityProviderRegistry()
        .list()
        .map((provider) => provider.measure(context))
    )

    expect(results).toHaveLength(10)
    expect(results.map((result) => result.provider)).toContain("structured-data-validation")
    expect(results.flatMap((result) => result.recommendations).length).toBeGreaterThan(0)
  })
})

describe("AI visibility repositories and service", () => {
  it("stores snapshots, scores, recommendations, and validation runs", async () => {
    const db = new MemoryD1()
    const timestamp = "2026-06-30T00:00:00.000Z"
    const snapshot: VisibilitySnapshotRecord = {
      id: "snapshot-1",
      status: "completed",
      aggregateScore: 0.8,
      providerResults: [],
      metrics: {
        publishedContentCount: 1,
        canonicalCoverage: 1,
        entityCoverage: 1,
        schemaCompleteness: 1,
        internalLinkDensity: 1,
        topicClusterCoverage: 1,
        faqCoverage: 0,
        serviceCoverage: 0,
        geoOptimizationScore: 0.9,
        aiReadinessScore: 1
      },
      createdAt: timestamp
    }
    const score: VisibilityScoreRecord = {
      id: "score-1",
      snapshotId: "snapshot-1",
      metric: "aiReadinessScore",
      score: 1,
      dailyChange: 0,
      weeklyChange: 0,
      monthlyChange: 0,
      createdAt: timestamp
    }
    const recommendation: VisibilityRecommendationRecord = {
      id: "rec-1",
      snapshotId: "snapshot-1",
      contentId: "content-1",
      severity: "medium",
      category: "internal-link-coverage",
      message: "Add internal links to orphaned pages.",
      action: "Add relevant entity and service links.",
      createdAt: timestamp
    }
    const run: ValidationRunRecord = {
      id: "run-1",
      status: "running",
      startedAt: timestamp,
      completedAt: null,
      providerCount: 10,
      errorMessage: null
    }

    await new VisibilitySnapshotRepository(db).create(snapshot)
    await new VisibilityScoreRepository(db).createMany([score])
    await new VisibilityRecommendationRepository(db).createMany([recommendation])
    await new ValidationRunRepository(db).create(run)
    await new ValidationRunRepository(db).update({ ...run, status: "completed", completedAt: timestamp })

    expect(await new VisibilitySnapshotRepository(db).list(10)).toHaveLength(1)
    expect(await new VisibilityScoreRepository(db).listMetric("aiReadinessScore", 10)).toHaveLength(1)
    expect(await new VisibilityRecommendationRepository(db).list(10)).toHaveLength(1)
    expect((await new ValidationRunRepository(db).list(10))[0]?.status).toBe("completed")
  })

  it("runs a scan, tracks trends, and persists recommendations", async () => {
    const db = new MemoryD1()
    seedContent(db)
    seedContent(db, contentRecord({ id: "content-2", slug: "ai-faq-dubai", title: "AI FAQ Dubai", contentType: "FAQ" }))
    seedVisibilitySignals(db)
    const service = createService(db)

    const first = await service.scan("req-1")
    db.publishHistory.push({ id: "publish-2", content_id: "content-2", created_at: "2026-07-01T00:00:00.000Z" })
    const second = await service.scan("req-2")

    expect(first.snapshot.providerResults).toHaveLength(10)
    expect(second.snapshot.metrics.publishedContentCount).toBe(2)
    expect(second.scores.find((score) => score.metric === "publishedContentCount")?.dailyChange).toBe(1)
    expect(await service.score()).not.toBeNull()
    expect(await service.history(10)).toHaveLength(2)
    expect((await service.listRecommendations(20)).length).toBeGreaterThan(0)
  })
})

describe("AI visibility REST API and scheduler", () => {
  it("serves every visibility endpoint", async () => {
    const env = createEnv()
    seedContent(env.DB as MemoryD1)
    seedVisibilitySignals(env.DB as MemoryD1)
    const headers = { "x-api-key": "secret", "content-type": "application/json" }

    const scan = await worker.fetch(
      new Request("https://worker.test/visibility/scan", { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const status = await worker.fetch(new Request("https://worker.test/visibility/status", { headers }), env, {
      waitUntil: () => undefined
    })
    const score = await worker.fetch(new Request("https://worker.test/visibility/score", { headers }), env, {
      waitUntil: () => undefined
    })
    const history = await worker.fetch(new Request("https://worker.test/visibility/history", { headers }), env, {
      waitUntil: () => undefined
    })
    const recommendations = await worker.fetch(
      new Request("https://worker.test/visibility/recommendations", { headers }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const denied = await worker.fetch(new Request("https://worker.test/visibility/status"), env, {
      waitUntil: () => undefined
    })

    expect(scan.status).toBe(201)
    expect(status.status).toBe(200)
    expect(score.status).toBe(200)
    expect(history.status).toBe(200)
    expect(recommendations.status).toBe(200)
    expect(denied.status).toBe(401)
  })

  it("runs scheduled visibility scans through Wrangler cron configuration", async () => {
    const promises: Promise<unknown>[] = []
    const env = createEnv({ VISIBILITY_SCAN_CRON_ENABLED: "true" })
    seedContent(env.DB as MemoryD1)
    seedVisibilitySignals(env.DB as MemoryD1)
    const context: ExecutionContext = {
      waitUntil(promise: Promise<unknown>) {
        promises.push(promise)
      }
    }

    worker.scheduled({ cron: "*/15 * * * *", scheduledTime: Date.now() }, env, context)
    await Promise.all(promises)

    expect((env.DB as MemoryD1).runs.size).toBe(1)
    expect((env.DB as MemoryD1).snapshots.size).toBe(1)
  })

  it("publishes visibility endpoints in OpenAPI", () => {
    const config = loadConfig(createEnv())
    const openApi = generateOpenApi(config, "https://worker.test")
    const paths = openApi.paths as Record<string, unknown>

    expect(paths["/visibility/status"]).toBeDefined()
    expect(paths["/visibility/scan"]).toBeDefined()
  })
})
