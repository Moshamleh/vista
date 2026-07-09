import type { D1Database } from "../../types/cloudflare"
import type {
  EntityGraphRecord,
  GeoReportRecord,
  InternalLinkGraphRecord,
  OptimizationHistoryRecord,
  SchemaDocumentRecord
} from "./types"

interface EntityRow {
  id: string
  entity_type: EntityGraphRecord["entityType"]
  name: string
  slug: string
  synonyms_json: string
  relationships_json: string
  confidence_score: number
  source_content_ids_json: string
  created_at: string
  updated_at: string
}

interface SchemaRow {
  id: string
  content_id: string
  schema_type: string
  json_ld: string
  checksum: string
  created_at: string
  updated_at: string
}

interface ReportRow {
  id: string
  content_id: string
  status: GeoReportRecord["status"]
  score: number
  validation_json: string
  metadata_json: string
  ai_resources_json: string
  created_at: string
  updated_at: string
}

/**
 * D1 repository for entity graph nodes.
 */
export class EntityGraphRepository {
  constructor(private readonly db: D1Database) {}

  /** Upserts entity graph records. */
  async upsertMany(records: EntityGraphRecord[]): Promise<void> {
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into entity_graph (id, entity_type, name, slug, synonyms_json, relationships_json, confidence_score, source_content_ids_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(slug) do update set entity_type = excluded.entity_type, synonyms_json = excluded.synonyms_json, relationships_json = excluded.relationships_json, confidence_score = excluded.confidence_score, source_content_ids_json = excluded.source_content_ids_json, updated_at = excluded.updated_at"
        )
        .bind(
          record.id,
          record.entityType,
          record.name,
          record.slug,
          JSON.stringify(record.synonyms),
          JSON.stringify(record.relationships),
          record.confidenceScore,
          JSON.stringify(record.sourceContentIds),
          record.createdAt,
          record.updatedAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Entity graph upsert failed")
    }
  }

  /** Lists entity graph records. */
  async list(limit: number): Promise<EntityGraphRecord[]> {
    const result = await this.db
      .prepare("select * from entity_graph order by confidence_score desc limit ?")
      .bind(limit)
      .all<EntityRow>()
    return result.results.map((row) => ({
      id: row.id,
      entityType: row.entity_type,
      name: row.name,
      slug: row.slug,
      synonyms: JSON.parse(row.synonyms_json) as string[],
      relationships: JSON.parse(row.relationships_json) as EntityGraphRecord["relationships"],
      confidenceScore: row.confidence_score,
      sourceContentIds: JSON.parse(row.source_content_ids_json) as string[],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/** D1 repository for JSON-LD schema documents. */
export class SchemaDocumentRepository {
  constructor(private readonly db: D1Database) {}

  /** Replaces schema documents for one content asset. */
  async replaceForContent(contentId: string, records: SchemaDocumentRecord[]): Promise<void> {
    const deleted = await this.db.prepare("delete from schema_documents where content_id = ?").bind(contentId).run()
    if (!deleted.success) throw new Error(deleted.error ?? "Schema delete failed")
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into schema_documents (id, content_id, schema_type, json_ld, checksum, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.contentId,
          record.schemaType,
          JSON.stringify(record.jsonLd),
          record.checksum,
          record.createdAt,
          record.updatedAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Schema create failed")
    }
  }

  /** Lists schema documents for content. */
  async listForContent(contentId: string): Promise<SchemaDocumentRecord[]> {
    const result = await this.db
      .prepare("select * from schema_documents where content_id = ?")
      .bind(contentId)
      .all<SchemaRow>()
    return result.results.map((row) => ({
      id: row.id,
      contentId: row.content_id,
      schemaType: row.schema_type,
      jsonLd: JSON.parse(row.json_ld) as Record<string, unknown>,
      checksum: row.checksum,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/** D1 repository for GEO reports. */
export class GeoReportRepository {
  constructor(private readonly db: D1Database) {}

  /** Upserts a GEO report. */
  async upsert(record: GeoReportRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into geo_reports (id, content_id, status, score, validation_json, metadata_json, ai_resources_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(content_id) do update set status = excluded.status, score = excluded.score, validation_json = excluded.validation_json, metadata_json = excluded.metadata_json, ai_resources_json = excluded.ai_resources_json, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.contentId,
        record.status,
        record.score,
        JSON.stringify(record.validation),
        JSON.stringify(record.metadata),
        JSON.stringify(record.aiResources),
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "GEO report upsert failed")
  }

  /** Finds a GEO report by content ID. */
  async findByContentId(contentId: string): Promise<GeoReportRecord | null> {
    const row = await this.db
      .prepare("select * from geo_reports where content_id = ?")
      .bind(contentId)
      .first<ReportRow>()
    return row
      ? {
          id: row.id,
          contentId: row.content_id,
          status: row.status,
          score: row.score,
          validation: JSON.parse(row.validation_json) as GeoReportRecord["validation"],
          metadata: JSON.parse(row.metadata_json) as GeoReportRecord["metadata"],
          aiResources: JSON.parse(row.ai_resources_json) as GeoReportRecord["aiResources"],
          createdAt: row.created_at,
          updatedAt: row.updated_at
        }
      : null
  }
}

/** D1 repository for internal link graph. */
export class InternalLinkGraphRepository {
  constructor(private readonly db: D1Database) {}

  /** Replaces internal link graph edges for content. */
  async replaceForContent(contentId: string, records: InternalLinkGraphRecord[]): Promise<void> {
    const deleted = await this.db
      .prepare("delete from internal_link_graph where source_content_id = ?")
      .bind(contentId)
      .run()
    if (!deleted.success) throw new Error(deleted.error ?? "Internal link graph delete failed")
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into internal_link_graph (id, source_content_id, target_content_id, relation_type, anchor_text, confidence_score, created_at) values (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.sourceContentId,
          record.targetContentId,
          record.relationType,
          record.anchorText,
          record.confidenceScore,
          record.createdAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Internal link graph create failed")
    }
  }
}

/** D1 repository for optimization history. */
export class OptimizationHistoryRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an optimization history record. */
  async create(record: OptimizationHistoryRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into optimization_history (id, content_id, action, score, details_json, created_at) values (?, ?, ?, ?, ?, ?)"
      )
      .bind(record.id, record.contentId, record.action, record.score, JSON.stringify(record.details), record.createdAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Optimization history create failed")
  }
}
