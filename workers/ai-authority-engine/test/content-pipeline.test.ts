import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { loadConfig, type AppBindings } from "../src/config/env"
import {
  ContentAuditRepository,
  ContentRepository,
  ContentVersionRepository,
  EditorialQueueRepository,
  InternalLinkRepository,
  PublicationQueueRepository,
  ReviewQueueRepository,
  TagRepository,
  CategoryRepository
} from "../src/domains/content-pipeline/repositories"
import { ContentPipelineService } from "../src/domains/content-pipeline/service"
import type { ContentRecord, CreateContentInput, PublicationQueueRecord } from "../src/domains/content-pipeline/types"
import { validateCreateContentInput } from "../src/domains/content-pipeline/validation"
import { approvalTarget, assertValidTransition, rejectionTarget } from "../src/domains/content-pipeline/workflow"
import { Logger } from "../src/logger/logger"
import type { D1Database, D1PreparedStatement, KVNamespace, Queue } from "../src/types/cloudflare"

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
    if (sql.includes("from content_versions")) {
      const contentId = String(this.values[0])
      const versionNumber = Number(this.values[1])
      return (
        (this.database.versions.find((row) => row.content_id === contentId && row.version_number === versionNumber) as
          T | undefined) ?? null
      )
    }
    if (sql.includes("from content where id")) {
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    }
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    const limit = Number(this.values[0] ?? 50)
    if (sql.includes("from content order")) {
      return { results: Array.from(this.database.content.values()).slice(0, limit) as T[], success: true }
    }
    if (sql.includes("from editorial_queue")) {
      return { results: Array.from(this.database.editorialQueue.values()).slice(0, limit) as T[], success: true }
    }
    if (sql.includes("from publication_queue")) {
      return { results: Array.from(this.database.publicationQueue.values()).slice(0, limit) as T[], success: true }
    }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into content (")) this.insertContent()
    else if (sql.startsWith("update content set")) this.updateContent()
    else if (sql.startsWith("insert into content_versions")) this.insertVersion()
    else if (sql.startsWith("insert into editorial_queue"))
      this.database.editorialQueue.set(String(this.values[0]), this.queueRow("editorial"))
    else if (sql.startsWith("insert into review_queue"))
      this.database.reviewQueue.set(String(this.values[0]), this.reviewRow())
    else if (sql.startsWith("insert into publication_queue"))
      this.database.publicationQueue.set(String(this.values[0]), this.publicationRow())
    else if (sql.startsWith("insert into content_audit_events")) this.database.auditEvents.push(this.auditRow())
    else if (sql.startsWith("delete from internal_links")) this.deleteInternalLinks()
    else if (sql.startsWith("insert into internal_links")) this.database.internalLinks.push(this.internalLinkRow())
    else if (sql.startsWith("insert into tags")) this.database.tags.set(String(this.values[2]), this.taxonomyRow())
    else if (sql.startsWith("insert into categories"))
      this.database.categories.set(String(this.values[2]), this.taxonomyRow())
    return { success: true }
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

  private insertVersion(): void {
    this.database.versions.push({
      id: this.values[0],
      content_id: this.values[1],
      version_number: this.values[2],
      title: this.values[3],
      body: this.values[4],
      metadata_json: this.values[5],
      created_by: this.values[6],
      created_at: this.values[7]
    })
  }

  private queueRow(type: "editorial"): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      priority: this.values[3],
      assigned_to: this.values[4],
      due_at: this.values[5],
      created_at: this.values[6],
      updated_at: this.values[7],
      queue_type: type
    }
  }

  private reviewRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      reviewer: this.values[3],
      decision: this.values[4],
      notes: this.values[5],
      created_at: this.values[6],
      updated_at: this.values[7]
    }
  }

  private publicationRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      targets_json: this.values[3],
      scheduled_at: this.values[4],
      created_at: this.values[5],
      updated_at: this.values[6]
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

  private deleteInternalLinks(): void {
    const contentId = String(this.values[0])
    this.database.internalLinks = this.database.internalLinks.filter((row) => row.source_content_id !== contentId)
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

  private taxonomyRow(): Row {
    return { id: this.values[0], name: this.values[1], slug: this.values[2], created_at: this.values[3] }
  }
}

class MemoryD1 implements D1Database {
  readonly content = new Map<string, Row>()
  readonly versions: Row[] = []
  readonly editorialQueue = new Map<string, Row>()
  readonly reviewQueue = new Map<string, Row>()
  readonly publicationQueue = new Map<string, Row>()
  internalLinks: Row[] = []
  readonly tags = new Map<string, Row>()
  readonly categories = new Map<string, Row>()
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
    DB: new MemoryD1(),
    CACHE: new MemoryKv(),
    AUTHORITY_QUEUE: new MemoryQueue(),
    ...overrides
  }
}

function contentInput(overrides: Partial<CreateContentInput> = {}): CreateContentInput {
  return {
    title: "Why AI Is Not Recommending Your Dubai Business",
    slug: "why-ai-not-recommending-dubai-business",
    contentType: "Authority Article",
    language: "en",
    canonicalUrl: "https://www.vistabylara.com/knowledge/why-ai-not-recommending-dubai-business",
    targetKeyword: "AI visibility Dubai",
    entities: ["Vista by Lara", "Dubai", "UAE", "Generative Engine Optimization"],
    internalLinks: [{ targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }],
    schemaType: "TechArticle",
    readingTimeMinutes: 8,
    wordCount: 1600,
    seoMetadata: {
      title: "AI Visibility Dubai | Vista by Lara",
      description:
        "Learn why AI systems may not recommend your Dubai business and how Vista by Lara fixes authority signals."
    },
    aiSummary: "A Dubai-focused authority article about AI visibility gaps.",
    publishingTargets: ["website"],
    body: "Dubai businesses need structured authority signals before AI systems can recommend them.",
    ...overrides
  }
}

function createService(db: MemoryD1): ContentPipelineService {
  const config = loadConfig(createEnv({ DB: db }))
  return new ContentPipelineService(
    new ContentRepository(db),
    new ContentVersionRepository(db),
    new EditorialQueueRepository(db),
    new ReviewQueueRepository(db),
    new PublicationQueueRepository(db),
    new InternalLinkRepository(db),
    new ContentAuditRepository(db),
    new Logger(config)
  )
}

describe("content migration", () => {
  it("creates every required content pipeline table", () => {
    const sql = readFileSync(resolve("migrations/0002_content_repository.sql"), "utf8")

    for (const table of [
      "content",
      "content_versions",
      "content_templates",
      "editorial_queue",
      "review_queue",
      "publication_queue",
      "tags",
      "categories",
      "internal_links"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("content workflow", () => {
  it("validates lifecycle transitions and action targets", () => {
    expect(() => {
      assertValidTransition("DISCOVERED", "APPROVED")
    }).not.toThrow()
    expect(() => {
      assertValidTransition("DISCOVERED", "PUBLISHED")
    }).toThrow("Cannot transition")
    expect(approvalTarget("DISCOVERED")).toBe("APPROVED")
    expect(approvalTarget("REVIEW_REQUIRED")).toBe("APPROVED_FOR_PUBLISHING")
    expect(rejectionTarget("GENERATED")).toBe("PLANNED")
  })

  it("validates supported content input", () => {
    expect(validateCreateContentInput(contentInput()).contentType).toBe("Authority Article")
    expect(() => validateCreateContentInput({ ...contentInput(), contentType: "Audio Brief" })).toThrow("contentType")
  })
})

describe("content repositories and service", () => {
  it("persists content, versions, queues, links, taxonomy, and audit events", async () => {
    const db = new MemoryD1()
    const service = createService(db)

    const created = await service.createContent(contentInput(), "editor", "req-1")
    const updated = await service.updateContent(
      created.id,
      { title: "Updated Dubai AI Visibility Guide" },
      "editor",
      "req-2"
    )
    const restored = await service.rollbackContent(created.id, 1, "editor", "req-3")
    await new TagRepository(db).upsert({
      id: "tag-1",
      name: "AI Visibility",
      slug: "ai-visibility",
      createdAt: "2026-06-30T00:00:00.000Z"
    })
    await new CategoryRepository(db).upsert({
      id: "cat-1",
      name: "GEO",
      slug: "geo",
      createdAt: "2026-06-30T00:00:00.000Z"
    })

    expect(updated.currentVersion).toBe(2)
    expect(restored.currentVersion).toBe(3)
    expect(db.versions).toHaveLength(3)
    expect(db.editorialQueue.size).toBe(1)
    expect(db.internalLinks).toHaveLength(1)
    expect(db.auditEvents.map((row) => row.action)).toContain("content.rolled_back")
    expect(db.tags.get("ai-visibility")?.name).toBe("AI Visibility")
    expect(db.categories.get("geo")?.name).toBe("GEO")
  })

  it("approves, rejects, and schedules with valid workflow constraints", async () => {
    const db = new MemoryD1()
    const service = createService(db)
    const created = await service.createContent(contentInput(), "editor", "req-1")
    const approved = await service.approveContent(created.id, "editor", "req-2")

    expect(approved.status).toBe("APPROVED")
    await expect(
      service.scheduleContent(created.id, "2026-07-01T08:00:00.000Z", ["website"], "editor", "req-3")
    ).rejects.toThrow("approved for publishing")

    const reviewReady = await service.createContent(
      contentInput({ slug: "review-ready", status: "REVIEW_REQUIRED" }),
      "editor",
      "req-4"
    )
    const publishReady = await service.approveContent(reviewReady.id, "editor", "req-5")
    const queued = await service.scheduleContent(
      publishReady.id,
      "2026-07-01T08:00:00.000Z",
      ["website"],
      "editor",
      "req-6"
    )
    const generated = await service.createContent(
      contentInput({ slug: "generated-content", status: "GENERATED" }),
      "editor",
      "req-7"
    )
    const rejected = await service.rejectContent(generated.id, "reviewer", "req-8", "Needs stronger UAE proof.")

    expect(queued.status).toBe("scheduled")
    expect(rejected.status).toBe("PLANNED")
    expect(db.publicationQueue.size).toBe(1)
    expect(db.reviewQueue.size).toBe(1)
  })
})

describe("content REST API", () => {
  it("serves content, workflow, editorial queue, and publication queue endpoints", async () => {
    const env = createEnv()
    const headers = { "x-api-key": "secret", "content-type": "application/json", "x-request-id": "req-content" }
    const createResponse = await worker.fetch(
      new Request("https://worker.test/content", {
        method: "POST",
        headers,
        body: JSON.stringify(contentInput({ status: "REVIEW_REQUIRED" }))
      }),
      env,
      { waitUntil: () => undefined }
    )
    const createBody = (await createResponse.json()) as { data: { content: ContentRecord } }
    const contentId = createBody.data.content.id
    const listResponse = await worker.fetch(new Request("https://worker.test/content", { headers }), env, {
      waitUntil: () => undefined
    })
    const detailResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}`, { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const updateResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ aiSummary: "Updated AI summary for Dubai authority." })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const approveResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}/approve`, { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const scheduleResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}/schedule`, {
        method: "POST",
        headers,
        body: JSON.stringify({ scheduledAt: "2026-07-01T08:00:00.000Z", targets: ["website"] })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const publicationResponse = await worker.fetch(
      new Request("https://worker.test/publication/queue", { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const editorialResponse = await worker.fetch(new Request("https://worker.test/editorial/queue", { headers }), env, {
      waitUntil: () => undefined
    })
    const rollbackResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}/rollback`, {
        method: "POST",
        headers,
        body: JSON.stringify({ versionNumber: 1 })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const deleteResponse = await worker.fetch(
      new Request(`https://worker.test/content/${contentId}`, { method: "DELETE", headers }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const denied = await worker.fetch(new Request("https://worker.test/content"), env, { waitUntil: () => undefined })
    const scheduleBody = (await scheduleResponse.json()) as { data: { publication: PublicationQueueRecord } }

    expect(createResponse.status).toBe(201)
    expect(listResponse.status).toBe(200)
    expect(detailResponse.status).toBe(200)
    expect(updateResponse.status).toBe(200)
    expect(approveResponse.status).toBe(200)
    expect(scheduleResponse.status).toBe(201)
    expect(scheduleBody.data.publication.targets).toEqual(["website"])
    expect(publicationResponse.status).toBe(200)
    expect(editorialResponse.status).toBe(200)
    expect(rollbackResponse.status).toBe(200)
    expect(deleteResponse.status).toBe(200)
    expect(denied.status).toBe(401)
  })
})
