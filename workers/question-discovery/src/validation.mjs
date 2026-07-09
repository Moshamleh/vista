import { validationError } from "./errors.mjs"

export const supportedProviders = new Set(["google-suggest", "bing-suggest"])
export const supportedMarkets = new Set(["AE", "SA", "QA", "KW", "BH", "OM"])
export const supportedLanguages = new Set(["en-AE", "ar-AE"])

/**
 * Parses a request body as JSON.
 * @param {Request} request Incoming request.
 * @returns {Promise<unknown>}
 */
export async function readJsonBody(request) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    throw validationError("Content-Type must be application/json.")
  }

  try {
    return await request.json()
  } catch {
    throw validationError("Request body must be valid JSON.")
  }
}

/**
 * Normalizes a short human-entered string.
 * @param {unknown} value Raw value.
 * @returns {string}
 */
export function cleanString(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : ""
}

/**
 * Validates and normalizes a discovery request.
 * @param {unknown} value Raw request payload.
 * @param {Record<string, unknown>} env Worker environment.
 * @returns {{seed:string,market:string,language:string,limit:number,providers:string[],includeSeedQuestions:boolean}}
 */
export function validateDiscoveryRequest(value, env = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw validationError("Request body must be a JSON object.")
  }

  const body = value
  const seed = cleanString(body.seed)
  if (seed.length < 2 || seed.length > 120) {
    throw validationError("seed must be between 2 and 120 characters.", { field: "seed" })
  }

  const market = cleanString(body.market || env.QUESTION_DISCOVERY_DEFAULT_MARKET || "AE").toUpperCase()
  if (!supportedMarkets.has(market)) {
    throw validationError("market must be one of AE, SA, QA, KW, BH, or OM.", { field: "market" })
  }

  const language = cleanString(body.language || env.QUESTION_DISCOVERY_DEFAULT_LANGUAGE || "en-AE")
  if (!supportedLanguages.has(language)) {
    throw validationError("language must be en-AE or ar-AE.", { field: "language" })
  }

  const limit = Number.isInteger(body.limit) ? body.limit : 25
  if (limit < 1 || limit > 100) {
    throw validationError("limit must be an integer between 1 and 100.", { field: "limit" })
  }

  const providers = Array.isArray(body.providers) && body.providers.length > 0 ? body.providers : ["google-suggest", "bing-suggest"]
  const normalizedProviders = providers.map(cleanString)
  const invalidProvider = normalizedProviders.find((provider) => !supportedProviders.has(provider))
  if (invalidProvider) {
    throw validationError("providers may only include google-suggest and bing-suggest.", { field: "providers", invalidProvider })
  }

  return {
    seed,
    market,
    language,
    limit,
    providers: Array.from(new Set(normalizedProviders)),
    includeSeedQuestions: body.includeSeedQuestions === true
  }
}
