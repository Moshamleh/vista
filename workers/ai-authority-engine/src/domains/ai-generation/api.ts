import type { AppContainer } from "../../di/container"
import { AppError } from "../../errors/app-error"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { AiBudgetManager } from "../../operations/cost-management"
import { readJson } from "../../validation/validator"
import {
  ContentAuditRepository,
  ContentRepository,
  ContentVersionRepository,
  EditorialQueueRepository,
  InternalLinkRepository,
  PublicationQueueRepository,
  ReviewQueueRepository
} from "../content-pipeline/repositories"
import { ContentPipelineService } from "../content-pipeline/service"
import { QuestionRepository } from "../question-discovery/repositories"
import { createAiProviderRegistry } from "./providers"
import { AiProviderCheckRepository, GenerationJobRepository, PromptTemplateRepository } from "./repositories"
import { AiGenerationService } from "./service"
import type { GenerateRequestInput, GenerationContentType } from "./types"

const generationContentTypes: readonly GenerationContentType[] = [
  "Authority Article",
  "FAQ",
  "Knowledge Page",
  "Service Page",
  "Landing Page",
  "News Article",
  "Press Release",
  "Comparison Article",
  "Case Study",
  "Glossary Page"
]

/**
 * Creates the AI Generation service from shared dependencies.
 */
export function createAiGenerationService(container: AppContainer): AiGenerationService {
  const content = new ContentRepository(container.db)
  return new AiGenerationService(
    createAiProviderRegistry(container.config),
    new GenerationJobRepository(container.db),
    new PromptTemplateRepository(container.db),
    new AiProviderCheckRepository(container.db),
    new QuestionRepository(container.db),
    content,
    new ContentPipelineService(
      content,
      new ContentVersionRepository(container.db),
      new EditorialQueueRepository(container.db),
      new ReviewQueueRepository(container.db),
      new PublicationQueueRepository(container.db),
      new InternalLinkRepository(container.db),
      new ContentAuditRepository(container.db),
      container.logger
    ),
    container.config.aiGenerationProvider,
    container.config.aiGenerationModel,
    container.config.aiGenerationTimeoutMs,
    container.logger,
    new AiBudgetManager(container.cache, container.config, container.logger)
  )
}

/**
 * Validates generation request input.
 */
export function validateGenerateRequest(value: unknown, contentId: string | null): GenerateRequestInput {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({ status: 400, code: "validation_error", message: "Request body must be a JSON object" })
  }
  const body = value as Record<string, unknown>
  const question = typeof body.question === "string" ? body.question.trim() : ""
  if (question.length < 5)
    throw new AppError({ status: 400, code: "validation_error", message: "question is required" })
  const contentType =
    typeof body.contentType === "string" ? (body.contentType as GenerationContentType) : "Authority Article"
  if (!generationContentTypes.includes(contentType)) {
    throw new AppError({ status: 400, code: "validation_error", message: "contentType is not supported" })
  }
  const language = typeof body.language === "string" ? body.language : "en"
  if (language !== "en" && language !== "ar") {
    throw new AppError({ status: 400, code: "validation_error", message: "language must be en or ar" })
  }
  const minWordCount =
    typeof body.minWordCount === "number" && Number.isInteger(body.minWordCount) ? body.minWordCount : 800
  if (minWordCount < 50 || minWordCount > 10000) {
    throw new AppError({ status: 400, code: "validation_error", message: "minWordCount must be between 50 and 10000" })
  }
  return {
    question,
    questionId: typeof body.questionId === "string" ? body.questionId : null,
    contentId,
    contentType,
    minWordCount,
    language,
    targetKeyword: typeof body.targetKeyword === "string" ? body.targetKeyword : question,
    async: body.async === true
  }
}

function readLimit(url: URL): number {
  const raw = url.searchParams.get("limit")
  if (!raw) return 50
  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new AppError({ status: 400, code: "invalid_query", message: "limit must be between 1 and 100" })
  }
  return value
}

function actor(context: RequestContext): string {
  return context.auth?.subject ?? "api-key"
}

/**
 * Routes AI Content Generation API requests.
 */
export async function routeAiGenerationRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createAiGenerationService(container)

  if (request.method === "POST" && url.pathname === "/generate") {
    const input = validateGenerateRequest(await readJson(request), null)
    const job = await service.createJob(input, actor(context), context.requestId)
    if (input.async)
      await container.queue.send({
        id: job.id,
        type: "ai-generation.run",
        payload: { jobId: job.id, minWordCount: input.minWordCount }
      })
    return successResponse({ job }, context.requestId, input.async ? 202 : 201)
  }

  const contentGenerateMatch = /^\/generate\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "POST" && contentGenerateMatch?.[1]) {
    const input = validateGenerateRequest(await readJson(request), contentGenerateMatch[1])
    const job = await service.createJob(input, actor(context), context.requestId)
    if (input.async)
      await container.queue.send({
        id: job.id,
        type: "ai-generation.run",
        payload: { jobId: job.id, minWordCount: input.minWordCount }
      })
    return successResponse({ job }, context.requestId, input.async ? 202 : 201)
  }

  if (request.method === "GET" && url.pathname === "/generate/jobs") {
    return successResponse({ jobs: await service.listJobs(readLimit(url)) }, context.requestId)
  }

  const jobMatch = /^\/generate\/jobs\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && jobMatch?.[1]) {
    return successResponse({ job: await service.getJob(jobMatch[1]) }, context.requestId)
  }

  const cancelMatch = /^\/generate\/jobs\/([^/]+)\/cancel$/u.exec(url.pathname)
  if (request.method === "POST" && cancelMatch?.[1]) {
    const body = (await readJson(request)) as Record<string, unknown>
    const reason = typeof body.reason === "string" ? body.reason : "cancelled by request"
    return successResponse(
      { job: await service.cancelJob(cancelMatch[1], reason, context.requestId) },
      context.requestId
    )
  }

  if (request.method === "GET" && url.pathname === "/generate/providers") {
    return successResponse(service.listProviders(), context.requestId)
  }

  if (request.method === "POST" && url.pathname === "/generate/providers/test") {
    return successResponse({ provider: await service.testProvider(context.requestId) }, context.requestId)
  }

  return null
}
