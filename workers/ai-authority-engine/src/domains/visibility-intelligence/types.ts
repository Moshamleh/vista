import type { ContentRecord } from "../content-pipeline/types"

/** Supported visibility source identifiers. */
export type VisibilityProviderName =
  | "website-index-status"
  | "sitemap-status"
  | "rss-validation"
  | "structured-data-validation"
  | "llms-txt-validation"
  | "internal-link-coverage"
  | "entity-graph-coverage"
  | "publisher-verification"
  | "canonical-validation"
  | "ai-resource-validation"

/** Visibility metric keys tracked over time. */
export type VisibilityMetric =
  | "publishedContentCount"
  | "canonicalCoverage"
  | "entityCoverage"
  | "schemaCompleteness"
  | "internalLinkDensity"
  | "topicClusterCoverage"
  | "faqCoverage"
  | "serviceCoverage"
  | "geoOptimizationScore"
  | "aiReadinessScore"

/** Context used by visibility providers. */
export interface VisibilityContext {
  content: ContentRecord[]
  geoReports: {
    contentId: string
    score: number
    validation: { aiRetrievalReady?: boolean; schemaComplete?: boolean }
  }[]
  schemaContentIds: string[]
  entityContentIds: string[]
  publishedContentIds: string[]
  aiResourceContentIds: string[]
  websiteBaseUrl: string
}

/** Provider result for one visibility source. */
export interface VisibilityProviderResult {
  provider: VisibilityProviderName
  score: number
  signals: Record<string, number | string | boolean>
  recommendations: VisibilityRecommendationInput[]
}

/** Visibility provider contract. */
export interface VisibilityProvider {
  readonly name: VisibilityProviderName
  measure(context: VisibilityContext): Promise<VisibilityProviderResult>
}

/** Snapshot metric values. */
export type VisibilityMetrics = Record<VisibilityMetric, number>

/** Persisted visibility snapshot. */
export interface VisibilitySnapshotRecord {
  id: string
  status: "completed" | "failed"
  aggregateScore: number
  providerResults: VisibilityProviderResult[]
  metrics: VisibilityMetrics
  createdAt: string
}

/** Persisted visibility score with trend changes. */
export interface VisibilityScoreRecord {
  id: string
  snapshotId: string
  metric: VisibilityMetric
  score: number
  dailyChange: number
  weeklyChange: number
  monthlyChange: number
  createdAt: string
}

/** Recommendation input and record. */
export interface VisibilityRecommendationInput {
  contentId: string | null
  severity: "low" | "medium" | "high"
  category: string
  message: string
  action: string
}

/** Persisted recommendation. */
export interface VisibilityRecommendationRecord extends VisibilityRecommendationInput {
  id: string
  snapshotId: string
  createdAt: string
}

/** Validation run record. */
export interface ValidationRunRecord {
  id: string
  status: "running" | "completed" | "failed"
  startedAt: string
  completedAt: string | null
  providerCount: number
  errorMessage: string | null
}

/** Full scan output. */
export interface VisibilityScanResult {
  run: ValidationRunRecord
  snapshot: VisibilitySnapshotRecord
  scores: VisibilityScoreRecord[]
  recommendations: VisibilityRecommendationRecord[]
}
