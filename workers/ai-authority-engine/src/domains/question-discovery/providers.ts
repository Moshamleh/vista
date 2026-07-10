import type { AppConfig } from "../../config/env"
import { AppError } from "../../errors/app-error"
import type { KvJsonStore } from "../../storage/kv-store"
import type { DiscoveryProvider, DiscoveryProviderName, DiscoveryRunRequest, ProviderQuestion } from "./types"

/**
 * Executes a promise with timeout protection.
 */
export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "provider_timeout", message: "Discovery provider timed out" }))
    }, timeoutMs)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

/**
 * Retries transient provider failures.
 */
export async function withRetry<T>(operation: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown
  for (let index = 0; index < attempts; index += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

/**
 * KV-backed provider rate limiter.
 */
export class ProviderRateLimiter {
  constructor(
    private readonly cache: KvJsonStore,
    private readonly limit: number,
    private readonly windowSeconds: number
  ) {}

  /**
   * Enforces per-provider rate limits.
   */
  async enforce(provider: DiscoveryProviderName): Promise<void> {
    const now = Math.floor(Date.now() / 1000)
    const key = `question-discovery:provider-rate:${provider}`
    const bucket = (await this.cache.getJson<{ count: number; resetAt: number }>(key)) ?? {
      count: 0,
      resetAt: now + this.windowSeconds
    }
    const current = bucket.resetAt > now ? bucket : { count: 0, resetAt: now + this.windowSeconds }
    if (current.count >= this.limit) {
      throw new AppError({ status: 429, code: "provider_rate_limited", message: `${provider} rate limit exceeded` })
    }
    await this.cache.putJson(key, { count: current.count + 1, resetAt: current.resetAt }, this.windowSeconds)
  }
}

/**
 * Base class for HTTP suggestion providers.
 */
export abstract class HttpDiscoveryProvider implements DiscoveryProvider {
  abstract readonly name: DiscoveryProviderName
  abstract discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]>

  constructor(
    protected readonly endpoint: string,
    protected readonly timeoutMs: number,
    protected readonly fetcher: typeof fetch = fetch
  ) {}

  /**
   * Fetches JSON from a provider endpoint.
   */
  protected async fetchJson(url: URL): Promise<unknown> {
    return withTimeout(
      withRetry(async () => {
        const response = await this.fetcher(url.toString(), { headers: { accept: "application/json" } })
        if (!response.ok) {
          throw new AppError({
            status: 502,
            code: "provider_error",
            message: `${this.name} returned ${String(response.status)}`
          })
        }
        return response.json() as Promise<unknown>
      }),
      this.timeoutMs
    )
  }
}

/**
 * Bing Autosuggest provider using the official Bing endpoint when configured with a key.
 */
export class BingAutosuggestProvider extends HttpDiscoveryProvider {
  readonly name = "bing-autosuggest" as const

  constructor(
    endpoint: string,
    timeoutMs: number,
    private readonly apiKey: string | undefined,
    fetcher: typeof fetch = fetch
  ) {
    super(endpoint, timeoutMs, fetcher)
  }

  async discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]> {
    if (!this.apiKey) {
      throw new AppError({
        status: 503,
        code: "provider_not_configured",
        message: "Bing Autosuggest key is not configured"
      })
    }
    const url = new URL(this.endpoint)
    url.searchParams.set("q", request.seed)
    url.searchParams.set("mkt", request.language === "ar" ? `ar-${request.market}` : `en-${request.market}`)
    const response = await this.fetcher(url.toString(), { headers: { "Ocp-Apim-Subscription-Key": this.apiKey } })
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "provider_error",
        message: `Bing Autosuggest returned ${String(response.status)}`
      })
    const json = (await response.json()) as { suggestionGroups?: { searchSuggestions?: { displayText?: string }[] }[] }
    return (json.suggestionGroups ?? [])
      .flatMap((group) => group.searchSuggestions ?? [])
      .map((item) => item.displayText)
      .filter((question): question is string => typeof question === "string")
      .map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.7, freshnessScore: 0.8 }))
  }
}

/**
 * YouTube suggestion provider using the public suggestion endpoint configured by environment.
 */
export class YouTubeSuggestProvider extends HttpDiscoveryProvider {
  readonly name = "youtube-suggest" as const

  async discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]> {
    const url = new URL(this.endpoint)
    url.searchParams.set("client", "firefox")
    url.searchParams.set("ds", "yt")
    url.searchParams.set("q", request.seed)
    const json = await this.fetchJson(url)
    const suggestions = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : []
    return suggestions
      .filter((question): question is string => typeof question === "string")
      .map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.55, freshnessScore: 0.9 }))
  }
}

/**
 * Internal configured seed question provider.
 */
export class InternalSeedProvider implements DiscoveryProvider {
  readonly name = "internal-seed" as const

  constructor(private readonly seedQuestions: string[]) {}

  discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]> {
    return Promise.resolve(
      this.seedQuestions
        .filter((question) => question.toLowerCase().includes(request.seed.toLowerCase()) || request.seed.length > 0)
        .map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.45, freshnessScore: 0.7 }))
    )
  }
}

/**
 * Manual import provider for request-supplied questions.
 */
export class ManualImportProvider implements DiscoveryProvider {
  readonly name = "manual-import" as const

  discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]> {
    return Promise.resolve(
      request.manualQuestions.map((question) => ({
        question,
        sourceProvider: this.name,
        searchDemand: 0.5,
        freshnessScore: 1
      }))
    )
  }
}

/**
 * Google Search Console import provider using the official Search Analytics API.
 */
export class GoogleSearchConsoleProvider extends HttpDiscoveryProvider {
  readonly name = "google-search-console" as const

  constructor(
    endpoint: string,
    timeoutMs: number,
    private readonly accessToken: string | undefined,
    private readonly siteUrl: string | undefined,
    fetcher: typeof fetch = fetch
  ) {
    super(endpoint, timeoutMs, fetcher)
  }

  async discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]> {
    if (!this.accessToken || !this.siteUrl) {
      throw new AppError({
        status: 503,
        code: "provider_not_configured",
        message: "Google Search Console credentials are not configured"
      })
    }
    const url = new URL(
      `${this.endpoint.replace(/\/$/u, "")}/sites/${encodeURIComponent(this.siteUrl)}/searchAnalytics/query`
    )
    const response = await this.fetcher(url.toString(), {
      method: "POST",
      headers: { authorization: `Bearer ${this.accessToken}`, "content-type": "application/json" },
      body: JSON.stringify({
        startDate: "2026-01-01",
        endDate: "2026-06-30",
        dimensions: ["query"],
        rowLimit: request.limit
      })
    })
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "provider_error",
        message: `Google Search Console returned ${String(response.status)}`
      })
    const json = (await response.json()) as { rows?: { keys?: string[]; impressions?: number }[] }
    return (json.rows ?? [])
      .map((row) => row.keys?.[0])
      .filter((question): question is string => typeof question === "string")
      .map((question) => ({ question, sourceProvider: this.name, searchDemand: 0.85, freshnessScore: 0.8 }))
  }
}

/**
 * Replaceable provider registry.
 */
export class DiscoveryProviderRegistry {
  private readonly providers = new Map<DiscoveryProviderName, DiscoveryProvider>()

  /**
   * Registers one provider.
   */
  register(provider: DiscoveryProvider): void {
    this.providers.set(provider.name, provider)
  }

  /**
   * Resolves providers by name.
   */
  resolve(names: DiscoveryProviderName[]): DiscoveryProvider[] {
    return names.map((name) => {
      const provider = this.providers.get(name)
      if (!provider) throw new AppError({ status: 500, code: "provider_missing", message: `${name} is not registered` })
      return provider
    })
  }
}

/**
 * Creates the production provider registry from configuration.
 */
export function createDiscoveryProviderRegistry(
  config: AppConfig,
  fetcher: typeof fetch = fetch
): DiscoveryProviderRegistry {
  const registry = new DiscoveryProviderRegistry()
  const timeoutMs = 4500
  registry.register(
    new BingAutosuggestProvider(
      config.bingAutosuggestEndpoint ?? "https://api.bing.microsoft.com/v7.0/Suggestions",
      timeoutMs,
      config.bingAutosuggestKey,
      fetcher
    )
  )
  registry.register(
    new YouTubeSuggestProvider(
      config.youtubeSuggestEndpoint ?? "https://suggestqueries.google.com/complete/search",
      timeoutMs,
      fetcher
    )
  )
  registry.register(
    new InternalSeedProvider(
      (config.internalSeedQuestions ?? "")
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean)
    )
  )
  registry.register(new ManualImportProvider())
  registry.register(
    new GoogleSearchConsoleProvider(
      config.googleSearchConsoleEndpoint ?? "https://searchconsole.googleapis.com/webmasters/v3",
      timeoutMs,
      config.googleSearchConsoleAccessToken,
      config.googleSearchConsoleSiteUrl,
      fetcher
    )
  )
  return registry
}
