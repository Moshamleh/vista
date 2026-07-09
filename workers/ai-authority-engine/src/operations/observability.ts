import type { Logger } from "../logger/logger"
import type { RequestContext } from "../http/request-context"

export interface OperationMetric {
  name: string
  durationMs: number
  ok: boolean
  attributes: Record<string, unknown>
}

/**
 * Reads an incoming W3C trace ID or creates a Worker-local trace ID.
 */
export function resolveTraceId(request: Request, requestId: string): string {
  const traceparent = request.headers.get("traceparent")
  const traceId = traceparent?.split("-")[1]
  return traceId && /^[a-f0-9]{32}$/iu.test(traceId)
    ? traceId
    : requestId.replace(/-/g, "").padEnd(32, "0").slice(0, 32)
}

/**
 * Records OpenTelemetry-compatible structured metrics through the Worker logger.
 */
export async function recordOperation<T>(
  name: string,
  logger: Logger,
  context: RequestContext,
  attributes: Record<string, unknown>,
  operation: () => Promise<T>
): Promise<T> {
  const started = Date.now()
  try {
    const result = await operation()
    logger.info("otel.metric", { name, durationMs: Date.now() - started, ok: true, attributes }, context.requestId)
    return result
  } catch (error) {
    logger.error(
      "otel.metric",
      {
        name,
        durationMs: Date.now() - started,
        ok: false,
        attributes,
        error: error instanceof Error ? error.message : "unknown"
      },
      context.requestId
    )
    throw error
  }
}
