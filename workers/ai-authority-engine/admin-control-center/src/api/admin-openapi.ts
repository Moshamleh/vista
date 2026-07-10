export interface ApiEndpoint {
  readonly operationId: string
  readonly method: "GET" | "POST" | "PATCH" | "DELETE"
  readonly path: string
}

export const adminOpenApiEndpoints = [
  { operationId: "getHealth", method: "GET", path: "/health" },
  { operationId: "getDiagnostics", method: "GET", path: "/diagnostics" },
  { operationId: "listQuestions", method: "GET", path: "/questions" },
  { operationId: "runDiscovery", method: "POST", path: "/discover/run" },
  { operationId: "listDiscoveryRuns", method: "GET", path: "/discover/status" },
  { operationId: "getQuestionStats", method: "GET", path: "/stats" },
  { operationId: "listContent", method: "GET", path: "/content" },
  { operationId: "getContent", method: "GET", path: "/content/{id}" },
  { operationId: "approveContent", method: "POST", path: "/content/{id}/approve" },
  { operationId: "rejectContent", method: "POST", path: "/content/{id}/reject" },
  { operationId: "rollbackContent", method: "POST", path: "/content/{id}/rollback" },
  { operationId: "listGenerationJobs", method: "GET", path: "/generate/jobs" },
  { operationId: "listGenerationProviders", method: "GET", path: "/generate/providers" },
  { operationId: "testGenerationProvider", method: "POST", path: "/generate/providers/test" },
  { operationId: "listPublishJobs", method: "GET", path: "/publish/jobs" },
  { operationId: "retryPublish", method: "POST", path: "/publish/{contentId}/retry" },
  { operationId: "listPublisherProviders", method: "GET", path: "/publish/providers" },
  { operationId: "getGeoStatus", method: "GET", path: "/geo/status" },
  { operationId: "listGeoEntities", method: "GET", path: "/geo/entities" },
  { operationId: "getGeoReport", method: "GET", path: "/geo/report/{contentId}" },
  { operationId: "optimizeGeo", method: "POST", path: "/geo/optimize/{contentId}" },
  { operationId: "getVisibilityStatus", method: "GET", path: "/visibility/status" },
  { operationId: "getVisibilityScore", method: "GET", path: "/visibility/score" },
  { operationId: "getVisibilityHistory", method: "GET", path: "/visibility/history" },
  { operationId: "listVisibilityRecommendations", method: "GET", path: "/visibility/recommendations" },
  { operationId: "scanVisibility", method: "POST", path: "/visibility/scan" },
  { operationId: "getIndexStatus", method: "GET", path: "/index/status" },
  { operationId: "getSearchConsoleStatus", method: "GET", path: "/search-console/status" },
  { operationId: "getBingStatus", method: "GET", path: "/bing/status" },
  { operationId: "generateSitemap", method: "POST", path: "/sitemap/generate" },
  { operationId: "generateRobots", method: "POST", path: "/robots/generate" },
  { operationId: "generateLlms", method: "POST", path: "/llms/generate" },
  { operationId: "listSignals", method: "GET", path: "/signals" },
  { operationId: "scanSignals", method: "POST", path: "/signals/scan" },
  { operationId: "listOpportunities", method: "GET", path: "/opportunities" },
  { operationId: "listSources", method: "GET", path: "/sources" }
] as const satisfies readonly ApiEndpoint[]
