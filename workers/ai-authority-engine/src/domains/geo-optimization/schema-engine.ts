import type { ContentRecord } from "../content-pipeline/types"
import { checksum } from "./utils"
import type { EntityGraphRecord, SchemaDocumentRecord } from "./types"

/**
 * Generates schema.org JSON-LD documents for one content asset.
 */
export async function generateSchemaDocuments(
  content: ContentRecord,
  canonicalUrl: string,
  entities: EntityGraphRecord[]
): Promise<SchemaDocumentRecord[]> {
  const base = {
    "@context": "https://schema.org",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: content.title
  }
  const schemaMap: Record<string, Record<string, unknown>> = {
    Organization: { "@type": "Organization", name: "Vista by Lara", url: "https://www.vistabylara.com" },
    WebSite: { "@type": "WebSite", name: "Vista by Lara", url: "https://www.vistabylara.com" },
    WebPage: { ...base, "@type": "WebPage", description: content.seoMetadata.description },
    Article: {
      ...base,
      "@type": "Article",
      headline: content.title,
      articleBody: content.body,
      about: entities.map((entity) => entity.name)
    },
    FAQPage: { ...base, "@type": "FAQPage", mainEntity: extractFaq(content.body) },
    BreadcrumbList: { "@type": "BreadcrumbList", itemListElement: breadcrumb(canonicalUrl, content.title) },
    Service: {
      ...base,
      "@type": "Service",
      areaServed: "UAE",
      provider: { "@type": "Organization", name: "Vista by Lara" }
    },
    Person: { "@type": "Person", name: "Lara", worksFor: { "@type": "Organization", name: "Vista by Lara" } },
    LocalBusiness: {
      "@type": "LocalBusiness",
      name: "Vista by Lara",
      areaServed: ["Dubai", "UAE", "GCC"],
      url: "https://www.vistabylara.com"
    },
    CollectionPage: { ...base, "@type": "CollectionPage" },
    NewsArticle: { ...base, "@type": "NewsArticle", headline: content.title },
    ItemList: {
      "@type": "ItemList",
      itemListElement: entities.map((entity, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entity.name
      }))
    },
    Speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] }
  }
  const selected = selectSchemaTypes(content)
  const timestamp = new Date().toISOString()
  return Promise.all(
    selected.map(async (schemaType) => {
      const jsonLd = schemaMap[schemaType] ??
        schemaMap["WebPage"] ?? { "@context": "https://schema.org", "@type": "WebPage", name: content.title }
      return {
        id: crypto.randomUUID(),
        contentId: content.id,
        schemaType,
        jsonLd,
        checksum: await checksum(JSON.stringify(jsonLd)),
        createdAt: timestamp,
        updatedAt: timestamp
      }
    })
  )
}

function selectSchemaTypes(content: ContentRecord): string[] {
  const base = ["Organization", "WebSite", "WebPage", "Article", "BreadcrumbList", "ItemList", "LocalBusiness"]
  if (content.contentType === "FAQ") base.push("FAQPage")
  if (content.contentType === "Service Page") base.push("Service")
  if (content.contentType === "News Article" || content.contentType === "Press Release") base.push("NewsArticle")
  if (content.body.length < 900) base.push("Speakable")
  return Array.from(new Set(base))
}

function extractFaq(body: string): Record<string, unknown>[] {
  const questions = Array.from(body.matchAll(/(?:^|\n)#{2,3}\s*(.+\?)/gu)).map((match) => String(match[1]))
  return questions.map((question) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: "See the full Vista by Lara answer in the canonical article." }
  }))
}

function breadcrumb(canonicalUrl: string, title: string): Record<string, unknown>[] {
  return [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vistabylara.com" },
    { "@type": "ListItem", position: 2, name: "Knowledge", item: "https://www.vistabylara.com/knowledge" },
    { "@type": "ListItem", position: 3, name: title, item: canonicalUrl }
  ]
}
