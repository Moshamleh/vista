import type {
  BingImportRecord,
  BingWebmasterProvider,
  ExternalSearchProvider,
  IndexNowProvider,
  IndexingProviderName,
  SearchConsoleImportRecord,
  SearchConsoleProvider,
  UrlSubmissionResult
} from "./types"

type Fetcher = typeof fetch

function requireConfig(value: string | undefined, name: string): string {
  if (!value) throw new Error(`${name} is not configured`)
  return value
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text()
  if (text.length === 0) return {}
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return { body: text }
  }
}

function appendQuery(url: string, params: Record<string, string>): string {
  const next = new URL(url)
  for (const [key, value] of Object.entries(params)) next.searchParams.set(key, value)
  return next.toString()
}

/** Google Search Console adapter using official API endpoints. */
export class GoogleSearchConsoleProvider implements SearchConsoleProvider {
  readonly name = "google-search-console" as const

  constructor(
    private readonly endpoint: string | undefined,
    private readonly accessToken: string | undefined,
    private readonly fetcher: Fetcher = fetch
  ) {}

  /** Imports site status from Google Search Console. */
  async getStatus(siteUrl: string): Promise<Record<string, unknown>> {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT")
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN")
    const response = await this.fetcher(appendQuery(`${endpoint}/sites/${encodeURIComponent(siteUrl)}`, {}), {
      headers: { authorization: `Bearer ${token}` }
    })
    return { statusCode: response.status, ...(await readJson(response)) }
  }

  /** Submits a sitemap to Google Search Console. */
  async submitSitemap(siteUrl: string, sitemapUrl: string): Promise<Record<string, unknown>> {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT")
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN")
    const response = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
      { method: "PUT", headers: { authorization: `Bearer ${token}` } }
    )
    return { statusCode: response.status, ...(await readJson(response)) }
  }

  /** Imports search analytics and crawl status from Google Search Console. */
  async importAnalytics(siteUrl: string): Promise<SearchConsoleImportRecord> {
    const endpoint = requireConfig(this.endpoint, "GOOGLE_SEARCH_CONSOLE_ENDPOINT")
    const token = requireConfig(this.accessToken, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN")
    const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" }
    const statusResponse = await this.fetcher(`${endpoint}/sites/${encodeURIComponent(siteUrl)}`, { headers })
    const sitemapResponse = await this.fetcher(`${endpoint}/sites/${encodeURIComponent(siteUrl)}/sitemaps`, { headers })
    const analyticsResponse = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ startDate: "2026-01-01", endDate: "2026-12-31", dimensions: ["query", "page"] })
      }
    )
    const crawlResponse = await this.fetcher(
      `${endpoint}/sites/${encodeURIComponent(siteUrl)}/urlInspection/index:inspect`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ inspectionUrl: siteUrl, siteUrl })
      }
    )
    return {
      id: crypto.randomUUID(),
      importedAt: new Date().toISOString(),
      siteUrl,
      verificationStatus: statusResponse.ok ? "verified" : "unknown",
      sitemapStatus: { statusCode: sitemapResponse.status, ...(await readJson(sitemapResponse)) },
      analytics: { statusCode: analyticsResponse.status, ...(await readJson(analyticsResponse)) },
      crawlErrors: { statusCode: crawlResponse.status, ...(await readJson(crawlResponse)) }
    }
  }

  /** Search Console has no general public URL submit endpoint; sitemap submission is used instead. */
  submitUrls(urls: string[]): Promise<UrlSubmissionResult[]> {
    return Promise.resolve(
      urls.map((url) => ({
        url,
        accepted: false,
        statusCode: null,
        response: { reason: "Google Search Console URL submission is represented by sitemap submission." }
      }))
    )
  }
}

/** Bing Webmaster Tools adapter using official API endpoints. */
export class BingWebmasterToolsProvider implements BingWebmasterProvider {
  readonly name = "bing-webmaster" as const

  constructor(
    private readonly endpoint: string | undefined,
    private readonly apiKey: string | undefined,
    private readonly fetcher: Fetcher = fetch
  ) {}

  /** Gets Bing site status. */
  async getStatus(siteUrl: string): Promise<Record<string, unknown>> {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT")
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY")
    const response = await this.fetcher(appendQuery(`${endpoint}/GetSite`, { siteUrl, apikey: key }))
    return { statusCode: response.status, ...(await readJson(response)) }
  }

  /** Submits a sitemap to Bing Webmaster Tools. */
  async submitSitemap(siteUrl: string, sitemapUrl: string): Promise<Record<string, unknown>> {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT")
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY")
    const response = await this.fetcher(
      appendQuery(`${endpoint}/SubmitSitemap`, { siteUrl, sitemapUrl, apikey: key }),
      {
        method: "POST"
      }
    )
    return { statusCode: response.status, ...(await readJson(response)) }
  }

  /** Imports Bing search performance and sitemap status. */
  async importPerformance(siteUrl: string): Promise<BingImportRecord> {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT")
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY")
    const sitemapResponse = await this.fetcher(appendQuery(`${endpoint}/GetSitemaps`, { siteUrl, apikey: key }))
    const performanceResponse = await this.fetcher(appendQuery(`${endpoint}/GetQueryStats`, { siteUrl, apikey: key }))
    return {
      id: crypto.randomUUID(),
      importedAt: new Date().toISOString(),
      siteUrl,
      sitemapStatus: { statusCode: sitemapResponse.status, ...(await readJson(sitemapResponse)) },
      performance: { statusCode: performanceResponse.status, ...(await readJson(performanceResponse)) }
    }
  }

  /** Submits URLs to Bing URL submission API. */
  async submitUrls(urls: string[]): Promise<UrlSubmissionResult[]> {
    const endpoint = requireConfig(this.endpoint, "BING_WEBMASTER_ENDPOINT")
    const key = requireConfig(this.apiKey, "BING_WEBMASTER_API_KEY")
    const results: UrlSubmissionResult[] = []
    for (const url of urls) {
      const response = await this.fetcher(appendQuery(`${endpoint}/SubmitUrl`, { url, apikey: key }), {
        method: "POST"
      })
      results.push({ url, accepted: response.ok, statusCode: response.status, response: await readJson(response) })
    }
    return results
  }
}

/** IndexNow adapter for URL and batch submission. */
export class IndexNowSubmissionProvider implements IndexNowProvider {
  readonly name = "indexnow" as const

  constructor(
    private readonly endpoint: string,
    private readonly key: string | undefined,
    private readonly keyLocation: string | undefined,
    private readonly fetcher: Fetcher = fetch
  ) {}

  /** Gets IndexNow configuration status. */
  getStatus(siteUrl: string): Promise<Record<string, unknown>> {
    return Promise.resolve({ configured: Boolean(this.key), siteUrl, keyLocation: this.keyLocation ?? null })
  }

  /** Verifies local IndexNow settings before submission. */
  verify(): Promise<Record<string, unknown>> {
    return Promise.resolve({ ready: Boolean(this.key), endpoint: this.endpoint, keyLocation: this.keyLocation ?? null })
  }

  /** Submits URLs to IndexNow in one official batch request. */
  async submitUrls(urls: string[]): Promise<UrlSubmissionResult[]> {
    const key = requireConfig(this.key, "INDEXNOW_KEY")
    const host = new URL(urls[0] ?? "https://www.vistabylara.com").host
    const response = await this.fetcher(this.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ host, key, keyLocation: this.keyLocation, urlList: urls })
    })
    const body = await readJson(response)
    return urls.map((url) => ({ url, accepted: response.ok, statusCode: response.status, response: body }))
  }
}

/** Registry for replaceable external search providers. */
export class ExternalSearchProviderRegistry {
  private readonly providers = new Map<IndexingProviderName, ExternalSearchProvider>()

  /** Registers a provider. */
  register(provider: ExternalSearchProvider): void {
    this.providers.set(provider.name, provider)
  }

  /** Gets a provider by name. */
  get(name: IndexingProviderName): ExternalSearchProvider {
    const provider = this.providers.get(name)
    if (!provider) throw new Error(`External search provider ${name} is not registered`)
    return provider
  }

  /** Lists providers. */
  list(): ExternalSearchProvider[] {
    return Array.from(this.providers.values())
  }
}

/** Creates the default external search provider registry. */
export function createExternalSearchProviderRegistry(config: {
  googleSearchConsoleEndpoint: string | undefined
  googleSearchConsoleAccessToken: string | undefined
  bingWebmasterEndpoint: string | undefined
  bingWebmasterApiKey: string | undefined
  indexNowEndpoint: string
  indexNowKey: string | undefined
  indexNowKeyLocation: string | undefined
}): ExternalSearchProviderRegistry {
  const registry = new ExternalSearchProviderRegistry()
  registry.register(
    new GoogleSearchConsoleProvider(config.googleSearchConsoleEndpoint, config.googleSearchConsoleAccessToken)
  )
  registry.register(new BingWebmasterToolsProvider(config.bingWebmasterEndpoint, config.bingWebmasterApiKey))
  registry.register(
    new IndexNowSubmissionProvider(config.indexNowEndpoint, config.indexNowKey, config.indexNowKeyLocation)
  )
  return registry
}
