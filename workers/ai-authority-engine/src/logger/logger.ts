import type { AppConfig, LogLevel } from "../config/env"

const severity: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 }

export interface LogEvent {
  level: LogLevel
  message: string
  requestId: string | undefined
  context: Record<string, unknown> | undefined
}

/**
 * Structured JSON logger for Worker runtime logs.
 */
export class Logger {
  private readonly config: AppConfig

  /**
   * Creates a logger with service metadata.
   */
  constructor(config: AppConfig) {
    this.config = config
  }

  /**
   * Emits a debug event when debug logging is enabled.
   */
  debug(message: string, context?: Record<string, unknown>, requestId?: string): void {
    this.write({ level: "debug", message, context, requestId })
  }

  /**
   * Emits an informational event.
   */
  info(message: string, context?: Record<string, unknown>, requestId?: string): void {
    this.write({ level: "info", message, context, requestId })
  }

  /**
   * Emits a warning event.
   */
  warn(message: string, context?: Record<string, unknown>, requestId?: string): void {
    this.write({ level: "warn", message, context, requestId })
  }

  /**
   * Emits an error event.
   */
  error(message: string, context?: Record<string, unknown>, requestId?: string): void {
    this.write({ level: "error", message, context, requestId })
  }

  /**
   * Writes a structured log line when allowed by log level.
   */
  write(event: LogEvent): void {
    if (severity[event.level] < severity[this.config.logLevel]) return
    const payload = {
      timestamp: new Date().toISOString(),
      service: this.config.serviceName,
      version: this.config.serviceVersion,
      environment: this.config.nodeEnv,
      ...event
    }
    const line = JSON.stringify(payload)
    if (event.level === "error") console.error(line)
    else if (event.level === "warn") console.warn(line)
    else console.log(line)
  }
}
