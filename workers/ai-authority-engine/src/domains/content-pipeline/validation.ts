import { AppError } from "../../errors/app-error"
import { assertRecord } from "../../validation/validator"
import type {
  ContentStatus,
  ContentType,
  CreateContentInput,
  InternalLinkReference,
  SeoMetadata,
  UpdateContentInput
} from "./types"

export const contentTypes: readonly ContentType[] = [
  "Authority Article",
  "FAQ",
  "Knowledge Page",
  "Service Page",
  "News Article",
  "Press Release",
  "Landing Page",
  "Case Study",
  "Comparison Page"
]

export const contentStatuses: readonly ContentStatus[] = [
  "DISCOVERED",
  "APPROVED",
  "PLANNED",
  "GENERATING",
  "GENERATED",
  "REVIEW_REQUIRED",
  "APPROVED_FOR_PUBLISHING",
  "PUBLISHED",
  "UPDATED",
  "ARCHIVED"
]

/**
 * Generates a stable slug from a content title.
 */
export function slugify(value: string): string {
  const slug = value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
  return slug.length > 0 ? slug : crypto.randomUUID()
}

function readString(body: Record<string, unknown>, key: string, min = 1): string {
  const value = body[key]
  if (typeof value !== "string" || value.trim().length < min) {
    throw new AppError({ status: 400, code: "validation_error", message: `${key} is required` })
  }
  return value.trim()
}

function readStringArray(body: Record<string, unknown>, key: string): string[] {
  const value = body[key]
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim())
}

function readPositiveInteger(body: Record<string, unknown>, key: string, fallback: number): number {
  const value = body[key]
  if (value === undefined) return fallback
  if (!Number.isInteger(value) || Number(value) < 0) {
    throw new AppError({ status: 400, code: "validation_error", message: `${key} must be a non-negative integer` })
  }
  return Number(value)
}

function readSeoMetadata(value: unknown): SeoMetadata {
  const body = assertRecord(value)
  return {
    title: readString(body, "title"),
    description: readString(body, "description"),
    ...(typeof body.openGraphTitle === "string" ? { openGraphTitle: body.openGraphTitle.trim() } : {}),
    ...(typeof body.openGraphDescription === "string" ? { openGraphDescription: body.openGraphDescription.trim() } : {})
  }
}

function readInternalLinks(value: unknown): InternalLinkReference[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => {
    const body = assertRecord(item)
    return {
      ...(typeof body.targetContentId === "string" ? { targetContentId: body.targetContentId.trim() } : {}),
      targetUrl: readString(body, "targetUrl"),
      anchorText: readString(body, "anchorText")
    }
  })
}

/**
 * Validates create content input.
 */
export function validateCreateContentInput(value: unknown): CreateContentInput {
  const body = assertRecord(value)
  const contentType = readString(body, "contentType") as ContentType
  if (!contentTypes.includes(contentType)) {
    throw new AppError({ status: 400, code: "validation_error", message: "contentType is not supported" })
  }
  const language = typeof body.language === "string" ? body.language : "en"
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" })
  }
  const status = typeof body.status === "string" ? (body.status as ContentStatus) : undefined
  if (status && !contentStatuses.includes(status)) {
    throw new AppError({ status: 400, code: "validation_error", message: "status is not supported" })
  }
  const title = readString(body, "title")
  return {
    title,
    slug: typeof body.slug === "string" && body.slug.trim().length > 0 ? slugify(body.slug) : slugify(title),
    ...(status ? { status } : {}),
    contentType,
    language,
    canonicalUrl: typeof body.canonicalUrl === "string" ? body.canonicalUrl.trim() : null,
    targetKeyword: readString(body, "targetKeyword"),
    entities: readStringArray(body, "entities"),
    internalLinks: readInternalLinks(body.internalLinks),
    schemaType: readString(body, "schemaType"),
    readingTimeMinutes: readPositiveInteger(body, "readingTimeMinutes", 1),
    wordCount: readPositiveInteger(body, "wordCount", 0),
    seoMetadata: readSeoMetadata(body.seoMetadata),
    aiSummary: readString(body, "aiSummary"),
    publishingTargets: readStringArray(body, "publishingTargets"),
    body: readString(body, "body")
  }
}

/**
 * Validates edit content input.
 */
export function validateUpdateContentInput(value: unknown): UpdateContentInput {
  const body = assertRecord(value)
  return {
    ...(typeof body.title === "string" ? { title: body.title.trim() } : {}),
    ...(typeof body.slug === "string" ? { slug: slugify(body.slug) } : {}),
    ...(typeof body.canonicalUrl === "string" ? { canonicalUrl: body.canonicalUrl.trim() } : {}),
    ...(typeof body.targetKeyword === "string" ? { targetKeyword: body.targetKeyword.trim() } : {}),
    ...(Array.isArray(body.entities) ? { entities: readStringArray(body, "entities") } : {}),
    ...(Array.isArray(body.internalLinks) ? { internalLinks: readInternalLinks(body.internalLinks) } : {}),
    ...(typeof body.schemaType === "string" ? { schemaType: body.schemaType.trim() } : {}),
    ...(typeof body.readingTimeMinutes === "number"
      ? { readingTimeMinutes: readPositiveInteger(body, "readingTimeMinutes", 1) }
      : {}),
    ...(typeof body.wordCount === "number" ? { wordCount: readPositiveInteger(body, "wordCount", 0) } : {}),
    ...(body.seoMetadata ? { seoMetadata: readSeoMetadata(body.seoMetadata) } : {}),
    ...(typeof body.aiSummary === "string" ? { aiSummary: body.aiSummary.trim() } : {}),
    ...(Array.isArray(body.publishingTargets) ? { publishingTargets: readStringArray(body, "publishingTargets") } : {}),
    ...(typeof body.body === "string" ? { body: body.body.trim() } : {})
  }
}
