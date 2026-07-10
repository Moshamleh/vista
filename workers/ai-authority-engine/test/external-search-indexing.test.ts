import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import worker from "../src/index"
import { type AppBindings, loadConfig } from "../src/config/env"
import { ContentRepository } from "../src/domains/content-pipeline/repositories"
import type { ContentRecord } from "../src/domains/content-pipeline/types"
import {
  BingWebmasterToolsProvider,
  ExternalSearchProviderRegistry,
  GoogleSearchConsoleProvider,
  IndexNowSubmissionProvider,
  createExternalSearchProviderRegistry
} from "../src/domains/external-search-indexing/providers"
import {
  checksum,
  generateSearchResources,
  validateLlms,
  validateRobots,
  validateSitemap
} from "../src/domains/external-search-indexing/resources"
import {
  BingImportRepository,
  IndexingJobRepository,
  IndexingResultRepository,
  LlmsVersionRepository,
  RobotsVersionRepository,
  SearchConsoleImportRepository,
  SitemapVersionRepository
} from "../src/domains/external-search-indexing/repositories"
import { ExternalSearchIndexingService } from "../src/domains/external-search-indexing/service"
import type {
  BingImportRecord,
  IndexingJobRecord,
  IndexingResultRecord,
  ResourceVersionRecord,
  SearchConsoleImportRecord,
  SitemapVersionRecord
} from "../src/domains/external-search-indexing/types"
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
    if (sql.includes("from content where id"))
      return (this.database.content.get(String(this.values[0])) as T | undefined) ?? null
    if (sql.includes("from search_console_imports"))
      return (this.sorted(this.database.searchConsoleImports, "imported_at")[0] as T | undefined) ?? null
    if (sql.includes("from bing_imports"))
      return (this.sorted(this.database.bingImports, "imported_at")[0] as T | undefined) ?? null
    if (sql.includes("from sitemap_versions"))
      return (this.sorted(this.database.sitemaps, "version")[0] as T | undefined) ?? null
    if (sql.includes("from robots_versions"))
      return (this.sorted(this.database.robots, "version")[0] as T | undefined) ?? null
    if (sql.includes("from llms_versions"))
      return (this.sorted(this.database.llms, "version")[0] as T | undefined) ?? null
    return null
  }

  async all<T>(): Promise<{ results: T[]; success: boolean; error?: string }> {
    const sql = this.query.toLowerCase()
    if (sql.includes("from content order"))
      return { results: this.sorted(this.database.content.values(), "updated_at") as T[], success: true }
    if (sql.includes("from indexing_jobs"))
      return { results: this.sorted(this.database.jobs.values(), "updated_at") as T[], success: true }
    if (sql.includes("from indexing_results")) {
      return { results: this.database.results.filter((row) => row.job_id === this.values[0]) as T[], success: true }
    }
    return { results: [], success: true }
  }

  async run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }> {
    const sql = this.query.toLowerCase()
    if (sql.startsWith("insert into indexing_jobs")) this.database.jobs.set(String(this.values[0]), this.jobRow())
    else if (sql.startsWith("update indexing_jobs")) this.updateJob()
    else if (sql.startsWith("insert into indexing_results")) this.database.results.push(this.resultRow())
    else if (sql.startsWith("insert into search_console_imports"))
      this.database.searchConsoleImports.push(this.searchConsoleRow())
    else if (sql.startsWith("insert into bing_imports")) this.database.bingImports.push(this.bingRow())
    else if (sql.startsWith("insert into sitemap_versions")) this.database.sitemaps.push(this.sitemapRow())
    else if (sql.startsWith("insert into robots_versions")) this.database.robots.push(this.resourceRow())
    else if (sql.startsWith("insert into llms_versions")) this.database.llms.push(this.resourceRow())
    return { success: true }
  }

  private sorted(values: Iterable<Row>, field: string): Row[] {
    return Array.from(values).sort((left, right) => String(right[field]).localeCompare(String(left[field])))
  }

  private jobRow(): Row {
    return {
      id: this.values[0],
      job_type: this.values[1],
      status: this.values[2],
      urls_json: this.values[3],
      provider: this.values[4],
      attempt_count: this.values[5],
      created_at: this.values[6],
      updated_at: this.values[7]
    }
  }

  private updateJob(): void {
    const row = this.database.jobs.get(String(this.values[3]))
    if (!row) return
    row.status = this.values[0]
    row.attempt_count = this.values[1]
    row.updated_at = this.values[2]
  }

  private resultRow(): Row {
    return {
      id: this.values[0],
      job_id: this.values[1],
      provider: this.values[2],
      url: this.values[3],
      status: this.values[4],
      status_code: this.values[5],
      response_json: this.values[6],
      created_at: this.values[7]
    }
  }

  private searchConsoleRow(): Row {
    return {
      id: this.values[0],
      imported_at: this.values[1],
      site_url: this.values[2],
      verification_status: this.values[3],
      sitemap_status_json: this.values[4],
      analytics_json: this.values[5],
      crawl_errors_json: this.values[6]
    }
  }

  private bingRow(): Row {
    return {
      id: this.values[0],
      imported_at: this.values[1],
      site_url: this.values[2],
      sitemap_status_json: this.values[3],
      performance_json: this.values[4]
    }
  }

  private sitemapRow(): Row {
    return {
      id: this.values[0],
      version: this.values[1],
      sitemap_xml: this.values[2],
      sitemap_index_xml: this.values[3],
      url_count: this.values[4],
      checksum: this.values[5],
      created_at: this.values[6]
    }
  }

  private resourceRow(): Row {
    return {
      id: this.values[0],
      version: this.values[1],
      body: this.values[2],
      checksum: this.values[3],
      created_at: this.values[4]
    }
  }
}

class MemoryD1 implements D1Database {
  readonly content = new Map<string, Row>()
  readonly jobs = new Map<string, Row>()
  readonly results: Row[] = []
  readonly searchConsoleImports: Row[] = []
  readonly bingImports: Row[] = []
  readonly sitemaps: Row[] = []
  readonly robots: Row[] = []
  readonly llms: Row[] = []

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
    GOOGLE_SEARCH_CONSOLE_ENDPOINT: "https://searchconsole.test",
    GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN: "gsc-token",
    GOOGLE_SEARCH_CONSOLE_SITE_URL: "https://www.vistabylara.com",
    BING_WEBMASTER_ENDPOINT: "https://bing.test",
    BING_WEBMASTER_API_KEY: "bing-key",
    INDEXNOW_ENDPOINT: "https://indexnow.test/indexnow",
    INDEXNOW_KEY: "indexnow-key",
    INDEXNOW_KEY_LOCATION: "https://www.vistabylara.com/indexnow-key.txt",
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
    seoMetadata: { title: "AI Visibility Dubai | Vista", description: "Dubai AI visibility authority guide." },
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

function localFetch(): typeof fetch {
  return async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url
    if (url.includes("indexnow")) return new Response(JSON.stringify({ submitted: true }), { status: 202 })
    if (url.includes("searchconsole"))
      return new Response(JSON.stringify({ site: "verified", rows: [] }), { status: 200 })
    if (url.includes("bing")) return new Response(JSON.stringify({ ok: true, rows: [] }), { status: 200 })
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }
}

function createService(db: MemoryD1, fetcher: typeof fetch = localFetch()): ExternalSearchIndexingService {
  const config = loadConfig(createEnv({ DB: db }))
  const registry = new ExternalSearchProviderRegistry()
  registry.register(
    new GoogleSearchConsoleProvider(config.googleSearchConsoleEndpoint, config.googleSearchConsoleAccessToken, fetcher)
  )
  registry.register(new BingWebmasterToolsProvider(config.bingWebmasterEndpoint, config.bingWebmasterApiKey, fetcher))
  registry.register(
    new IndexNowSubmissionProvider(config.indexNowEndpoint, config.indexNowKey, config.indexNowKeyLocation, fetcher)
  )
  return new ExternalSearchIndexingService(
    registry,
    new ContentRepository(db),
    new IndexingJobRepository(db),
    new IndexingResultRepository(db),
    new SearchConsoleImportRepository(db),
    new BingImportRepository(db),
    new SitemapVersionRepository(db),
    new RobotsVersionRepository(db),
    new LlmsVersionRepository(db),
    config.publisherWebsiteBaseUrl,
    config.googleSearchConsoleSiteUrl,
    new Logger(config)
  )
}

describe("external search indexing migration", () => {
  it("creates every Phase 9 table", () => {
    const sql = readFileSync(resolve("migrations/0007_external_search_indexing.sql"), "utf8")

    for (const table of [
      "indexing_jobs",
      "indexing_results",
      "search_console_imports",
      "bing_imports",
      "sitemap_versions",
      "robots_versions",
      "llms_versions"
    ]) {
      expect(sql).toContain(`create table if not exists ${table}`)
    }
  })
})

describe("external search resource generation", () => {
  it("generates valid sitemap, RSS, robots, llms, and AI discovery resources", async () => {
    const resources = generateSearchResources({
      websiteBaseUrl: "https://www.vistabylara.com",
      content: [contentRecord()],
      generatedAt: "2026-07-01T00:00:00.000Z"
    })

    expect(validateSitemap(resources.sitemapXml).valid).toBe(true)
    expect(validateRobots(resources.robotsTxt).valid).toBe(true)
    expect(validateLlms(resources.llmsTxt).valid).toBe(true)
    expect(resources.rssXml).toContain("<rss")
    expect(resources.aiDiscoveryJson).toContain("Vista by Lara")
    expect(await checksum(resources.sitemapXml)).toHaveLength(64)
  })
})

describe("external search providers", () => {
  it("submits and imports through replaceable official API adapters", async () => {
    const fetcher = localFetch()
    const gsc = new GoogleSearchConsoleProvider("https://searchconsole.test", "token", fetcher)
    const bing = new BingWebmasterToolsProvider("https://bing.test", "key", fetcher)
    const indexNow = new IndexNowSubmissionProvider(
      "https://indexnow.test/indexnow",
      "key",
      "https://www.vistabylara.com/key.txt",
      fetcher
    )

    expect((await gsc.getStatus("https://www.vistabylara.com")).statusCode).toBe(200)
    expect((await gsc.importAnalytics("https://www.vistabylara.com")).verificationStatus).toBe("verified")
    expect((await bing.getStatus("https://www.vistabylara.com")).statusCode).toBe(200)
    expect((await bing.importPerformance("https://www.vistabylara.com")).performance.statusCode).toBe(200)
    expect(
      (await indexNow.submitUrls(["https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide"]))[0]?.accepted
    ).toBe(true)
    expect(createExternalSearchProviderRegistry(loadConfig(createEnv())).list()).toHaveLength(3)
  })
})

describe("external search repositories and service", () => {
  it("stores jobs, results, provider imports, and resource versions", async () => {
    const db = new MemoryD1()
    const timestamp = "2026-07-01T00:00:00.000Z"
    const job: IndexingJobRecord = {
      id: "job-1",
      jobType: "batch",
      status: "running",
      urls: ["https://www.vistabylara.com/a"],
      provider: "indexnow",
      attemptCount: 1,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const result: IndexingResultRecord = {
      id: "result-1",
      jobId: "job-1",
      provider: "indexnow",
      url: "https://www.vistabylara.com/a",
      status: "accepted",
      statusCode: 202,
      response: { submitted: true },
      createdAt: timestamp
    }
    const searchConsole: SearchConsoleImportRecord = {
      id: "gsc-1",
      importedAt: timestamp,
      siteUrl: "https://www.vistabylara.com",
      verificationStatus: "verified",
      sitemapStatus: {},
      analytics: {},
      crawlErrors: {}
    }
    const bing: BingImportRecord = {
      id: "bing-1",
      importedAt: timestamp,
      siteUrl: "https://www.vistabylara.com",
      sitemapStatus: {},
      performance: {}
    }
    const sitemap: SitemapVersionRecord = {
      id: "sitemap-1",
      version: 1,
      body: "<urlset><url><loc>https://www.vistabylara.com</loc></url></urlset>",
      sitemapIndexXml: "<sitemapindex />",
      urlCount: 1,
      checksum: "abc",
      createdAt: timestamp
    }
    const resource: ResourceVersionRecord = {
      id: "resource-1",
      version: 1,
      body: "User-agent: *",
      checksum: "abc",
      createdAt: timestamp
    }

    await new IndexingJobRepository(db).create(job)
    await new IndexingJobRepository(db).update({ ...job, status: "succeeded" })
    await new IndexingResultRepository(db).createMany([result])
    await new SearchConsoleImportRepository(db).create(searchConsole)
    await new BingImportRepository(db).create(bing)
    await new SitemapVersionRepository(db).create(sitemap)
    await new RobotsVersionRepository(db).create(resource)
    await new LlmsVersionRepository(db).create(resource)

    expect((await new IndexingJobRepository(db).list(10))[0]?.status).toBe("succeeded")
    expect(await new IndexingResultRepository(db).listForJob("job-1")).toHaveLength(1)
    expect((await new SearchConsoleImportRepository(db).latest())?.verificationStatus).toBe("verified")
    expect((await new BingImportRepository(db).latest())?.performance).toEqual({})
    expect((await new SitemapVersionRepository(db).latest())?.urlCount).toBe(1)
    expect((await new RobotsVersionRepository(db).latest())?.version).toBe(1)
    expect((await new LlmsVersionRepository(db).latest())?.version).toBe(1)
  })

  it("submits URLs, generates resources, and runs scheduled indexing tasks", async () => {
    const db = new MemoryD1()
    seedContent(db)
    const service = createService(db)

    await service.submit("https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide", "indexnow", "req-1")
    await service.generateSitemap("req-2")
    await service.generateRobots()
    await service.generateLlms()
    await service.runScheduled("req-3")
    const status = await service.status()

    expect(db.jobs.size).toBe(2)
    expect(db.results.length).toBeGreaterThan(1)
    expect(status.latestSitemap?.version).toBe(2)
    expect(status.latestRobots?.version).toBe(2)
    expect(status.latestLlms?.version).toBe(2)
    expect(status.latestSearchConsoleImport?.verificationStatus).toBe("verified")
    expect(status.latestBingImport?.performance.statusCode).toBe(200)
  })
})

describe("external search REST API and scheduler", () => {
  it("serves every Phase 9 endpoint", async () => {
    globalThis.fetch = localFetch()
    const env = createEnv()
    seedContent(env.DB as MemoryD1)
    const headers = { "x-api-key": "secret", "content-type": "application/json" }

    const submit = await worker.fetch(
      new Request("https://worker.test/index/submit", {
        method: "POST",
        headers,
        body: JSON.stringify({
          url: "https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide",
          provider: "indexnow"
        })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const batch = await worker.fetch(
      new Request("https://worker.test/index/batch", {
        method: "POST",
        headers,
        body: JSON.stringify({
          urls: ["https://www.vistabylara.com/knowledge/ai-visibility-dubai-guide"],
          provider: "indexnow"
        })
      }),
      env,
      { waitUntil: () => undefined }
    )
    const indexStatus = await worker.fetch(new Request("https://worker.test/index/status", { headers }), env, {
      waitUntil: () => undefined
    })
    const searchConsole = await worker.fetch(
      new Request("https://worker.test/search-console/status", { headers }),
      env,
      { waitUntil: () => undefined }
    )
    const bing = await worker.fetch(new Request("https://worker.test/bing/status", { headers }), env, {
      waitUntil: () => undefined
    })
    const sitemap = await worker.fetch(
      new Request("https://worker.test/sitemap/generate", { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const robots = await worker.fetch(
      new Request("https://worker.test/robots/generate", { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const llms = await worker.fetch(
      new Request("https://worker.test/llms/generate", { method: "POST", headers, body: "{}" }),
      env,
      {
        waitUntil: () => undefined
      }
    )
    const denied = await worker.fetch(new Request("https://worker.test/index/status"), env, {
      waitUntil: () => undefined
    })

    expect(submit.status).toBe(201)
    expect(batch.status).toBe(201)
    expect(indexStatus.status).toBe(200)
    expect(searchConsole.status).toBe(200)
    expect(bing.status).toBe(200)
    expect(sitemap.status).toBe(201)
    expect(robots.status).toBe(201)
    expect(llms.status).toBe(201)
    expect(denied.status).toBe(401)
  })

  it("runs scheduled external indexing through Wrangler cron configuration", async () => {
    globalThis.fetch = localFetch()
    const promises: Promise<unknown>[] = []
    const env = createEnv({ EXTERNAL_INDEXING_CRON_ENABLED: "true" })
    seedContent(env.DB as MemoryD1)
    const context: ExecutionContext = {
      waitUntil(promise: Promise<unknown>) {
        promises.push(promise)
      }
    }

    worker.scheduled({ cron: "*/15 * * * *", scheduledTime: Date.now() }, env, context)
    await Promise.all(promises)

    expect((env.DB as MemoryD1).sitemaps).toHaveLength(1)
    expect((env.DB as MemoryD1).jobs.size).toBe(1)
    expect((env.DB as MemoryD1).searchConsoleImports).toHaveLength(1)
    expect((env.DB as MemoryD1).bingImports).toHaveLength(1)
  })

  it("publishes Phase 9 endpoints in OpenAPI", () => {
    const paths = generateOpenApi(loadConfig(createEnv()), "https://worker.test").paths as Record<string, unknown>

    expect(paths["/index/submit"]).toBeDefined()
    expect(paths["/llms/generate"]).toBeDefined()
  })
})
