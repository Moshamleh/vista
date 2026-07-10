/**
 * Editorial lifecycle status for every content asset.
 */
export type ContentStatus =
  | "DISCOVERED"
  | "APPROVED"
  | "PLANNED"
  | "GENERATING"
  | "GENERATED"
  | "REVIEW_REQUIRED"
  | "APPROVED_FOR_PUBLISHING"
  | "PUBLISHED"
  | "UPDATED"
  | "ARCHIVED"

/**
 * Supported content templates and asset classes.
 */
export type ContentType =
  | "Authority Article"
  | "FAQ"
  | "Knowledge Page"
  | "Service Page"
  | "News Article"
  | "Press Release"
  | "Landing Page"
  | "Case Study"
  | "Comparison Page"

/**
 * SEO metadata stored with content records.
 */
export interface SeoMetadata {
  title: string
  description: string
  openGraphTitle?: string
  openGraphDescription?: string
}

/**
 * Link metadata used for internal authority graphing.
 */
export interface InternalLinkReference {
  targetContentId?: string
  targetUrl: string
  anchorText: string
}

/**
 * Full content asset stored in D1.
 */
export interface ContentRecord {
  id: string
  title: string
  slug: string
  status: ContentStatus
  contentType: ContentType
  language: "en" | "ar"
  canonicalUrl: string | null
  targetKeyword: string
  entities: string[]
  internalLinks: InternalLinkReference[]
  schemaType: string
  readingTimeMinutes: number
  wordCount: number
  seoMetadata: SeoMetadata
  aiSummary: string
  publishingTargets: string[]
  body: string
  currentVersion: number
  scheduledAt: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Immutable version snapshot for content edits and rollback.
 */
export interface ContentVersionRecord {
  id: string
  contentId: string
  versionNumber: number
  title: string
  body: string
  metadata: Omit<ContentRecord, "id" | "createdAt" | "updatedAt" | "currentVersion">
  createdBy: string
  createdAt: string
}

/**
 * Content template stored for supported editorial types.
 */
export interface ContentTemplateRecord {
  id: string
  contentType: ContentType
  name: string
  requiredFields: string[]
  schemaType: string
  createdAt: string
  updatedAt: string
}

/**
 * Editorial queue item for planning and review operations.
 */
export interface EditorialQueueRecord {
  id: string
  contentId: string
  status: "open" | "in_progress" | "completed"
  priority: number
  assignedTo: string | null
  dueAt: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Review queue item for approval decisions.
 */
export interface ReviewQueueRecord {
  id: string
  contentId: string
  status: "pending" | "approved" | "rejected"
  reviewer: string | null
  decision: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Publication queue item prepared for a future publisher domain.
 */
export interface PublicationQueueRecord {
  id: string
  contentId: string
  status: "scheduled" | "ready" | "cancelled"
  targets: string[]
  scheduledAt: string
  createdAt: string
  updatedAt: string
}

/**
 * Tag and category taxonomy records.
 */
export interface TaxonomyRecord {
  id: string
  name: string
  slug: string
  createdAt: string
}

/**
 * Persisted internal link record.
 */
export interface InternalLinkRecord extends InternalLinkReference {
  id: string
  sourceContentId: string
  createdAt: string
}

/**
 * Audit trail entry for workflow and edit operations.
 */
export interface ContentAuditEventRecord {
  id: string
  contentId: string
  action: string
  fromStatus: ContentStatus | null
  toStatus: ContentStatus | null
  actor: string
  metadata: Record<string, unknown>
  createdAt: string
}

/**
 * Input accepted when creating a content asset.
 */
export type CreateContentInput = Omit<
  ContentRecord,
  "id" | "status" | "currentVersion" | "scheduledAt" | "createdAt" | "updatedAt"
> & {
  status?: ContentStatus
}

/**
 * Input accepted when editing a content asset.
 */
export type UpdateContentInput = Partial<
  Pick<
    ContentRecord,
    | "title"
    | "slug"
    | "canonicalUrl"
    | "targetKeyword"
    | "entities"
    | "internalLinks"
    | "schemaType"
    | "readingTimeMinutes"
    | "wordCount"
    | "seoMetadata"
    | "aiSummary"
    | "publishingTargets"
    | "body"
  >
>
