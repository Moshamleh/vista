import type { AppConfig } from "../config/env"
import { AppError } from "../errors/app-error"
import type { RequestContext } from "../http/request-context"
import type { KvJsonStore } from "../storage/kv-store"

const encoder = new TextEncoder()

/**
 * Compares two strings in constant time for equal-length values.
 */
export function constantTimeEqual(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left)
  const rightBytes = encoder.encode(right)
  const length = Math.max(leftBytes.length, rightBytes.length)
  let diff = leftBytes.length ^ rightBytes.length
  for (let index = 0; index < length; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0)
  }
  return diff === 0
}

/**
 * Creates a hex HMAC signature for request signing.
 */
export async function hmacSha256Hex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign"
  ])
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value))
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Validates API version headers without breaking clients that omit the header.
 */
export function validateApiVersion(request: Request, config: AppConfig): void {
  const requested = request.headers.get("x-api-version")
  if (requested && requested !== config.apiVersion) {
    throw new AppError({
      status: 400,
      code: "unsupported_api_version",
      message: "Requested API version is not supported"
    })
  }
}

/**
 * Enforces request signatures and nonce replay protection when signing is configured.
 */
export async function verifyRequestSignature(
  request: Request,
  config: AppConfig,
  cache: KvJsonStore,
  context: RequestContext
): Promise<void> {
  if (!config.requestSigningSecret) return
  const signature = request.headers.get("x-signature") ?? ""
  const nonce = request.headers.get("x-nonce") ?? ""
  const timestamp = request.headers.get("x-signature-timestamp") ?? ""
  if (!signature || !nonce || !timestamp) {
    throw new AppError({
      status: 401,
      code: "request_signature_required",
      message: "Signed request headers are required"
    })
  }

  const epoch = Number.parseInt(timestamp, 10)
  const now = Math.floor(Date.now() / 1000)
  if (!Number.isInteger(epoch) || Math.abs(now - epoch) > 300) {
    throw new AppError({ status: 401, code: "invalid_signature_timestamp", message: "Signature timestamp is invalid" })
  }

  const nonceKey = `auth:request-nonce:${nonce}`
  if (await cache.getJson<{ requestId: string }>(nonceKey)) {
    throw new AppError({ status: 401, code: "nonce_replayed", message: "Request nonce has already been used" })
  }

  const url = new URL(request.url)
  const expected = await hmacSha256Hex(
    config.requestSigningSecret,
    `${request.method}\n${url.pathname}\n${timestamp}\n${nonce}`
  )
  if (!constantTimeEqual(signature, expected)) {
    throw new AppError({ status: 401, code: "invalid_request_signature", message: "Request signature is invalid" })
  }
  await cache.putJson(nonceKey, { requestId: context.requestId }, 600)
}
