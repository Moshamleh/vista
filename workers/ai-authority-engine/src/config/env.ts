import type { D1Database, KVNamespace, Queue } from "../types/cloudflare"

export type LogLevel = "debug" | "info" | "warn" | "error"

/**
 * Cloudflare Worker bindings and variables required by the foundation.
 */
export interface AppBindings {
  NODE_ENV: "production" | "development" | "test"
  SERVICE_NAME: string
  SERVICE_VERSION: string
  AUTH_ISSUER: string
  AUTH_AUDIENCE: string
  AUTH_JWKS_URL?: string
  AUTH_SHARED_SECRET?: string
  REQUEST_SIGNING_SECRET?: string
  API_VERSION?: string
  LOG_LEVEL: LogLevel
  RATE_LIMIT_MAX: string
  RATE_LIMIT_WINDOW_SECONDS: string
  RATE_LIMIT_BAN_SECONDS?: string
  AI_DAILY_TOKEN_LIMIT?: string
  AI_MONTHLY_TOKEN_LIMIT?: string
  AI_PROVIDER_DAILY_TOKEN_LIMIT?: string
  OPENAPI_TITLE: string
  OPENAPI_VERSION: string
  BING_AUTOSUGGEST_ENDPOINT?: string
  BING_AUTOSUGGEST_KEY?: string
  YOUTUBE_SUGGEST_ENDPOINT?: string
  INTERNAL_SEED_QUESTIONS?: string
  GOOGLE_SEARCH_CONSOLE_ENDPOINT?: string
  GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN?: string
  GOOGLE_SEARCH_CONSOLE_SITE_URL?: string
  BING_WEBMASTER_ENDPOINT?: string
  BING_WEBMASTER_API_KEY?: string
  INDEXNOW_ENDPOINT?: string
  INDEXNOW_KEY?: string
  INDEXNOW_KEY_LOCATION?: string
  EXTERNAL_INDEXING_CRON_ENABLED?: string
  PUBLIC_BUYING_SIGNAL_FEEDS?: string
  PUBLIC_BUYING_SIGNAL_CRON_ENABLED?: string
  QUESTION_DISCOVERY_CRON_SEED?: string
  AI_GENERATION_PROVIDER?: string
  AI_GENERATION_MODEL?: string
  AI_GENERATION_TIMEOUT_MS?: string
  OPENAI_ENDPOINT?: string
  OPENAI_API_KEY?: string
  ANTHROPIC_ENDPOINT?: string
  ANTHROPIC_API_KEY?: string
  GOOGLE_AI_ENDPOINT?: string
  GOOGLE_AI_API_KEY?: string
  PUBLISHER_WEBSITE_BASE_URL?: string
  PUBLISHER_DEFAULT_TARGETS?: string
  PUBLISHER_TIMEOUT_MS?: string
  PUBLISHER_SHARED_TOKEN?: string
  VISIBILITY_SCAN_CRON_ENABLED?: string
  DB?: D1Database
  CACHE?: KVNamespace
  AUTHORITY_QUEUE?: Queue
}

/**
 * Normalized runtime configuration used by application modules.
 */
export interface AppConfig {
  nodeEnv: "production" | "development" | "test"
  serviceName: string
  serviceVersion: string
  authIssuer: string
  authAudience: string
  authJwksUrl: string | undefined
  authSharedSecret: string | undefined
  requestSigningSecret: string | undefined
  apiVersion: string
  logLevel: LogLevel
  rateLimitMax: number
  rateLimitWindowSeconds: number
  rateLimitBanSeconds: number
  aiDailyTokenLimit: number | undefined
  aiMonthlyTokenLimit: number | undefined
  aiProviderDailyTokenLimit: number | undefined
  openApiTitle: string
  openApiVersion: string
  bingAutosuggestEndpoint: string | undefined
  bingAutosuggestKey: string | undefined
  youtubeSuggestEndpoint: string | undefined
  internalSeedQuestions: string | undefined
  googleSearchConsoleEndpoint: string | undefined
  googleSearchConsoleAccessToken: string | undefined
  googleSearchConsoleSiteUrl: string | undefined
  bingWebmasterEndpoint: string | undefined
  bingWebmasterApiKey: string | undefined
  indexNowEndpoint: string
  indexNowKey: string | undefined
  indexNowKeyLocation: string | undefined
  externalIndexingCronEnabled: boolean
  publicBuyingSignalFeeds: string | undefined
  publicBuyingSignalCronEnabled: boolean
  questionDiscoveryCronSeed: string | undefined
  aiGenerationProvider: "openai" | "anthropic" | "google-ai"
  aiGenerationModel: string
  aiGenerationTimeoutMs: number
  openAiEndpoint: string | undefined
  openAiApiKey: string | undefined
  anthropicEndpoint: string | undefined
  anthropicApiKey: string | undefined
  googleAiEndpoint: string | undefined
  googleAiApiKey: string | undefined
  publisherWebsiteBaseUrl: string
  publisherDefaultTargets: string[]
  publisherTimeoutMs: number
  publisherSharedToken: string | undefined
  visibilityScanCronEnabled: boolean
}

const logLevels: ReadonlySet<string> = new Set(["debug", "info", "warn", "error"])

/**
 * Reads a required string environment value.
 */
export function readRequiredString(env: AppBindings, key: keyof AppBindings): string {
  const value = env[key]
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value.trim()
}

/**
 * Reads an optional string environment value.
 */
export function readOptionalString(env: AppBindings, key: keyof AppBindings): string | undefined {
  const value = env[key]
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

/**
 * Reads a positive integer environment value.
 */
export function readPositiveInteger(env: AppBindings, key: keyof AppBindings): number {
  const raw = readRequiredString(env, key)
  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer`)
  }
  return value
}

/**
 * Loads and validates application configuration from Worker bindings.
 */
export function loadConfig(env: AppBindings): AppConfig {
  const nodeEnv = readRequiredString(env, "NODE_ENV")
  if (nodeEnv !== "production" && nodeEnv !== "development" && nodeEnv !== "test") {
    throw new Error("NODE_ENV must be production, development, or test")
  }

  const logLevel = readRequiredString(env, "LOG_LEVEL")
  if (!logLevels.has(logLevel)) {
    throw new Error("LOG_LEVEL must be debug, info, warn, or error")
  }

  return {
    nodeEnv,
    serviceName: readRequiredString(env, "SERVICE_NAME"),
    serviceVersion: readRequiredString(env, "SERVICE_VERSION"),
    authIssuer: readRequiredString(env, "AUTH_ISSUER"),
    authAudience: readRequiredString(env, "AUTH_AUDIENCE"),
    authJwksUrl: readOptionalString(env, "AUTH_JWKS_URL"),
    authSharedSecret: readOptionalString(env, "AUTH_SHARED_SECRET"),
    requestSigningSecret: readOptionalString(env, "REQUEST_SIGNING_SECRET"),
    apiVersion: readOptionalString(env, "API_VERSION") ?? "2026-07-01",
    logLevel: logLevel as LogLevel,
    rateLimitMax: readPositiveInteger(env, "RATE_LIMIT_MAX"),
    rateLimitWindowSeconds: readPositiveInteger(env, "RATE_LIMIT_WINDOW_SECONDS"),
    rateLimitBanSeconds: readOptionalPositiveInteger(env, "RATE_LIMIT_BAN_SECONDS") ?? 900,
    aiDailyTokenLimit: readOptionalPositiveInteger(env, "AI_DAILY_TOKEN_LIMIT"),
    aiMonthlyTokenLimit: readOptionalPositiveInteger(env, "AI_MONTHLY_TOKEN_LIMIT"),
    aiProviderDailyTokenLimit: readOptionalPositiveInteger(env, "AI_PROVIDER_DAILY_TOKEN_LIMIT"),
    openApiTitle: readRequiredString(env, "OPENAPI_TITLE"),
    openApiVersion: readRequiredString(env, "OPENAPI_VERSION"),
    bingAutosuggestEndpoint: readOptionalString(env, "BING_AUTOSUGGEST_ENDPOINT"),
    bingAutosuggestKey: readOptionalString(env, "BING_AUTOSUGGEST_KEY"),
    youtubeSuggestEndpoint: readOptionalString(env, "YOUTUBE_SUGGEST_ENDPOINT"),
    internalSeedQuestions: readOptionalString(env, "INTERNAL_SEED_QUESTIONS"),
    googleSearchConsoleEndpoint: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_ENDPOINT"),
    googleSearchConsoleAccessToken: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN"),
    googleSearchConsoleSiteUrl: readOptionalString(env, "GOOGLE_SEARCH_CONSOLE_SITE_URL"),
    bingWebmasterEndpoint: readOptionalString(env, "BING_WEBMASTER_ENDPOINT"),
    bingWebmasterApiKey: readOptionalString(env, "BING_WEBMASTER_API_KEY"),
    indexNowEndpoint: readOptionalString(env, "INDEXNOW_ENDPOINT") ?? "https://api.indexnow.org/indexnow",
    indexNowKey: readOptionalString(env, "INDEXNOW_KEY"),
    indexNowKeyLocation: readOptionalString(env, "INDEXNOW_KEY_LOCATION"),
    externalIndexingCronEnabled: readOptionalString(env, "EXTERNAL_INDEXING_CRON_ENABLED") === "true",
    publicBuyingSignalFeeds: readOptionalString(env, "PUBLIC_BUYING_SIGNAL_FEEDS"),
    publicBuyingSignalCronEnabled: readOptionalString(env, "PUBLIC_BUYING_SIGNAL_CRON_ENABLED") === "true",
    questionDiscoveryCronSeed: readOptionalString(env, "QUESTION_DISCOVERY_CRON_SEED"),
    aiGenerationProvider: readAiGenerationProvider(env),
    aiGenerationModel: readOptionalString(env, "AI_GENERATION_MODEL") ?? "gpt-4.1",
    aiGenerationTimeoutMs: readOptionalPositiveInteger(env, "AI_GENERATION_TIMEOUT_MS") ?? 30000,
    openAiEndpoint: readOptionalString(env, "OPENAI_ENDPOINT") ?? "https://api.openai.com/v1/chat/completions",
    openAiApiKey: readOptionalString(env, "OPENAI_API_KEY"),
    anthropicEndpoint: readOptionalString(env, "ANTHROPIC_ENDPOINT") ?? "https://api.anthropic.com/v1/messages",
    anthropicApiKey: readOptionalString(env, "ANTHROPIC_API_KEY"),
    googleAiEndpoint:
      readOptionalString(env, "GOOGLE_AI_ENDPOINT") ??
      "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    googleAiApiKey: readOptionalString(env, "GOOGLE_AI_API_KEY"),
    publisherWebsiteBaseUrl: readOptionalString(env, "PUBLISHER_WEBSITE_BASE_URL") ?? "https://www.vistabylara.com",
    publisherDefaultTargets: (
      readOptionalString(env, "PUBLISHER_DEFAULT_TARGETS") ?? "website,json-export,markdown-export"
    )
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    publisherTimeoutMs: readOptionalPositiveInteger(env, "PUBLISHER_TIMEOUT_MS") ?? 15000,
    publisherSharedToken: readOptionalString(env, "PUBLISHER_SHARED_TOKEN"),
    visibilityScanCronEnabled: readOptionalString(env, "VISIBILITY_SCAN_CRON_ENABLED") === "true"
  }
}

/**
 * Reads an optional positive integer environment value.
 */
export function readOptionalPositiveInteger(env: AppBindings, key: keyof AppBindings): number | undefined {
  const raw = readOptionalString(env, key)
  if (!raw) return undefined
  const value = Number.parseInt(raw, 10)
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer`)
  }
  return value
}

/**
 * Reads the active AI generation provider.
 */
export function readAiGenerationProvider(env: AppBindings): "openai" | "anthropic" | "google-ai" {
  const value = readOptionalString(env, "AI_GENERATION_PROVIDER") ?? "openai"
  if (value !== "openai" && value !== "anthropic" && value !== "google-ai") {
    throw new Error("AI_GENERATION_PROVIDER must be openai, anthropic, or google-ai")
  }
  return value
}
