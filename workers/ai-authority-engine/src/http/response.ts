import type { AppError } from "../errors/app-error"

export interface ApiSuccess<T> {
  ok: true
  data: T
  meta: {
    requestId: string
    timestamp: string
  }
}

export interface ApiFailure {
  ok: false
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  meta: {
    requestId: string
    timestamp: string
  }
}

/**
 * Security headers applied to all foundation responses.
 */
export function securityHeaders(): HeadersInit {
  return {
    "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
    "referrer-policy": "no-referrer",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY"
  }
}

/**
 * Merges response headers without assuming a specific HeadersInit shape.
 */
export function mergeHeaders(headers: HeadersInit): Headers {
  const merged = new Headers(securityHeaders())
  merged.set("content-type", "application/json; charset=utf-8")
  new Headers(headers).forEach((value, key) => {
    merged.set(key, value)
  })
  return merged
}

/**
 * Formats a successful JSON API response.
 */
export function successResponse(data: unknown, requestId: string, status = 200, headers: HeadersInit = {}): Response {
  const body: ApiSuccess<unknown> = { ok: true, data, meta: { requestId, timestamp: new Date().toISOString() } }
  return new Response(JSON.stringify(body), {
    status,
    headers: mergeHeaders(headers)
  })
}

/**
 * Formats a JSON API error response.
 */
export function failureResponse(error: AppError, requestId: string, headers: HeadersInit = {}): Response {
  const body: ApiFailure = {
    ok: false,
    error: {
      code: error.code,
      message: error.expose ? error.message : "Unexpected server error",
      ...(error.details ? { details: error.details } : {})
    },
    meta: { requestId, timestamp: new Date().toISOString() }
  }
  return new Response(JSON.stringify(body), {
    status: error.status,
    headers: mergeHeaders(headers)
  })
}
