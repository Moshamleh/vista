import { authenticateRequest } from "./auth/auth-middleware"
import { createContainer } from "./di/container"
import { AppError, toAppError } from "./errors/app-error"
import { createRequestContext } from "./http/request-context"
import { failureResponse, successResponse } from "./http/response"
import { generateOpenApi } from "./openapi/openapi"
import { validateApiVersion, verifyRequestSignature } from "./operations/api-protection"
import { routeOperationsRequest } from "./operations/api"
import { GlobalRateLimiter, getClientIp } from "./operations/rate-limiter"
import { recordOperation, resolveTraceId } from "./operations/observability"
import { getDiagnostics } from "./routes/diagnostics"
import { getHealth } from "./routes/health"
import type { AppBindings } from "./config/env"
import { routeAiGenerationRequest } from "./domains/ai-generation/api"
import { routeContentPipelineRequest } from "./domains/content-pipeline/api"
import { routeExternalSearchIndexingRequest } from "./domains/external-search-indexing/api"
import { routeGeoOptimizationRequest } from "./domains/geo-optimization/api"
import { routePublisherRequest } from "./domains/publisher/api"
import { routePublicBuyingSignalRequest } from "./domains/public-buying-signals/api"
import { routeQuestionDiscoveryRequest } from "./domains/question-discovery/api"
import { routeVisibilityIntelligenceRequest } from "./domains/visibility-intelligence/api"

/**
 * Routes HTTP requests for shared foundation endpoints.
 */
export async function routeRequest(request: Request, env: AppBindings): Promise<Response> {
  const context = createRequestContext(request)
  const corsHeaders = createCorsHeaders(request)

  try {
    const url = new URL(request.url)
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    const container = createContainer(env)
    const traceId = resolveTraceId(request, context.requestId)
    const headers = { ...corsHeaders, "x-trace-id": traceId, "x-api-version": container.config.apiVersion }
    validateApiVersion(request, container.config)

    if (request.method === "GET" && url.pathname === "/health") {
      return successResponse(getHealth(container), context.requestId, 200, headers)
    }

    if (request.method === "GET" && url.pathname === "/openapi.json") {
      return successResponse(generateOpenApi(container.config, url.origin), context.requestId, 200, headers)
    }

    await new GlobalRateLimiter(container.cache, container.config).enforce([`ip:${getClientIp(request)}`])
    await verifyRequestSignature(request, container.config, container.cache, context)

    if (request.method === "GET" && url.pathname === "/diagnostics") {
      await authenticateRequest(request, container.config, context, container.cache)
      await new GlobalRateLimiter(container.cache, container.config).enforce([
        `user:${context.auth?.subject ?? "anonymous"}`
      ])
      return successResponse(getDiagnostics(container), context.requestId, 200, headers)
    }

    await authenticateRequest(request, container.config, context, container.cache)
    await new GlobalRateLimiter(container.cache, container.config).enforce([
      `user:${context.auth?.subject ?? "anonymous"}`
    ])

    const operationsResponse = await recordOperation(
      "operations.route",
      container.logger,
      context,
      { path: url.pathname },
      () => routeOperationsRequest(request, container, context)
    )
    if (operationsResponse) return withOperationalHeaders(operationsResponse, headers)

    const buyingSignalResponse = await routePublicBuyingSignalRequest(request, container, context)
    if (buyingSignalResponse) return withOperationalHeaders(buyingSignalResponse, headers)

    const indexingResponse = await routeExternalSearchIndexingRequest(request, container, context)
    if (indexingResponse) return withOperationalHeaders(indexingResponse, headers)

    const visibilityResponse = await routeVisibilityIntelligenceRequest(request, container, context)
    if (visibilityResponse) return withOperationalHeaders(visibilityResponse, headers)

    const geoResponse = await routeGeoOptimizationRequest(request, container, context)
    if (geoResponse) return withOperationalHeaders(geoResponse, headers)

    const publisherResponse = await routePublisherRequest(request, container, context)
    if (publisherResponse) return withOperationalHeaders(publisherResponse, headers)

    const generationResponse = await routeAiGenerationRequest(request, container, context)
    if (generationResponse) return withOperationalHeaders(generationResponse, headers)

    const contentResponse = await routeContentPipelineRequest(request, container, context)
    if (contentResponse) return withOperationalHeaders(contentResponse, headers)

    const domainResponse = await routeQuestionDiscoveryRequest(request, container, context)
    if (domainResponse) return withOperationalHeaders(domainResponse, headers)

    return failureResponse(
      new AppError({ status: 404, code: "not_found", message: "Endpoint not found" }),
      context.requestId,
      headers
    )
  } catch (error) {
    return failureResponse(toAppError(error), context.requestId, corsHeaders)
  }
}

/**
 * Adds operation headers to responses generated by domain modules.
 */
function withOperationalHeaders(response: Response, headers: HeadersInit): Response {
  const next = new Headers(response.headers)
  new Headers(headers).forEach((value, key) => {
    next.set(key, value)
  })
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: next })
}

/**
 * Creates CORS headers for browser-based admin clients.
 */
function createCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin")
  const allowedOrigins = new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://www.vistabylara.com",
    "https://vistabylara.com"
  ])
  return {
    "access-control-allow-origin": origin && allowedOrigins.has(origin) ? origin : "http://localhost:3000",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers":
      "authorization,content-type,x-api-key,x-api-version,x-nonce,x-signature,x-signature-timestamp",
    "access-control-max-age": "86400",
    vary: "Origin"
  }
}
