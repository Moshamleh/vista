import { ApiError } from "./errors.mjs"

const memoryStore = new Map()

/**
 * Reads an integer environment value with a safe fallback.
 * @param {unknown} value Raw environment value.
 * @param {number} fallback Fallback integer.
 * @returns {number}
 */
export function readPositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/**
 * Builds a deterministic rate-limit key for a caller and endpoint.
 * @param {Request} request Incoming request.
 * @param {string} apiKey Authenticated API key.
 * @returns {string}
 */
export function createRateLimitKey(request, apiKey) {
  const url = new URL(request.url)
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown-ip"
  return `qd:${apiKey}:${ip}:${request.method}:${url.pathname}`
}

/**
 * Reads a rate-limit bucket from KV or memory.
 * @param {Record<string, unknown>} env Worker environment.
 * @param {string} key Rate-limit key.
 * @returns {Promise<{count:number,resetAt:number}|null>}
 */
export async function readBucket(env, key) {
  const kv = env.QUESTION_DISCOVERY_RATE_LIMIT_KV
  if (kv && typeof kv.get === "function") {
    const raw = await kv.get(key)
    return raw ? JSON.parse(raw) : null
  }
  if (env.QUESTION_DISCOVERY_ALLOW_MEMORY_RATE_LIMIT !== "true") {
    throw new ApiError(503, "rate_limit_not_configured", "Question Discovery rate limiting is not configured.")
  }
  return memoryStore.get(key) || null
}

/**
 * Writes a rate-limit bucket to KV or memory.
 * @param {Record<string, unknown>} env Worker environment.
 * @param {string} key Rate-limit key.
 * @param {{count:number,resetAt:number}} bucket Rate-limit bucket.
 * @param {number} ttlSeconds KV expiration TTL.
 * @returns {Promise<void>}
 */
export async function writeBucket(env, key, bucket, ttlSeconds) {
  const kv = env.QUESTION_DISCOVERY_RATE_LIMIT_KV
  if (kv && typeof kv.put === "function") {
    await kv.put(key, JSON.stringify(bucket), { expirationTtl: ttlSeconds })
    return
  }
  if (env.QUESTION_DISCOVERY_ALLOW_MEMORY_RATE_LIMIT !== "true") {
    throw new ApiError(503, "rate_limit_not_configured", "Question Discovery rate limiting is not configured.")
  }
  memoryStore.set(key, bucket)
}

/**
 * Enforces a fixed-window rate limit and returns standard response headers.
 * @param {Request} request Incoming request.
 * @param {Record<string, unknown>} env Worker environment.
 * @param {string} apiKey Authenticated API key.
 * @returns {Promise<Record<string,string>>} Rate-limit headers.
 * @throws {ApiError} When the caller exceeds the limit.
 */
export async function enforceRateLimit(request, env, apiKey) {
  const limit = readPositiveInt(env.QUESTION_DISCOVERY_RATE_LIMIT_MAX, 60)
  const windowSeconds = readPositiveInt(env.QUESTION_DISCOVERY_RATE_LIMIT_WINDOW_SECONDS, 60)
  const now = Math.floor(Date.now() / 1000)
  const key = createRateLimitKey(request, apiKey)
  const existing = await readBucket(env, key)
  const bucket = existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowSeconds }

  if (bucket.count >= limit) {
    const retryAfter = Math.max(1, bucket.resetAt - now)
    throw new ApiError(429, "rate_limited", "Too many requests.", { retryAfter })
  }

  bucket.count += 1
  await writeBucket(env, key, bucket, windowSeconds)

  return {
    "x-ratelimit-limit": String(limit),
    "x-ratelimit-remaining": String(Math.max(0, limit - bucket.count)),
    "x-ratelimit-reset": String(bucket.resetAt)
  }
}
