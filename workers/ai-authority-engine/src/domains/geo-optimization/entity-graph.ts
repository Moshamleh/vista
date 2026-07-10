import type { ContentRecord } from "../content-pipeline/types"
import { slugify } from "./utils"
import type { EntityGraphRecord, GeoEntityType } from "./types"

const knownEntities: { name: string; entityType: GeoEntityType; synonyms: string[] }[] = [
  { name: "Vista by Lara", entityType: "Organization", synonyms: ["Vista", "Vista by Lara"] },
  { name: "Dubai", entityType: "Location", synonyms: ["Dubai", "DXB"] },
  { name: "UAE", entityType: "Location", synonyms: ["United Arab Emirates", "Emirates", "UAE"] },
  { name: "Shopify", entityType: "Product", synonyms: ["Shopify Plus", "Shopify"] },
  { name: "Google Ads", entityType: "Service", synonyms: ["Google PPC", "Google Ads"] },
  { name: "AI Automation", entityType: "Service", synonyms: ["AI workflows", "AI Automation"] },
  { name: "Generative Engine Optimization", entityType: "Topic", synonyms: ["GEO", "Generative Engine Optimization"] },
  { name: "AI Visibility", entityType: "Topic", synonyms: ["AI visibility", "answer engine visibility"] }
]

/**
 * Builds entity graph nodes from content metadata and known Vista entities.
 */
export function buildEntityGraph(content: ContentRecord, relatedContent: ContentRecord[]): EntityGraphRecord[] {
  const timestamp = new Date().toISOString()
  const names = new Set([
    ...content.entities,
    ...knownEntities.filter((entity) => matches(content, entity)).map((entity) => entity.name)
  ])
  return Array.from(names).map((name) => {
    const known = knownEntities.find((entity) => entity.name.toLowerCase() === name.toLowerCase())
    const sourceContentIds = [
      content.id,
      ...relatedContent.filter((item) => item.entities.includes(name)).map((item) => item.id)
    ]
    return {
      id: crypto.randomUUID(),
      entityType: known?.entityType ?? inferType(name),
      name,
      slug: slugify(name),
      synonyms: known?.synonyms ?? [name],
      relationships: relatedContent.slice(0, 5).map((item) => ({ target: item.slug, relation: "mentioned-by" })),
      confidenceScore: Math.min(1, 0.55 + sourceContentIds.length * 0.1 + (known ? 0.2 : 0)),
      sourceContentIds,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  })
}

function matches(content: ContentRecord, entity: { name: string; synonyms: string[] }): boolean {
  const haystack = `${content.title} ${content.body} ${content.targetKeyword}`.toLowerCase()
  return entity.synonyms.some((synonym) => haystack.includes(synonym.toLowerCase()))
}

function inferType(name: string): GeoEntityType {
  if (/dubai|uae|sharjah|abu dhabi/iu.test(name)) return "Location"
  if (/service|ads|automation|seo|geo/iu.test(name)) return "Service"
  return "Topic"
}
