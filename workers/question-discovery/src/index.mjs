import { requireApiKey } from "./auth.mjs"
import { ApiError, toApiError } from "./errors.mjs"
import { errorResponse, jsonResponse, optionsResponse } from "./http.mjs"
import { createOpenApi } from "./openapi.mjs"
import { createProviderRegistry } from "./providers.mjs"
import { discoverQuestions } from "./question-engine.mjs"
import { enforceRateLimit } from "./rate-limit.mjs"
import { getSchemas } from "./schema.mjs"
import { readJsonBody, validateDiscoveryRequest } from "./validation.mjs"

/**
 * Returns operational health for load balancers and deploy checks.
 * @returns {Response}
 */
export function handleHealth() {
  return jsonResponse({
    ok: true,
    worker: "question-discovery",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  })
}

/**
 * Returns JSON schemas for external clients.
 * @returns {Response}
 */
export function handleSchema() {
  return jsonResponse({ ok: true, schemas: getSchemas() })
}

/**
 * Returns the worker OpenAPI document.
 * @param {Request} request Incoming request.
 * @returns {Response}
 */
export function handleOpenApi(request) {
  const url = new URL(request.url)
  return jsonResponse(createOpenApi(url.origin))
}

/**
 * Handles question discovery requests end-to-end.
 * @param {Request} request Incoming request.
 * @param {Record<string, unknown>} env Worker environment.
 * @returns {Promise<Response>}
 */
export async function handleDiscover(request, env) {
  const apiKey = requireApiKey(request, env)
  const rateLimitHeaders = await enforceRateLimit(request, env, apiKey)
  const body = await readJsonBody(request)
  const discoveryRequest = validateDiscoveryRequest(body, env)
  const providers = createProviderRegistry(env)
  const data = await discoverQuestions(discoveryRequest, providers)

  if (data.questions.length === 0 && data.providerErrors.length > 0) {
    throw new ApiError(502, "provider_discovery_failed", "No questions could be discovered because providers failed.", { providerErrors: data.providerErrors })
  }

  return jsonResponse({ ok: true, data }, 200, rateLimitHeaders)
}

/**
 * Routes an incoming request to the correct endpoint.
 * @param {Request} request Incoming request.
 * @param {Record<string, unknown>} env Worker environment.
 * @returns {Promise<Response>}
 */
export async function routeRequest(request, env) {
  const url = new URL(request.url)

  if (request.method === "OPTIONS") return optionsResponse()
  if (request.method === "GET" && url.pathname === "/health") return handleHealth()
  if (request.method === "GET" && url.pathname === "/schema") return handleSchema()
  if (request.method === "GET" && url.pathname === "/openapi.json") return handleOpenApi(request)
  if (request.method === "POST" && url.pathname === "/discover") return handleDiscover(request, env)

  throw new ApiError(404, "not_found", "Endpoint not found.")
}

export default {
  /**
   * Cloudflare Worker module entrypoint.
   * @param {Request} request Incoming request.
   * @param {Record<string, unknown>} env Worker environment.
   * @returns {Promise<Response>}
   */
  async fetch(request, env) {
    try {
      return await routeRequest(request, env || {})
    } catch (error) {
      return errorResponse(toApiError(error))
    }
  }
}
