import type { D1Database } from "../../types/cloudflare"
import type { AiProviderName, GenerationJobRecord, PromptTemplateRecord } from "./types"

interface JobRow {
  id: string
  content_id: string | null
  question_id: string | null
  status: GenerationJobRecord["status"]
  content_type: GenerationJobRecord["contentType"]
  question: string
  provider: AiProviderName
  model: string
  prompt_template_id: string
  prompt_version: number
  rag_context_json: string
  generated_content_json: string | null
  validation_json: string | null
  generation_metadata_json: string | null
  retry_count: number
  max_retries: number
  cancellation_reason: string | null
  error_message: string | null
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

interface PromptRow {
  id: string
  name: string
  version: number
  content_type: PromptTemplateRecord["contentType"]
  parent_id: string | null
  system_prompt: string
  user_prompt: string
  variables_json: string
  active: number
  created_at: string
  updated_at: string
}

/**
 * Maps a D1 job row into a domain record.
 */
export function mapGenerationJobRow(row: JobRow): GenerationJobRecord {
  return {
    id: row.id,
    contentId: row.content_id,
    questionId: row.question_id,
    status: row.status,
    contentType: row.content_type,
    question: row.question,
    provider: row.provider,
    model: row.model,
    promptTemplateId: row.prompt_template_id,
    promptVersion: row.prompt_version,
    ragContext: JSON.parse(row.rag_context_json) as GenerationJobRecord["ragContext"],
    generatedContent: row.generated_content_json
      ? (JSON.parse(row.generated_content_json) as GenerationJobRecord["generatedContent"])
      : null,
    validation: row.validation_json ? (JSON.parse(row.validation_json) as GenerationJobRecord["validation"]) : null,
    generationMetadata: row.generation_metadata_json
      ? (JSON.parse(row.generation_metadata_json) as GenerationJobRecord["generationMetadata"])
      : null,
    retryCount: row.retry_count,
    maxRetries: row.max_retries,
    cancellationReason: row.cancellation_reason,
    errorMessage: row.error_message,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

/**
 * Maps a D1 prompt row into a domain record.
 */
export function mapPromptRow(row: PromptRow): PromptTemplateRecord {
  return {
    id: row.id,
    name: row.name,
    version: row.version,
    contentType: row.content_type,
    parentId: row.parent_id,
    systemPrompt: row.system_prompt,
    userPrompt: row.user_prompt,
    variables: JSON.parse(row.variables_json) as string[],
    active: row.active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

/**
 * D1 repository for AI generation jobs.
 */
export class GenerationJobRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Creates one generation job.
   */
  async create(record: GenerationJobRecord): Promise<void> {
    const result = await this.db
      .prepare(
        `insert into ai_generation_jobs (
          id, content_id, question_id, status, content_type, question, provider, model, prompt_template_id,
          prompt_version, rag_context_json, generated_content_json, validation_json, generation_metadata_json,
          retry_count, max_retries, cancellation_reason, error_message, started_at, completed_at, created_at, updated_at
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        record.id,
        record.contentId,
        record.questionId,
        record.status,
        record.contentType,
        record.question,
        record.provider,
        record.model,
        record.promptTemplateId,
        record.promptVersion,
        JSON.stringify(record.ragContext),
        record.generatedContent ? JSON.stringify(record.generatedContent) : null,
        record.validation ? JSON.stringify(record.validation) : null,
        record.generationMetadata ? JSON.stringify(record.generationMetadata) : null,
        record.retryCount,
        record.maxRetries,
        record.cancellationReason,
        record.errorMessage,
        record.startedAt,
        record.completedAt,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Generation job create failed")
  }

  /**
   * Updates one generation job.
   */
  async update(record: GenerationJobRecord): Promise<void> {
    const result = await this.db
      .prepare(
        `update ai_generation_jobs set content_id = ?, status = ?, rag_context_json = ?, generated_content_json = ?,
          validation_json = ?, generation_metadata_json = ?, retry_count = ?, cancellation_reason = ?, error_message = ?,
          started_at = ?, completed_at = ?, updated_at = ? where id = ?`
      )
      .bind(
        record.contentId,
        record.status,
        JSON.stringify(record.ragContext),
        record.generatedContent ? JSON.stringify(record.generatedContent) : null,
        record.validation ? JSON.stringify(record.validation) : null,
        record.generationMetadata ? JSON.stringify(record.generationMetadata) : null,
        record.retryCount,
        record.cancellationReason,
        record.errorMessage,
        record.startedAt,
        record.completedAt,
        record.updatedAt,
        record.id
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Generation job update failed")
  }

  /**
   * Finds one generation job by ID.
   */
  async findById(id: string): Promise<GenerationJobRecord | null> {
    const row = await this.db.prepare("select * from ai_generation_jobs where id = ?").bind(id).first<JobRow>()
    return row ? mapGenerationJobRow(row) : null
  }

  /**
   * Lists generation jobs.
   */
  async list(limit: number): Promise<GenerationJobRecord[]> {
    const result = await this.db
      .prepare("select * from ai_generation_jobs order by created_at desc limit ?")
      .bind(limit)
      .all<JobRow>()
    return result.results.map(mapGenerationJobRow)
  }
}

/**
 * D1 repository for versioned prompt templates.
 */
export class PromptTemplateRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Upserts a prompt template.
   */
  async upsert(record: PromptTemplateRecord): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into ai_prompt_templates (id, name, version, content_type, parent_id, system_prompt, user_prompt, variables_json, active, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) on conflict(content_type, version) do update set name = excluded.name, parent_id = excluded.parent_id, system_prompt = excluded.system_prompt, user_prompt = excluded.user_prompt, variables_json = excluded.variables_json, active = excluded.active, updated_at = excluded.updated_at"
      )
      .bind(
        record.id,
        record.name,
        record.version,
        record.contentType,
        record.parentId,
        record.systemPrompt,
        record.userPrompt,
        JSON.stringify(record.variables),
        record.active ? 1 : 0,
        record.createdAt,
        record.updatedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Prompt template upsert failed")
  }

  /**
   * Finds the active prompt for a content type.
   */
  async findActive(contentType: PromptTemplateRecord["contentType"]): Promise<PromptTemplateRecord | null> {
    const row = await this.db
      .prepare("select * from ai_prompt_templates where content_type = ? and active = 1 order by version desc limit 1")
      .bind(contentType)
      .first<PromptRow>()
    return row ? mapPromptRow(row) : null
  }

  /**
   * Finds a prompt by ID.
   */
  async findById(id: string): Promise<PromptTemplateRecord | null> {
    const row = await this.db.prepare("select * from ai_prompt_templates where id = ?").bind(id).first<PromptRow>()
    return row ? mapPromptRow(row) : null
  }
}

/**
 * D1 repository for provider health checks.
 */
export class AiProviderCheckRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * Stores a provider check result.
   */
  async create(record: {
    id: string
    provider: AiProviderName
    status: "ok" | "failed"
    latencyMs: number
    model: string
    errorMessage: string | null
    checkedAt: string
  }): Promise<void> {
    const result = await this.db
      .prepare(
        "insert into ai_provider_checks (id, provider, status, latency_ms, model, error_message, checked_at) values (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        record.id,
        record.provider,
        record.status,
        record.latencyMs,
        record.model,
        record.errorMessage,
        record.checkedAt
      )
      .run()
    if (!result.success) throw new Error(result.error ?? "Provider check create failed")
  }
}
