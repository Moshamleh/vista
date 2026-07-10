import { ApiError } from "./errors.mjs"

/**
 * Parses comma-separated API keys from the worker environment.
 * @param {Record<string, unknown>} env Worker environment.
 * @returns {Set<string>} Configured API keys.
 */
export function getConfiguredApiKeys(env) {
  const raw = typeof env.QUESTION_DISCOVERY_API_KEYS === "string" ? env.QUESTION_DISCOVERY_API_KEYS : ""
  return new Set(raw.split(",").map((key) => key.trim()).filter(Boolean))
}

/**
 * Extracts an API key from Authorization Bearer or x-api-key.
 * @param {Request} request Incoming request.
 * @returns {string} Candidate API key.
 */
export function readApiKey(request) {
  const auth = request.headers.get("authorization") || ""
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim()
  return (request.headers.get("x-api-key") || "").trim()
}

/**
 * Enforces API-key authentication for protected endpoints.
 * @param {Request} request Incoming request.
 * @param {Record<string, unknown>} env Worker environment.
 * @returns {string} Authenticated API key.
 * @throws {ApiError} When authentication is missing, invalid, or not configured.
 */
export function requireApiKey(request, env) {
  const configured = getConfiguredApiKeys(env)
  if (configured.size === 0) {
    throw new ApiError(503, "authentication_not_configured", "Question Discovery authentication is not configured.")
  }

  const candidate = readApiKey(request)
  if (!candidate || !configured.has(candidate)) {
    throw new ApiError(401, "unauthorized", "A valid Question Discovery API key is required.")
  }

  return candidate
}
