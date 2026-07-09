/**
 * Security and CORS headers applied to every response.
 */
export const baseHeaders = {
  "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "authorization,content-type,x-api-key,idempotency-key",
  "access-control-max-age": "86400"
}

/**
 * Returns a JSON response with default security headers.
 * @param {unknown} body JSON-serializable body.
 * @param {number} [status] HTTP status.
 * @param {HeadersInit} [headers] Additional headers.
 * @returns {Response}
 */
export function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      ...baseHeaders,
      "content-type": "application/json; charset=utf-8",
      ...headers
    }
  })
}

/**
 * Returns an empty CORS preflight response.
 * @returns {Response}
 */
export function optionsResponse() {
  return new Response(null, { status: 204, headers: baseHeaders })
}

/**
 * Builds a stable JSON error response.
 * @param {{status:number,code:string,message:string,details?:Record<string,unknown>}} error API error.
 * @param {HeadersInit} [headers] Additional headers.
 * @returns {Response}
 */
export function errorResponse(error, headers = {}) {
  return jsonResponse(
    {
      error: {
        code: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {})
      }
    },
    error.status,
    headers
  )
}
