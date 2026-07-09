import type { D1Database } from "../../types/cloudflare"
import type {
  BuyingSignalRecord,
  IngestionRunRecord,
  OpportunityRecord,
  OpportunityScoreRecord,
  OrganizationRecord,
  SignalSourceRecord
} from "./types"

interface SourceRow {
  id: string
  name: string
  category: SignalSourceRecord["category"]
  endpoint: string
  enabled: number
  metadata_json: string
  created_at: string
  updated_at: string
}

interface OrganizationRow {
  id: string
  name: string
  website_url: string | null
  industry: string | null
  location: string | null
  company_size: string | null
  technologies_json: string
  metadata_json: string
  created_at: string
  updated_at: string
}

interface SignalRow {
  id: string
  source_id: string
  organization_id: string
  event_type: BuyingSignalRecord["eventType"]
  title: string
  summary: string
  url: string
  published_at: string
  detected_at: string
  location: string | null
  technologies_json: string
  confidence_score: number
  raw_json: string
}

interface OpportunityRow {
  id: string
  organization_id: string
  primary_signal_id: string
  status: OpportunityRecord["status"]
  title: string
  explanation: string
  recommended_services_json: string
  organization_name?: string
  score?: number
  source_name?: string
  signal_type?: BuyingSignalRecord["eventType"]
  created_at: string
  updated_at: string
}

/** Repository for public signal sources. */
export class SignalSourceRepository {
  constructor(private readonly db: D1Database) {}

  /** Upserts public source configuration. */
  async upsert(record: SignalSourceRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into signal_sources (id, name, category, endpoint, enabled, metadata_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set name = excluded.name, category = excluded.category, endpoint = excluded.endpoint, enabled = excluded.enabled, metadata_json = excluded.metadata_json, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.name,
        record.category,
        record.endpoint,
        record.enabled ? 1 : 0,
        JSON.stringify(record.metadata),
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Signal source upsert failed")
  }

  /** Lists configured sources. */
  async list(limit: number): Promise<SignalSourceRecord[]> {
    const result = await this.db
      .prepare("select * from signal_sources order by updated_at desc limit ?")
      .bind(limit)
      .all<SourceRow>()
    return result.results.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      endpoint: row.endpoint,
      enabled: row.enabled === 1,
      metadata: JSON.parse(row.metadata_json) as Record<string, unknown>,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  }
}

/** Repository for organizations derived from public data. */
export class OrganizationRepository {
  constructor(private readonly db: D1Database) {}

  /** Upserts an organization. */
  async upsert(record: OrganizationRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into organizations (id, name, website_url, industry, location, company_size, technologies_json, metadata_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(id) do update set name = excluded.name, website_url = excluded.website_url, industry = excluded.industry, location = excluded.location, company_size = excluded.company_size, technologies_json = excluded.technologies_json, metadata_json = excluded.metadata_json, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.name,
        record.websiteUrl,
        record.industry,
        record.location,
        record.companySize,
        JSON.stringify(record.technologies),
        JSON.stringify(record.metadata),
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Organization upsert failed")
  }

  /** Finds one organization. */
  async findById(id: string): Promise<OrganizationRecord | null> {
    const row = await this.db.prepare("select * from organizations where id = ?").bind(id).first<OrganizationRow>()
    return row ? mapOrganization(row) : null
  }
}

/** Repository for public buying signals. */
export class BuyingSignalRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates a buying signal. */
  async create(record: BuyingSignalRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into buying_signals (id, source_id, organization_id, event_type, title, summary, url, published_at, detected_at, location, technologies_json, confidence_score, raw_json) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.sourceId,
        record.organizationId,
        record.eventType,
        record.title,
        record.summary,
        record.url,
        record.publishedAt,
        record.detectedAt,
        record.location,
        JSON.stringify(record.technologies),
        record.confidenceScore,
        JSON.stringify(record.raw)
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Buying signal create failed")
  }

  /** Lists signals. */
  async list(limit: number): Promise<BuyingSignalRecord[]> {
    const result = await this.db
      .prepare("select * from buying_signals order by detected_at desc limit ?")
      .bind(limit)
      .all<SignalRow>()
    return result.results.map(mapSignal)
  }

  /** Finds one signal. */
  async findById(id: string): Promise<BuyingSignalRecord | null> {
    const row = await this.db.prepare("select * from buying_signals where id = ?").bind(id).first<SignalRow>()
    return row ? mapSignal(row) : null
  }

  /** Counts signals for an organization. */
  async countForOrganization(organizationId: string): Promise<number> {
    const result = await this.db
      .prepare("select * from buying_signals where organization_id = ?")
      .bind(organizationId)
      .all<SignalRow>()
    return result.results.length
  }
}

/** Repository for opportunities. */
export class OpportunityRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an opportunity. */
  async create(record: OpportunityRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into opportunities (id, organization_id, primary_signal_id, status, title, explanation, recommended_services_json, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.organizationId,
        record.primarySignalId,
        record.status,
        record.title,
        record.explanation,
        JSON.stringify(record.recommendedServices),
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Opportunity create failed")
  }

  /** Lists opportunities. */
  async list(limit: number): Promise<OpportunityRecord[]> {
    const result = await this.db
      .prepare(
        "select opportunities.*, organizations.name as organization_name, opportunity_scores.score as score, signal_sources.name as source_name, buying_signals.event_type as signal_type from opportunities left join organizations on organizations.id = opportunities.organization_id left join buying_signals on buying_signals.id = opportunities.primary_signal_id left join signal_sources on signal_sources.id = buying_signals.source_id left join opportunity_scores on opportunity_scores.opportunity_id = opportunities.id order by opportunities.updated_at desc limit ?"
      )
      .bind(limit)
      .all<OpportunityRow>()
    return result.results.map(mapOpportunity)
  }

  /** Finds one opportunity. */
  async findById(id: string): Promise<OpportunityRecord | null> {
    const row = await this.db
      .prepare(
        "select opportunities.*, organizations.name as organization_name, opportunity_scores.score as score, signal_sources.name as source_name, buying_signals.event_type as signal_type from opportunities left join organizations on organizations.id = opportunities.organization_id left join buying_signals on buying_signals.id = opportunities.primary_signal_id left join signal_sources on signal_sources.id = buying_signals.source_id left join opportunity_scores on opportunity_scores.opportunity_id = opportunities.id where opportunities.id = ?"
      )
      .bind(id)
      .first<OpportunityRow>()
    return row ? mapOpportunity(row) : null
  }
}

/** Repository for opportunity scores. */
export class OpportunityScoreRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an opportunity score. */
  async create(record: OpportunityScoreRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into opportunity_scores (id, opportunity_id, score, factors_json, explanation, created_at) values (?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.opportunityId,
        record.score,
        JSON.stringify(record.factors),
        record.explanation,
        record.createdAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Opportunity score create failed")
  }
}

/** Repository for ingestion runs. */
export class IngestionRunRepository {
  constructor(private readonly db: D1Database) {}

  /** Creates an ingestion run. */
  async create(record: IngestionRunRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into ingestion_runs (id, status, started_at, completed_at, source_count, signal_count, opportunity_count, error_message) values (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.status,
        record.startedAt,
        record.completedAt,
        record.sourceCount,
        record.signalCount,
        record.opportunityCount,
        record.errorMessage
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Ingestion run create failed")
  }

  /** Updates an ingestion run. */
  async update(record: IngestionRunRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "update ingestion_runs set status = ?, completed_at = ?, signal_count = ?, opportunity_count = ?, error_message = ? where id = ?"
      )
      .bind(
        record.status,
        record.completedAt,
        record.signalCount,
        record.opportunityCount,
        record.errorMessage,
        record.id
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Ingestion run update failed")
  }
}

function mapOrganization(row: OrganizationRow): OrganizationRecord {
  return {
    id: row.id,
    name: row.name,
    websiteUrl: row.website_url,
    industry: row.industry,
    location: row.location,
    companySize: row.company_size,
    technologies: JSON.parse(row.technologies_json) as string[],
    metadata: JSON.parse(row.metadata_json) as Record<string, unknown>,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

function mapSignal(row: SignalRow): BuyingSignalRecord {
  return {
    id: row.id,
    sourceId: row.source_id,
    organizationId: row.organization_id,
    eventType: row.event_type,
    title: row.title,
    summary: row.summary,
    url: row.url,
    publishedAt: row.published_at,
    detectedAt: row.detected_at,
    location: row.location,
    technologies: JSON.parse(row.technologies_json) as string[],
    confidenceScore: row.confidence_score,
    raw: JSON.parse(row.raw_json) as Record<string, unknown>
  }
}

function mapOpportunity(row: OpportunityRow): OpportunityRecord {
  const opportunity: OpportunityRecord = {
    id: row.id,
    organizationId: row.organization_id,
    primarySignalId: row.primary_signal_id,
    status: row.status,
    title: row.title,
    explanation: row.explanation,
    recommendedServices: JSON.parse(row.recommended_services_json) as string[],
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
  if (row.organization_name) opportunity.organizationName = row.organization_name
  if (typeof row.score === "number") opportunity.score = row.score
  if (row.source_name) opportunity.sourceName = row.source_name
  if (row.signal_type) opportunity.signalType = row.signal_type
  return opportunity
}
