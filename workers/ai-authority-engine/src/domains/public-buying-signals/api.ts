import type { AppContainer } from "../../di/container"
import type { RequestContext } from "../../http/request-context"
import { successResponse } from "../../http/response"
import { createBuyingSignalProviderRegistry } from "./providers"
import {
  BuyingSignalRepository,
  IngestionRunRepository,
  OpportunityRepository,
  OpportunityScoreRepository,
  OrganizationRepository,
  SignalSourceRepository
} from "./repositories"
import { PublicBuyingSignalService } from "./service"

/** Creates the Public Buying Signal Intelligence service from shared dependencies. */
export function createPublicBuyingSignalService(container: AppContainer): PublicBuyingSignalService {
  return new PublicBuyingSignalService(
    createBuyingSignalProviderRegistry(container.config.publicBuyingSignalFeeds),
    new SignalSourceRepository(container.db),
    new OrganizationRepository(container.db),
    new BuyingSignalRepository(container.db),
    new OpportunityRepository(container.db),
    new OpportunityScoreRepository(container.db),
    new IngestionRunRepository(container.db),
    container.logger
  )
}

function readLimit(url: URL): number {
  const raw = url.searchParams.get("limit")
  if (!raw) return 100
  const value = Number.parseInt(raw, 10)
  return Number.isInteger(value) && value > 0 && value <= 500 ? value : 100
}

/** Routes Public Buying Signal Intelligence API requests. */
export async function routePublicBuyingSignalRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  const service = createPublicBuyingSignalService(container)

  if (request.method === "GET" && url.pathname === "/signals") {
    return successResponse({ signals: await service.listSignals(readLimit(url)) }, context.requestId)
  }
  const signalMatch = /^\/signals\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && signalMatch?.[1]) {
    return successResponse({ signal: await service.getSignal(signalMatch[1]) }, context.requestId)
  }
  if (request.method === "POST" && url.pathname === "/signals/scan") {
    return successResponse({ result: await service.scan(context.requestId, readLimit(url)) }, context.requestId, 201)
  }
  if (request.method === "GET" && url.pathname === "/opportunities") {
    return successResponse({ opportunities: await service.listOpportunities(readLimit(url)) }, context.requestId)
  }
  const opportunityMatch = /^\/opportunities\/([^/]+)$/u.exec(url.pathname)
  if (request.method === "GET" && opportunityMatch?.[1]) {
    return successResponse({ opportunity: await service.getOpportunity(opportunityMatch[1]) }, context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/sources") {
    return successResponse({ sources: await service.listSources(readLimit(url)) }, context.requestId)
  }
  return null
}
