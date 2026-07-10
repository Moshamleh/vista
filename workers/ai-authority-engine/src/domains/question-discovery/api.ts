import type { AppContainer } from "../../di/container"
import { AppError } from "../../errors/app-error"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { readJson } from "../../validation/validator"
import { ProviderRateLimiter, createDiscoveryProviderRegistry } from "./providers"
import { DiscoveryRunRepository, EntityRepository, ProviderRepository, QuestionRepository } from "./repositories"
import { QuestionDiscoveryService } from "./service"
import type { DiscoveryProviderName, DiscoveryRunRequest } from "./types"

const providerNames: readonly DiscoveryProviderName[] = [
  "bing-autosuggest",
  "youtube-suggest",
  "internal-seed",
  "manual-import",
  "google-search-console"
]

/**
 * Creates the Question Discovery service from shared dependencies.
 */
export function createQuestionDiscoveryService(container: AppContainer): QuestionDiscoveryService {
  return new QuestionDiscoveryService(
    createDiscoveryProviderRegistry(container.config),
    new ProviderRateLimiter(container.cache, container.config.rateLimitMax, container.config.rateLimitWindowSeconds),
    new QuestionRepository(container.db),
    new DiscoveryRunRepository(container.db),
    new ProviderRepository(container.db),
    new EntityRepository(container.db),
    container.logger
  )
}

/**
 * Parses a bounded integer query parameter.
 */
export function readQueryInt(url: URL, key: string, fallback: number, max: number): number {
  const raw = url.searchParams.get(key)
  if (!raw) return fallback
  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new AppError({ status: 400, code: "invalid_query", message: `${key} must be between 0 and ${String(max)}` })
  }
  return value
}

/**
 * Validates a discovery run request.
 */
export function validateDiscoveryRunRequest(value: unknown): DiscoveryRunRequest {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" })
  }
  const body = value as Record<string, unknown>
  const seed = typeof body.seed === "string" ? body.seed.trim() : ""
  if (seed.length < 2 || seed.length > 120) {
    throw new AppError({ status: 400, code: "validation_error", message: "seed must be between 2 and 120 characters" })
  }
  const market = typeof body.market === "string" ? body.market : "AE"
  if (!["AE", "SA", "QA", "KW", "BH", "OM"].includes(market)) {
    throw new AppError({ status: 400, code: "validation_error", message: "market is invalid" })
  }
  const language = typeof body.language === "string" ? body.language : "en"
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" })
  }
  const rawProviders = Array.isArray(body.providers) && body.providers.length > 0 ? body.providers : ["internal-seed"]
  const normalizedProviders = rawProviders.map((provider) => String(provider)) as DiscoveryProviderName[]
  const invalid = normalizedProviders.find((provider) => !providerNames.includes(provider))
  if (invalid)
    throw new AppError({ status: 400, code: "validation_error", message: `Unsupported provider: ${invalid}` })
  const limit = typeof body.limit === "number" && Number.isInteger(body.limit) ? body.limit : 25
  if (limit < 1 || limit > 100)
    throw new AppError({ status: 400, code: "validation_error", message: "limit must be between 1 and 100" })
  const manualQuestions = Array.isArray(body.manualQuestions)
    ? body.manualQuestions.filter((item): item is string => typeof item === "string")
    : []
  return {
    seed,
    market: market as DiscoveryRunRequest["market"],
    language,
    providers: Array.from(new Set(normalizedProviders)),
    limit,
    manualQuestions
  }
}

/**
 * Validates a manual question creation request.
 */
export function validateCreateQuestionRequest(value: unknown): {
  question: string
  market: DiscoveryRunRequest["market"]
  sourceRunId: string
} {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" })
  }
  const body = value as Record<string, unknown>
  const question = typeof body.question === "string" ? body.question.trim() : ""
  if (question.length < 2 || question.length > 240) {
    throw new AppError({
      status: 400,
      code: "validation_error",
      message: "question must be between 2 and 240 characters"
    })
  }
  const market = typeof body.market === "string" ? body.market : "AE"
  if (!["AE", "SA", "QA", "KW", "BH", "OM"].includes(market)) {
    throw new AppError({ status: 400, code: "validation_error", message: "market is invalid" })
  }
  return {
    question,
    market: market as DiscoveryRunRequest["market"],
    sourceRunId: typeof body.sourceRunId === "string" ? body.sourceRunId : "manual"
  }
}

/**
 * Routes Question Discovery API requests.
 */
export async function routeQuestionDiscoveryRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createQuestionDiscoveryService(container)

  if (request.method === "GET" && url.pathname === "/questions") {
    const limit = readQueryInt(url, "limit", 50, 100)
    const offset = readQueryInt(url, "offset", 0, 10000)
    return successResponse({ questions: await service.listQuestions(limit, offset) }, context.requestId)
  }

  const questionMatch = /^\/questions\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && questionMatch?.[1]) {
    return successResponse({ question: await service.getQuestion(questionMatch[1]) }, context.requestId)
  }

  if (request.method === "POST" && url.pathname === "/questions") {
    const body = validateCreateQuestionRequest(await readJson(request))
    return successResponse(
      { question: await service.createQuestion(body.question, body.market, body.sourceRunId) },
      context.requestId,
      201
    )
  }

  if (request.method === "POST" && url.pathname === "/discover/run") {
    const body = validateDiscoveryRunRequest(await readJson(request))
    return successResponse({ run: await service.runDiscovery(body, context.requestId) }, context.requestId, 201)
  }

  if (request.method === "GET" && url.pathname === "/discover/status") {
    const limit = readQueryInt(url, "limit", 20, 100)
    return successResponse({ runs: await service.listRuns(limit) }, context.requestId)
  }

  if (request.method === "GET" && url.pathname === "/stats") {
    return successResponse(await service.getStats(), context.requestId)
  }

  return null
}
