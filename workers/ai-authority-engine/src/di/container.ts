import type { AppBindings, AppConfig } from "../config/env"
import { loadConfig } from "../config/env"
import { AppError } from "../errors/app-error"
import { Logger } from "../logger/logger"
import { QueueClient } from "../queues/queue-client"
import { KvJsonStore } from "../storage/kv-store"
import type { D1Database } from "../types/cloudflare"

export interface AppContainer {
  env: AppBindings
  config: AppConfig
  logger: Logger
  db: D1Database
  cache: KvJsonStore
  queue: QueueClient
}

/**
 * Requires a D1 binding and throws a production-safe error when absent.
 */
export function requireD1(env: AppBindings): NonNullable<AppBindings["DB"]> {
  if (!env.DB) throw new AppError({ status: 503, code: "d1_not_configured", message: "D1 binding is not configured" })
  return env.DB
}

/**
 * Requires a KV binding and throws a production-safe error when absent.
 */
export function requireKv(env: AppBindings): NonNullable<AppBindings["CACHE"]> {
  if (!env.CACHE)
    throw new AppError({ status: 503, code: "kv_not_configured", message: "KV binding is not configured" })
  return env.CACHE
}

/**
 * Requires a Queue binding and throws a production-safe error when absent.
 */
export function requireQueue(env: AppBindings): NonNullable<AppBindings["AUTHORITY_QUEUE"]> {
  if (!env.AUTHORITY_QUEUE) {
    throw new AppError({ status: 503, code: "queue_not_configured", message: "Queue binding is not configured" })
  }
  return env.AUTHORITY_QUEUE
}

/**
 * Builds the dependency injection container for each request.
 */
export function createContainer(env: AppBindings): AppContainer {
  const config = loadConfig(env)
  return {
    env,
    config,
    logger: new Logger(config),
    db: requireD1(env),
    cache: new KvJsonStore(requireKv(env)),
    queue: new QueueClient(requireQueue(env))
  }
}
