import { ApiError } from "./errors.mjs"
import { readPositiveInt } from "./rate-limit.mjs"

/**
 * Creates an AbortSignal that times out provider calls.
 * @param {number} timeoutMs Timeout in milliseconds.
 * @returns {AbortSignal}
 */
export function createTimeoutSignal(timeoutMs) {
  const controller = new AbortController()
  setTimeout(() => controller.abort("provider timeout"), timeoutMs)
  return controller.signal
}

/**
 * Builds a provider URL with a query parameter.
 * @param {string} endpoint Provider endpoint URL.
 * @param {string} queryParam Query parameter name.
 * @param {string} query Query text.
 * @param {Record<string,string>} params Extra params.
 * @returns {URL}
 */
export function buildProviderUrl(endpoint, queryParam, query, params = {}) {
  const url = new URL(endpoint)
  url.searchParams.set(queryParam, query)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)
  return url
}

/**
 * Fetches JSON from a provider and wraps network failures.
 * @param {typeof fetch} fetcher Fetch implementation.
 * @param {URL} url Provider URL.
 * @param {number} timeoutMs Timeout in milliseconds.
 * @returns {Promise<unknown>}
 */
export async function fetchProviderJson(fetcher, url, timeoutMs) {
  let response
  try {
    response = await fetcher(url.toString(), {
      method: "GET",
      headers: { accept: "application/json,text/javascript,*/*" },
      signal: createTimeoutSignal(timeoutMs)
    })
  } catch (error) {
    throw new ApiError(502, "provider_unavailable", "Question provider request failed.", { providerUrl: url.origin, reason: String(error) })
  }

  if (!response.ok) {
    throw new ApiError(502, "provider_error", "Question provider returned an error.", { providerStatus: response.status, providerUrl: url.origin })
  }

  try {
    return await response.json()
  } catch {
    throw new ApiError(502, "provider_invalid_response", "Question provider returned invalid JSON.", { providerUrl: url.origin })
  }
}

/**
 * Provider adapter for Google autocomplete suggestions.
 */
export class GoogleSuggestProvider {
  /**
   * @param {{endpoint?:string,fetcher?:typeof fetch,timeoutMs?:number}} options Adapter options.
   */
  constructor(options = {}) {
    this.name = "google-suggest"
    this.endpoint = options.endpoint || "https://suggestqueries.google.com/complete/search"
    this.fetcher = options.fetcher || fetch
    this.timeoutMs = options.timeoutMs || 4500
  }

  /**
   * Discovers suggestions for a query from Google Suggest.
   * @param {string} query Search query.
   * @param {{market:string,language:string}} context Discovery context.
   * @returns {Promise<string[]>}
   */
  async discover(query, context) {
    const url = buildProviderUrl(this.endpoint, "q", query, {
      client: "firefox",
      gl: context.market.toLowerCase(),
      hl: context.language.startsWith("ar") ? "ar" : "en"
    })
    const json = await fetchProviderJson(this.fetcher, url, this.timeoutMs)
    return Array.isArray(json) && Array.isArray(json[1]) ? json[1].filter((item) => typeof item === "string") : []
  }
}

/**
 * Provider adapter for Bing OpenSearch suggestions.
 */
export class BingSuggestProvider {
  /**
   * @param {{endpoint?:string,fetcher?:typeof fetch,timeoutMs?:number}} options Adapter options.
   */
  constructor(options = {}) {
    this.name = "bing-suggest"
    this.endpoint = options.endpoint || "https://api.bing.com/osjson.aspx"
    this.fetcher = options.fetcher || fetch
    this.timeoutMs = options.timeoutMs || 4500
  }

  /**
   * Discovers suggestions for a query from Bing OpenSearch.
   * @param {string} query Search query.
   * @param {{market:string,language:string}} context Discovery context.
   * @returns {Promise<string[]>}
   */
  async discover(query, context) {
    const url = buildProviderUrl(this.endpoint, "query", query, {
      market: context.language.startsWith("ar") ? `ar-${context.market}` : `en-${context.market}`
    })
    const json = await fetchProviderJson(this.fetcher, url, this.timeoutMs)
    return Array.isArray(json) && Array.isArray(json[1]) ? json[1].filter((item) => typeof item === "string") : []
  }
}

/**
 * Creates the provider registry from environment configuration.
 * @param {Record<string, unknown>} env Worker environment.
 * @param {typeof fetch} [fetcher] Fetch implementation.
 * @returns {Record<string, GoogleSuggestProvider|BingSuggestProvider>}
 */
export function createProviderRegistry(env, fetcher = fetch) {
  const timeoutMs = readPositiveInt(env.QUESTION_DISCOVERY_PROVIDER_TIMEOUT_MS, 4500)
  return {
    "google-suggest": new GoogleSuggestProvider({
      endpoint: typeof env.GOOGLE_SUGGEST_ENDPOINT === "string" ? env.GOOGLE_SUGGEST_ENDPOINT : undefined,
      fetcher,
      timeoutMs
    }),
    "bing-suggest": new BingSuggestProvider({
      endpoint: typeof env.BING_SUGGEST_ENDPOINT === "string" ? env.BING_SUGGEST_ENDPOINT : undefined,
      fetcher,
      timeoutMs
    })
  }
}
