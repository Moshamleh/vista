import type { ContentRecord } from "../content-pipeline/types"
import type {
  EntityGraphRecord,
  GeoMetadata,
  GeoValidationResult,
  InternalLinkRecommendation,
  SchemaDocumentRecord
} from "./types"

/**
 * Validates GEO readiness for search engines and AI retrieval systems.
 */
export function validateGeoReadiness(input: {
  content: ContentRecord
  canonicalUrl: string
  entities: EntityGraphRecord[]
  schemas: SchemaDocumentRecord[]
  metadata: GeoMetadata
  links: InternalLinkRecommendation[]
}): GeoValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const requiredSchemas = ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList"]
  const schemaTypes = new Set(input.schemas.map((schema) => schema.schemaType))
  const missingSchemas = requiredSchemas.filter((schema) => !schemaTypes.has(schema))
  if (missingSchemas.length > 0) errors.push(`Missing schema: ${missingSchemas.join(", ")}`)
  if (!input.canonicalUrl.startsWith("https://")) errors.push("Canonical URL must be HTTPS")
  if (!input.metadata.title || !input.metadata.description) errors.push("Metadata title and description are required")
  if (input.entities.length === 0) errors.push("Entity coverage is required")
  if (input.links.length === 0) warnings.push("Internal link recommendations are weak")
  if (!input.metadata.aiSummary || !input.metadata.entitySummary) warnings.push("AI summaries are incomplete")
  const entityCoverage =
    input.content.entities.length === 0 ? 1 : Math.min(1, input.entities.length / input.content.entities.length)
  const metadataQuality = input.metadata.title.length <= 60 && input.metadata.description.length <= 155 ? 1 : 0.65
  const internalLinkQuality = Math.min(1, input.links.length / 3)
  const schemaComplete = missingSchemas.length === 0
  const canonicalCorrect =
    input.canonicalUrl.includes(input.content.slug) || input.content.canonicalUrl === input.canonicalUrl
  const aiRetrievalReady =
    schemaComplete && entityCoverage >= 0.75 && metadataQuality >= 0.8 && input.metadata.aiSummary.length > 0
  const score = Math.max(
    0,
    Math.min(
      1,
      (schemaComplete ? 0.25 : 0) +
        entityCoverage * 0.25 +
        metadataQuality * 0.2 +
        internalLinkQuality * 0.15 +
        (aiRetrievalReady ? 0.15 : 0)
    )
  )
  return {
    score: Number(score.toFixed(4)),
    errors,
    warnings,
    schemaComplete,
    entityCoverage: Number(entityCoverage.toFixed(4)),
    canonicalCorrect,
    metadataQuality,
    internalLinkQuality: Number(internalLinkQuality.toFixed(4)),
    aiRetrievalReady
  }
}
