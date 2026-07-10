import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import { defaultEntityDefinitions } from "./config"
import { extractEntities } from "./entities"
import { classifyIntent } from "./intent"
import { canonicalizeQuestion, deduplicateQuestions, detectLanguage, generateSlug } from "./normalization"
import type { DiscoveryProviderRegistry, ProviderRateLimiter } from "./providers"
import { calculatePriorityScore } from "./scoring"
import type { DiscoveryRunRecord, DiscoveryRunRequest, ProviderQuestion, QuestionRecord } from "./types"
import type { DiscoveryRunRepository, EntityRepository, ProviderRepository, QuestionRepository } from "./repositories"

/**
 * Coordinates provider discovery, normalization, scoring, and persistence.
 */
export class QuestionDiscoveryService {
  constructor(
    private readonly providers: DiscoveryProviderRegistry,
    private readonly providerRateLimiter: ProviderRateLimiter,
    private readonly questions: QuestionRepository,
    private readonly runs: DiscoveryRunRepository,
    private readonly providerRecords: ProviderRepository,
    private readonly entities: EntityRepository,
    private readonly logger: Logger
  ) {}

  /**
   * Runs discovery and persists normalized questions.
   */
  async runDiscovery(request: DiscoveryRunRequest, requestId: string): Promise<DiscoveryRunRecord> {
    const startedAt = new Date().toISOString()
    const run: DiscoveryRunRecord = {
      id: crypto.randomUUID(),
      seed: request.seed,
      status: "running",
      providers: request.providers,
      questionCount: 0,
      errorMessage: null,
      startedAt,
      finishedAt: null
    }
    await this.entities.upsertMany(defaultEntityDefinitions)
    await this.runs.create(run)

    try {
      const providerQuestions: ProviderQuestion[] = []
      for (const provider of this.providers.resolve(request.providers)) {
        await this.providerRateLimiter.enforce(provider.name)
        const discovered = await provider.discover(request)
        providerQuestions.push(...discovered)
        await this.providerRecords.upsert({ name: provider.name, enabled: true, lastRunAt: new Date().toISOString() })
      }

      const normalized = this.toQuestionRecords(deduplicateQuestions(providerQuestions), request, run.id)
      for (const question of normalized) await this.questions.upsert(question)

      const completed = {
        ...run,
        status: "completed" as const,
        questionCount: normalized.length,
        finishedAt: new Date().toISOString()
      }
      await this.runs.update(completed)
      this.logger.info(
        "Question discovery completed",
        { runId: run.id, questionCount: completed.questionCount },
        requestId
      )
      return completed
    } catch (error) {
      const message = error instanceof Error ? error.message : "Question discovery failed"
      const failed = { ...run, status: "failed" as const, errorMessage: message, finishedAt: new Date().toISOString() }
      await this.runs.update(failed)
      this.logger.error("Question discovery failed", { runId: run.id, message }, requestId)
      throw error
    }
  }

  /**
   * Lists persisted questions.
   */
  async listQuestions(limit: number, offset: number): Promise<QuestionRecord[]> {
    return this.questions.list(limit, offset)
  }

  /**
   * Gets one persisted question.
   */
  async getQuestion(id: string): Promise<QuestionRecord> {
    const question = await this.questions.findById(id)
    if (!question) throw new AppError({ status: 404, code: "question_not_found", message: "Question was not found" })
    return question
  }

  /**
   * Persists one manually supplied question.
   */
  async createQuestion(
    question: string,
    market: DiscoveryRunRequest["market"],
    sourceRunId: string
  ): Promise<QuestionRecord> {
    const request = { market, language: detectLanguage(question), limit: 1 } as const
    const [record] = this.toQuestionRecords(
      [{ question, sourceProvider: "manual-import", searchDemand: 0.5, freshnessScore: 1 }],
      request,
      sourceRunId
    )
    if (!record) throw new AppError({ status: 400, code: "invalid_question", message: "Question is required" })
    await this.questions.upsert(record)
    return record
  }

  /**
   * Lists latest discovery runs.
   */
  async listRuns(limit: number): Promise<DiscoveryRunRecord[]> {
    return this.runs.listLatest(limit)
  }

  /**
   * Returns aggregate statistics.
   */
  async getStats(): Promise<{ latestRuns: DiscoveryRunRecord[]; topQuestions: QuestionRecord[] }> {
    return {
      latestRuns: await this.runs.listLatest(10),
      topQuestions: await this.questions.list(10, 0)
    }
  }

  private toQuestionRecords(
    providerQuestions: ProviderQuestion[],
    request: Pick<DiscoveryRunRequest, "market" | "language" | "limit">,
    runId: string
  ): QuestionRecord[] {
    const timestamp = new Date().toISOString()
    return providerQuestions.slice(0, request.limit).map((item) => {
      const canonicalQuestion = canonicalizeQuestion(item.question)
      const entities = extractEntities(canonicalQuestion)
      const intent = classifyIntent(canonicalQuestion)
      const searchDemand = item.searchDemand ?? 0.4
      const freshnessScore = item.freshnessScore ?? 0.7
      const existingCoverageScore = 0
      return {
        id: crypto.randomUUID(),
        question: item.question.endsWith("?") || item.question.endsWith("؟") ? item.question : `${item.question}?`,
        canonicalQuestion,
        slug: generateSlug(canonicalQuestion),
        language: request.language,
        market: request.market,
        intent,
        priorityScore: calculatePriorityScore({
          intent,
          entities,
          searchDemand,
          freshnessScore,
          existingCoverageScore
        }),
        searchDemand,
        freshnessScore,
        existingCoverageScore,
        entities,
        sourceProvider: item.sourceProvider,
        sourceRunId: runId,
        firstSeenAt: timestamp,
        lastSeenAt: timestamp
      }
    })
  }
}
