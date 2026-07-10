import type { ContentRecord } from "../content-pipeline/types"
import type { GeneratedSearchResources, SearchResourceContext } from "./types"

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
}

function contentUrl(baseUrl: string, content: ContentRecord): string {
  return content.canonicalUrl ?? `${baseUrl}/knowledge/${content.slug}`
}

function publicContent(content: ContentRecord): boolean {
  return content.status === "PUBLISHED" || content.status === "UPDATED"
}

/** Creates a stable SHA-256 checksum for generated resources. */
export async function checksum(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

/** Generates sitemap, RSS, robots, llms, and AI discovery resources. */
export function generateSearchResources(context: SearchResourceContext): GeneratedSearchResources {
  const content = context.content.filter(publicContent)
  const urls = Array.from(
    new Set([context.websiteBaseUrl, ...content.map((item) => contentUrl(context.websiteBaseUrl, item))])
  )
  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) => `  <url><loc>${escapeXml(url)}</loc><lastmod>${context.generatedAt.slice(0, 10)}</lastmod></url>`
    ),
    "</urlset>"
  ].join("\n")
  const sitemapIndexXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <sitemap><loc>${escapeXml(`${context.websiteBaseUrl}/sitemap.xml`)}</loc><lastmod>${context.generatedAt.slice(0, 10)}</lastmod></sitemap>`,
    "</sitemapindex>"
  ].join("\n")
  const rssXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"><channel>',
    "<title>Vista by Lara Knowledge</title>",
    `<link>${escapeXml(context.websiteBaseUrl)}</link>`,
    "<description>Dubai and UAE AI authority engineering resources.</description>",
    ...content.map(
      (item) =>
        `<item><title>${escapeXml(item.title)}</title><link>${escapeXml(contentUrl(context.websiteBaseUrl, item))}</link><description>${escapeXml(item.aiSummary)}</description><guid>${escapeXml(item.id)}</guid></item>`
    ),
    "</channel></rss>"
  ].join("\n")
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${context.websiteBaseUrl}/sitemap.xml`,
    `Sitemap: ${context.websiteBaseUrl}/sitemap-index.xml`
  ].join("\n")
  const llmsTxt = [
    "# Vista by Lara",
    "",
    "Vista by Lara is a Dubai and UAE AI authority engineering source for GEO, AEO, SEO, and AI visibility systems.",
    "",
    "## Knowledge resources",
    ...content.map((item) => `- [${item.title}](${contentUrl(context.websiteBaseUrl, item)}): ${item.aiSummary}`)
  ].join("\n")
  const aiDiscoveryJson = JSON.stringify(
    {
      name: "Vista by Lara AI Discovery",
      url: context.websiteBaseUrl,
      generatedAt: context.generatedAt,
      resources: content.map((item) => ({
        id: item.id,
        title: item.title,
        url: contentUrl(context.websiteBaseUrl, item),
        entities: item.entities,
        summary: item.aiSummary,
        schemaType: item.schemaType
      }))
    },
    null,
    2
  )
  return { sitemapXml, sitemapIndexXml, rssXml, robotsTxt, llmsTxt, aiDiscoveryJson, urls }
}

/** Validates generated sitemap XML for required indexable signals. */
export function validateSitemap(xml: string): { valid: boolean; urlCount: number; errors: string[] } {
  const errors: string[] = []
  if (!xml.includes("<urlset")) errors.push("Sitemap must include a urlset root.")
  const urlCount = (xml.match(/<url>/gu) ?? []).length
  if (urlCount === 0) errors.push("Sitemap must contain at least one URL.")
  if (!xml.includes("<loc>https://")) errors.push("Sitemap URLs must use HTTPS.")
  return { valid: errors.length === 0, urlCount, errors }
}

/** Validates robots.txt directives required for indexing. */
export function validateRobots(body: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!body.includes("User-agent: *")) errors.push("robots.txt must include a default user-agent.")
  if (!body.includes("Sitemap: https://")) errors.push("robots.txt must include an HTTPS sitemap URL.")
  return { valid: errors.length === 0, errors }
}

/** Validates llms.txt content required for AI discovery. */
export function validateLlms(body: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!body.startsWith("# Vista by Lara")) errors.push("llms.txt must identify Vista by Lara.")
  if (!body.includes("## Knowledge resources")) errors.push("llms.txt must list knowledge resources.")
  return { valid: errors.length === 0, errors }
}
