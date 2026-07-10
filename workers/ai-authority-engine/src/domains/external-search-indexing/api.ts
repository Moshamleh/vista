import type { AppContainer } from "../../di/container"
import { AppError } from "../../errors/app-error"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { ContentRepository } from "../content-pipeline/repositories"
import { createExternalSearchProviderRegistry } from "./providers"
import {
  BingImportRepository,
  IndexingJobRepository,
  IndexingResultRepository,
  LlmsVersionRepository,
  RobotsVersionRepository,
  SearchConsoleImportRepository,
  SitemapVersionRepository
} from "./repositories"
import { ExternalSearchIndexingService } from "./service"
import type { IndexingProviderName } from "./types"

/** Creates the External Search Intelligence and Indexing service from shared dependencies. */
export function createExternalSearchIndexingService(container: AppContainer): ExternalSearchIndexingService {
  return new ExternalSearchIndexingService(
    createExternalSearchProviderRegistry({
      googleSearchConsoleEndpoint: container.config.googleSearchConsoleEndpoint,
      googleSearchConsoleAccessToken: container.config.googleSearchConsoleAccessToken,
      bingWebmasterEndpoint: container.config.bingWebmasterEndpoint,
      bingWebmasterApiKey: container.config.bingWebmasterApiKey,
      indexNowEndpoint: container.config.indexNowEndpoint,
      indexNowKey: container.config.indexNowKey,
      indexNowKeyLocation: container.config.indexNowKeyLocation
    }),
    new ContentRepository(container.db),
    new IndexingJobRepository(container.db),
    new IndexingResultRepository(container.db),
    new SearchConsoleImportRepository(container.db),
    new BingImportRepository(container.db),
    new SitemapVersionRepository(container.db),
    new RobotsVersionRepository(container.db),
    new LlmsVersionRepository(container.db),
    container.config.publisherWebsiteBaseUrl,
    container.config.googleSearchConsoleSiteUrl,
    container.logger
  )
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    return (await request.json()) as Record<string, unknown>
  } catch {
    throw new AppError({ status: 400, code: "invalid_json", message: "Request body must be valid JSON" })
  }
}

function readProvider(value: unknown): IndexingProviderName {
  if (value === "google-search-console" || value === "bing-webmaster" || value === "indexnow") return value
  return "indexnow"
}

/** Routes External Search Intelligence and Indexing API requests. */
export async function routeExternalSearchIndexingRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createExternalSearchIndexingService(container)

  if (request.method === "POST" && url.pathname === "/index/submit") {
    const body = await readJson(request)
    const targetUrl = typeof body.url === "string" ? body.url : ""
    return successResponse(
      { result: await service.submit(targetUrl, readProvider(body.provider), context.requestId) },
      context.requestId,
      201
    )
  }
  if (request.method === "POST" && url.pathname === "/index/batch") {
    const body = await readJson(request)
    const urls = Array.isArray(body.urls) ? body.urls.filter((item): item is string => typeof item === "string") : []
    return successResponse(
      { jobs: await service.submitBatch(urls, readProvider(body.provider), "batch", context.requestId) },
      context.requestId,
      201
    )
  }
  if (request.method === "GET" && url.pathname === "/index/status") {
    return successResponse(await service.status(), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/search-console/status") {
    return successResponse(await service.searchConsoleStatus(), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/bing/status") {
    return successResponse(await service.bingStatus(), context.requestId)
  }
  if (request.method === "POST" && url.pathname === "/sitemap/generate") {
    return successResponse({ result: await service.generateSitemap(context.requestId) }, context.requestId, 201)
  }
  if (request.method === "POST" && url.pathname === "/robots/generate") {
    return successResponse({ result: await service.generateRobots() }, context.requestId, 201)
  }
  if (request.method === "POST" && url.pathname === "/llms/generate") {
    return successResponse({ result: await service.generateLlms() }, context.requestId, 201)
  }
  return null
}
