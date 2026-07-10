import type { AppContainer } from "../../di/container"
import { AppError } from "../../errors/app-error"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { readJson } from "../../validation/validator"
import {
  ContentAuditRepository,
  ContentRepository,
  ContentVersionRepository,
  EditorialQueueRepository,
  InternalLinkRepository,
  PublicationQueueRepository,
  ReviewQueueRepository
} from "./repositories"
import { ContentPipelineService } from "./service"
import { validateCreateContentInput, validateUpdateContentInput } from "./validation"

/**
 * Creates the Content Pipeline service from shared dependencies.
 */
export function createContentPipelineService(container: AppContainer): ContentPipelineService {
  return new ContentPipelineService(
    new ContentRepository(container.db),
    new ContentVersionRepository(container.db),
    new EditorialQueueRepository(container.db),
    new ReviewQueueRepository(container.db),
    new PublicationQueueRepository(container.db),
    new InternalLinkRepository(container.db),
    new ContentAuditRepository(container.db),
    container.logger
  )
}

/**
 * Parses bounded integer query parameters.
 */
export function readContentQueryInt(url: URL, key: string, fallback: number, max: number): number {
  const raw = url.searchParams.get(key)
  if (!raw) return fallback
  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new AppError({ status: 400, code: "invalid_query", message: `${key} must be between 0 and ${String(max)}` })
  }
  return value
}

function actorFromContext(context: RequestContext): string {
  return context.auth?.subject ?? "api-key"
}

/**
 * Routes Content Repository and Editorial Pipeline API requests.
 */
export async function routeContentPipelineRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createContentPipelineService(container)
  const actor = actorFromContext(context)

  if (request.method === "GET" && url.pathname === "/content") {
    const limit = readContentQueryInt(url, "limit", 50, 100)
    const offset = readContentQueryInt(url, "offset", 0, 10000)
    return successResponse({ content: await service.listContent(limit, offset) }, context.requestId)
  }

  if (request.method === "POST" && url.pathname === "/content") {
    const input = validateCreateContentInput(await readJson(request))
    return successResponse(
      { content: await service.createContent(input, actor, context.requestId) },
      context.requestId,
      201
    )
  }

  const contentMatch = /^\/content\/([^/]+)$/u.exec(url.pathname)
  if (contentMatch?.[1]) {
    const id = contentMatch[1]
    if (request.method === "GET") return successResponse({ content: await service.getContent(id) }, context.requestId)
    if (request.method === "PATCH") {
      const input = validateUpdateContentInput(await readJson(request))
      return successResponse(
        { content: await service.updateContent(id, input, actor, context.requestId) },
        context.requestId
      )
    }
    if (request.method === "DELETE") {
      return successResponse({ content: await service.archiveContent(id, actor, context.requestId) }, context.requestId)
    }
  }

  const actionMatch = /^\/content\/([^/]+)\/(approve|reject|schedule|rollback)$/u.exec(url.pathname)
  if (request.method === "POST" && actionMatch?.[1] && actionMatch[2]) {
    const id = actionMatch[1]
    const action = actionMatch[2]
    if (action === "approve")
      return successResponse({ content: await service.approveContent(id, actor, context.requestId) }, context.requestId)
    if (action === "reject") {
      const body = (await readJson(request)) as Record<string, unknown>
      const notes = typeof body.notes === "string" ? body.notes : null
      return successResponse(
        { content: await service.rejectContent(id, actor, context.requestId, notes) },
        context.requestId
      )
    }
    if (action === "schedule") {
      const body = (await readJson(request)) as Record<string, unknown>
      const scheduledAt = typeof body.scheduledAt === "string" ? body.scheduledAt : ""
      const targets = Array.isArray(body.targets)
        ? body.targets.filter((item): item is string => typeof item === "string")
        : []
      if (scheduledAt.length === 0 || targets.length === 0) {
        throw new AppError({ status: 400, code: "validation_error", message: "scheduledAt and targets are required" })
      }
      return successResponse(
        { publication: await service.scheduleContent(id, scheduledAt, targets, actor, context.requestId) },
        context.requestId,
        201
      )
    }
    const body = (await readJson(request)) as Record<string, unknown>
    const versionNumber =
      typeof body.versionNumber === "number" && Number.isInteger(body.versionNumber) ? body.versionNumber : 0
    if (versionNumber < 1)
      throw new AppError({ status: 400, code: "validation_error", message: "versionNumber is required" })
    return successResponse(
      { content: await service.rollbackContent(id, versionNumber, actor, context.requestId) },
      context.requestId
    )
  }

  if (request.method === "GET" && url.pathname === "/editorial/queue") {
    const limit = readContentQueryInt(url, "limit", 50, 100)
    return successResponse({ editorialQueue: await service.listEditorialQueue(limit) }, context.requestId)
  }

  if (request.method === "GET" && url.pathname === "/publication/queue") {
    const limit = readContentQueryInt(url, "limit", 50, 100)
    return successResponse({ publicationQueue: await service.listPublicationQueue(limit) }, context.requestId)
  }

  return null
}
