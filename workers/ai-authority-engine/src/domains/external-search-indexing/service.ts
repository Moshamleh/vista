import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import type { ContentRepository } from "../content-pipeline/repositories"
import type { ExternalSearchProviderRegistry } from "./providers"
import { checksum, generateSearchResources, validateLlms, validateRobots, validateSitemap } from "./resources"
import type {
  BingWebmasterProvider,
  ExternalSearchStatus,
  IndexingJobRecord,
  IndexingProviderName,
  ResourceVersionRecord,
  SearchConsoleProvider,
  SitemapVersionRecord,
  UrlSubmissionResult
} from "./types"
import type {
  BingImportRepository,
  IndexingJobRepository,
  IndexingResultRepository,
  LlmsVersionRepository,
  RobotsVersionRepository,
  SearchConsoleImportRepository,
  SitemapVersionRepository
} from "./repositories"

function normalizeUrls(urls: string[]): string[] {
  return Array.from(new Set(urls.map((url) => url.trim()).filter(Boolean)))
}

function ensureHttpsUrls(urls: string[]): void {
  for (const url of urls) {
    if (!url.startsWith("https://")) {
      throw new AppError({
        status: 400,
        code: "validation_error",
        message: "Only HTTPS URLs can be submitted for indexing"
      })
    }
  }
}

/** Coordinates external search intelligence and indexing resources. */
export class ExternalSearchIndexingService {
  constructor(
    private readonly providers: ExternalSearchProviderRegistry,
    private readonly content: ContentRepository,
    private readonly jobs: IndexingJobRepository,
    private readonly results: IndexingResultRepository,
    private readonly searchConsoleImports: SearchConsoleImportRepository,
    private readonly bingImports: BingImportRepository,
    private readonly sitemaps: SitemapVersionRepository,
    private readonly robots: RobotsVersionRepository,
    private readonly llms: LlmsVersionRepository,
    private readonly websiteBaseUrl: string,
    private readonly searchConsoleSiteUrl: string | undefined,
    private readonly logger: Logger
  ) {}

  /** Submits one URL to a supported indexing provider. */
  async submit(url: string, provider: IndexingProviderName, requestId: string): Promise<{ job: IndexingJobRecord }> {
    const [job] = await this.submitBatch([url], provider, "single", requestId)
    if (!job) throw new Error("Indexing submission failed to create a job")
    return { job }
  }

  /** Submits URLs to a supported indexing provider with retry-aware job state. */
  async submitBatch(
    rawUrls: string[],
    providerName: IndexingProviderName,
    jobType: IndexingJobRecord["jobType"],
    requestId: string
  ): Promise<IndexingJobRecord[]> {
    const urls = normalizeUrls(rawUrls)
    if (urls.length === 0)
      throw new AppError({ status: 400, code: "validation_error", message: "At least one URL is required" })
    ensureHttpsUrls(urls)
    const timestamp = new Date().toISOString()
    const job: IndexingJobRecord = {
      id: crypto.randomUUID(),
      jobType,
      status: "running",
      urls,
      provider: providerName,
      attemptCount: 1,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await this.jobs.create(job)
    try {
      const provider = this.providers.get(providerName)
      const providerResults = await this.submitWithRetry(providerName, provider.submitUrls.bind(provider), urls)
      await this.results.createMany(
        providerResults.map((result) => ({
          id: crypto.randomUUID(),
          jobId: job.id,
          provider: providerName,
          url: result.url,
          status: result.accepted ? "accepted" : "rejected",
          statusCode: result.statusCode,
          response: result.response,
          createdAt: new Date().toISOString()
        }))
      )
      const updated = {
        ...job,
        status: providerResults.every((result) => result.accepted) ? ("succeeded" as const) : ("retry" as const),
        updatedAt: new Date().toISOString()
      }
      await this.jobs.update(updated)
      this.logger.info(
        "External indexing submission completed",
        { provider: providerName, urlCount: urls.length },
        requestId
      )
      return [updated]
    } catch (error) {
      const failed = { ...job, status: "failed" as const, updatedAt: new Date().toISOString() }
      await this.jobs.update(failed)
      this.logger.error(
        "External indexing submission failed",
        { provider: providerName, message: error instanceof Error ? error.message : "Submission failed" },
        requestId
      )
      throw error
    }
  }

  /** Gets indexing and resource status. */
  async status(): Promise<ExternalSearchStatus> {
    const [latestJob] = await this.jobs.list(1)
    return {
      latestJob: latestJob ?? null,
      latestSearchConsoleImport: await this.searchConsoleImports.latest(),
      latestBingImport: await this.bingImports.latest(),
      latestSitemap: await this.sitemaps.latest(),
      latestRobots: await this.robots.latest(),
      latestLlms: await this.llms.latest()
    }
  }

  /** Gets Google Search Console status or the latest import. */
  async searchConsoleStatus(): Promise<Record<string, unknown>> {
    const siteUrl = this.searchConsoleSiteUrl ?? this.websiteBaseUrl
    const latest = await this.searchConsoleImports.latest()
    try {
      const provider = this.providers.get("google-search-console") as SearchConsoleProvider
      return await provider.getStatus(siteUrl)
    } catch (error) {
      return {
        configured: false,
        latest,
        message: error instanceof Error ? error.message : "Search Console status unavailable"
      }
    }
  }

  /** Gets Bing Webmaster status or the latest import. */
  async bingStatus(): Promise<Record<string, unknown>> {
    const latest = await this.bingImports.latest()
    try {
      const provider = this.providers.get("bing-webmaster") as BingWebmasterProvider
      return await provider.getStatus(this.websiteBaseUrl)
    } catch (error) {
      return { configured: false, latest, message: error instanceof Error ? error.message : "Bing status unavailable" }
    }
  }

  /** Generates, validates, versions, and submits sitemap resources where providers are configured. */
  async generateSitemap(
    requestId: string
  ): Promise<{ sitemap: SitemapVersionRecord; validation: ReturnType<typeof validateSitemap> }> {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: new Date().toISOString()
    })
    const validation = validateSitemap(resources.sitemapXml)
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") })
    const latest = await this.sitemaps.latest()
    const record: SitemapVersionRecord = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: resources.sitemapXml,
      sitemapIndexXml: resources.sitemapIndexXml,
      urlCount: validation.urlCount,
      checksum: await checksum(resources.sitemapXml),
      createdAt: new Date().toISOString()
    }
    await this.sitemaps.create(record)
    await this.trySubmitSitemaps(`${this.websiteBaseUrl}/sitemap.xml`, requestId)
    return { sitemap: record, validation }
  }

  /** Generates and versions robots.txt. */
  async generateRobots(): Promise<{ robots: ResourceVersionRecord; validation: ReturnType<typeof validateRobots> }> {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: new Date().toISOString()
    })
    const validation = validateRobots(resources.robotsTxt)
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") })
    const latest = await this.robots.latest()
    const record: ResourceVersionRecord = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: resources.robotsTxt,
      checksum: await checksum(resources.robotsTxt),
      createdAt: new Date().toISOString()
    }
    await this.robots.create(record)
    return { robots: record, validation }
  }

  /** Generates and versions llms.txt and AI discovery resources. */
  async generateLlms(): Promise<{
    llms: ResourceVersionRecord
    aiDiscovery: string
    validation: ReturnType<typeof validateLlms>
  }> {
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: new Date().toISOString()
    })
    const validation = validateLlms(resources.llmsTxt)
    if (!validation.valid)
      throw new AppError({ status: 422, code: "validation_error", message: validation.errors.join(" ") })
    const latest = await this.llms.latest()
    const record: ResourceVersionRecord = {
      id: crypto.randomUUID(),
      version: (latest?.version ?? 0) + 1,
      body: `${resources.llmsTxt}\n\n## AI discovery endpoint\n${resources.aiDiscoveryJson}`,
      checksum: await checksum(resources.llmsTxt),
      createdAt: new Date().toISOString()
    }
    await this.llms.create(record)
    return { llms: record, aiDiscovery: resources.aiDiscoveryJson, validation }
  }

  /** Runs scheduled refresh and provider sync tasks. */
  async runScheduled(requestId: string): Promise<void> {
    const sitemap = await this.generateSitemap(requestId)
    await this.generateRobots()
    await this.generateLlms()
    const resources = generateSearchResources({
      websiteBaseUrl: this.websiteBaseUrl,
      content: await this.content.list(500, 0),
      generatedAt: new Date().toISOString()
    })
    await this.submitBatch(resources.urls, "indexnow", "scheduled", requestId)
    await this.importSearchConsole()
    await this.importBing()
    this.logger.info(
      "External search indexing scheduled refresh completed",
      { sitemapVersion: sitemap.sitemap.version },
      requestId
    )
  }

  /** Imports Google Search Console analytics and crawl status. */
  async importSearchConsole(): Promise<void> {
    const provider = this.providers.get("google-search-console") as SearchConsoleProvider
    await this.searchConsoleImports.create(
      await provider.importAnalytics(this.searchConsoleSiteUrl ?? this.websiteBaseUrl)
    )
  }

  /** Imports Bing Webmaster Tools search performance. */
  async importBing(): Promise<void> {
    const provider = this.providers.get("bing-webmaster") as BingWebmasterProvider
    await this.bingImports.create(await provider.importPerformance(this.websiteBaseUrl))
  }

  private async submitWithRetry(
    providerName: IndexingProviderName,
    submit: (urls: string[]) => Promise<UrlSubmissionResult[]>,
    urls: string[]
  ): Promise<UrlSubmissionResult[]> {
    let lastError: unknown
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await submit(urls)
      } catch (error) {
        lastError = error
        this.logger.warn("External indexing provider retry scheduled", { provider: providerName, attempt })
        await new Promise((resolve) => setTimeout(resolve, attempt * 25))
      }
    }
    throw lastError instanceof Error ? lastError : new Error("Indexing provider failed")
  }

  private async trySubmitSitemaps(sitemapUrl: string, requestId: string): Promise<void> {
    for (const provider of this.providers.list()) {
      if (provider.name === "google-search-console") {
        try {
          await (provider as SearchConsoleProvider).submitSitemap(
            this.searchConsoleSiteUrl ?? this.websiteBaseUrl,
            sitemapUrl
          )
        } catch (error) {
          this.logger.warn(
            "Search Console sitemap submission skipped",
            { message: error instanceof Error ? error.message : "Unavailable" },
            requestId
          )
        }
      }
      if (provider.name === "bing-webmaster") {
        try {
          await (provider as BingWebmasterProvider).submitSitemap(this.websiteBaseUrl, sitemapUrl)
        } catch (error) {
          this.logger.warn(
            "Bing sitemap submission skipped",
            { message: error instanceof Error ? error.message : "Unavailable" },
            requestId
          )
        }
      }
    }
  }
}
