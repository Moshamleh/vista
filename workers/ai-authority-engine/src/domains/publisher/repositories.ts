import type { D1Database } from "../../types/cloudflare"
import type {
  PublishArtifactRecord,
  PublishFailureRecord,
  PublishHistoryRecord,
  PublishJobRecord,
  PublisherName,
  PublishTargetRecord
} from "./types"

interface PublishJobRow {
  id: string
  content_id: string
  status: PublishJobRecord["status"]
  targets_json: string
  canonical_url: string
  attempt_count: number
  max_retries: number
  error_message: string | null
  created_at: string
  updated_at: string
  started_at: string | null
  completed_at: string | null
}

interface PublishArtifactRow {
  id: string
  job_id: string
  content_id: string
  publisher: PublisherName
  format: PublishArtifactRecord["format"]
  artifact_body: string
  checksum: string
  created_at: string
}

/**
 * Maps a publish job row to a domain record.
 */
export function mapPublishJobRow(row: PublishJobRow): PublishJobRecord {
  return {
    id: row.id,
    contentId: row.content_id,
    status: row.status,
    targets: JSON.parse(row.targets_json) as PublisherName[],
    canonicalUrl: row.canonical_url,
    attemptCount: row.attempt_count,
    maxRetries: row.max_retries,
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    startedAt: row.started_at,
    completedAt: row.completed_at
  }
}

/**
 * D1 repository for publish jobs.
 */
export class PublishJobRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a publish job.
   */
  async create(record: PublishJobRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publish_jobs (id, content_id, status, targets_json, canonical_url, attempt_count, max_retries, error_message, created_at, updated_at, started_at, completed_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.contentId,
        record.status,
        JSON.stringify(record.targets),
        record.canonicalUrl,
        record.attemptCount,
        record.maxRetries,
        record.errorMessage,
        record.createdAt,
        record.updatedAt,
        record.startedAt,
        record.completedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish job create failed")
  }

  /**
   * Updates a publish job.
   */
  async update(record: PublishJobRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "update publish_jobs set status = ?, targets_json = ?, attempt_count = ?, error_message = ?, updated_at = ?, started_at = ?, completed_at = ? where id = ?"
      )
      .bind(
        record.status,
        JSON.stringify(record.targets),
        record.attemptCount,
        record.errorMessage,
        record.updatedAt,
        record.startedAt,
        record.completedAt,
        record.id
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish job update failed")
  }

  /**
   * Finds one publish job.
   */
  async findById(id: string): Promise<PublishJobRecord | null> {
    const row = await this.db.prepare("select * from publish_jobs where id = ?").bind(id).first<PublishJobRow>()
    return row ? mapPublishJobRow(row) : null
  }

  /**
   * Lists publish jobs.
   */
  async list(limit: number): Promise<PublishJobRecord[]> {
    const result = await this.db
      .prepare("select * from publish_jobs order by created_at desc limit ?")
      .bind(limit)
      .all<PublishJobRow>()
    return result.results.map(mapPublishJobRow)
  }
}

/**
 * D1 repository for publish targets.
 */
export class PublishTargetRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a target.
   */
  async upsert(record: PublishTargetRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publish_targets (id, name, enabled, endpoint, config_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?) on conflict(name) do update set enabled = excluded.enabled, endpoint = excluded.endpoint, config_json = excluded.config_json, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.name,
        record.enabled ? 1 : 0,
        record.endpoint,
        JSON.stringify(record.config),
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish target upsert failed")
  }
}

/**
 * D1 repository for publish history.
 */
export class PublishHistoryRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a history record.
   */
  async create(record: PublishHistoryRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publish_history (id, job_id, content_id, publisher, version, status, published_url, canonical_url, platform_id, published_at, checksum, response_metadata_json, publishing_metadata_json, latency_ms, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.jobId,
        record.contentId,
        record.publisher,
        record.version,
        record.status,
        record.publishedUrl,
        record.canonicalUrl,
        record.platformId,
        record.publishedAt,
        record.checksum,
        JSON.stringify(record.responseMetadata),
        JSON.stringify(record.publishingMetadata),
        record.latencyMs,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish history create failed")
  }
}

/**
 * D1 repository for publish failures.
 */
export class PublishFailureRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a failure record.
   */
  async create(record: PublishFailureRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publish_failures (id, job_id, content_id, publisher, attempt, error_code, error_message, retry_at, created_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.jobId,
        record.contentId,
        record.publisher,
        record.attempt,
        record.errorCode,
        record.errorMessage,
        record.retryAt,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish failure create failed")
  }
}

/**
 * D1 repository for publish artifacts.
 */
export class PublishArtifactRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a publish artifact.
   */
  async create(record: PublishArtifactRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publish_artifacts (id, job_id, content_id, publisher, format, artifact_body, checksum, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.jobId,
        record.contentId,
        record.publisher,
        record.format,
        record.body,
        record.checksum,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publish artifact create failed")
  }

  /**
   * Lists artifacts for a job.
   */
  async listForJob(jobId: string): Promise<PublishArtifactRecord[]> {
    const result = await this.db
      .prepare("select * from publish_artifacts where job_id = ?")
      .bind(jobId)
      .all<PublishArtifactRow>()
    return result.results.map((row) => ({
      id: row.id,
      jobId: row.job_id,
      contentId: row.content_id,
      publisher: row.publisher,
      format: row.format,
      body: row.artifact_body,
      checksum: row.checksum,
      createdAt: row.created_at
    }))
  }
}
