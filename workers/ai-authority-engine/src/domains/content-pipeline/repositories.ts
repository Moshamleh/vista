import type { D1Database } from "../../types/cloudflare"
import type {
  ContentAuditEventRecord,
  ContentRecord,
  ContentTemplateRecord,
  ContentVersionRecord,
  EditorialQueueRecord,
  InternalLinkRecord,
  PublicationQueueRecord,
  ReviewQueueRecord,
  TaxonomyRecord
} from "./types"

interface ContentRow {
  id: string
  title: string
  slug: string
  status: ContentRecord["status"]
  content_type: ContentRecord["contentType"]
  language: ContentRecord["language"]
  canonical_url: string | null
  target_keyword: string
  entities_json: string
  internal_links_json: string
  schema_type: string
  reading_time_minutes: number
  word_count: number
  seo_metadata_json: string
  ai_summary: string
  publishing_targets_json: string
  body: string
  current_version: number
  scheduled_at: string | null
  created_at: string
  updated_at: string
}

interface VersionRow {
  id: string
  content_id: string
  version_number: number
  title: string
  body: string
  metadata_json: string
  created_by: string
  created_at: string
}

interface EditorialQueueRow {
  id: string
  content_id: string
  status: EditorialQueueRecord["status"]
  priority: number
  assigned_to: string | null
  due_at: string | null
  created_at: string
  updated_at: string
}

interface PublicationQueueRow {
  id: string
  content_id: string
  status: PublicationQueueRecord["status"]
  targets_json: string
  scheduled_at: string
  created_at: string
  updated_at: string
}

/**
 * Maps a D1 content row into a domain record.
 */
export function mapContentRow(row: ContentRow): ContentRecord {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    contentType: row.content_type,
    language: row.language,
    canonicalUrl: row.canonical_url,
    targetKeyword: row.target_keyword,
    entities: JSON.parse(row.entities_json) as string[],
    internalLinks: JSON.parse(row.internal_links_json) as ContentRecord["internalLinks"],
    schemaType: row.schema_type,
    readingTimeMinutes: row.reading_time_minutes,
    wordCount: row.word_count,
    seoMetadata: JSON.parse(row.seo_metadata_json) as ContentRecord["seoMetadata"],
    aiSummary: row.ai_summary,
    publishingTargets: JSON.parse(row.publishing_targets_json) as string[],
    body: row.body,
    currentVersion: row.current_version,
    scheduledAt: row.scheduled_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

/**
 * D1 repository for content assets.
 */
export class ContentRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Lists content records ordered by newest edit.
   */
  async list(limit: number, offset: number): Promise<ContentRecord[]> {
    const result = await this.db
      .prepare("select * from content order by updated_at desc limit ? offset ?")
      .bind(limit, offset)
      .all<ContentRow>()
    return result.results.map(mapContentRow)
  }

  /**
   * Finds one content record by ID.
   */
  async findById(id: string): Promise<ContentRecord | null> {
    const row = await this.db.prepare("select * from content where id = ?").bind(id).first<ContentRow>()
    return row ? mapContentRow(row) : null
  }

  /**
   * Inserts one content record.
   */
  async create(record: ContentRecord): Promise<void> {
    const result = await this.db
      .prepare(
        `insert into content (
          id, title, slug, status, content_type, language, canonical_url, target_keyword, entities_json,
          internal_links_json, schema_type, reading_time_minutes, word_count, seo_metadata_json, ai_summary,
          publishing_targets_json, body, current_version, scheduled_at, created_at, updated_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        record.id,
        record.title,
        record.slug,
        record.status,
        record.contentType,
        record.language,
        record.canonicalUrl,
        record.targetKeyword,
        JSON.stringify(record.entities),
        JSON.stringify(record.internalLinks),
        record.schemaType,
        record.readingTimeMinutes,
        record.wordCount,
        JSON.stringify(record.seoMetadata),
        record.aiSummary,
        JSON.stringify(record.publishingTargets),
        record.body,
        record.currentVersion,
        record.scheduledAt,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Content create failed")
  }

  /**
   * Updates one content record.
   */
  async update(record: ContentRecord): Promise<void> {
    const result = await this.db
      .prepare(
        `update content set title = ?, slug = ?, status = ?, content_type = ?, language = ?, canonical_url = ?,
          target_keyword = ?, entities_json = ?, internal_links_json = ?, schema_type = ?, reading_time_minutes = ?,
          word_count = ?, seo_metadata_json = ?, ai_summary = ?, publishing_targets_json = ?, body = ?,
          current_version = ?, scheduled_at = ?, updated_at = ? where id = ?`
      )
      .bind(
        record.title,
        record.slug,
        record.status,
        record.contentType,
        record.language,
        record.canonicalUrl,
        record.targetKeyword,
        JSON.stringify(record.entities),
        JSON.stringify(record.internalLinks),
        record.schemaType,
        record.readingTimeMinutes,
        record.wordCount,
        JSON.stringify(record.seoMetadata),
        record.aiSummary,
        JSON.stringify(record.publishingTargets),
        record.body,
        record.currentVersion,
        record.scheduledAt,
        record.updatedAt,
        record.id
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Content update failed")
  }
}

/**
 * D1 repository for immutable content versions.
 */
export class ContentVersionRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a version snapshot.
   */
  async create(record: ContentVersionRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into content_versions (id, content_id, version_number, title, body, metadata_json, created_by, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.contentId,
        record.versionNumber,
        record.title,
        record.body,
        JSON.stringify(record.metadata),
        record.createdBy,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Content version create failed")
  }

  /**
   * Finds a version snapshot by content ID and version number.
   */
  async find(contentId: string, versionNumber: number): Promise<ContentVersionRecord | null> {
    const row = await this.db
      .prepare("select * from content_versions where content_id = ? and version_number = ?")
      .bind(contentId, versionNumber)
      .first<VersionRow>()
    return row
      ? {
          id: row.id,
          contentId: row.content_id,
          versionNumber: row.version_number,
          title: row.title,
          body: row.body,
          metadata: JSON.parse(row.metadata_json) as ContentVersionRecord["metadata"],
          createdBy: row.created_by,
          createdAt: row.created_at
        }
      : null
  }
}

/**
 * D1 repository for content templates.
 */
export class ContentTemplateRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a content template.
   */
  async upsert(record: ContentTemplateRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into content_templates (id, content_type, name, required_fields_json, schema_type, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?) on conflict(content_type) do update set name = excluded.name, required_fields_json = excluded.required_fields_json, schema_type = excluded.schema_type, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.contentType,
        record.name,
        JSON.stringify(record.requiredFields),
        record.schemaType,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Content template upsert failed")
  }
}

/**
 * D1 repository for editorial queue records.
 */
export class EditorialQueueRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts an editorial queue item.
   */
  async upsert(record: EditorialQueueRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into editorial_queue (id, content_id, status, priority, assigned_to, due_at, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set status = excluded.status, priority = excluded.priority, assigned_to = excluded.assigned_to, due_at = excluded.due_at, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.contentId,
        record.status,
        record.priority,
        record.assignedTo,
        record.dueAt,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Editorial queue upsert failed")
  }

  /**
   * Lists open editorial queue items.
   */
  async list(limit: number): Promise<EditorialQueueRecord[]> {
    const result = await this.db
      .prepare("select * from editorial_queue order by priority desc, created_at asc limit ?")
      .bind(limit)
      .all<EditorialQueueRow>()
    return result.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      status: row.status,
      priority: row.priority,
      assignedTo: row.assigned_to,
      dueAt: row.due_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/**
 * D1 repository for review queue records.
 */
export class ReviewQueueRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a review queue item.
   */
  async upsert(record: ReviewQueueRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into review_queue (id, content_id, status, reviewer, decision, notes, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set status = excluded.status, reviewer = excluded.reviewer, decision = excluded.decision, notes = excluded.notes, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.contentId,
        record.status,
        record.reviewer,
        record.decision,
        record.notes,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Review queue upsert failed")
  }
}

/**
 * D1 repository for publication queue records.
 */
export class PublicationQueueRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a publication queue item.
   */
  async create(record: PublicationQueueRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into publication_queue (id, content_id, status, targets_json, scheduled_at, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.contentId,
        record.status,
        JSON.stringify(record.targets),
        record.scheduledAt,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Publication queue create failed")
  }

  /**
   * Lists publication queue items.
   */
  async list(limit: number): Promise<PublicationQueueRecord[]> {
    const result = await this.db
      .prepare("select * from publication_queue order by scheduled_at asc limit ?")
      .bind(limit)
      .all<PublicationQueueRow>()
    return result.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      status: row.status,
      targets: JSON.parse(row.targets_json) as string[],
      scheduledAt: row.scheduled_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/**
 * D1 repository for tags.
 */
export class TagRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a tag record.
   */
  async upsert(record: TaxonomyRecord): Promise<void> {
    const result = await this.db
      .prepare("insert into tags (id, name, slug, created_at) values (?, ?, ?, ?) on conflict(slug) do nothing")
      .bind(record.id, record.name, record.slug, record.createdAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Tag upsert failed")
  }
}

/**
 * D1 repository for categories.
 */
export class CategoryRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a category record.
   */
  async upsert(record: TaxonomyRecord): Promise<void> {
    const result = await this.db
      .prepare("insert into categories (id, name, slug, created_at) values (?, ?, ?, ?) on conflict(slug) do nothing")
      .bind(record.id, record.name, record.slug, record.createdAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Category upsert failed")
  }
}

/**
 * D1 repository for internal links.
 */
export class InternalLinkRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Replaces all internal links for one content asset.
   */
  async replaceForContent(contentId: string, records: InternalLinkRecord[]): Promise<void> {
    const deleted = await this.db
      .prepare("delete from internal_links where source_content_id = ?")
      .bind(contentId)
      .run()
    if (!deleted.success) throw new Error(deleted.error ?? "Internal link delete failed")
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into internal_links (id, source_content_id, target_content_id, target_url, anchor_text, created_at) values (?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.sourceContentId,
          record.targetContentId ?? null,
          record.targetUrl,
          record.anchorText,
          record.createdAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Internal link create failed")
    }
  }
}

/**
 * D1 repository for content audit events.
 */
export class ContentAuditRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates an audit event.
   */
  async create(record: ContentAuditEventRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into content_audit_events (id, content_id, action, from_status, to_status, actor, metadata_json, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.contentId,
        record.action,
        record.fromStatus,
        record.toStatus,
        record.actor,
        JSON.stringify(record.metadata),
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Content audit create failed")
  }
}
