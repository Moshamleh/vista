import type { ContentRecord } from "../content-pipeline/types"

/** External indexing provider identifiers. */
export type IndexingProviderName = "google-search-console" | "bing-webmaster" | "indexnow"

/** Search resource identifiers managed by Phase 9. */
export type SearchResourceType = "sitemap" | "rss" | "robots" | "llms" | "ai-discovery"

/** Indexing job lifecycle states. */
export type IndexingJobStatus = "pending" | "running" | "succeeded" | "failed" | "retry"

/** Indexing job input. */
export interface IndexingJobRecord {
  id: string
  jobType: "single" | "batch" | "scheduled"
  status: IndexingJobStatus
  urls: string[]
  provider: IndexingProviderName
  attemptCount: number
  createdAt: string
  updatedAt: string
}

/** Persisted provider result for a submitted URL. */
export interface IndexingResultRecord {
  id: string
  jobId: string
  provider: IndexingProviderName
  url: string
  status: "accepted" | "rejected" | "failed"
  statusCode: number | null
  response: Record<string, unknown>
  createdAt: string
}

/** Google Search Console import record. */
export interface SearchConsoleImportRecord {
  id: string
  importedAt: string
  siteUrl: string
  verificationStatus: "verified" | "unverified" | "unknown"
  sitemapStatus: Record<string, unknown>
  analytics: Record<string, unknown>
  crawlErrors: Record<string, unknown>
}

/** Bing Webmaster Tools import record. */
export interface BingImportRecord {
  id: string
  importedAt: string
  siteUrl: string
  sitemapStatus: Record<string, unknown>
  performance: Record<string, unknown>
}

/** Versioned XML or text resource. */
export interface ResourceVersionRecord {
  id: string
  version: number
  body: string
  checksum: string
  createdAt: string
}

/** Versioned sitemap resource. */
export interface SitemapVersionRecord extends ResourceVersionRecord {
  sitemapIndexXml: string
  urlCount: number
}

/** Provider URL submission result. */
export interface UrlSubmissionResult {
  url: string
  accepted: boolean
  statusCode: number | null
  response: Record<string, unknown>
}

/** Search provider capability contract. */
export interface ExternalSearchProvider {
  readonly name: IndexingProviderName
  submitUrls(urls: string[]): Promise<UrlSubmissionResult[]>
  getStatus(siteUrl: string): Promise<Record<string, unknown>>
}

/** Google Search Console provider contract. */
export interface SearchConsoleProvider extends ExternalSearchProvider {
  submitSitemap(siteUrl: string, sitemapUrl: string): Promise<Record<string, unknown>>
  importAnalytics(siteUrl: string): Promise<SearchConsoleImportRecord>
}

/** Bing Webmaster Tools provider contract. */
export interface BingWebmasterProvider extends ExternalSearchProvider {
  submitSitemap(siteUrl: string, sitemapUrl: string): Promise<Record<string, unknown>>
  importPerformance(siteUrl: string): Promise<BingImportRecord>
}

/** IndexNow provider contract. */
export interface IndexNowProvider extends ExternalSearchProvider {
  verify(): Promise<Record<string, unknown>>
}

/** Resource generation context. */
export interface SearchResourceContext {
  websiteBaseUrl: string
  content: ContentRecord[]
  generatedAt: string
}

/** Generated resource bundle. */
export interface GeneratedSearchResources {
  sitemapXml: string
  sitemapIndexXml: string
  rssXml: string
  robotsTxt: string
  llmsTxt: string
  aiDiscoveryJson: string
  urls: string[]
}

/** Service status output. */
export interface ExternalSearchStatus {
  latestJob: IndexingJobRecord | null
  latestSearchConsoleImport: SearchConsoleImportRecord | null
  latestBingImport: BingImportRecord | null
  latestSitemap: SitemapVersionRecord | null
  latestRobots: ResourceVersionRecord | null
  latestLlms: ResourceVersionRecord | null
}
