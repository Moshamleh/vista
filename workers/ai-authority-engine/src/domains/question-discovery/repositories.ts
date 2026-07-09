import type { D1Database } from "../../types/cloudflare"
import type { DiscoveryRunRecord, EntityDefinition, ProviderRecord, QuestionRecord } from "./types"

interface QuestionRow {
  id: string
  question: string
  canonical_question: string
  slug: string
  language: "en" | "ar"
  market: string
  intent: QuestionRecord["intent"]
  priority_score: number
  search_demand: number
  freshness_score: number
  existing_coverage_score: number
  entities_json: string
  source_provider: QuestionRecord["sourceProvider"]
  source_run_id: string
  first_seen_at: string
  last_seen_at: string
}

interface RunRow {
  id: string
  seed: string
  status: DiscoveryRunRecord["status"]
  providers_json: string
  question_count: number
  error_message: string | null
  started_at: string
  finished_at: string | null
}

/**
 * Maps a D1 question row into a domain record.
 */
export function mapQuestionRow(row: QuestionRow): QuestionRecord {
  return {
    id: row.id,
    question: row.question,
    canonicalQuestion: row.canonical_question,
    slug: row.slug,
    language: row.language,
    market: row.market,
    intent: row.intent,
    priorityScore: row.priority_score,
    searchDemand: row.search_demand,
    freshnessScore: row.freshness_score,
    existingCoverageScore: row.existing_coverage_score,
    entities: JSON.parse(row.entities_json) as QuestionRecord["entities"],
    sourceProvider: row.source_provider,
    sourceRunId: row.source_run_id,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at
  }
}

/**
 * D1 repository for discovered questions.
 */
export class QuestionRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Lists questions ordered by priority.
   */
  async list(limit: number, offset: number): Promise<QuestionRecord[]> {
    const result = await this.db
      .prepare("select * from questions order by priority_score desc, last_seen_at desc limit ? offset ?")
      .bind(limit, offset)
      .all<QuestionRow>()
    return result.results.map(mapQuestionRow)
  }

  /**
   * Finds a question by ID.
   */
  async findById(id: string): Promise<QuestionRecord | null> {
    const row = await this.db.prepare("select * from questions where id = ?").bind(id).first<QuestionRow>()
    return row ? mapQuestionRow(row) : null
  }

  /**
   * Upserts one question using canonical question uniqueness.
   */
  async upsert(record: QuestionRecord): Promise<void> {
    const result = await this.db
      .prepare(
        `insert into questions (
          id, question, canonical_question, slug, language, market, intent, priority_score, search_demand,
          freshness_score, existing_coverage_score, entities_json, source_provider, source_run_id, first_seen_at, last_seen_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        on conflict(canonical_question) do update set
          question = excluded.question,
          priority_score = excluded.priority_score,
          search_demand = excluded.search_demand,
          freshness_score = excluded.freshness_score,
          existing_coverage_score = excluded.existing_coverage_score,
          entities_json = excluded.entities_json,
          source_provider = excluded.source_provider,
          source_run_id = excluded.source_run_id,
          last_seen_at = excluded.last_seen_at`
      )
      .bind(
        record.id,
        record.question,
        record.canonicalQuestion,
        record.slug,
        record.language,
        record.market,
        record.intent,
        record.priorityScore,
        record.searchDemand,
        record.freshnessScore,
        record.existingCoverageScore,
        JSON.stringify(record.entities),
        record.sourceProvider,
        record.sourceRunId,
        record.firstSeenAt,
        record.lastSeenAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Question upsert failed")
  }
}

/**
 * D1 repository for discovery run records.
 */
export class DiscoveryRunRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates a discovery run.
   */
  async create(record: DiscoveryRunRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into discovery_runs (id, seed, status, providers_json, question_count, error_message, started_at, finished_at) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.seed,
        record.status,
        JSON.stringify(record.providers),
        record.questionCount,
        record.errorMessage,
        record.startedAt,
        record.finishedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Discovery run create failed")
  }

  /**
   * Updates a discovery run.
   */
  async update(record: DiscoveryRunRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "update discovery_runs set status = ?, question_count = ?, error_message = ?, finished_at = ? where id = ?"
      )
      .bind(record.status, record.questionCount, record.errorMessage, record.finishedAt, record.id)
      .run()
    if (!result.success) throw new Error(result.error ?? "Discovery run update failed")
  }

  /**
   * Lists latest discovery runs.
   */
  async listLatest(limit: number): Promise<DiscoveryRunRecord[]> {
    const result = await this.db
      .prepare("select * from discovery_runs order by started_at desc limit ?")
      .bind(limit)
      .all<RunRow>()
    return result.results.map((row) => ({
      id: row.id,
      seed: row.seed,
      status: row.status,
      providers: JSON.parse(row.providers_json) as DiscoveryRunRecord["providers"],
      questionCount: row.question_count,
      errorMessage: row.error_message,
      startedAt: row.started_at,
      finishedAt: row.finished_at
    }))
  }
}

/**
 * D1 repository for provider metadata.
 */
export class ProviderRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts provider metadata.
   */
  async upsert(record: ProviderRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into providers (name, enabled, last_run_at) values (?, ?, ?) on conflict(name) do update set enabled = excluded.enabled, last_run_at = excluded.last_run_at"
      )
      .bind(record.name, record.enabled ? 1 : 0, record.lastRunAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "Provider upsert failed")
  }
}

/**
 * D1 repository for configurable entity definitions.
 */
export class EntityRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts entity definitions.
   */
  async upsertMany(records: EntityDefinition[]): Promise<void> {
    const timestamp = new Date().toISOString()
    for (const record of records) {
      const result = await this.db
        .prepare(
          "insert into entities (key, label, aliases_json, updated_at) values (?, ?, ?, ?) on conflict(key) do update set label = excluded.label, aliases_json = excluded.aliases_json, updated_at = excluded.updated_at"
        )
        .bind(record.key, record.label, JSON.stringify(record.aliases), timestamp)
        .run()
      if (!result.success) throw new Error(result.error ?? "Entity upsert failed")
    }
  }
}
