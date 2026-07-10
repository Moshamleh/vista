import type { AppConfig } from "../config/env"
import { AppError } from "../errors/app-error"
import type { Logger } from "../logger/logger"
import type { KvJsonStore } from "../storage/kv-store"

export interface TokenUsageInput {
  provider: string
  subject: string
  totalTokens: number
}

interface UsageRecord {
  tokens: number
  window: string
}

/**
 * Enforces AI token budgets and records provider usage.
 */
export class AiBudgetManager {
  constructor(
    private readonly cache: KvJsonStore,
    private readonly config: AppConfig,
    private readonly logger: Logger
  ) {}

  /**
   * Checks configured budgets before a generation call.
   */
  async assertBudgetAvailable(provider: string, subject: string): Promise<void> {
    await this.assertLimit("daily", this.config.aiDailyTokenLimit, `ai:budget:daily:${this.day()}:user:${subject}`)
    await this.assertLimit(
      "monthly",
      this.config.aiMonthlyTokenLimit,
      `ai:budget:monthly:${this.month()}:user:${subject}`
    )
    await this.assertLimit(
      "provider_daily",
      this.config.aiProviderDailyTokenLimit,
      `ai:budget:daily:${this.day()}:provider:${provider}`
    )
  }

  /**
   * Records returned token usage after a provider call.
   */
  async recordUsage(input: TokenUsageInput, requestId: string): Promise<void> {
    if (input.totalTokens <= 0) return
    await this.increment(`ai:budget:daily:${this.day()}:user:${input.subject}`, input.totalTokens, 172800)
    await this.increment(`ai:budget:monthly:${this.month()}:user:${input.subject}`, input.totalTokens, 5356800)
    await this.increment(`ai:budget:daily:${this.day()}:provider:${input.provider}`, input.totalTokens, 172800)
    this.logger.info(
      "AI token usage recorded",
      { provider: input.provider, subject: input.subject, totalTokens: input.totalTokens },
      requestId
    )
  }

  /**
   * Returns configured budget state for diagnostics.
   */
  getConfiguration(): Record<string, number | null> {
    return {
      dailyTokenLimit: this.config.aiDailyTokenLimit ?? null,
      monthlyTokenLimit: this.config.aiMonthlyTokenLimit ?? null,
      providerDailyTokenLimit: this.config.aiProviderDailyTokenLimit ?? null
    }
  }

  private async assertLimit(name: string, limit: number | undefined, key: string): Promise<void> {
    if (!limit) return
    const current = (await this.cache.getJson<UsageRecord>(key)) ?? { tokens: 0, window: key }
    if (current.tokens >= limit) {
      throw new AppError({
        status: 429,
        code: "ai_budget_exceeded",
        message: "AI generation budget has been exceeded",
        details: { budget: name, limit, used: current.tokens }
      })
    }
  }

  private async increment(key: string, tokens: number, expirationTtl: number): Promise<void> {
    const current = (await this.cache.getJson<UsageRecord>(key)) ?? { tokens: 0, window: key }
    await this.cache.putJson(key, { ...current, tokens: current.tokens + tokens }, expirationTtl)
  }

  private day(): string {
    return new Date().toISOString().slice(0, 10)
  }

  private month(): string {
    return new Date().toISOString().slice(0, 7)
  }
}
