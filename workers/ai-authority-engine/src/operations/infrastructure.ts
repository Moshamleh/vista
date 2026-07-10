import type { AppContainer } from "../di/container"

export interface InfrastructureCheck {
  name: string
  status: "pass" | "fail" | "warn"
  required: boolean
  message: string
}

/**
 * Validates required Cloudflare bindings and operational configuration.
 */
export function validateInfrastructure(container: AppContainer): { score: number; checks: InfrastructureCheck[] } {
  const checks: InfrastructureCheck[] = [
    check(
      "worker",
      true,
      container.config.serviceName === "vista-ai-authority-engine",
      "Worker service name is configured"
    ),
    check("d1", true, Boolean(container.env.DB), "D1 binding DB must exist"),
    check("kv", true, Boolean(container.env.CACHE), "KV binding CACHE must exist"),
    check("queue", true, Boolean(container.env.AUTHORITY_QUEUE), "Queue binding AUTHORITY_QUEUE must exist"),
    check(
      "auth",
      true,
      Boolean(container.config.authSharedSecret || container.config.authJwksUrl),
      "Auth secret or JWKS must exist"
    ),
    check("jwks", false, Boolean(container.config.authJwksUrl), "JWKS enables signed JWT authentication"),
    check(
      "openai",
      true,
      container.config.aiGenerationProvider !== "openai" || Boolean(container.config.openAiApiKey),
      "OpenAI key is required for active provider"
    ),
    check(
      "search-console",
      false,
      Boolean(container.config.googleSearchConsoleAccessToken),
      "Search Console token enables Google imports"
    ),
    check("indexnow", false, Boolean(container.config.indexNowKey), "IndexNow key enables URL submission"),
    check(
      "bing",
      false,
      Boolean(container.config.bingWebmasterApiKey),
      "Bing API key enables Bing Webmaster integration"
    )
  ]
  const required = checks.filter((item) => item.required)
  const passed = required.filter((item) => item.status === "pass").length
  return { score: Math.round((passed / required.length) * 100), checks }
}

function check(name: string, required: boolean, ok: boolean, message: string): InfrastructureCheck {
  return { name, required, status: ok ? "pass" : required ? "fail" : "warn", message }
}
