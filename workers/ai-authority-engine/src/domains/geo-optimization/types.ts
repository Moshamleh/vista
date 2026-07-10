import type { ContentRecord } from "../content-pipeline/types"

/**
 * Supported entity graph types.
 */
export type GeoEntityType = "Organization" | "Service" | "Product" | "Location" | "Person" | "Topic"

/**
 * Entity graph node with relationships and confidence.
 */
export interface EntityGraphRecord {
  id: string
  entityType: GeoEntityType
  name: string
  slug: string
  synonyms: string[]
  relationships: { target: string; relation: string }[]
  confidenceScore: number
  sourceContentIds: string[]
  createdAt: string
  updatedAt: string
}

/**
 * Structured data document stored for content.
 */
export interface SchemaDocumentRecord {
  id: string
  contentId: string
  schemaType: string
  jsonLd: Record<string, unknown>
  checksum: string
  createdAt: string
  updatedAt: string
}

/**
 * AI resource bundle for machine retrieval.
 */
export interface AiResourceBundle {
  llmsTxt: string
  aiDiscoveryEndpoint: string
  knowledgeEndpoint: string
  entityEndpoint: string
  aiSitemap: string
  machineSummary: string
}

/**
 * Metadata generated for search and AI systems.
 */
export interface GeoMetadata {
  title: string
  description: string
  openGraph: Record<string, string>
  xCards: Record<string, string>
  robots: string
  readingTimeMinutes: number
  aiSummary: string
  entitySummary: string
  hreflang: { language: string; url: string }[]
  canonicalUrl: string
}

/**
 * Internal link recommendation.
 */
export interface InternalLinkRecommendation {
  sourceContentId: string
  targetContentId: string
  relationType: "related-article" | "related-faq" | "related-service" | "entity-link" | "topic-cluster"
  anchorText: string
  confidenceScore: number
}

/**
 * GEO validation result.
 */
export interface GeoValidationResult {
  score: number
  errors: string[]
  warnings: string[]
  schemaComplete: boolean
  entityCoverage: number
  canonicalCorrect: boolean
  metadataQuality: number
  internalLinkQuality: number
  aiRetrievalReady: boolean
}

/**
 * GEO report stored in D1.
 */
export interface GeoReportRecord {
  id: string
  contentId: string
  status: "optimized" | "needs_work"
  score: number
  validation: GeoValidationResult
  metadata: GeoMetadata
  aiResources: AiResourceBundle
  createdAt: string
  updatedAt: string
}

/**
 * Internal link graph record.
 */
export interface InternalLinkGraphRecord extends InternalLinkRecommendation {
  id: string
  createdAt: string
}

/**
 * Optimization history record.
 */
export interface OptimizationHistoryRecord {
  id: string
  contentId: string
  action: string
  score: number
  details: Record<string, unknown>
  createdAt: string
}

/**
 * Full optimization result.
 */
export interface GeoOptimizationResult {
  content: ContentRecord
  entities: EntityGraphRecord[]
  schemas: SchemaDocumentRecord[]
  metadata: GeoMetadata
  aiResources: AiResourceBundle
  links: InternalLinkRecommendation[]
  validation: GeoValidationResult
  report: GeoReportRecord
}
