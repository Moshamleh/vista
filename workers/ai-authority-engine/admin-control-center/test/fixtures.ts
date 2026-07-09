export function apiPayload(path: string): unknown {
  if (path === "/health") return { status: "healthy", service: "vista-ai-authority-engine" }
  if (path === "/diagnostics") return { queue: "configured", d1: "configured", kv: "configured" }
  if (path === "/questions")
    return { questions: [{ id: "q1", question: "Who needs GEO in Dubai?", intent: "commercial", priorityScore: 0.91 }] }
  if (path === "/stats") return { total: 1, commercial: 1 }
  if (path === "/content")
    return { content: [{ id: "c1", title: "AI Visibility Dubai", status: "REVIEW_REQUIRED", currentVersion: 2 }] }
  if (path === "/generate/jobs") return { jobs: [{ id: "g1", status: "completed", provider: "openai" }] }
  if (path === "/generate/providers") return { providers: [{ name: "openai", configured: true }] }
  if (path === "/publish/jobs")
    return { jobs: [{ id: "p1", status: "succeeded", publishedUrl: "https://www.vistabylara.com/a" }] }
  if (path === "/publish/providers") return { providers: [{ name: "website", configured: true }] }
  if (path === "/geo/status") return { status: "ready" }
  if (path === "/geo/entities")
    return { entities: [{ id: "e1", name: "Dubai", entityType: "Location", confidenceScore: 1 }] }
  if (path === "/visibility/score")
    return {
      snapshot: {
        status: "completed",
        aggregateScore: 0.88,
        metrics: { canonicalCoverage: 1, schemaCompleteness: 0.9, aiReadinessScore: 0.86 }
      }
    }
  if (path === "/visibility/history") return { snapshots: [{ id: "v1", status: "completed", aggregateScore: 0.88 }] }
  if (path === "/visibility/recommendations")
    return {
      recommendations: [
        { id: "r1", severity: "medium", category: "schema", message: "Improve schema", action: "Regenerate GEO assets" }
      ]
    }
  if (path === "/index/status")
    return { latestSitemap: { version: 1, urlCount: 14 }, latestRobots: { version: 1 }, latestLlms: { version: 1 } }
  if (path === "/search-console/status") return { configured: true }
  if (path === "/bing/status") return { configured: true }
  if (path === "/opportunities")
    return {
      opportunities: [
        {
          id: "o1",
          title: "Dubai Retail: Shopify adoption",
          status: "open",
          organizationName: "Dubai Retail",
          score: 0.92,
          sourceName: "Dubai Launches",
          signalType: "shopify-adoption",
          explanation: "Public launch signal",
          recommendedServices: ["Shopify infrastructure"],
          updatedAt: "2026-07-01T12:00:00.000Z"
        },
        {
          id: "o2",
          title: "Abu Dhabi Services: AI hiring",
          status: "reviewed",
          organizationName: "Abu Dhabi Services",
          score: 0.74,
          sourceName: "Hiring Notices",
          signalType: "ai-hiring",
          explanation: "Hiring signal indicates AI automation demand",
          recommendedServices: ["AI automation"],
          updatedAt: "2026-06-30T12:00:00.000Z"
        }
      ]
    }
  if (path === "/sources")
    return { sources: [{ id: "s1", name: "Dubai Launches", category: "press-releases", enabled: true }] }
  return { accepted: true }
}

export function createFixtureFetch(): typeof fetch {
  return async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? new URL(input) : input instanceof URL ? input : new URL(input.url)
    return new Response(JSON.stringify({ data: apiPayload(url.pathname), meta: { requestId: "req-admin" } }), {
      status: 200,
      headers: { "content-type": "application/json" }
    })
  }
}
