import type { ContentRecord } from "../content-pipeline/types"

/**
 * Supported publisher provider identifiers.
 */
export type PublisherName =
  | "website"
  | "rss"
  | "github-knowledge-repository"
  | "blogger"
  | "medium"
  | "vistanewswire"
  | "json-export"
  | "markdown-export"

/**
 * Publishing queue status values.
 */
export type PublishJobStatus = "pending" | "running" | "succeeded" | "failed" | "retry" | "cancelled"

/**
 * Publisher artifact format values.
 */
export type PublishFormat = "canonical-html" | "markdown" | "plain-text" | "rss" | "json" | "platform"

/**
 * Transformed content package passed to publishers.
 */
export interface PublishPackage {
  content: ContentRecord
  canonicalUrl: string
  canonicalHtml: string
  markdown: string
  plainText: string
  rss: string
  json: string
}

/**
 * Result returned by publisher providers.
 */
export interface PublishResult {
  publisher: PublisherName
  publishedUrl: string
  canonicalUrl: string
  platformId: string
  publishedAt: string
  checksum: string
  responseMetadata: Record<string, unknown>
  publishingMetadata: {
    publisher: PublisherName
    version: number
    attemptCount: number
    latencyMs: number
    status: "succeeded" | "artifact-generated"
  }
  artifacts: PublishArtifactInput[]
}

/**
 * Publish artifact input.
 */
export interface PublishArtifactInput {
  publisher: PublisherName
  format: PublishFormat
  body: string
  checksum: string
}

/**
 * Replaceable publisher provider contract.
 */
export interface PublisherProvider {
  readonly name: PublisherName
  publish(input: { package: PublishPackage; attemptCount: number; timeoutMs: number }): Promise<PublishResult>
  test(timeoutMs: number): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }>
}

/**
 * D1 publish job record.
 */
export interface PublishJobRecord {
  id: string
  contentId: string
  status: PublishJobStatus
  targets: PublisherName[]
  canonicalUrl: string
  attemptCount: number
  maxRetries: number
  errorMessage: string | null
  createdAt: string
  updatedAt: string
  startedAt: string | null
  completedAt: string | null
}

/**
 * D1 publish target record.
 */
export interface PublishTargetRecord {
  id: string
  name: PublisherName
  enabled: boolean
  endpoint: string | null
  config: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/**
 * D1 publish history record.
 */
export interface PublishHistoryRecord {
  id: string
  jobId: string
  contentId: string
  publisher: PublisherName
  version: number
  status: string
  publishedUrl: string
  canonicalUrl: string
  platformId: string
  publishedAt: string
  checksum: string
  responseMetadata: Record<string, unknown>
  publishingMetadata: PublishResult["publishingMetadata"]
  latencyMs: number
  createdAt: string
}

/**
 * D1 publish failure record.
 */
export interface PublishFailureRecord {
  id: string
  jobId: string
  contentId: string
  publisher: PublisherName
  attempt: number
  errorCode: string
  errorMessage: string
  retryAt: string | null
  createdAt: string
}

/**
 * D1 artifact record.
 */
export interface PublishArtifactRecord {
  id: string
  jobId: string
  contentId: string
  publisher: PublisherName
  format: PublishFormat
  body: string
  checksum: string
  createdAt: string
}
