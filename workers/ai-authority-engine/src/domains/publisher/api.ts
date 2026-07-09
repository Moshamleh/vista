import type { AppContainer } from "../../di/container"
import { AppError } from "../../errors/app-error"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { readJson } from "../../validation/validator"
import { ContentRepository } from "../content-pipeline/repositories"
import { createPublisherRegistry } from "./providers"
import {
  PublishArtifactRepository,
  PublishFailureRepository,
  PublishHistoryRepository,
  PublishJobRepository,
  PublishTargetRepository
} from "./repositories"
import { PublisherService } from "./service"
import type { PublisherName } from "./types"

const publisherNames: readonly PublisherName[] = [
  "website",
  "rss",
  "github-knowledge-repository",
  "blogger",
  "medium",
  "vistanewswire",
  "json-export",
  "markdown-export"
]

/**
 * Creates the Publisher service from shared dependencies.
 */
export function createPublisherService(container: AppContainer): PublisherService {
  return new PublisherService(
    createPublisherRegistry(),
    new ContentRepository(container.db),
    new PublishJobRepository(container.db),
    new PublishTargetRepository(container.db),
    new PublishHistoryRepository(container.db),
    new PublishFailureRepository(container.db),
    new PublishArtifactRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.config.publisherDefaultTargets.filter((target): target is PublisherName =>
      publisherNames.includes(target as PublisherName)
    ),
    container.config.publisherTimeoutMs,
    container.logger
  )
}

/**
 * Validates publish request targets.
 */
export function readPublishRequest(value: unknown): { targets: PublisherName[] | null; async: boolean } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return { targets: null, async: false }
  const body = value as Record<string, unknown>
  const targets = Array.isArray(body.targets)
    ? body.targets
        .map((target) => String(target))
        .filter((target): target is PublisherName => publisherNames.includes(target as PublisherName))
    : null
  return { targets, async: body.async === true }
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

/**
 * Routes Publisher Engine API requests.
 */
export async function routePublisherRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createPublisherService(container)

  if (request.method === "POST" && url.pathname === "/publish") {
    const body = (await readJson(request)) as Record<string, unknown>
    const contentId = typeof body.contentId === "string" ? body.contentId : ""
    if (!contentId) throw new AppError({ status: 400, code: "validation_error", message: "contentId is required" })
    const input = readPublishRequest(body)
    const job = await service.createJob(contentId, input.targets, input.async, context.requestId)
    if (input.async) await container.queue.send({ id: job.id, type: "publisher.run", payload: { jobId: job.id } })
    return successResponse({ job }, context.requestId, input.async ? 202 : 201)
  }

  const publishMatch = /^\/publish\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "POST" && publishMatch?.[1]) {
    const input = readPublishRequest(await readJson(request))
    const job = await service.createJob(publishMatch[1], input.targets, input.async, context.requestId)
    if (input.async) await container.queue.send({ id: job.id, type: "publisher.run", payload: { jobId: job.id } })
    return successResponse({ job }, context.requestId, input.async ? 202 : 201)
  }

  const retryMatch = /^\/publish\/([^/]+)\/retry$/u.exec(url.pathname)
  if (request.method === "POST" && retryMatch?.[1]) {
    return successResponse({ job: await service.retryContent(retryMatch[1], context.requestId) }, context.requestId)
  }

  const cancelMatch = /^\/publish\/jobs\/([^/]+)\/cancel$/u.exec(url.pathname)
  if (request.method === "POST" && cancelMatch?.[1]) {
    return successResponse({ job: await service.cancelJob(cancelMatch[1], context.requestId) }, context.requestId)
  }

  if (request.method === "GET" && url.pathname === "/publish/jobs") {
    return successResponse({ jobs: await service.listJobs(readLimit(url)) }, context.requestId)
  }

  const jobMatch = /^\/publish\/jobs\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && jobMatch?.[1]) {
    return successResponse({ job: await service.getJob(jobMatch[1]) }, context.requestId)
  }

  if (request.method === "GET" && url.pathname === "/publish/providers") {
    return successResponse(service.listProviders(), context.requestId)
  }

  if (request.method === "POST" && url.pathname === "/publish/providers/test") {
    return successResponse({ providers: await service.testProviders() }, context.requestId)
  }

  return null
}
