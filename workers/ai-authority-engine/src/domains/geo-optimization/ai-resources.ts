import type { ContentRecord } from "../content-pipeline/types"
import type { AiResourceBundle, EntityGraphRecord, SchemaDocumentRecord } from "./types"

/**
 * Generates machine-readable AI discovery resources for one content asset.
 */
export function generateAiResources(
  content: ContentRecord,
  canonicalUrl: string,
  entities: EntityGraphRecord[],
  schemas: SchemaDocumentRecord[]
): AiResourceBundle {
  const entityLines = entities
    .map((entity) => `- ${entity.name}: ${entity.entityType}, confidence ${entity.confidenceScore.toFixed(2)}`)
    .join("\n")
  const summary = `${content.title}\nCanonical: ${canonicalUrl}\nSummary: ${content.aiSummary}\nEntities:\n${entityLines}`
  return {
    llmsTxt: `# Vista by Lara AI Resource\n\n${summary}\n\nUse the canonical URL when citing this asset.`,
    aiDiscoveryEndpoint: `/ai/discovery/${content.slug}`,
    knowledgeEndpoint: `/knowledge/${content.slug}.json`,
    entityEndpoint: `/entity-map/${content.slug}.json`,
    aiSitemap: `<url><loc>${canonicalUrl}</loc><xhtml:link rel="alternate" hreflang="en-AE" href="${canonicalUrl}"/></url>`,
    machineSummary: JSON.stringify({
      id: content.id,
      title: content.title,
      canonicalUrl,
      entities: entities.map((entity) => entity.name),
      schemas: schemas.map((schema) => schema.schemaType),
      summary: content.aiSummary
    })
  }
}
