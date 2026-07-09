import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import { approvalTarget, assertSchedulable, assertValidTransition, rejectionTarget } from "./workflow"
import type {
  ContentAuditEventRecord,
  ContentRecord,
  ContentStatus,
  ContentVersionRecord,
  CreateContentInput,
  EditorialQueueRecord,
  InternalLinkRecord,
  PublicationQueueRecord,
  ReviewQueueRecord,
  UpdateContentInput
} from "./types"
import type {
  ContentAuditRepository,
  ContentRepository,
  ContentVersionRepository,
  EditorialQueueRepository,
  InternalLinkRepository,
  PublicationQueueRepository,
  ReviewQueueRepository
} from "./repositories"

/**
 * Coordinates content repository, lifecycle, versioning, queue, and audit operations.
 */
export class ContentPipelineService {
  constructor(
    private readonly content: ContentRepository,
    private readonly versions: ContentVersionRepository,
    private readonly editorialQueue: EditorialQueueRepository,
    private readonly reviewQueue: ReviewQueueRepository,
    private readonly publicationQueue: PublicationQueueRepository,
    private readonly internalLinks: InternalLinkRepository,
    private readonly audit: ContentAuditRepository,
    private readonly logger: Logger
  ) {}

  /**
   * Lists content assets.
   */
  async listContent(limit: number, offset: number): Promise<ContentRecord[]> {
    return this.content.list(limit, offset)
  }

  /**
   * Gets one content asset.
   */
  async getContent(id: string): Promise<ContentRecord> {
    const record = await this.content.findById(id)
    if (!record) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" })
    return record
  }

  /**
   * Creates a content asset and its initial immutable version.
   */
  async createContent(input: CreateContentInput, actor: string, requestId: string): Promise<ContentRecord> {
    const timestamp = new Date().toISOString()
    const record: ContentRecord = {
      id: crypto.randomUUID(),
      title: input.title,
      slug: input.slug,
      status: input.status ?? "DISCOVERED",
      contentType: input.contentType,
      language: input.language,
      canonicalUrl: input.canonicalUrl,
      targetKeyword: input.targetKeyword,
      entities: input.entities,
      internalLinks: input.internalLinks,
      schemaType: input.schemaType,
      readingTimeMinutes: input.readingTimeMinutes,
      wordCount: input.wordCount,
      seoMetadata: input.seoMetadata,
      aiSummary: input.aiSummary,
      publishingTargets: input.publishingTargets,
      body: input.body,
      currentVersion: 1,
      scheduledAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await this.content.create(record)
    await this.versions.create(this.toVersion(record, actor, timestamp))
    await this.replaceInternalLinks(record, timestamp)
    await this.editorialQueue.upsert(this.toEditorialQueue(record, timestamp))
    await this.audit.create(this.toAudit(record.id, "content.created", null, record.status, actor, {}, timestamp))
    this.logger.info("Content asset created", { contentId: record.id, status: record.status }, requestId)
    return record
  }

  /**
   * Edits a content asset and records a new immutable version.
   */
  async updateContent(id: string, input: UpdateContentInput, actor: string, requestId: string): Promise<ContentRecord> {
    const existing = await this.getContent(id)
    const timestamp = new Date().toISOString()
    const nextStatus: ContentStatus = existing.status === "PUBLISHED" ? "UPDATED" : existing.status
    const updated: ContentRecord = {
      ...existing,
      ...input,
      status: nextStatus,
      currentVersion: existing.currentVersion + 1,
      updatedAt: timestamp
    }
    if (existing.status !== nextStatus) assertValidTransition(existing.status, nextStatus)
    await this.content.update(updated)
    await this.versions.create(this.toVersion(updated, actor, timestamp))
    await this.replaceInternalLinks(updated, timestamp)
    await this.audit.create(
      this.toAudit(
        id,
        "content.updated",
        existing.status,
        updated.status,
        actor,
        { version: updated.currentVersion },
        timestamp
      )
    )
    this.logger.info("Content asset updated", { contentId: id, version: updated.currentVersion }, requestId)
    return updated
  }

  /**
   * Archives a content asset.
   */
  async archiveContent(id: string, actor: string, requestId: string): Promise<ContentRecord> {
    return this.transition(id, "ARCHIVED", actor, requestId, "content.archived")
  }

  /**
   * Approves content based on the current lifecycle stage.
   */
  async approveContent(id: string, actor: string, requestId: string): Promise<ContentRecord> {
    const existing = await this.getContent(id)
    return this.transition(id, approvalTarget(existing.status), actor, requestId, "content.approved")
  }

  /**
   * Rejects content back into planning.
   */
  async rejectContent(id: string, actor: string, requestId: string, notes: string | null): Promise<ContentRecord> {
    const existing = await this.getContent(id)
    const updated = await this.transition(id, rejectionTarget(existing.status), actor, requestId, "content.rejected")
    await this.reviewQueue.upsert(
      this.toReviewQueue(updated.id, "rejected", actor, "rejected", notes, new Date().toISOString())
    )
    return updated
  }

  /**
   * Schedules content for a future publisher domain.
   */
  async scheduleContent(
    id: string,
    scheduledAt: string,
    targets: string[],
    actor: string,
    requestId: string
  ): Promise<PublicationQueueRecord> {
    const existing = await this.getContent(id)
    assertSchedulable(existing.status)
    const timestamp = new Date().toISOString()
    const updated = { ...existing, scheduledAt, updatedAt: timestamp }
    await this.content.update(updated)
    const queued: PublicationQueueRecord = {
      id: crypto.randomUUID(),
      contentId: id,
      status: "scheduled",
      targets,
      scheduledAt,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await this.publicationQueue.create(queued)
    await this.audit.create(
      this.toAudit(
        id,
        "content.scheduled",
        existing.status,
        existing.status,
        actor,
        { scheduledAt, targets },
        timestamp
      )
    )
    this.logger.info("Content asset scheduled", { contentId: id, scheduledAt, targets }, requestId)
    return queued
  }

  /**
   * Rolls content back to a previous immutable version.
   */
  async rollbackContent(id: string, versionNumber: number, actor: string, requestId: string): Promise<ContentRecord> {
    const existing = await this.getContent(id)
    const version = await this.versions.find(id, versionNumber)
    if (!version)
      throw new AppError({ status: 404, code: "content_version_not_found", message: "Content version was not found" })
    const timestamp = new Date().toISOString()
    const restored: ContentRecord = {
      ...existing,
      ...version.metadata,
      title: version.title,
      body: version.body,
      currentVersion: existing.currentVersion + 1,
      updatedAt: timestamp
    }
    await this.content.update(restored)
    await this.versions.create(this.toVersion(restored, actor, timestamp))
    await this.replaceInternalLinks(restored, timestamp)
    await this.audit.create(
      this.toAudit(id, "content.rolled_back", existing.status, restored.status, actor, { versionNumber }, timestamp)
    )
    this.logger.info("Content asset rolled back", { contentId: id, versionNumber }, requestId)
    return restored
  }

  /**
   * Lists editorial queue records.
   */
  async listEditorialQueue(limit: number): Promise<EditorialQueueRecord[]> {
    return this.editorialQueue.list(limit)
  }

  /**
   * Lists publication queue records.
   */
  async listPublicationQueue(limit: number): Promise<PublicationQueueRecord[]> {
    return this.publicationQueue.list(limit)
  }

  private async transition(
    id: string,
    to: ContentStatus,
    actor: string,
    requestId: string,
    action: string
  ): Promise<ContentRecord> {
    const existing = await this.getContent(id)
    assertValidTransition(existing.status, to)
    const timestamp = new Date().toISOString()
    const updated = { ...existing, status: to, updatedAt: timestamp }
    await this.content.update(updated)
    if (to === "REVIEW_REQUIRED")
      await this.reviewQueue.upsert(this.toReviewQueue(id, "pending", null, null, null, timestamp))
    await this.audit.create(this.toAudit(id, action, existing.status, to, actor, {}, timestamp))
    this.logger.info("Content lifecycle transition completed", { contentId: id, from: existing.status, to }, requestId)
    return updated
  }

  private toVersion(record: ContentRecord, actor: string, timestamp: string): ContentVersionRecord {
    return {
      id: crypto.randomUUID(),
      contentId: record.id,
      versionNumber: record.currentVersion,
      title: record.title,
      body: record.body,
      metadata: {
        title: record.title,
        slug: record.slug,
        status: record.status,
        contentType: record.contentType,
        language: record.language,
        canonicalUrl: record.canonicalUrl,
        targetKeyword: record.targetKeyword,
        entities: record.entities,
        internalLinks: record.internalLinks,
        schemaType: record.schemaType,
        readingTimeMinutes: record.readingTimeMinutes,
        wordCount: record.wordCount,
        seoMetadata: record.seoMetadata,
        aiSummary: record.aiSummary,
        publishingTargets: record.publishingTargets,
        body: record.body,
        scheduledAt: record.scheduledAt
      },
      createdBy: actor,
      createdAt: timestamp
    }
  }

  private toEditorialQueue(record: ContentRecord, timestamp: string): EditorialQueueRecord {
    return {
      id: crypto.randomUUID(),
      contentId: record.id,
      status: "open",
      priority: record.status === "DISCOVERED" ? 50 : 25,
      assignedTo: null,
      dueAt: null,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  private toReviewQueue(
    contentId: string,
    status: ReviewQueueRecord["status"],
    reviewer: string | null,
    decision: string | null,
    notes: string | null,
    timestamp: string
  ): ReviewQueueRecord {
    return {
      id: crypto.randomUUID(),
      contentId,
      status,
      reviewer,
      decision,
      notes,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  private toAudit(
    contentId: string,
    action: string,
    fromStatus: ContentStatus | null,
    toStatus: ContentStatus | null,
    actor: string,
    metadata: Record<string, unknown>,
    timestamp: string
  ): ContentAuditEventRecord {
    return { id: crypto.randomUUID(), contentId, action, fromStatus, toStatus, actor, metadata, createdAt: timestamp }
  }

  private async replaceInternalLinks(record: ContentRecord, timestamp: string): Promise<void> {
    const links: InternalLinkRecord[] = record.internalLinks.map((link) => ({
      id: crypto.randomUUID(),
      sourceContentId: record.id,
      ...(link.targetContentId ? { targetContentId: link.targetContentId } : {}),
      targetUrl: link.targetUrl,
      anchorText: link.anchorText,
      createdAt: timestamp
    }))
    await this.internalLinks.replaceForContent(record.id, links)
  }
}
