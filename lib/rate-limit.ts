import { createHash } from "node:crypto"
import { Redis } from "@upstash/redis"

type RateLimitOptions = {
  scope: string
  limit: number
  windowSeconds: number
}

type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  retryAfter: number
}

const memoryStore = new Map<string, { count: number; resetAt: number }>()
const MAX_MEMORY_KEYS = 5_000

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) return null

  return new Redis({ url, token })
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || request.headers.get("x-real-ip") || "unknown"
}

function rateLimitKey(request: Request, scope: string) {
  const hash = createHash("sha256").update(getClientIp(request)).digest("hex").slice(0, 24)
  return `rate:${scope}:${hash}`
}

function memoryRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()

  if (memoryStore.size > MAX_MEMORY_KEYS) {
    for (const [entryKey, entry] of memoryStore) {
      if (entry.resetAt <= now || memoryStore.size > MAX_MEMORY_KEYS) {
        memoryStore.delete(entryKey)
      }
    }
  }

  const current = memoryStore.get(key)

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + options.windowSeconds * 1000 })
    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit - 1,
      retryAfter: 0,
    }
  }

  current.count += 1
  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000))

  if (current.count > options.limit) {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      retryAfter,
    }
  }

  return {
    allowed: true,
    limit: options.limit,
    remaining: Math.max(0, options.limit - current.count),
    retryAfter,
  }
}

export async function rateLimit(request: Request, options: RateLimitOptions): Promise<RateLimitResult> {
  const key = rateLimitKey(request, options.scope)
  const redis = getRedis()

  if (!redis) return memoryRateLimit(key, options)

  try {
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, options.windowSeconds)

    const rawTtl = await redis.ttl(key)
    const ttl = rawTtl > 0 ? rawTtl : options.windowSeconds

    return {
      allowed: count <= options.limit,
      limit: options.limit,
      remaining: Math.max(0, options.limit - count),
      retryAfter: count > options.limit ? ttl : 0,
    }
  } catch (error) {
    console.error("Rate limit backend failed", error)
    return memoryRateLimit(key, options)
  }
}
