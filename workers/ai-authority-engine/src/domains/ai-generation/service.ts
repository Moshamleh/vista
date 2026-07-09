import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import type { AiBudgetManager } from "../../operations/cost-management"
import type { ContentPipelineService } from "../content-pipeline/service"
import type { ContentRepository } from "../content-pipeline/repositories"
import type { CreateContentInput } from "../content-pipeline/types"
import type { QuestionRepository } from "../question-discovery/repositories"
import { createDefaultPromptTemplate, inheritPrompt, renderPrompt, serializeRagContext } from "./prompts"
import type { AiProviderRegistry } from "./providers"
import { RagContextBuilder } from "./rag"
import type {
  AiProviderName,
  GenerateRequestInput,
  GenerationJobRecord,
  GenerationMetadata,
  PromptTemplateRecord
} from "./types"
import { toContentRepositoryType } from "./types"
import type { AiProviderCheckRepository, GenerationJobRepository, PromptTemplateRepository } from "./repositories"
import { validateGeneratedDraft } from "./validation"

/**
 * Coordinates internal RAG, provider execution, validation, queue jobs, and draft storage.
 */
export class AiGenerationService {
  constructor(
    private readonly providerRegistry: AiProviderRegistry,
    private readonly jobs: GenerationJobRepository,
    private readonly prompts: PromptTemplateRepository,
    private readonly providerChecks: AiProviderCheckRepository,
    private readonly questions: QuestionRepository,
    private readonly content: ContentRepository,
    private readonly contentPipeline: ContentPipelineService,
    private readonly activeProvider: AiProviderName,
    private readonly activeModel: string,
    private readonly timeoutMs: number,
    private readonly logger: Logger,
    private readonly budgets: AiBudgetManager
  ) {}

  /**
   * Creates a generation job and optionally executes it immediately.
   */
  async createJob(input: GenerateRequestInput, actor: string, requestId: string): Promise<GenerationJobRecord> {
    const timestamp = new Date().toISOString()
    const ragContext = await new RagContextBuilder(this.questions, this.content).build(input.question)
    const prompt = await this.resolvePrompt(input.contentType, timestamp)
    const job: GenerationJobRecord = {
      id: crypto.randomUUID(),
      contentId: input.contentId,
      questionId: input.questionId,
      status: "queued",
      contentType: input.contentType,
      question: input.question,
      provider: this.activeProvider,
      model: this.activeModel,
      promptTemplateId: prompt.id,
      promptVersion: prompt.version,
      ragContext,
      generatedContent: null,
      validation: null,
      generationMetadata: null,
      retryCount: 0,
      maxRetries: 2,
      cancellationReason: null,
      errorMessage: null,
      startedAt: null,
      completedAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await this.jobs.create(job)
    this.logger.info("AI generation job created", { jobId: job.id, contentType: job.contentType }, requestId)
    if (!input.async) return this.processJob(job.id, actor, requestId, input.minWordCount)
    return job
  }

  /**
   * Executes a queued generation job.
   */
  async processJob(jobId: string, actor: string, requestId: string, minWordCount = 800): Promise<GenerationJobRecord> {
    const job = await this.getJob(jobId)
    if (job.status === "cancelled") return job
    if (job.status === "completed") return job
    const started = Date.now()
    const running = {
      ...job,
      status: "running" as const,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await this.jobs.update(running)

    try {
      const prompt = await this.getPrompt(running.promptTemplateId)
      const rendered = this.renderJobPrompt(prompt, running, minWordCount)
      const provider = this.providerRegistry.resolve(running.provider)
      await this.budgets.assertBudgetAvailable(running.provider, actor)
      const providerResult = await provider.generate({
        model: running.model,
        systemPrompt: rendered.systemPrompt,
        userPrompt: rendered.userPrompt,
        timeoutMs: this.timeoutMs
      })
      await this.budgets.recordUsage(
        {
          provider: running.provider,
          subject: actor,
          totalTokens: providerResult.tokenUsage?.totalTokens ?? 0
        },
        requestId
      )
      const existingContent = await this.content.list(100, 0)
      const validation = validateGeneratedDraft({
        draft: providerResult.draft,
        minWordCount,
        ragContext: running.ragContext,
        existingContent
      })
      if (validation.errors.length > 0) {
        throw new AppError({
          status: 422,
          code: "generation_quality_failed",
          message: "Generated draft failed quality validation",
          details: { errors: validation.errors }
        })
      }
      const contentId = await this.storeDraft(running, providerResult.draft, actor, requestId)
      const metadata: GenerationMetadata = {
        model: providerResult.model,
        provider: providerResult.provider,
        promptVersion: running.promptVersion,
        generationTimeMs: Date.now() - started,
        tokenUsage: providerResult.tokenUsage ?? null,
        validationScore: validation.score,
        contentScore: validation.contentScore
      }
      const completed: GenerationJobRecord = {
        ...running,
        contentId,
        status: "completed",
        generatedContent: providerResult.draft,
        validation,
        generationMetadata: metadata,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await this.jobs.update(completed)
      this.logger.info(
        "AI generation job completed",
        { jobId, contentId, validationScore: validation.score },
        requestId
      )
      return completed
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation job failed"
      const retryCount = running.retryCount + 1
      const failed: GenerationJobRecord = {
        ...running,
        status: retryCount <= running.maxRetries ? "queued" : "failed",
        retryCount,
        errorMessage: message,
        completedAt: retryCount <= running.maxRetries ? null : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await this.jobs.update(failed)
      this.logger.error("AI generation job failed", { jobId, retryCount, message }, requestId)
      if (failed.status === "queued") return failed
      throw error
    }
  }

  /**
   * Cancels a generation job that has not completed.
   */
  async cancelJob(id: string, reason: string, requestId: string): Promise<GenerationJobRecord> {
    const job = await this.getJob(id)
    if (job.status === "completed") {
      throw new AppError({
        status: 409,
        code: "generation_job_completed",
        message: "Completed generation jobs cannot be cancelled"
      })
    }
    const cancelled = {
      ...job,
      status: "cancelled" as const,
      cancellationReason: reason,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await this.jobs.update(cancelled)
    this.logger.info("AI generation job cancelled", { jobId: id, reason }, requestId)
    return cancelled
  }

  /**
   * Lists generation jobs.
   */
  async listJobs(limit: number): Promise<GenerationJobRecord[]> {
    return this.jobs.list(limit)
  }

  /**
   * Gets one generation job.
   */
  async getJob(id: string): Promise<GenerationJobRecord> {
    const job = await this.jobs.findById(id)
    if (!job)
      throw new AppError({ status: 404, code: "generation_job_not_found", message: "Generation job was not found" })
    return job
  }

  /**
   * Lists configured provider names.
   */
  listProviders(): { active: AiProviderName; providers: AiProviderName[]; model: string } {
    return { active: this.activeProvider, providers: this.providerRegistry.list(), model: this.activeModel }
  }

  /**
   * Tests the active provider and records the check.
   */
  async testProvider(requestId: string): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }> {
    const provider = this.providerRegistry.resolve(this.activeProvider)
    const result = await provider.test(this.activeModel, this.timeoutMs)
    await this.providerChecks.create({
      id: crypto.randomUUID(),
      provider: this.activeProvider,
      status: result.ok ? "ok" : "failed",
      latencyMs: result.latencyMs,
      model: this.activeModel,
      errorMessage: result.errorMessage,
      checkedAt: new Date().toISOString()
    })
    this.logger.info("AI provider check completed", { provider: this.activeProvider, ok: result.ok }, requestId)
    return result
  }

  private async resolvePrompt(
    contentType: GenerationJobRecord["contentType"],
    timestamp: string
  ): Promise<PromptTemplateRecord> {
    const existing = await this.prompts.findActive(contentType)
    if (existing) return existing
    const created = createDefaultPromptTemplate(contentType, timestamp)
    await this.prompts.upsert(created)
    return created
  }

  private async getPrompt(id: string): Promise<PromptTemplateRecord> {
    const prompt = await this.prompts.findById(id)
    if (!prompt)
      throw new AppError({ status: 404, code: "prompt_template_not_found", message: "Prompt template was not found" })
    if (!prompt.parentId) return prompt
    return inheritPrompt(prompt, await this.prompts.findById(prompt.parentId))
  }

  private renderJobPrompt(
    prompt: PromptTemplateRecord,
    job: GenerationJobRecord,
    minWordCount: number
  ): { systemPrompt: string; userPrompt: string } {
    const variables = {
      question: job.question,
      contentType: job.contentType,
      targetKeyword: job.question,
      minWordCount: String(minWordCount),
      language: "en",
      ragContext: serializeRagContext(job.ragContext)
    }
    return {
      systemPrompt: renderPrompt(prompt.systemPrompt, variables),
      userPrompt: renderPrompt(prompt.userPrompt, variables)
    }
  }

  private async storeDraft(
    job: GenerationJobRecord,
    draft: GenerationJobRecord["generatedContent"],
    actor: string,
    requestId: string
  ): Promise<string> {
    if (!draft) throw new AppError({ status: 500, code: "draft_missing", message: "Generated draft is missing" })
    const input: CreateContentInput = {
      title: draft.title,
      slug: draft.slug,
      status: "GENERATED",
      contentType: toContentRepositoryType(job.contentType),
      language: "en",
      canonicalUrl: null,
      targetKeyword: job.question,
      entities: draft.entities,
      internalLinks: draft.internalLinks,
      schemaType: draft.schemaType,
      readingTimeMinutes: draft.readingTimeMinutes,
      wordCount: draft.wordCount,
      seoMetadata: { title: draft.seoTitle, description: draft.seoDescription },
      aiSummary: draft.aiSummary,
      publishingTargets: ["content-repository"],
      body: draft.body
    }
    if (job.contentId) {
      await this.contentPipeline.updateContent(job.contentId, input, actor, requestId)
      return job.contentId
    }
    const created = await this.contentPipeline.createContent(input, actor, requestId)
    return created.id
  }
}
