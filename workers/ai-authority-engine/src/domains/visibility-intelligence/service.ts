import type { Logger } from "../../logger/logger"
import type { ContentRepository } from "../content-pipeline/repositories"
import type { VisibilityProviderRegistry } from "./providers"
import type {
  ValidationRunRecord,
  VisibilityMetrics,
  VisibilityRecommendationInput,
  VisibilityRecommendationRecord,
  VisibilityScanResult,
  VisibilityScoreRecord,
  VisibilitySnapshotRecord
} from "./types"
import type {
  ValidationRunRepository,
  VisibilityContextRepository,
  VisibilityRecommendationRepository,
  VisibilityScoreRepository,
  VisibilitySnapshotRepository
} from "./repositories"

/** Coordinates visibility scans, trends, and recommendations. */
export class VisibilityIntelligenceService {
  constructor(
    private readonly providers: VisibilityProviderRegistry,
    private readonly content: ContentRepository,
    private readonly context: VisibilityContextRepository,
    private readonly snapshots: VisibilitySnapshotRepository,
    private readonly scores: VisibilityScoreRepository,
    private readonly recommendations: VisibilityRecommendationRepository,
    private readonly runs: ValidationRunRepository,
    private readonly websiteBaseUrl: string,
    private readonly logger: Logger
  ) {}

  /** Runs a visibility scan. */
  async scan(requestId: string): Promise<VisibilityScanResult> {
    const startedAt = new Date().toISOString()
    const run: ValidationRunRecord = {
      id: crypto.randomUUID(),
      status: "running",
      startedAt,
      completedAt: null,
      providerCount: this.providers.list().length,
      errorMessage: null
    }
    await this.runs.create(run)
    try {
      const visibilityContext = {
        content: await this.content.list(500, 0),
        geoReports: await this.context.listGeoReports(),
        schemaContentIds: await this.context.listSchemaContentIds(),
        entityContentIds: await this.context.listEntityContentIds(),
        publishedContentIds: await this.context.listPublishedContentIds(),
        aiResourceContentIds: (await this.context.listGeoReports())
          .filter((report) => report.validation.aiRetrievalReady)
          .map((report) => report.contentId),
        websiteBaseUrl: this.websiteBaseUrl
      }
      const providerResults = []
      for (const provider of this.providers.list()) providerResults.push(await provider.measure(visibilityContext))
      const metrics = this.metrics(
        visibilityContext,
        providerResults.map((item) => item.score)
      )
      const aggregateScore = this.aggregate(metrics)
      const snapshot: VisibilitySnapshotRecord = {
        id: crypto.randomUUID(),
        status: "completed",
        aggregateScore,
        providerResults,
        metrics,
        createdAt: new Date().toISOString()
      }
      const scoreRecords = await this.scoreRecords(snapshot)
      const recommendationRecords = [
        ...providerResults.flatMap((result) => result.recommendations),
        ...this.contentRecommendations(visibilityContext)
      ].map((recommendation) => ({
        id: crypto.randomUUID(),
        snapshotId: snapshot.id,
        createdAt: snapshot.createdAt,
        ...recommendation
      }))
      await this.snapshots.create(snapshot)
      await this.scores.createMany(scoreRecords)
      await this.recommendations.createMany(recommendationRecords)
      const completed = { ...run, status: "completed" as const, completedAt: new Date().toISOString() }
      await this.runs.update(completed)
      this.logger.info("Visibility scan completed", { snapshotId: snapshot.id, aggregateScore }, requestId)
      return { run: completed, snapshot, scores: scoreRecords, recommendations: recommendationRecords }
    } catch (error) {
      const failed = {
        ...run,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        errorMessage: error instanceof Error ? error.message : "Visibility scan failed"
      }
      await this.runs.update(failed)
      throw error
    }
  }

  /** Gets current status. */
  async status(): Promise<{ status: "ready"; lastRun: ValidationRunRecord | null }> {
    const [lastRun] = await this.runs.list(1)
    return { status: "ready", lastRun: lastRun ?? null }
  }

  /** Gets latest score. */
  async score(): Promise<VisibilitySnapshotRecord | null> {
    const [snapshot] = await this.snapshots.list(1)
    return snapshot ?? null
  }

  /** Gets history. */
  async history(limit: number): Promise<VisibilitySnapshotRecord[]> {
    return this.snapshots.list(limit)
  }

  /** Gets recommendations. */
  async listRecommendations(limit: number): Promise<VisibilityRecommendationRecord[]> {
    return this.recommendations.list(limit)
  }

  private contentRecommendations(context: {
    content: {
      id: string
      title: string
      canonicalUrl: string | null
      slug: string
      entities: string[]
      internalLinks: unknown[]
    }[]
    schemaContentIds: string[]
    websiteBaseUrl: string
  }): VisibilityRecommendationInput[] {
    const schemaContentIds = new Set(context.schemaContentIds)
    const recommendations: VisibilityRecommendationInput[] = []
    for (const item of context.content) {
      if (item.entities.length === 0) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "missing-entities",
          message: `${item.title} has no mapped entities.`,
          action: "Add organization, service, topic, and UAE location entities."
        })
      } else if (item.entities.length < 2) {
        recommendations.push({
          contentId: item.id,
          severity: "medium",
          category: "weak-topic-cluster",
          message: `${item.title} has weak topic cluster coverage.`,
          action: "Map at least two supporting entities and related service relationships."
        })
      }
      if (item.internalLinks.length === 0) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "orphaned-page",
          message: `${item.title} has no internal links.`,
          action: "Add related articles, FAQs, services, and entity links."
        })
      }
      if (!schemaContentIds.has(item.id)) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "low-schema-coverage",
          message: `${item.title} is missing structured data coverage.`,
          action: "Run GEO optimization to create schema documents for this asset."
        })
      }
      const canonicalUrl = item.canonicalUrl ?? `${context.websiteBaseUrl}/knowledge/${item.slug}`
      if (!canonicalUrl.startsWith("https://")) {
        recommendations.push({
          contentId: item.id,
          severity: "high",
          category: "missing-canonical-reference",
          message: `${item.title} has an invalid canonical URL.`,
          action: "Set an HTTPS canonical URL on the primary website."
        })
      }
    }
    return recommendations
  }

  private aggregate(metrics: VisibilityMetrics): number {
    const values = Object.entries(metrics).map(([metric, value]) =>
      metric === "publishedContentCount" ? Math.min(1, value) : Math.max(0, Math.min(1, value))
    )
    return Number((values.reduce((total, value) => total + value, 0) / values.length).toFixed(4))
  }

  private metrics(
    context: {
      content: { contentType: string; internalLinks: unknown[]; entities: string[] }[]
      geoReports: { score: number; validation: { aiRetrievalReady?: boolean; schemaComplete?: boolean } }[]
      schemaContentIds: string[]
      entityContentIds: string[]
      publishedContentIds: string[]
      aiResourceContentIds: string[]
    },
    providerScores: number[]
  ): VisibilityMetrics {
    const count = context.content.length || 1
    const faqCount = context.content.filter((item) => item.contentType === "FAQ").length
    const serviceCount = context.content.filter((item) => item.contentType === "Service Page").length
    return {
      publishedContentCount: context.publishedContentIds.length,
      canonicalCoverage: providerScores[1] ?? 0,
      entityCoverage: Math.min(1, context.entityContentIds.length / count),
      schemaCompleteness: Math.min(1, context.schemaContentIds.length / count),
      internalLinkDensity: Math.min(1, context.content.filter((item) => item.internalLinks.length > 0).length / count),
      topicClusterCoverage: Math.min(1, context.content.filter((item) => item.entities.length >= 2).length / count),
      faqCoverage: faqCount > 0 ? 1 : 0,
      serviceCoverage: serviceCount > 0 ? 1 : 0,
      geoOptimizationScore:
        context.geoReports.length === 0
          ? 0
          : Math.min(
              1,
              context.geoReports.reduce((total, report) => total + report.score, 0) / context.geoReports.length
            ),
      aiReadinessScore: Math.min(1, context.aiResourceContentIds.length / count)
    }
  }

  private async scoreRecords(snapshot: VisibilitySnapshotRecord): Promise<VisibilityScoreRecord[]> {
    const timestamp = snapshot.createdAt
    const records: VisibilityScoreRecord[] = []
    for (const [metric, score] of Object.entries(snapshot.metrics) as [keyof VisibilityMetrics, number][]) {
      const previous = await this.scores.listMetric(metric, 30)
      const prior = (index: number): number => previous[index]?.score ?? score
      records.push({
        id: crypto.randomUUID(),
        snapshotId: snapshot.id,
        metric,
        score,
        dailyChange: Number((score - prior(0)).toFixed(4)),
        weeklyChange: Number((score - prior(6)).toFixed(4)),
        monthlyChange: Number((score - prior(29)).toFixed(4)),
        createdAt: timestamp
      })
    }
    return records
  }
}
