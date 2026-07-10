import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import worker from "../src/index"
import { type AppBindings } from "../src/config/env"
import { ContentRepository } from "../src/domains/content-pipeline/repositories"
import type { ContentRecord } from "../src/domains/content-pipeline/types"
import { generateAiResources } from "../src/domains/geo-optimization/ai-resources"
import { buildEntityGraph } from "../src/domains/geo-optimization/entity-graph"
import { recommendInternalLinks } from "../src/domains/geo-optimization/internal-linking"
import { generateGeoMetadata } from "../src/domains/geo-optimization/metadata-engine"
import {
  EntityGraphRepository,
  GeoReportRepository,
  InternalLinkGraphRepository,
  OptimizationHistoryRepository,
  SchemaDocumentRepository
} from "../src/domains/geo-optimization/repositories"
import { generateSchemaDocuments } from "../src/domains/geo-optimization/schema-engine"
import { GeoOptimizationService } from "../src/domains/geo-optimization/service"
import type {
  EntityGraphRecord,
  GeoReportRecord,
  InternalLinkGraphRecord,
  SchemaDocumentRecord
} from "../src/domains/geo-optimization/types"
import { checksum } from "../src/domains/geo-optimization/utils"
import { validateGeoReadiness } from "../src/domains/geo-optimization/validation"
import { Logger } from "../src/logger/logger"
import type { D1Database, D1PreparedStatement, KVNamespace, Queue } from "../src/types/cloudflare"
import { loadConfig } from "../src/config/env"

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
    if (sql.includes("from content where id"))
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from geo_reports"))
      return (this.database.reports.get(String(this.values[0])) as T | undefined) ?? null
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    if (sql.includes("from content order"))
      return { results: Array.from(this.database.content.values()) as T[], success: true }
    if (sql.includes("from entity_graph"))
      return { results: Array.from(this.database.entities.values()) as T[], success: true }
    if (sql.includes("from schema_documents")) {
      const contentId = String(this.values[0])
      return { results: this.database.schemas.filter((row) => row.content_id === contentId) as T[], success: true }
    }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into entity_graph")) this.database.entities.set(String(this.values[3]), this.entityRow())
    else if (sql.startsWith("delete from schema_documents"))
      this.database.schemas = this.database.schemas.filter((row) => row.content_id !== this.values[0])
    else if (sql.startsWith("insert into schema_documents")) this.database.schemas.push(this.schemaRow())
    else if (sql.startsWith("insert into geo_reports"))
      this.database.reports.set(String(this.values[1]), this.reportRow())
    else if (sql.startsWith("delete from internal_link_graph"))
      this.database.links = this.database.links.filter((row) => row.source_content_id !== this.values[0])
    else if (sql.startsWith("insert into internal_link_graph")) this.database.links.push(this.linkRow())
    else if (sql.startsWith("insert into optimization_history")) this.database.history.push(this.historyRow())
    return { success: true }
  }

  private entityRow(): Row {
    return {
      id: this.values[0],
      entity_type: this.values[1],
      name: this.values[2],
      slug: this.values[3],
      synonyms_json: this.values[4],
      relationships_json: this.values[5],
      confidence_score: this.values[6],
      source_content_ids_json: this.values[7],
      created_at: this.values[8],
      updated_at: this.values[9]
    }
  }

  private schemaRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      schema_type: this.values[2],
      json_ld: this.values[3],
      checksum: this.values[4],
      created_at: this.values[5],
      updated_at: this.values[6]
    }
  }

  private reportRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      status: this.values[2],
      score: this.values[3],
      validation_json: this.values[4],
      metadata_json: this.values[5],
      ai_resources_json: this.values[6],
      created_at: this.values[7],
      updated_at: this.values[8]
    }
  }

  private linkRow(): Row {
    return {
      id: this.values[0],
      source_content_id: this.values[1],
      target_content_id: this.values[2],
      relation_type: this.values[3],
      anchor_text: this.values[4],
      confidence_score: this.values[5],
      created_at: this.values[6]
    }
  }

  private historyRow(): Row {
    return {
      id: this.values[0],
      content_id: this.values[1],
      action: this.values[2],
      score: this.values[3],
      details_json: this.values[4],
      created_at: this.values[5]
    }
  }
}

class MemoryD1 implements D1Database {
  readonly content = new Map<string, Row>()
  readonly entities = new Map<string, Row>()
  schemas: Row[] = []
  readonly reports = new Map<string, Row>()
  links: Row[] = []
  readonly history: Row[] = []

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
    canonicalUrl: null,
    targetKeyword: "AI visibility Dubai",
    entities: ["Vista by Lara", "Dubai", "UAE", "AI Visibility"],
    internalLinks: [{ targetUrl: "https://www.vistabylara.com/ai", anchorText: "AI authority engineering" }],
    schemaType: "TechArticle",
    readingTimeMinutes: 8,
    wordCount: 1500,
    seoMetadata: {
      title: "AI Visibility Dubai | Vista",
      description: "Dubai AI visibility authority guide for UAE brands."
    },
    aiSummary: "Dubai-focused guide for AI visibility and entity confidence.",
    publishingTargets: ["website"],
    body: "# AI Visibility Dubai Guide\n\n## Why does AI visibility matter?\nDubai brands need structured entities, schema, and canonical authority.",
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

function createService(db: MemoryD1): GeoOptimizationService {
  const config = loadConfig(createEnv({ DB: db }))
  return new GeoOptimizationService(
    new ContentRepository(db),
    new EntityGraphRepository(db),
    new SchemaDocumentRepository(db),
    new GeoReportRepository(db),
    new InternalLinkGraphRepository(db),
    new OptimizationHistoryRepository(db),
    config.publisherWebsiteBaseUrl,
    new Logger(config)
  )
}

describe("GEO migration", () => {
  it("creates every GEO optimization table", () => {
    const sql = readFileSync(resolve("migrations/0005_geo_ai_optimization.sql"), "utf8")

    for (const table of [
      "entity_graph",
      "schema_documents",
      "geo_reports",
      "internal_link_graph",
      "optimization_history"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("GEO engines", () => {
  it("builds entity graph, metadata, schemas, AI resources, and links", async () => {
    const content = contentRecord()
    const related = [
      contentRecord({ id: "content-2", title: "Dubai AI FAQ", slug: "dubai-ai-faq", contentType: "FAQ" }),
      contentRecord({
        id: "content-3",
        title: "AI Automation Service",
        slug: "ai-automation-service",
        contentType: "Service Page"
      })
    ]
    const entities = buildEntityGraph(content, related)
    const schemas = await generateSchemaDocuments(
      content,
      "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
      entities
    )
    const metadata = generateGeoMetadata(
      content,
      "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
      entities
    )
    const resources = generateAiResources(content, metadata.canonicalUrl, entities, schemas)
    const links = recommendInternalLinks(content, related)
    const validation = validateGeoReadiness({
      content,
      canonicalUrl: metadata.canonicalUrl,
      entities,
      schemas,
      metadata,
      links
    })

    expect(entities.map((entity) => entity.name)).toContain("Dubai")
    expect(schemas.map((schema) => schema.schemaType)).toContain("Article")
    expect(metadata.hreflang[0]?.language).toBe("en-AE")
    expect(resources.llmsTxt).toContain("Vista by Lara")
    expect(links.length).toBeGreaterThan(0)
    expect(validation.aiRetrievalReady).toBe(true)
    expect(await checksum(JSON.stringify(schemas[0]?.jsonLd))).toHaveLength(64)
  })
})

describe("GEO repositories and service", () => {
  it("optimizes content and persists reports, schema, entities, links, and history", async () => {
    const db = new MemoryD1()
    seedContent(db)
    seedContent(db, contentRecord({ id: "content-2", slug: "ai-faq", title: "AI FAQ", contentType: "FAQ" }))
    const service = createService(db)

    const result = await service.optimize("content-1", "req-1")
    const report = await service.getReport("content-1", "req-2")
    const schema = await service.getSchema("content-1")
    const entities = await service.listEntities(20)
    const validation = await service.validate("content-1")

    expect(result.report.status).toBe("optimized")
    expect(report.score).toBeGreaterThan(0.7)
    expect(schema.length).toBeGreaterThan(4)
    expect(entities.length).toBeGreaterThan(0)
    expect(validation.schemaComplete).toBe(true)
    expect(db.links.length).toBeGreaterThan(0)
    expect(db.history).toHaveLength(1)
  })

  it("stores records through every GEO repository", async () => {
    const db = new MemoryD1()
    const timestamp = "2026-06-30T00:00:00.000Z"
    const entity: EntityGraphRecord = {
      id: "entity-1",
      entityType: "Organization",
      name: "Vista by Lara",
      slug: "vista-by-lara",
      synonyms: ["Vista"],
      relationships: [],
      confidenceScore: 1,
      sourceContentIds: ["content-1"],
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const schema: SchemaDocumentRecord = {
      id: "schema-1",
      contentId: "content-1",
      schemaType: "Organization",
      jsonLd: { "@type": "Organization", name: "Vista by Lara" },
      checksum: "abc",
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const report: GeoReportRecord = {
      id: "report-1",
      contentId: "content-1",
      status: "optimized",
      score: 1,
      validation: {
        score: 1,
        errors: [],
        warnings: [],
        schemaComplete: true,
        entityCoverage: 1,
        canonicalCorrect: true,
        metadataQuality: 1,
        internalLinkQuality: 1,
        aiRetrievalReady: true
      },
      metadata: generateGeoMetadata(
        contentRecord(),
        "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
        [entity]
      ),
      aiResources: generateAiResources(
        contentRecord(),
        "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
        [entity],
        [schema]
      ),
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const link: InternalLinkGraphRecord = {
      id: "link-1",
      sourceContentId: "content-1",
      targetContentId: "content-2",
      relationType: "entity-link",
      anchorText: "AI FAQ",
      confidenceScore: 0.9,
      createdAt: timestamp
    }

    await new EntityGraphRepository(db).upsertMany([entity])
    await new SchemaDocumentRepository(db).replaceForContent("content-1", [schema])
    await new GeoReportRepository(db).upsert(report)
    await new InternalLinkGraphRepository(db).replaceForContent("content-1", [link])
    await new OptimizationHistoryRepository(db).create({
      id: "hist-1",
      contentId: "content-1",
      action: "geo.optimized",
      score: 1,
      details: {},
      createdAt: timestamp
    })

    expect(await new EntityGraphRepository(db).list(10)).toHaveLength(1)
    expect(await new SchemaDocumentRepository(db).listForContent("content-1")).toHaveLength(1)
    expect((await new GeoReportRepository(db).findByContentId("content-1"))?.status).toBe("optimized")
    expect(db.links).toHaveLength(1)
    expect(db.history).toHaveLength(1)
  })
})

describe("GEO REST API", () => {
  it("serves every GEO endpoint", async () => {
    const env = createEnv()
    seedContent(env.DB as MemoryD1)
    seedContent(
      env.DB as MemoryD1,
      contentRecord({ id: "content-2", slug: "ai-service", title: "AI Service", contentType: "Service Page" })
    )
    const headers = { "x-api-key": "secret", "content-type": "application/json" }

    const optimize = await worker.fetch(
      new Request("https://worker.test/geo/optimize/content-1", { method: "POST", headers, body: "{}" }),
      env,
      { waitUntil: () => undefined }
    )
    const status = await worker.fetch(new Request("https://worker.test/geo/status", { headers }), env, {
      waitUntil: () => undefined
    })
    const entities = await worker.fetch(new Request("https://worker.test/geo/entities", { headers }), env, {
      waitUntil: () => undefined
    })
    const schema = await worker.fetch(new Request("https://worker.test/geo/schema/content-1", { headers }), env, {
      waitUntil: () => undefined
    })
    const validate = await worker.fetch(
      new Request("https://worker.test/geo/validate/content-1", { method: "POST", headers, body: "{}" }),
      env,
      { waitUntil: () => undefined }
    )
    const report = await worker.fetch(new Request("https://worker.test/geo/report/content-1", { headers }), env, {
      waitUntil: () => undefined
    })
    const denied = await worker.fetch(new Request("https://worker.test/geo/status"), env, {
      waitUntil: () => undefined
    })

    expect(optimize.status).toBe(201)
    expect(status.status).toBe(200)
    expect(entities.status).toBe(200)
    expect(schema.status).toBe(200)
    expect(validate.status).toBe(200)
    expect(report.status).toBe(200)
    expect(denied.status).toBe(401)
  })
})
