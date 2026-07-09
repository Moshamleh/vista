import type { AppContainer } from "../../di/container"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { ContentRepository } from "../content-pipeline/repositories"
import {
  EntityGraphRepository,
  GeoReportRepository,
  InternalLinkGraphRepository,
  OptimizationHistoryRepository,
  SchemaDocumentRepository
} from "./repositories"
import { GeoOptimizationService } from "./service"

/** Creates the GEO Optimization service from shared dependencies. */
export function createGeoOptimizationService(container: AppContainer): GeoOptimizationService {
  return new GeoOptimizationService(
    new ContentRepository(container.db),
    new EntityGraphRepository(container.db),
    new SchemaDocumentRepository(container.db),
    new GeoReportRepository(container.db),
    new InternalLinkGraphRepository(container.db),
    new OptimizationHistoryRepository(container.db),
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

/** Routes GEO and AI Optimization API requests. */
export async function routeGeoOptimizationRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createGeoOptimizationService(container)

  if (request.method === "GET" && url.pathname === "/geo/status") {
    return successResponse(await service.getStatus(), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/geo/entities") {
    return successResponse({ entities: await service.listEntities(readLimit(url)) }, context.requestId)
  }
  const schemaMatch = /^\/geo\/schema\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && schemaMatch?.[1]) {
    return successResponse({ schema: await service.getSchema(schemaMatch[1]) }, context.requestId)
  }
  const optimizeMatch = /^\/geo\/optimize\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "POST" && optimizeMatch?.[1]) {
    return successResponse(
      { result: await service.optimize(optimizeMatch[1], context.requestId) },
      context.requestId,
      201
    )
  }
  const validateMatch = /^\/geo\/validate\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "POST" && validateMatch?.[1]) {
    return successResponse({ validation: await service.validate(validateMatch[1]) }, context.requestId)
  }
  const reportMatch = /^\/geo\/report\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && reportMatch?.[1]) {
    return successResponse({ report: await service.getReport(reportMatch[1], context.requestId) }, context.requestId)
  }
  return null
}
