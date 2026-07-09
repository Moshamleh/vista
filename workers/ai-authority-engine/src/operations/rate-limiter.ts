import type { AppConfig } from "../config/env"
import { AppError } from "../errors/app-error"
import type { KvJsonStore } from "../storage/kv-store"

interface RateWindow {
  timestamps: number[]
}

interface BanRecord {
  bannedUntil: number
  reason: string
}

/**
 * Returns the best available client identity for network-level rate limits.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  )
}

/**
 * KV-backed sliding-window rate limiter with temporary abuse bans.
 */
export class GlobalRateLimiter {
  constructor(
    private readonly cache: KvJsonStore,
    private readonly config: AppConfig
  ) {}

  /**
   * Enforces the configured limit for one or more identities.
   */
  async enforce(identities: string[]): Promise<void> {
    const now = Date.now()
    for (const identity of identities) {
      await this.assertNotBanned(identity, now)
      await this.record(identity, now)
    }
  }

  private async assertNotBanned(identity: string, now: number): Promise<void> {
    const ban = await this.cache.getJson<BanRecord>(`rate:ban:${identity}`)
    if (ban && ban.bannedUntil > now) {
      throw new AppError({
        status: 429,
        code: "temporarily_banned",
        message: "Client is temporarily banned because of rate limit abuse",
        details: { reason: ban.reason, retryAfterSeconds: Math.ceil((ban.bannedUntil - now) / 1000) }
      })
    }
  }

  private async record(identity: string, now: number): Promise<void> {
    const windowMs = this.config.rateLimitWindowSeconds * 1000
    const key = `rate:window:${identity}`
    const existing = (await this.cache.getJson<RateWindow>(key)) ?? { timestamps: [] }
    const timestamps = existing.timestamps.filter((timestamp) => timestamp > now - windowMs)
    if (timestamps.length >= this.config.rateLimitMax) {
      const bannedUntil = now + this.config.rateLimitBanSeconds * 1000
      await this.cache.putJson(
        `rate:ban:${identity}`,
        { bannedUntil, reason: "sliding window limit exceeded" },
        this.config.rateLimitBanSeconds
      )
      throw new AppError({
        status: 429,
        code: "rate_limited",
        message: "Rate limit exceeded",
        details: { retryAfterSeconds: this.config.rateLimitWindowSeconds }
      })
    }
    timestamps.push(now)
    await this.cache.putJson(key, { timestamps }, this.config.rateLimitWindowSeconds)
  }
}
