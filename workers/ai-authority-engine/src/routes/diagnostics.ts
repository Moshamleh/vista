import type { AppContainer } from "../di/container"

export interface DiagnosticsPayload {
  service: string
  version: string
  bindings: {
    d1: "configured"
    kv: "configured"
    queue: "configured"
  }
  rateLimit: {
    max: number
    windowSeconds: number
  }
}

/**
 * Returns authenticated foundation diagnostics.
 */
export function getDiagnostics(container: AppContainer): DiagnosticsPayload {
  return {
    service: container.config.serviceName,
    version: container.config.serviceVersion,
    bindings: {
      d1: "configured",
      kv: "configured",
      queue: "configured"
    },
    rateLimit: {
      max: container.config.rateLimitMax,
      windowSeconds: container.config.rateLimitWindowSeconds
    }
  }
}
