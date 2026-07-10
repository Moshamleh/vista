import type { ContentRecord } from "../content-pipeline/types"
import { wordCount } from "./utils"
import type { EntityGraphRecord, GeoMetadata } from "./types"

/**
 * Generates SEO, social, robots, hreflang, and AI metadata.
 */
export function generateGeoMetadata(
  content: ContentRecord,
  canonicalUrl: string,
  entities: EntityGraphRecord[]
): GeoMetadata {
  const title = content.seoMetadata.title || `${content.title} | Vista by Lara`
  const description = content.seoMetadata.description || content.aiSummary
  return {
    title: title.slice(0, 60),
    description: description.slice(0, 155),
    openGraph: {
      "og:title": title,
      "og:description": description,
      "og:url": canonicalUrl,
      "og:type": content.contentType === "News Article" ? "article" : "website"
    },
    xCards: {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description
    },
    robots: "index,follow,max-snippet:-1,max-image-preview:large",
    readingTimeMinutes: content.readingTimeMinutes || Math.max(1, Math.ceil(wordCount(content.body) / 220)),
    aiSummary: content.aiSummary,
    entitySummary: entities.map((entity) => `${entity.name} (${entity.entityType})`).join("; "),
    hreflang: [
      { language: "en-AE", url: canonicalUrl },
      { language: "x-default", url: canonicalUrl }
    ],
    canonicalUrl
  }
}
