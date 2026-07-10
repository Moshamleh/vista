import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import type { ContentRepository } from "../content-pipeline/repositories"
import type { ContentRecord } from "../content-pipeline/types"
import { generateAiResources } from "./ai-resources"
import { buildEntityGraph } from "./entity-graph"
import { recommendInternalLinks } from "./internal-linking"
import { generateGeoMetadata } from "./metadata-engine"
import type {
  GeoOptimizationResult,
  GeoReportRecord,
  GeoValidationResult,
  InternalLinkGraphRecord,
  OptimizationHistoryRecord
} from "./types"
import { generateSchemaDocuments } from "./schema-engine"
import type {
  EntityGraphRepository,
  GeoReportRepository,
  InternalLinkGraphRepository,
  OptimizationHistoryRepository,
  SchemaDocumentRepository
} from "./repositories"
import { validateGeoReadiness } from "./validation"

/**
 * Coordinates GEO optimization, persistence, and validation.
 */
export class GeoOptimizationService {
  constructor(
    private readonly content: ContentRepository,
    private readonly entities: EntityGraphRepository,
    private readonly schemas: SchemaDocumentRepository,
    private readonly reports: GeoReportRepository,
    private readonly links: InternalLinkGraphRepository,
    private readonly history: OptimizationHistoryRepository,
    private readonly websiteBaseUrl: string,
    private readonly logger: Logger
  ) {}

  /** Returns GEO engine status. */
  async getStatus(): Promise<{ status: "ready"; optimizedReports: number; entityCount: number }> {
    return {
      status: "ready",
      optimizedReports: (await this.content.list(100, 0)).length,
      entityCount: (await this.entities.list(100)).length
    }
  }

  /** Lists known entities. */
  async listEntities(limit: number): Promise<ReturnType<EntityGraphRepository["list"]>> {
    return this.entities.list(limit)
  }

  /** Gets or creates schema documents for content. */
  async getSchema(contentId: string): Promise<Record<string, unknown>[]> {
    const existing = await this.schemas.listForContent(contentId)
    if (existing.length > 0) return existing.map((schema) => schema.jsonLd)
    const result = await this.optimize(contentId, "schema.generated")
    return result.schemas.map((schema) => schema.jsonLd)
  }

  /** Optimizes one content asset. */
  async optimize(contentId: string, requestId: string): Promise<GeoOptimizationResult> {
    const content = await this.getContent(contentId)
    const allContent = await this.content.list(100, 0)
    const related = allContent.filter((item) => item.id !== content.id)
    const canonicalUrl = this.canonicalUrl(content)
    const entities = buildEntityGraph(content, related)
    const schemas = await generateSchemaDocuments(content, canonicalUrl, entities)
    const metadata = generateGeoMetadata(content, canonicalUrl, entities)
    const aiResources = generateAiResources(content, canonicalUrl, entities, schemas)
    const linkRecommendations = recommendInternalLinks(content, related)
    const validation = validateGeoReadiness({
      content,
      canonicalUrl,
      entities,
      schemas,
      metadata,
      links: linkRecommendations
    })
    const timestamp = new Date().toISOString()
    const report: GeoReportRecord = {
      id: crypto.randomUUID(),
      contentId,
      status: validation.errors.length === 0 ? "optimized" : "needs_work",
      score: validation.score,
      validation,
      metadata,
      aiResources,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await this.entities.upsertMany(entities)
    await this.schemas.replaceForContent(contentId, schemas)
    await this.links.replaceForContent(
      contentId,
      linkRecommendations.map(
        (link) => ({ id: crypto.randomUUID(), createdAt: timestamp, ...link }) satisfies InternalLinkGraphRecord
      )
    )
    await this.reports.upsert(report)
    await this.history.create(
      this.historyRecord(
        contentId,
        "geo.optimized",
        validation.score,
        { schemaCount: schemas.length, entityCount: entities.length },
        timestamp
      )
    )
    this.logger.info("GEO optimization completed", { contentId, score: validation.score }, requestId)
    return { content, entities, schemas, metadata, aiResources, links: linkRecommendations, validation, report }
  }

  /** Validates one content asset without persisting a new report. */
  async validate(contentId: string): Promise<GeoValidationResult> {
    const content = await this.getContent(contentId)
    const related = (await this.content.list(100, 0)).filter((item) => item.id !== content.id)
    const canonicalUrl = this.canonicalUrl(content)
    const entities = buildEntityGraph(content, related)
    const schemas = await generateSchemaDocuments(content, canonicalUrl, entities)
    const metadata = generateGeoMetadata(content, canonicalUrl, entities)
    const links = recommendInternalLinks(content, related)
    return validateGeoReadiness({ content, canonicalUrl, entities, schemas, metadata, links })
  }

  /** Gets a persisted GEO report or creates one. */
  async getReport(contentId: string, requestId: string): Promise<GeoReportRecord> {
    const existing = await this.reports.findByContentId(contentId)
    if (existing) return existing
    return (await this.optimize(contentId, requestId)).report
  }

  private async getContent(contentId: string): Promise<ContentRecord> {
    const content = await this.content.findById(contentId)
    if (!content) throw new AppError({ status: 404, code: "content_not_found", message: "Content was not found" })
    return content
  }

  private canonicalUrl(content: ContentRecord): string {
    return content.canonicalUrl ?? `${this.websiteBaseUrl.replace(/\/$/u, "")}/knowledge/${content.slug}`
  }

  private historyRecord(
    contentId: string,
    action: string,
    score: number,
    details: Record<string, unknown>,
    timestamp: string
  ): OptimizationHistoryRecord {
    return { id: crypto.randomUUID(), contentId, action, score, details, createdAt: timestamp }
  }
}
