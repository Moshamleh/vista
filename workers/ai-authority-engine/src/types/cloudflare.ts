/**
 * Minimal D1 prepared statement contract used by the shared repository layer.
 */
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(): Promise<T | null>
  all<T = unknown>(): Promise<{ results: T[]; success: boolean; error?: string }>
  run(): Promise<{ success: boolean; error?: string; meta?: Record<string, unknown> }>
}

/**
 * Minimal D1 database contract required by the foundation.
 */
export interface D1Database {
  prepare(query: string): D1PreparedStatement
}

/**
 * Minimal KV namespace contract required by the foundation.
 */
export interface KVNamespace {
  get(key: string, options?: { type?: "text" }): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
}

/**
 * Minimal queue producer contract required by the foundation.
 */
export interface Queue<T = unknown> {
  send(message: T): Promise<void>
}

/**
 * Minimal Cloudflare execution context contract.
 */
export interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void
  passThroughOnException?(): void
}

/**
 * Minimal scheduled controller contract.
 */
export interface ScheduledController {
  scheduledTime: number
  cron: string
}

/**
 * Minimal queue message wrapper used by Cloudflare queue consumers.
 */
export interface Message<T = unknown> {
  body: T
  ack(): void
  retry(options?: { delaySeconds?: number }): void
}

/**
 * Minimal queue batch contract used by Cloudflare queue consumers.
 */
export interface MessageBatch<T = unknown> {
  queue: string
  messages: Message<T>[]
}
