import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { loadConfig, type AppBindings } from "../src/config/env"
import { ContentRepository } from "../src/domains/content-pipeline/repositories"
import type { ContentRecord } from "../src/domains/content-pipeline/types"
import { createPublisherRegistry } from "../src/domains/publisher/providers"
import {
  PublishArtifactRepository,
  PublishFailureRepository,
  PublishHistoryRepository,
  PublishJobRepository,
  PublishTargetRepository
} from "../src/domains/publisher/repositories"
import { PublisherService } from "../src/domains/publisher/service"
import { buildPublishPackage, checksum, validatePublishPackage } from "../src/domains/publisher/transform"
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
    if (sql.includes("from publish_jobs"))
      return (this.database.jobs.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from content where id"))
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    if (sql.includes("from publish_jobs"))
      return { results: Array.from(this.database.jobs.values()) as T[], success: true }
    if (sql.includes("from publish_artifacts")) {
      const jobId = String(this.values[0])
      return { results: this.database.artifacts.filter((row) => row.job_id === jobId) as T[], success: true }
    }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into publish_jobs")) this.insertJob()
    else if (sql.startsWith("update publish_jobs")) this.updateJob()
    else if (sql.startsWith("insert into publish_targets"))
      this.database.targets.set(String(this.values[1]), this.targetRow())
    else if (sql.startsWith("insert into publish_history")) this.database.history.push(this.historyRow())
    else if (sql.startsWith("insert into publish_failures")) this.database.failures.push(this.failureRow())
    else if (sql.startsWith("insert into publish_artifacts")) this.database.artifacts.push(this.artifactRow())
    return { success: true }
  }

  private insertJob(): void {
    this.database.jobs.set(String(this.values[0]), {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      targets_json: this.values[3],
      canonical_url: this.values[4],
      attempt_count: this.values[5],
      max_retries: this.values[6],
      error_message: this.values[7],
      created_at: this.values[8],
      updated_at: this.values[9],
      started_at: this.values[10],
      completed_at: this.values[11]
    })
  }

  private updateJob(): void {
    const id = String(this.values[7])
    const existing = this.database.jobs.get(id)
    if (!existing) return
    this.database.jobs.set(id, {
      ...existing,
      status: this.values[0],
      targets_json: this.values[1],
      attempt_count: this.values[2],
      error_message: this.values[3],
      updated_at: this.values[4],
      started_at: this.values[5],
      completed_at: this.values[6]
    })
  }

  private targetRow(): Row {
    return {
      id: this.values[0],
      name: this.values[1],
      enabled: this.values[2],
      endpoint: this.values[3],
      config_json: this.values[4],
      created_at: this.values[5],
      updated_at: this.values[6]
    }
  }

  private historyRow(): Row {
    return {
      id: this.values[0],
      job_id: this.values[1],
      content_id: this.values[2],
      publisher: this.values[3],
      version: this.values[4],
      status: this.values[5],
      published_url: this.values[6],
      canonical_url: this.values[7],
      platform_id: this.values[8],
      published_at: this.values[9],
      checksum: this.values[10],
      response_metadata_json: this.values[11],
      publishing_metadata_json: this.values[12],
      latency_ms: this.values[13],
      created_at: this.values[14]
    }
  }

  private failureRow(): Row {
    return {
      id: this.values[0],
      job_id: this.values[1],
      content_id: this.values[2],
      publisher: this.values[3],
      attempt: this.values[4],
      error_code: this.values[5],
      error_message: this.values[6],
      retry_at: this.values[7],
      created_at: this.values[8]
    }
  }

  private artifactRow(): Row {
    return {
      id: this.values[0],
      job_id: this.values[1],
      content_id: this.values[2],
      publisher: this.values[3],
      format: this.values[4],
      artifact_body: this.values[5],
      checksum: this.values[6],
      created_at: this.values[7]
    }
  }
}

class MemoryD1 implements D1Database {
  readonly jobs = new Map<string, Row>()
  readonly targets = new Map<string, Row>()
  readonly history: Row[] = []
  readonly failures: Row[] = []
  readonly artifacts: Row[] = []
  readonly content = new Map<string, Row>()

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
    PUBLISHER_DEFAULT_TARGETS: "website,json-export,markdown-export",
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function contentRecord(overrides: Partial<ContentRecord> = {}): ContentRecord {
  return {
    id: "content-1",
    title: "Why AI Is Not Recommending Your Dubai Business",
    slug: "why-ai-not-recommending-dubai-business",
    status: "APPROVED_FOR_PUBLISHING",
    contentType: "Authority Article",
    language: "en",
    canonicalUrl: null,
    targetKeyword: "AI visibility Dubai",
    entities: ["Vista by Lara", "Dubai", "UAE", "AI Visibility"],
    internalLinks: [{ targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }],
    schemaType: "TechArticle",
    readingTimeMinutes: 8,
    wordCount: 1600,
    seoMetadata: { title: "AI Visibility Dubai", description: "Dubai AI visibility guide." },
    aiSummary: "Dubai authority article about AI visibility.",
    publishingTargets: ["website"],
    body: "# Why AI Is Not Recommending Your Dubai Business\n\nDubai businesses need entity confidence and canonical authority.",
    currentVersion: 3,
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

function createService(db: MemoryD1): PublisherService {
  const config = loadConfig(createEnv({ DB: db }))
  return new PublisherService(
    createPublisherRegistry(),
    new ContentRepository(db),
    new PublishJobRepository(db),
    new PublishTargetRepository(db),
    new PublishHistoryRepository(db),
    new PublishFailureRepository(db),
    new PublishArtifactRepository(db),
    config.publisherWebsiteBaseUrl,
    ["website", "json-export", "markdown-export"],
    config.publisherTimeoutMs,
    new Logger(config)
  )
}

describe("publisher migration", () => {
  it("creates every publisher table", () => {
    const sql = readFileSync(resolve("migrations/0004_publisher_engine.sql"), "utf8")

    for (const table of [
      "publish_jobs",
      "publish_targets",
      "publish_history",
      "publish_failures",
      "publish_artifacts"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("publisher transformations and providers", () => {
  it("generates every required content format and validates canonical rules", async () => {
    const pkg = buildPublishPackage(contentRecord(), "https://www.vistabylara.com")

    expect(pkg.canonicalUrl).toContain("vistabylara.com")
    expect(pkg.canonicalHtml).toContain('rel="canonical"')
    expect(pkg.markdown).toContain("Canonical source")
    expect(pkg.plainText).toContain("Vista by Lara")
    expect(pkg.rss).toContain("<item>")
    expect(pkg.json).toContain("AI Visibility")
    expect(await checksum(pkg.json)).toHaveLength(64)
    expect(() => {
      validatePublishPackage(pkg)
    }).not.toThrow()
  })

  it("runs all publisher providers through the same interface", async () => {
    const pkg = buildPublishPackage(contentRecord(), "https://www.vistabylara.com")
    const registry = createPublisherRegistry()
    const providers = registry.list()
    const results = []

    for (const publisher of providers) {
      results.push(await registry.resolve(publisher).publish({ package: pkg, attemptCount: 1, timeoutMs: 1000 }))
    }

    expect(providers).toEqual([
      "website",
      "rss",
      "github-knowledge-repository",
      "blogger",
      "medium",
      "vistanewswire",
      "json-export",
      "markdown-export"
    ])
    expect(results.every((result) => result.canonicalUrl === pkg.canonicalUrl)).toBe(true)
    expect(new Set(results.map((result) => result.checksum)).size).toBeGreaterThan(1)
  })
})

describe("publisher service and repositories", () => {
  it("publishes approved content, stores history and artifacts, and exposes jobs", async () => {
    const db = new MemoryD1()
    seedContent(db)
    const service = createService(db)

    const job = await service.createJob("content-1", ["json-export"], false, "req-1")
    const jobs = await service.listJobs(10)
    const artifacts = await new PublishArtifactRepository(db).listForJob(job.id)

    expect(job.status).toBe("succeeded")
    expect(job.targets).toContain("website")
    expect(jobs).toHaveLength(1)
    expect(db.history).toHaveLength(2)
    expect(artifacts.length).toBe(2)
  })

  it("supports cancellation and rejects unapproved content", async () => {
    const db = new MemoryD1()
    seedContent(db)
    seedContent(db, contentRecord({ id: "content-2", slug: "draft", status: "GENERATED" }))
    const service = createService(db)

    const queued = await service.createJob("content-1", ["markdown-export"], true, "req-1")
    const cancelled = await service.cancelJob(queued.id, "req-2")

    await expect(service.createJob("content-2", ["website"], false, "req-3")).rejects.toThrow("approved for publishing")
    expect(cancelled.status).toBe("cancelled")
  })

  it("records retry state and failure records", async () => {
    const db = new MemoryD1()
    seedContent(db)
    const registry = createPublisherRegistry()
    registry.register({
      name: "json-export",
      async publish() {
        throw new Error("Export unavailable")
      },
      async test() {
        return { ok: false, latencyMs: 1, errorMessage: "Export unavailable" }
      }
    })
    const config = loadConfig(createEnv({ DB: db }))
    const service = new PublisherService(
      registry,
      new ContentRepository(db),
      new PublishJobRepository(db),
      new PublishTargetRepository(db),
      new PublishHistoryRepository(db),
      new PublishFailureRepository(db),
      new PublishArtifactRepository(db),
      config.publisherWebsiteBaseUrl,
      ["json-export"],
      config.publisherTimeoutMs,
      new Logger(config)
    )

    const job = await service.createJob("content-1", ["json-export"], true, "req-1")
    const retried = await service.processJob(job.id, "req-2")

    expect(retried.status).toBe("retry")
    expect(db.failures).toHaveLength(1)
  })
})

describe("publisher REST API and queue", () => {
  it("serves publisher endpoints", async () => {
    const env = createEnv()
    seedContent(env.DB as MemoryD1)
    const headers = { "x-api-key": "secret", "content-type": "application/json" }
    const syncResponse = await worker.fetch(
      new Request("https://worker.test/publish/content-1", {
        method: "POST",
        headers,
        body: JSON.stringify({ targets: ["json-export"] })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const asyncResponse = await worker.fetch(
      new Request("https://worker.test/publish", {
        method: "POST",
        headers,
        body: JSON.stringify({ contentId: "content-1", targets: ["markdown-export"], async: true })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const asyncBody = (await asyncResponse.json()) as { data: { job: { id: string } } }
    const jobsResponse = await worker.fetch(new Request("https://worker.test/publish/jobs", { headers }), env, {
      waitUntil: () => undefined
    })
    const detailResponse = await worker.fetch(
      new Request(`https://worker.test/publish/jobs/${asyncBody.data.job.id}`, { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const cancelResponse = await worker.fetch(
      new Request(`https://worker.test/publish/jobs/${asyncBody.data.job.id}/cancel`, {
        method: "POST",
        headers,
        body: "{}"
      }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const providersResponse = await worker.fetch(
      new Request("https://worker.test/publish/providers", { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const testResponse = await worker.fetch(
      new Request("https://worker.test/publish/providers/test", { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const denied = await worker.fetch(new Request("https://worker.test/publish/jobs"), env, {
      waitUntil: () => undefined
    })

    expect(syncResponse.status).toBe(201)
    expect(asyncResponse.status).toBe(202)
    expect((env.AUTHORITY_QUEUE as MemoryQueue).messages[0]?.type).toBe("publisher.run")
    expect(jobsResponse.status).toBe(200)
    expect(detailResponse.status).toBe(200)
    expect(cancelResponse.status).toBe(200)
    expect(providersResponse.status).toBe(200)
    expect(testResponse.status).toBe(200)
    expect(denied.status).toBe(401)
  })

  it("processes publisher queue messages", async () => {
    const env = createEnv()
    seedContent(env.DB as MemoryD1)
    const service = createService(env.DB as MemoryD1)
    const queued = await service.createJob("content-1", ["json-export"], true, "req-1")
    const message: Message<AuthorityQueueMessage> = {
      body: {
        id: queued.id,
        type: "publisher.run",
        timestamp: new Date().toISOString(),
        payload: { jobId: queued.id }
      },
      ack() {
        ;(this as Message<AuthorityQueueMessage> & { acknowledged?: boolean }).acknowledged = true
      },
      retry() {
        ;(this as Message<AuthorityQueueMessage> & { retried?: boolean }).retried = true
      }
    }
    const promises: Promise<unknown>[] = []
    const context: ExecutionContext = {
      waitUntil(promise: Promise<unknown>) {
        promises.push(promise)
      }
    }

    const batch: MessageBatch<AuthorityQueueMessage> = { queue: "authority", messages: [message] }
    worker.queue(batch, env, context)
    await Promise.all(promises)

    expect((message as Message<AuthorityQueueMessage> & { acknowledged?: boolean }).acknowledged).toBe(true)
  })
})
