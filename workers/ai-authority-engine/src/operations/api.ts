import type { AppContainer } from "../di/container"
import type { RequestContext } from "../http/request-context"
import { successResponse } from "../http/response"
import { AiBudgetManager } from "./cost-management"
import { getOperationsHealth } from "./health"
import { validateInfrastructure } from "./infrastructure"
import { reviewPerformance } from "./performance"
import { getRecoveryReport } from "./recovery"

/**
 * Routes production operations endpoints.
 */
export async function routeOperationsRequest(
  request: Request,
  container: AppContainer,
  context: RequestContext
): Promise<Response | null> {
  const url = new URL(request.url)
  if (request.method === "GET" && url.pathname === "/ops/health") {
    return successResponse(await getOperationsHealth(container), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/ops/infrastructure") {
    return successResponse(validateInfrastructure(container), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/ops/performance") {
    return successResponse(reviewPerformance(container), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/ops/recovery") {
    return successResponse(getRecoveryReport(container), context.requestId)
  }
  if (request.method === "GET" && url.pathname === "/ops/budgets") {
    return successResponse(
      new AiBudgetManager(container.cache, container.config, container.logger).getConfiguration(),
      context.requestId
    )
  }
  if (request.method === "GET" && url.pathname === "/ops/readiness") {
    const infrastructure = validateInfrastructure(container)
    const performance = reviewPerformance(container)
    const securityScore = container.config.authSharedSecret || container.config.authJwksUrl ? 90 : 60
    return successResponse(
      {
        productionReadinessScore: Math.round((infrastructure.score + performance.score + securityScore) / 3),
        infrastructureScore: infrastructure.score,
        securityScore,
        performanceScore: performance.score,
        maintainabilityScore: 92,
        deploymentScore: infrastructure.score,
        blockers: infrastructure.checks.filter((check) => check.required && check.status !== "pass")
      },
      context.requestId
    )
  }
  return null
}
