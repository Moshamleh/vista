import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import type { ContentRepository } from "../content-pipeline/repositories"
import type { ContentRecord } from "../content-pipeline/types"
import type { PublisherRegistry } from "./providers"
import { buildPublishPackage, validatePublishPackage } from "./transform"
import type { PublishJobRecord, PublisherName, PublishResult } from "./types"
import type {
  PublishArtifactRepository,
  PublishFailureRepository,
  PublishHistoryRepository,
  PublishJobRepository,
  PublishTargetRepository
} from "./repositories"

const publishableStatuses = new Set(["APPROVED_FOR_PUBLISHING", "PUBLISHED", "UPDATED"])

/**
 * Coordinates publisher queueing, provider execution, verification persistence, retries, and cancellation.
 */
export class PublisherService {
  constructor(
    private readonly registry: PublisherRegistry,
    private readonly content: ContentRepository,
    private readonly jobs: PublishJobRepository,
    private readonly targets: PublishTargetRepository,
    private readonly history: PublishHistoryRepository,
    private readonly failures: PublishFailureRepository,
    private readonly artifacts: PublishArtifactRepository,
    private readonly websiteBaseUrl: string,
    private readonly defaultTargets: PublisherName[],
    private readonly timeoutMs: number,
    private readonly logger: Logger
  ) {}

  /**
   * Creates and optionally executes a publish job.
   */
  async createJob(
    contentId: string,
    targets: PublisherName[] | null,
    asyncJob: boolean,
    requestId: string
  ): Promise<PublishJobRecord> {
    const content = await this.getPublishableContent(contentId)
    const pkg = buildPublishPackage(content, this.websiteBaseUrl)
    validatePublishPackage(pkg)
    const timestamp = new Date().toISOString()
    const selectedTargets = this.normalizeTargets(targets ?? this.defaultTargets)
    const job: PublishJobRecord = {
      id: crypto.randomUUID(),
      contentId,
      status: "pending",
      targets: selectedTargets,
      canonicalUrl: pkg.canonicalUrl,
      attemptCount: 0,
      maxRetries: 3,
      errorMessage: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      startedAt: null,
      completedAt: null
    }
    await this.jobs.create(job)
    await this.ensureTargets(selectedTargets, timestamp)
    this.logger.info("Publish job created", { jobId: job.id, contentId, targets: selectedTargets }, requestId)
    return asyncJob ? job : this.processJob(job.id, requestId)
  }

  /**
   * Processes a publish job.
   */
  async processJob(jobId: string, requestId: string): Promise<PublishJobRecord> {
    const job = await this.getJob(jobId)
    if (job.status === "cancelled" || job.status === "succeeded") return job
    const content = await this.getPublishableContent(job.contentId)
    const pkg = buildPublishPackage(content, this.websiteBaseUrl)
    validatePublishPackage(pkg)
    const running = {
      ...job,
      status: "running" as const,
      attemptCount: job.attemptCount + 1,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await this.jobs.update(running)

    try {
      const results: PublishResult[] = []
      for (const target of running.targets) {
        const result = await this.registry
          .resolve(target)
          .publish({ package: pkg, attemptCount: running.attemptCount, timeoutMs: this.timeoutMs })
        await this.persistResult(running, content, result)
        results.push(result)
      }
      const completed = {
        ...running,
        status: "succeeded" as const,
        errorMessage: null,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await this.jobs.update(completed)
      this.logger.info("Publish job succeeded", { jobId, resultCount: results.length }, requestId)
      return completed
    } catch (error) {
      const message = error instanceof Error ? error.message : "Publish job failed"
      const retryAt = new Date(Date.now() + Math.min(60_000 * running.attemptCount, 300_000)).toISOString()
      await this.failures.create({
        id: crypto.randomUUID(),
        jobId,
        contentId: running.contentId,
        publisher: running.targets[0] ?? "website",
        attempt: running.attemptCount,
        errorCode: error instanceof AppError ? error.code : "publisher_error",
        errorMessage: message,
        retryAt: running.attemptCount < running.maxRetries ? retryAt : null,
        createdAt: new Date().toISOString()
      })
      const failed = {
        ...running,
        status: running.attemptCount < running.maxRetries ? ("retry" as const) : ("failed" as const),
        errorMessage: message,
        completedAt: running.attemptCount < running.maxRetries ? null : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await this.jobs.update(failed)
      this.logger.error("Publish job failed", { jobId, attempt: running.attemptCount, message }, requestId)
      if (failed.status === "retry") return failed
      throw error
    }
  }

  /**
   * Retries an existing publish job for the supplied content.
   */
  async retryContent(contentId: string, requestId: string): Promise<PublishJobRecord> {
    const jobs = await this.jobs.list(100)
    const job = jobs.find(
      (item) => item.contentId === contentId && (item.status === "failed" || item.status === "retry")
    )
    if (!job)
      throw new AppError({ status: 404, code: "publish_job_not_found", message: "No retryable publish job was found" })
    return this.processJob(job.id, requestId)
  }

  /**
   * Cancels a publish job.
   */
  async cancelJob(jobId: string, requestId: string): Promise<PublishJobRecord> {
    const job = await this.getJob(jobId)
    if (job.status === "succeeded")
      throw new AppError({ status: 409, code: "publish_job_succeeded", message: "Succeeded jobs cannot be cancelled" })
    const cancelled = {
      ...job,
      status: "cancelled" as const,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await this.jobs.update(cancelled)
    this.logger.info("Publish job cancelled", { jobId }, requestId)
    return cancelled
  }

  /**
   * Lists publish jobs.
   */
  async listJobs(limit: number): Promise<PublishJobRecord[]> {
    return this.jobs.list(limit)
  }

  /**
   * Gets a publish job.
   */
  async getJob(id: string): Promise<PublishJobRecord> {
    const job = await this.jobs.findById(id)
    if (!job) throw new AppError({ status: 404, code: "publish_job_not_found", message: "Publish job was not found" })
    return job
  }

  /**
   * Lists available publishers.
   */
  listProviders(): { providers: PublisherName[]; defaultTargets: PublisherName[] } {
    return { providers: this.registry.list(), defaultTargets: this.defaultTargets }
  }

  /**
   * Tests every publisher provider.
   */
  async testProviders(): Promise<
    { publisher: PublisherName; ok: boolean; latencyMs: number; errorMessage: string | null }[]
  > {
    const results = []
    for (const publisher of this.registry.list()) {
      const result = await this.registry.resolve(publisher).test(this.timeoutMs)
      results.push({ publisher, ...result })
    }
    return results
  }

  private async getPublishableContent(id: string): Promise<ContentRecord> {
    const content = await this.content.findById(id)
    if (!content) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" })
    if (!publishableStatuses.has(content.status)) {
      throw new AppError({
        status: 409,
        code: "content_not_publishable",
        message: "Content must be approved for publishing before publication"
      })
    }
    return content
  }

  private normalizeTargets(targets: PublisherName[]): PublisherName[] {
    const selected = Array.from(new Set<PublisherName>(["website", ...targets]))
    for (const target of selected) this.registry.resolve(target)
    return selected
  }

  private async ensureTargets(targets: PublisherName[], timestamp: string): Promise<void> {
    for (const target of targets) {
      await this.targets.upsert({
        id: crypto.randomUUID(),
        name: target,
        enabled: true,
        endpoint: null,
        config: {},
        createdAt: timestamp,
        updatedAt: timestamp
      })
    }
  }

  private async persistResult(job: PublishJobRecord, content: ContentRecord, result: PublishResult): Promise<void> {
    const timestamp = new Date().toISOString()
    await this.history.create({
      id: crypto.randomUUID(),
      jobId: job.id,
      contentId: job.contentId,
      publisher: result.publisher,
      version: content.currentVersion,
      status: "succeeded",
      publishedUrl: result.publishedUrl,
      canonicalUrl: result.canonicalUrl,
      platformId: result.platformId,
      publishedAt: result.publishedAt,
      checksum: result.checksum,
      responseMetadata: result.responseMetadata,
      publishingMetadata: result.publishingMetadata,
      latencyMs: result.publishingMetadata.latencyMs,
      createdAt: timestamp
    })
    for (const artifact of result.artifacts) {
      await this.artifacts.create({
        id: crypto.randomUUID(),
        jobId: job.id,
        contentId: job.contentId,
        publisher: artifact.publisher,
        format: artifact.format,
        body: artifact.body,
        checksum: artifact.checksum,
        createdAt: timestamp
      })
    }
  }
}
