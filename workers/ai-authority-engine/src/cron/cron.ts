import type { Logger } from "../logger/logger"
import type { ScheduledController } from "../types/cloudflare"

export interface CronExecution {
  cron: string
  scheduledTime: number
  status: "accepted"
}

/**
 * Handles scheduled foundation checks without business-worker behavior.
 */
export function handleScheduled(controller: ScheduledController, logger: Logger): CronExecution {
  const execution = { cron: controller.cron, scheduledTime: controller.scheduledTime, status: "accepted" as const }
  logger.info("Cron trigger accepted", execution)
  return execution
}
