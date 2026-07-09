import type { AppContainer } from "../../di/container"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { ContentRepository } from "../content-pipeline/repositories"
import { createVisibilityProviderRegistry } from "./providers"
import {
  ValidationRunRepository,
  VisibilityContextRepository,
  VisibilityRecommendationRepository,
  VisibilityScoreRepository,
  VisibilitySnapshotRepository
} from "./repositories"
import { VisibilityIntelligenceService } from "./service"

/** Creates the AI Visibility Intelligence service from shared dependencies. */
export function createVisibilityIntelligenceService(container: AppContainer): VisibilityIntelligenceService {
  return new VisibilityIntelligenceService(
    createVisibilityProviderRegistry(),
    new ContentRepository(container.db),
    new VisibilityContextRepository(container.db),
    new VisibilitySnapshotRepository(container.db),
    new VisibilityScoreRepository(container.db),
    new VisibilityRecommendationRepository(container.db),
    new ValidationRunRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.logger
  )
}

function readLimit(url: URL): number {
  const raw = url.searchParams.get("limit")
  if (!raw) return 100
  const value = Number.parseInt(raw, 10)
  return Number.isInteger(value) && value > 0 && value <= 500 ? value : 100
}

/** Routes AI Visibility Intelligence API requests. */
export async function routeVisibilityIntelligenceRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createVisibilityIntelligenceService(container)

  if (request.method === "GET" && url.pathname === "/visibility/status") {
    return successResponse(await service.status(), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/visibility/score") {
    return successResponse({ snapshot: await service.score() }, context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/visibility/history") {
    return successResponse({ snapshots: await service.history(readLimit(url)) }, context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/visibility/recommendations") {
    return successResponse({ recommendations: await service.listRecommendations(readLimit(url)) }, context.requestId)
  }
  if (request.method === "POST" && url.pathname === "/visibility/scan") {
    return successResponse({ result: await service.scan(context.requestId) }, context.requestId, 201)
  }
  return null
}
