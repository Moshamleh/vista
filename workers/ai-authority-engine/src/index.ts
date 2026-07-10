import { handleScheduled } from "./cron/cron"
import { createContainer } from "./di/container"
import { createAiGenerationService } from "./domains/ai-generation/api"
import { createExternalSearchIndexingService } from "./domains/external-search-indexing/api"
import { createPublisherService } from "./domains/publisher/api"
import { createPublicBuyingSignalService } from "./domains/public-buying-signals/api"
import { createQuestionDiscoveryService } from "./domains/question-discovery/api"
import { createVisibilityIntelligenceService } from "./domains/visibility-intelligence/api"
import { routeRequest } from "./router"
import type { AppBindings } from "./config/env"
import type { ExecutionContext, MessageBatch, ScheduledController } from "./types/cloudflare"

/**
 * Cloudflare Worker entrypoint for the shared Vista AI Authority Engine foundation.
 */
export default {
  /**
   * Handles HTTP requests for health, diagnostics, and OpenAPI endpoints.
   */
  fetch(request: Request, env: AppBindings, _ctx: ExecutionContext): Promise<Response> {
    return routeRequest(request, env)
  },

  /**
   * Handles scheduled cron triggers at the shared infrastructure layer.
   */
  scheduled(controller: ScheduledController, env: AppBindings, ctx: ExecutionContext): void {
    const container = createContainer(env)
    ctx.waitUntil(
      Promise.resolve().then(async () => {
        handleScheduled(controller, container.logger)
        if (container.config.questionDiscoveryCronSeed) {
          await createQuestionDiscoveryService(container).runDiscovery(
            {
              seed: container.config.questionDiscoveryCronSeed,
              market: "AE",
              language: "en",
              providers: ["internal-seed"],
              limit: 25,
              manualQuestions: []
            },
            crypto.randomUUID()
          )
        }
        if (container.config.visibilityScanCronEnabled) {
          await createVisibilityIntelligenceService(container).scan(crypto.randomUUID())
        }
        if (container.config.externalIndexingCronEnabled) {
          await createExternalSearchIndexingService(container).runScheduled(crypto.randomUUID())
        }
        if (container.config.publicBuyingSignalCronEnabled) {
          await createPublicBuyingSignalService(container).scan(crypto.randomUUID())
        }
      })
    )
  },

  /**
   * Handles queue batches without executing business-worker logic.
   */
  queue(batch: MessageBatch, env: AppBindings, ctx: ExecutionContext): void {
    const container = createContainer(env)
    ctx.waitUntil(
      Promise.resolve().then(async () => {
        container.logger.info("Queue batch accepted", {
          queue: batch.queue,
          messageCount: batch.messages.length
        })
        for (const message of batch.messages) {
          const body = message.body as { type?: string; id?: string; payload?: Record<string, unknown> }
          if (body.type === "publisher.run" && typeof body.payload?.jobId === "string") {
            try {
              await createPublisherService(container).processJob(body.payload.jobId, crypto.randomUUID())
              message.ack()
            } catch {
              message.retry({ delaySeconds: 120 })
            }
          } else if (body.type === "ai-generation.run" && typeof body.payload?.jobId === "string") {
            try {
              await createAiGenerationService(container).processJob(
                body.payload.jobId,
                "queue",
                crypto.randomUUID(),
                typeof body.payload.minWordCount === "number" ? body.payload.minWordCount : 800
              )
              message.ack()
            } catch {
              message.retry({ delaySeconds: 60 })
            }
          } else {
            message.ack()
          }
        }
      })
    )
  }
}
