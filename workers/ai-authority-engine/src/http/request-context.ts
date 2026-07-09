/**
 * Request-scoped context shared across middleware and handlers.
 */
export interface RequestContext {
  requestId: string
  startedAt: number
  auth: {
    subject: string
    scopes: string[]
  } | null
}

/**
 * Creates a request context with a stable request ID.
 */
export function createRequestContext(request: Request): RequestContext {
  const incoming = request.headers.get("x-request-id")
  return {
    requestId: incoming && incoming.trim().length > 0 ? incoming.trim() : crypto.randomUUID(),
    startedAt: Date.now(),
    auth: null
  }
}
