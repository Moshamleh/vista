import { createRemoteJWKSet, errors, jwtVerify, type JWTPayload } from "jose"
import type { AppConfig } from "../config/env"
import { AppError } from "../errors/app-error"
import type { RequestContext } from "../http/request-context"
import { constantTimeEqual } from "../operations/api-protection"
import type { KvJsonStore } from "../storage/kv-store"

export interface AuthenticatedPrincipal {
  subject: string
  scopes: string[]
}

const jwtClockToleranceSeconds = 60
const replayPrefix = "auth:jwt-replay"
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>()

/**
 * Returns a cached JWKS resolver for the configured issuer.
 */
export function getJwks(url: string): ReturnType<typeof createRemoteJWKSet> {
  const existing = jwksCache.get(url)
  if (existing) return existing
  const resolver = createRemoteJWKSet(new URL(url))
  jwksCache.set(url, resolver)
  return resolver
}

/**
 * Verifies a JWT with a production JOSE implementation and configured JWKS.
 */
export async function verifyJwt(token: string, config: AppConfig): Promise<JWTPayload> {
  if (!config.authJwksUrl) {
    throw new AppError({ status: 503, code: "jwks_not_configured", message: "JWT authentication is not configured" })
  }

  try {
    const { payload } = await jwtVerify(token, getJwks(config.authJwksUrl), {
      algorithms: ["RS256", "ES256"],
      audience: config.authAudience,
      issuer: config.authIssuer,
      clockTolerance: jwtClockToleranceSeconds
    })
    return payload
  } catch (error) {
    const code =
      error instanceof errors.JWTExpired
        ? "token_expired"
        : error instanceof errors.JWTClaimValidationFailed || error instanceof errors.JOSEError
          ? "invalid_token"
          : "authentication_error"
    throw new AppError({ status: 401, code, message: "Bearer token is invalid" })
  }
}

/**
 * Enforces replay protection using the JWT ID claim.
 */
export async function enforceReplayProtection(payload: JWTPayload, cache: KvJsonStore): Promise<void> {
  if (typeof payload.jti !== "string" || payload.jti.length === 0) {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token ID is required" })
  }
  if (typeof payload.exp !== "number") {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token expiration is required" })
  }

  const now = Math.floor(Date.now() / 1000)
  if (payload.exp + jwtClockToleranceSeconds < now) {
    throw new AppError({ status: 401, code: "token_expired", message: "Bearer token has expired" })
  }

  const issuer = typeof payload.iss === "string" ? payload.iss : "unknown"
  const key = `${replayPrefix}:${issuer}:${payload.jti}`
  const existing = await cache.getJson<{ expiresAt: number }>(key)
  if (existing && existing.expiresAt + jwtClockToleranceSeconds >= now) {
    throw new AppError({ status: 401, code: "token_replayed", message: "Bearer token has already been used" })
  }

  await cache.putJson(key, { expiresAt: payload.exp })
}

/**
 * Authenticates a request using a shared secret API key or verified JWT.
 */
export async function authenticateRequest(
  request: Request,
  config: AppConfig,
  context: RequestContext,
  cache: KvJsonStore
): Promise<AuthenticatedPrincipal> {
  const auth = request.headers.get("authorization") ?? ""
  const apiKey = request.headers.get("x-api-key") ?? ""

  if (config.authSharedSecret && constantTimeEqual(apiKey, config.authSharedSecret)) {
    context.auth = { subject: "api-key", scopes: ["foundation:read", "foundation:write"] }
    return context.auth
  }

  if (!auth.toLowerCase().startsWith("bearer ")) {
    throw new AppError({ status: 401, code: "unauthorized", message: "Authentication is required" })
  }

  const payload = await verifyJwt(auth.slice(7).trim(), config)
  await enforceReplayProtection(payload, cache)
  const subject = typeof payload.sub === "string" ? payload.sub : ""
  if (!subject) {
    throw new AppError({ status: 401, code: "invalid_token", message: "Token subject is required" })
  }

  const scopes = typeof payload.scope === "string" ? payload.scope.split(" ").filter(Boolean) : []
  context.auth = { subject, scopes }
  return context.auth
}
