import type { D1Database } from "../../types/cloudflare"
import type {
  BingImportRecord,
  IndexingJobRecord,
  IndexingResultRecord,
  ResourceVersionRecord,
  SearchConsoleImportRecord,
  SitemapVersionRecord
} from "./types"

interface JobRow {
  id: string
  job_type: IndexingJobRecord["jobType"]
  status: IndexingJobRecord["status"]
  urls_json: string
  provider: IndexingJobRecord["provider"]
  attempt_count: number
  created_at: string
  updated_at: string
}

interface ResultRow {
  id: string
  job_id: string
  provider: IndexingResultRecord["provider"]
  url: string
  status: IndexingResultRecord["status"]
  status_code: number | null
  response_json: string
  created_at: string
}

interface SearchConsoleRow {
  id: string
  imported_at: string
  site_url: string
  verification_status: SearchConsoleImportRecord["verificationStatus"]
  sitemap_status_json: string
  analytics_json: string
  crawl_errors_json: string
}

interface BingRow {
  id: string
  imported_at: string
  site_url: string
  sitemap_status_json: string
  performance_json: string
}

interface SitemapRow {
  id: string
  version: number
  sitemap_xml: string
  sitemap_index_xml: string
  url_count: number
  checksum: string
  created_at: string
}

interface ResourceRow {
  id: string
  version: number
  body: string
  checksum: string
  created_at: string
}

/** Repository for indexing jobs. */
export class IndexingJobRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an indexing job. */
  async create(record: IndexingJobRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into indexing_jobs (id, job_type, status, urls_json, provider, attempt_count, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.jobType,
        record.status,
        JSON.stringify(record.urls),
        record.provider,
        record.attemptCount,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Indexing job create failed")
  }

  /** Updates job status and attempts. */
  async update(record: IndexingJobRecord): Promise<void> {
    const result = await this.db
      .prepare("update indexing_jobs set status = ?, attempt_count = ?, updated_at = ? where id = ?")
      .bind(record.status, record.attemptCount, record.updatedAt, record.id)
      .run()
    if (!result.success) throw new Error(result.error ?? "Indexing job update failed")
  }

  /** Lists recent jobs. */
  async list(limit: number): Promise<IndexingJobRecord[]> {
    const result = await this.db
      .prepare("select * from indexing_jobs order by updated_at desc limit ?")
      .bind(limit)
      .all<JobRow>()
    return result.results.map((row) => ({
      id: row.id,
      jobType: row.job_type,
      status: row.status,
      urls: JSON.parse(row.urls_json) as string[],
      provider: row.provider,
      attemptCount: row.attempt_count,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/** Repository for indexing submission results. */
export class IndexingResultRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates submission results. */
  async createMany(records: IndexingResultRecord[]): Promise<void> {
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into indexing_results (id, job_id, provider, url, status, status_code, response_json, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.jobId,
          record.provider,
          record.url,
          record.status,
          record.statusCode,
          JSON.stringify(record.response),
          record.createdAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Indexing result create failed")
    }
  }

  /** Lists submission results for a job. */
  async listForJob(jobId: string): Promise<IndexingResultRecord[]> {
    const result = await this.db
      .prepare("select * from indexing_results where job_id = ? order by created_at desc")
      .bind(jobId)
      .all<ResultRow>()
    return result.results.map((row) => ({
      id: row.id,
      jobId: row.job_id,
      provider: row.provider,
      url: row.url,
      status: row.status,
      statusCode: row.status_code,
      response: JSON.parse(row.response_json) as Record<string, unknown>,
      createdAt: row.created_at
    }))
  }
}

/** Repository for Search Console imports. */
export class SearchConsoleImportRepository {
  constructor(private readonly db: D1Database) {}

  /** Stores one Search Console import. */
  async create(record: SearchConsoleImportRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into search_console_imports (id, imported_at, site_url, verification_status, sitemap_status_json, analytics_json, crawl_errors_json) values (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.importedAt,
        record.siteUrl,
        record.verificationStatus,
        JSON.stringify(record.sitemapStatus),
        JSON.stringify(record.analytics),
        JSON.stringify(record.crawlErrors)
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Search Console import create failed")
  }

  /** Gets the latest Search Console import. */
  async latest(): Promise<SearchConsoleImportRecord | null> {
    const row = await this.db
      .prepare("select * from search_console_imports order by imported_at desc limit 1")
      .first<SearchConsoleRow>()
    return row
      ? {
          id: row.id,
          importedAt: row.imported_at,
          siteUrl: row.site_url,
          verificationStatus: row.verification_status,
          sitemapStatus: JSON.parse(row.sitemap_status_json) as Record<string, unknown>,
          analytics: JSON.parse(row.analytics_json) as Record<string, unknown>,
          crawlErrors: JSON.parse(row.crawl_errors_json) as Record<string, unknown>
        }
      : null
  }
}

/** Repository for Bing Webmaster Tools imports. */
export class BingImportRepository {
  constructor(private readonly db: D1Database) {}

  /** Stores one Bing import. */
  async create(record: BingImportRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into bing_imports (id, imported_at, site_url, sitemap_status_json, performance_json) values (?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.importedAt,
        record.siteUrl,
        JSON.stringify(record.sitemapStatus),
        JSON.stringify(record.performance)
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Bing import create failed")
  }

  /** Gets the latest Bing import. */
  async latest(): Promise<BingImportRecord | null> {
    const row = await this.db.prepare("select * from bing_imports order by imported_at desc limit 1").first<BingRow>()
    return row
      ? {
          id: row.id,
          importedAt: row.imported_at,
          siteUrl: row.site_url,
          sitemapStatus: JSON.parse(row.sitemap_status_json) as Record<string, unknown>,
          performance: JSON.parse(row.performance_json) as Record<string, unknown>
        }
      : null
  }
}

/** Repository for generated sitemap versions. */
export class SitemapVersionRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates a sitemap version. */
  async create(record: SitemapVersionRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into sitemap_versions (id, version, sitemap_xml, sitemap_index_xml, url_count, checksum, created_at) values (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.version,
        record.body,
        record.sitemapIndexXml,
        record.urlCount,
        record.checksum,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Sitemap version create failed")
  }

  /** Gets latest sitemap version. */
  async latest(): Promise<SitemapVersionRecord | null> {
    const row = await this.db
      .prepare("select * from sitemap_versions order by version desc limit 1")
      .first<SitemapRow>()
    return row
      ? {
          id: row.id,
          version: row.version,
          body: row.sitemap_xml,
          sitemapIndexXml: row.sitemap_index_xml,
          urlCount: row.url_count,
          checksum: row.checksum,
          createdAt: row.created_at
        }
      : null
  }
}

/** Repository for versioned robots.txt resources. */
export class RobotsVersionRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates a robots.txt version. */
  async create(record: ResourceVersionRecord): Promise<void> {
    const result = await this.db
      .prepare("insert into robots_versions (id, version, body, checksum, created_at) values (?, ?, ?, ?, ?)")
      .bind(record.id, record.version, record.body, record.checksum, record.createdAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Robots version create failed")
  }

  /** Gets latest robots.txt version. */
  async latest(): Promise<ResourceVersionRecord | null> {
    const row = await this.db
      .prepare("select * from robots_versions order by version desc limit 1")
      .first<ResourceRow>()
    return row
      ? { id: row.id, version: row.version, body: row.body, checksum: row.checksum, createdAt: row.created_at }
      : null
  }
}

/** Repository for versioned llms.txt resources. */
export class LlmsVersionRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an llms.txt version. */
  async create(record: ResourceVersionRecord): Promise<void> {
    const result = await this.db
      .prepare("insert into llms_versions (id, version, body, checksum, created_at) values (?, ?, ?, ?, ?)")
      .bind(record.id, record.version, record.body, record.checksum, record.createdAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Llms version create failed")
  }

  /** Gets latest llms.txt version. */
  async latest(): Promise<ResourceVersionRecord | null> {
    const row = await this.db.prepare("select * from llms_versions order by version desc limit 1").first<ResourceRow>()
    return row
      ? { id: row.id, version: row.version, body: row.body, checksum: row.checksum, createdAt: row.created_at }
      : null
  }
}
