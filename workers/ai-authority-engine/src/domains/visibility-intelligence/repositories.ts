import type { D1Database } from "../../types/cloudflare"
import type {
  ValidationRunRecord,
  VisibilityRecommendationRecord,
  VisibilityScoreRecord,
  VisibilitySnapshotRecord
} from "./types"

interface SnapshotRow {
  id: string
  status: VisibilitySnapshotRecord["status"]
  aggregate_score: number
  provider_results_json: string
  metrics_json: string
  created_at: string
}

interface ScoreRow {
  id: string
  snapshot_id: string
  metric: VisibilityScoreRecord["metric"]
  score: number
  daily_change: number
  weekly_change: number
  monthly_change: number
  created_at: string
}

interface RecommendationRow {
  id: string
  snapshot_id: string
  content_id: string | null
  severity: VisibilityRecommendationRecord["severity"]
  category: string
  message: string
  action: string
  created_at: string
}

interface RunRow {
  id: string
  status: ValidationRunRecord["status"]
  started_at: string
  completed_at: string | null
  provider_count: number
  error_message: string | null
}

/** Repository for visibility snapshots. */
export class VisibilitySnapshotRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates a snapshot. */
  async create(record: VisibilitySnapshotRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into visibility_snapshots (id, status, aggregate_score, provider_results_json, metrics_json, created_at) values (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.status,
        record.aggregateScore,
        JSON.stringify(record.providerResults),
        JSON.stringify(record.metrics),
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Visibility snapshot create failed")
  }

  /** Lists recent snapshots. */
  async list(limit: number): Promise<VisibilitySnapshotRecord[]> {
    const result = await this.db
      .prepare("select * from visibility_snapshots order by created_at desc limit ?")
      .bind(limit)
      .all<SnapshotRow>()
    return result.results.map((row) => ({
      id: row.id,
      status: row.status,
      aggregateScore: row.aggregate_score,
      providerResults: JSON.parse(row.provider_results_json) as VisibilitySnapshotRecord["providerResults"],
      metrics: JSON.parse(row.metrics_json) as VisibilitySnapshotRecord["metrics"],
      createdAt: row.created_at
    }))
  }
}

/** Repository for visibility metric scores. */
export class VisibilityScoreRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates metric scores. */
  async createMany(records: VisibilityScoreRecord[]): Promise<void> {
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into visibility_scores (id, snapshot_id, metric, score, daily_change, weekly_change, monthly_change, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.snapshotId,
          record.metric,
          record.score,
          record.dailyChange,
          record.weeklyChange,
          record.monthlyChange,
          record.createdAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Visibility score create failed")
    }
  }

  /** Lists recent scores for one metric. */
  async listMetric(metric: VisibilityScoreRecord["metric"], limit: number): Promise<VisibilityScoreRecord[]> {
    const result = await this.db
      .prepare("select * from visibility_scores where metric = ? order by created_at desc limit ?")
      .bind(metric, limit)
      .all<ScoreRow>()
    return result.results.map((row) => ({
      id: row.id,
      snapshotId: row.snapshot_id,
      metric: row.metric,
      score: row.score,
      dailyChange: row.daily_change,
      weeklyChange: row.weekly_change,
      monthlyChange: row.monthly_change,
      createdAt: row.created_at
    }))
  }
}

/** Repository for visibility recommendations. */
export class VisibilityRecommendationRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates recommendations. */
  async createMany(records: VisibilityRecommendationRecord[]): Promise<void> {
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into visibility_recommendations (id, snapshot_id, content_id, severity, category, message, action, created_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(
          record.id,
          record.snapshotId,
          record.contentId,
          record.severity,
          record.category,
          record.message,
          record.action,
          record.createdAt
        )
        .run()
      if (!result.success) throw new Error(result.error ?? "Visibility recommendation create failed")
    }
  }

  /** Lists recommendations. */
  async list(limit: number): Promise<VisibilityRecommendationRecord[]> {
    const result = await this.db
      .prepare("select * from visibility_recommendations order by created_at desc limit ?")
      .bind(limit)
      .all<RecommendationRow>()
    return result.results.map((row) => ({
      id: row.id,
      snapshotId: row.snapshot_id,
      contentId: row.content_id,
      severity: row.severity,
      category: row.category,
      message: row.message,
      action: row.action,
      createdAt: row.created_at
    }))
  }
}

/** Repository for validation runs. */
export class ValidationRunRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates a validation run. */
  async create(record: ValidationRunRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into validation_runs (id, status, started_at, completed_at, provider_count, error_message) values (?, ?, ?, ?, ?, ?)"
      )
      .bind(record.id, record.status, record.startedAt, record.completedAt, record.providerCount, record.errorMessage)
      .run()
    if (!result.success) throw new Error(result.error ?? "Validation run create failed")
  }

  /** Updates a validation run. */
  async update(record: ValidationRunRecord): Promise<void> {
    const result = await this.db
      .prepare("update validation_runs set status = ?, completed_at = ?, error_message = ? where id = ?")
      .bind(record.status, record.completedAt, record.errorMessage, record.id)
      .run()
    if (!result.success) throw new Error(result.error ?? "Validation run update failed")
  }

  /** Lists validation runs. */
  async list(limit: number): Promise<ValidationRunRecord[]> {
    const result = await this.db
      .prepare("select * from validation_runs order by started_at desc limit ?")
      .bind(limit)
      .all<RunRow>()
    return result.results.map((row) => ({
      id: row.id,
      status: row.status,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      providerCount: row.provider_count,
      errorMessage: row.error_message
    }))
  }
}

/** Read repository for cross-domain visibility context. */
export class VisibilityContextRepository {
  constructor(private readonly db: D1Database) {}

  /** Lists compact GEO report rows. */
  async listGeoReports(): Promise<
    { contentId: string; score: number; validation: { aiRetrievalReady?: boolean; schemaComplete?: boolean } }[]
  > {
    const result = await this.db
      .prepare("select content_id, score, validation_json from geo_reports order by updated_at desc limit ?")
      .bind(500)
      .all<{
        content_id: string
        score: number
        validation_json: string
      }>()
    return result.results.map((row) => ({
      contentId: row.content_id,
      score: row.score,
      validation: JSON.parse(row.validation_json) as { aiRetrievalReady?: boolean; schemaComplete?: boolean }
    }))
  }

  /** Lists content IDs with schema documents. */
  async listSchemaContentIds(): Promise<string[]> {
    const result = await this.db
      .prepare("select content_id from schema_documents order by updated_at desc limit ?")
      .bind(1000)
      .all<{ content_id: string }>()
    return result.results.map((row) => row.content_id)
  }

  /** Lists content IDs represented in the entity graph. */
  async listEntityContentIds(): Promise<string[]> {
    const result = await this.db
      .prepare("select source_content_ids_json from entity_graph order by confidence_score desc limit ?")
      .bind(1000)
      .all<{ source_content_ids_json: string }>()
    return Array.from(new Set(result.results.flatMap((row) => JSON.parse(row.source_content_ids_json) as string[])))
  }

  /** Lists content IDs with publisher history. */
  async listPublishedContentIds(): Promise<string[]> {
    const result = await this.db
      .prepare("select content_id from publish_history order by created_at desc limit ?")
      .bind(1000)
      .all<{ content_id: string }>()
    return Array.from(new Set(result.results.map((row) => row.content_id)))
  }
}
