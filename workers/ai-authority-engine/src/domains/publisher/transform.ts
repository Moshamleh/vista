import { AppError } from "../../errors/app-error"
import type { ContentRecord } from "../content-pipeline/types"
import type { PublishPackage } from "./types"

/**
 * Creates a deterministic checksum for published payloads.
 */
export async function checksum(value: string): Promise<string> {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

/**
 * Builds the canonical URL for a Vista by Lara content asset.
 */
export function canonicalUrl(baseUrl: string, content: ContentRecord): string {
  return content.canonicalUrl ?? `${baseUrl.replace(/\/$/u, "")}/knowledge/${content.slug}`
}

/**
 * Converts markdown-style text into compact canonical HTML.
 */
export function toCanonicalHtml(content: ContentRecord, canonical: string): string {
  const paragraphs = content.body
    .split(/\n{2,}/u)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("# ")) return `<h1>${escapeHtml(block.slice(2))}</h1>`
      if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`
      return `<p>${escapeHtml(block)}</p>`
    })
    .join("")
  return `<article data-canonical="${escapeHtml(canonical)}">${paragraphs}<link rel="canonical" href="${escapeHtml(canonical)}"></article>`
}

/**
 * Creates markdown with canonical attribution.
 */
export function toMarkdown(content: ContentRecord, canonical: string, publisher: string): string {
  return `# ${content.title}\n\nCanonical source: [Vista by Lara](${canonical})\n\nPublisher adaptation: ${publisher}.\n\n${content.body}`
}

/**
 * Creates plain text with attribution.
 */
export function toPlainText(content: ContentRecord, canonical: string, publisher: string): string {
  return `${content.title}\n\nCanonical source: Vista by Lara ${canonical}\nPublisher adaptation: ${publisher}.\n\n${content.body.replace(/#+\s*/gu, "")}`
}

/**
 * Creates one RSS item.
 */
export function toRss(content: ContentRecord, canonical: string): string {
  return `<item><title>${escapeHtml(content.title)}</title><link>${escapeHtml(canonical)}</link><guid>${escapeHtml(canonical)}</guid><description>${escapeHtml(content.aiSummary)}</description></item>`
}

/**
 * Creates a JSON export payload.
 */
export function toJson(content: ContentRecord, canonical: string): string {
  return JSON.stringify({ ...content, canonicalUrl: canonical, source: "Vista by Lara" })
}

/**
 * Builds every required transformation for a publisher.
 */
export function buildPublishPackage(content: ContentRecord, baseUrl: string): PublishPackage {
  const canonical = canonicalUrl(baseUrl, content)
  return {
    content,
    canonicalUrl: canonical,
    canonicalHtml: toCanonicalHtml(content, canonical),
    markdown: toMarkdown(content, canonical, "base"),
    plainText: toPlainText(content, canonical, "base"),
    rss: toRss(content, canonical),
    json: toJson(content, canonical)
  }
}

/**
 * Validates publish-ready content quality.
 */
export function validatePublishPackage(pkg: PublishPackage): void {
  const errors: string[] = []
  if (!pkg.canonicalUrl.startsWith("https://")) errors.push("Canonical URL must be HTTPS")
  if (pkg.content.seoMetadata.title.length === 0 || pkg.content.seoMetadata.description.length === 0)
    errors.push("SEO metadata is required")
  if (pkg.content.internalLinks.length === 0) errors.push("At least one internal link is required")
  if (pkg.content.schemaType.length === 0) errors.push("Schema type is required")
  if (pkg.content.entities.length === 0) errors.push("Entities are required")
  if (!pkg.canonicalHtml.includes('rel="canonical"')) errors.push("Canonical link is required")
  if (errors.length > 0) {
    throw new AppError({
      status: 422,
      code: "publish_quality_failed",
      message: "Content failed publish validation",
      details: { errors }
    })
  }
}

function escapeHtml(value: string): string {
  return value.replace(/&/gu, "&amp;").replace(/</gu, "&lt;").replace(/>/gu, "&gt;").replace(/"/gu, "&quot;")
}
