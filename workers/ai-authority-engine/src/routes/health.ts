import type { AppContainer } from "../di/container"

export interface HealthPayload {
  service: string
  version: string
  environment: string
  status: "healthy"
}

/**
 * Returns public service health.
 */
export function getHealth(container: AppContainer): HealthPayload {
  return {
    service: container.config.serviceName,
    version: container.config.serviceVersion,
    environment: container.config.nodeEnv,
    status: "healthy"
  }
}
