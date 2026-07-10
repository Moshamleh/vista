import type { AppContainer } from "../di/container"

/**
 * Generates operational recovery instructions from runtime configuration.
 */
export function getRecoveryReport(container: AppContainer): Record<string, unknown> {
  return {
    retries: {
      queuePublisherDelaySeconds: 120,
      queueGenerationDelaySeconds: 60,
      deadLetterQueue: "vista-ai-authority-events-dead"
    },
    database: {
      snapshotRequiredBeforeMigration: true,
      migrationRollback: "Restore D1 snapshot into a new database and switch DB binding if a forward migration fails."
    },
    worker: {
      rollback: "Redeploy the previous successful GitHub Actions artifact or Wrangler version.",
      service: container.config.serviceName,
      version: container.config.serviceVersion
    },
    queues: {
      recovery:
        "Inspect dead-letter messages, fix provider/configuration error, then replay idempotent job messages only."
    }
  }
}
