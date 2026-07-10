import type { AppContainer } from "../di/container"

export interface ComponentHealth {
  name: string
  status: "ok" | "degraded" | "missing"
  details: Record<string, unknown>
}

/**
 * Creates machine-readable health for infrastructure and configured providers.
 */
export async function getOperationsHealth(
  container: AppContainer
): Promise<{ status: string; components: ComponentHealth[] }> {
  const components: ComponentHealth[] = []
  components.push(await checkD1(container))
  components.push(await checkKv(container))
  components.push({ name: "queue", status: "ok", details: { binding: "AUTHORITY_QUEUE" } })
  components.push({ name: "cron", status: "ok", details: { enabled: true, expression: "*/15 * * * *" } })
  components.push({
    name: "ai-provider",
    status:
      container.config.openAiApiKey || container.config.anthropicApiKey || container.config.googleAiApiKey
        ? "ok"
        : "degraded",
    details: { active: container.config.aiGenerationProvider, model: container.config.aiGenerationModel }
  })
  components.push({
    name: "search-console",
    status:
      container.config.googleSearchConsoleEndpoint &&
      container.config.googleSearchConsoleAccessToken &&
      container.config.googleSearchConsoleSiteUrl
        ? "ok"
        : "degraded",
    details: { siteUrl: container.config.googleSearchConsoleSiteUrl ?? null }
  })
  components.push({
    name: "bing",
    status: container.config.bingWebmasterEndpoint && container.config.bingWebmasterApiKey ? "ok" : "degraded",
    details: { configured: Boolean(container.config.bingWebmasterEndpoint && container.config.bingWebmasterApiKey) }
  })
  components.push({
    name: "indexnow",
    status: container.config.indexNowKey && container.config.indexNowKeyLocation ? "ok" : "degraded",
    details: { endpoint: container.config.indexNowEndpoint }
  })
  const status = components.every((component) => component.status === "ok") ? "ok" : "degraded"
  return { status, components }
}

async function checkD1(container: AppContainer): Promise<ComponentHealth> {
  try {
    const result = await container.db.prepare("select 1 as ok").first<{ ok: number }>()
    return { name: "d1", status: result?.ok === 1 ? "ok" : "degraded", details: { binding: "DB" } }
  } catch (error) {
    return { name: "d1", status: "degraded", details: { error: error instanceof Error ? error.message : "unknown" } }
  }
}

async function checkKv(container: AppContainer): Promise<ComponentHealth> {
  const key = `ops:health:${crypto.randomUUID()}`
  try {
    await container.cache.putJson(key, { ok: true }, 60)
    const result = await container.cache.getJson<{ ok: boolean }>(key)
    await container.cache.delete(key)
    return { name: "kv", status: result?.ok ? "ok" : "degraded", details: { binding: "CACHE" } }
  } catch (error) {
    return { name: "kv", status: "degraded", details: { error: error instanceof Error ? error.message : "unknown" } }
  }
}
