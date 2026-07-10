import type { AppConfig } from "../../config/env"
import { AppError } from "../../errors/app-error"
import type {
  AiGenerationProvider,
  AiProviderName,
  GeneratedDraft,
  ProviderGenerationRequest,
  ProviderGenerationResult,
  TokenUsage
} from "./types"

/**
 * Executes provider operations with timeout protection.
 */
export async function withGenerationTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new AppError({ status: 504, code: "ai_provider_timeout", message: "AI provider timed out" }))
    }, timeoutMs)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

function parseDraft(value: unknown): GeneratedDraft {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new AppError({
      status: 502,
      code: "invalid_ai_response",
      message: "AI provider returned an invalid content object"
    })
  }
  const body = value as Record<string, unknown>
  const title = typeof body.title === "string" ? body.title : ""
  const slug = typeof body.slug === "string" ? body.slug : ""
  const content = typeof body.body === "string" ? body.body : ""
  if (title.length === 0 || slug.length === 0 || content.length === 0) {
    throw new AppError({
      status: 502,
      code: "invalid_ai_response",
      message: "AI provider response is missing title, slug, or body"
    })
  }
  return {
    title,
    slug,
    body: content,
    outline: Array.isArray(body.outline) ? body.outline.filter((item): item is string => typeof item === "string") : [],
    seoTitle: typeof body.seoTitle === "string" ? body.seoTitle : title,
    seoDescription: typeof body.seoDescription === "string" ? body.seoDescription : "",
    aiSummary: typeof body.aiSummary === "string" ? body.aiSummary : "",
    schemaType: typeof body.schemaType === "string" ? body.schemaType : "TechArticle",
    entities: Array.isArray(body.entities)
      ? body.entities.filter((item): item is string => typeof item === "string")
      : [],
    internalLinks: Array.isArray(body.internalLinks)
      ? body.internalLinks
          .filter(
            (item): item is Record<string, unknown> => typeof item === "object" && item !== null && !Array.isArray(item)
          )
          .map((item) => ({
            targetUrl: typeof item.targetUrl === "string" ? item.targetUrl : "",
            anchorText: typeof item.anchorText === "string" ? item.anchorText : "",
            ...(typeof item.targetContentId === "string" ? { targetContentId: item.targetContentId } : {})
          }))
          .filter((item) => item.targetUrl.length > 0 && item.anchorText.length > 0)
      : [],
    wordCount: typeof body.wordCount === "number" ? body.wordCount : content.split(/\s+/u).filter(Boolean).length,
    readingTimeMinutes:
      typeof body.readingTimeMinutes === "number"
        ? body.readingTimeMinutes
        : Math.max(1, Math.ceil(content.split(/\s+/u).filter(Boolean).length / 220))
  }
}

function tokenUsage(inputTokens?: number, outputTokens?: number, totalTokens?: number): TokenUsage {
  return {
    ...(typeof inputTokens === "number" ? { inputTokens } : {}),
    ...(typeof outputTokens === "number" ? { outputTokens } : {}),
    ...(typeof totalTokens === "number" ? { totalTokens } : {})
  }
}

/**
 * Base HTTP provider for chat-completion style APIs.
 */
abstract class HttpAiProvider implements AiGenerationProvider {
  abstract readonly name: AiProviderName

  constructor(
    protected readonly endpoint: string | undefined,
    protected readonly apiKey: string | undefined,
    protected readonly fetcher: typeof fetch = fetch
  ) {}

  abstract generate(request: ProviderGenerationRequest): Promise<ProviderGenerationResult>

  /**
   * Tests provider credentials with a lightweight request.
   */
  async test(
    model: string,
    timeoutMs: number
  ): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }> {
    const started = Date.now()
    try {
      await this.generate({
        model,
        timeoutMs,
        systemPrompt: "Return a compact JSON object for a provider health check.",
        userPrompt:
          '{"title":"Health Check","slug":"health-check","body":"Provider health check.","outline":["Health Check"],"seoTitle":"Health Check","seoDescription":"Provider health check.","aiSummary":"Provider health check.","schemaType":"TechArticle","entities":[],"internalLinks":[],"wordCount":3,"readingTimeMinutes":1}'
      })
      return { ok: true, latencyMs: Date.now() - started, errorMessage: null }
    } catch (error) {
      return {
        ok: false,
        latencyMs: Date.now() - started,
        errorMessage: error instanceof Error ? error.message : "Provider check failed"
      }
    }
  }

  protected requireConfig(): { endpoint: string; apiKey: string } {
    if (!this.endpoint || !this.apiKey) {
      throw new AppError({ status: 503, code: "ai_provider_not_configured", message: `${this.name} is not configured` })
    }
    return { endpoint: this.endpoint, apiKey: this.apiKey }
  }
}

/**
 * OpenAI provider adapter.
 */
export class OpenAiGenerationProvider extends HttpAiProvider {
  readonly name = "openai" as const

  async generate(request: ProviderGenerationRequest): Promise<ProviderGenerationResult> {
    const { endpoint, apiKey } = this.requireConfig()
    const response = await withGenerationTimeout(
      this.fetcher(endpoint, {
        method: "POST",
        headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          model: request.model,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt }
          ],
          response_format: { type: "json_object" }
        })
      }),
      request.timeoutMs
    )
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `OpenAI returned ${String(response.status)}`
      })
    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[]
      usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
    }
    const content = json.choices?.[0]?.message?.content
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "OpenAI did not return content" })
    return {
      draft: parseDraft(JSON.parse(content) as unknown),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(json.usage?.prompt_tokens, json.usage?.completion_tokens, json.usage?.total_tokens)
    }
  }
}

/**
 * Anthropic provider adapter.
 */
export class AnthropicGenerationProvider extends HttpAiProvider {
  readonly name = "anthropic" as const

  async generate(request: ProviderGenerationRequest): Promise<ProviderGenerationResult> {
    const { endpoint, apiKey } = this.requireConfig()
    const response = await withGenerationTimeout(
      this.fetcher(endpoint, {
        method: "POST",
        headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify({
          model: request.model,
          max_tokens: 6000,
          system: request.systemPrompt,
          messages: [{ role: "user", content: request.userPrompt }]
        })
      }),
      request.timeoutMs
    )
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `Anthropic returned ${String(response.status)}`
      })
    const json = (await response.json()) as {
      content?: { type?: string; text?: string }[]
      usage?: { input_tokens?: number; output_tokens?: number }
    }
    const content = json.content?.find((item) => item.type === "text")?.text
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "Anthropic did not return content" })
    return {
      draft: parseDraft(JSON.parse(content) as unknown),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(
        json.usage?.input_tokens,
        json.usage?.output_tokens,
        json.usage?.input_tokens && json.usage.output_tokens
          ? json.usage.input_tokens + json.usage.output_tokens
          : undefined
      )
    }
  }
}

/**
 * Google AI provider adapter.
 */
export class GoogleAiGenerationProvider extends HttpAiProvider {
  readonly name = "google-ai" as const

  async generate(request: ProviderGenerationRequest): Promise<ProviderGenerationResult> {
    const { endpoint, apiKey } = this.requireConfig()
    const url = new URL(endpoint.replace("{model}", encodeURIComponent(request.model)))
    url.searchParams.set("key", apiKey)
    const response = await withGenerationTimeout(
      this.fetcher(url.toString(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: request.systemPrompt }] },
          contents: [{ role: "user", parts: [{ text: request.userPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }),
      request.timeoutMs
    )
    if (!response.ok)
      throw new AppError({
        status: 502,
        code: "ai_provider_error",
        message: `Google AI returned ${String(response.status)}`
      })
    const json = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
      usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; totalTokenCount?: number }
    }
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text
    if (!content)
      throw new AppError({ status: 502, code: "invalid_ai_response", message: "Google AI did not return content" })
    return {
      draft: parseDraft(JSON.parse(content) as unknown),
      model: request.model,
      provider: this.name,
      tokenUsage: tokenUsage(
        json.usageMetadata?.promptTokenCount,
        json.usageMetadata?.candidatesTokenCount,
        json.usageMetadata?.totalTokenCount
      )
    }
  }
}

/**
 * Registry for configured AI generation providers.
 */
export class AiProviderRegistry {
  private readonly providers = new Map<AiProviderName, AiGenerationProvider>()

  /**
   * Registers one provider.
   */
  register(provider: AiGenerationProvider): void {
    this.providers.set(provider.name, provider)
  }

  /**
   * Resolves one provider by name.
   */
  resolve(name: AiProviderName): AiGenerationProvider {
    const provider = this.providers.get(name)
    if (!provider)
      throw new AppError({ status: 500, code: "ai_provider_missing", message: `${name} is not registered` })
    return provider
  }

  /**
   * Lists provider identifiers.
   */
  list(): AiProviderName[] {
    return Array.from(this.providers.keys())
  }
}

/**
 * Creates the provider registry from environment configuration.
 */
export function createAiProviderRegistry(config: AppConfig, fetcher: typeof fetch = fetch): AiProviderRegistry {
  const registry = new AiProviderRegistry()
  registry.register(new OpenAiGenerationProvider(config.openAiEndpoint, config.openAiApiKey, fetcher))
  registry.register(new AnthropicGenerationProvider(config.anthropicEndpoint, config.anthropicApiKey, fetcher))
  registry.register(new GoogleAiGenerationProvider(config.googleAiEndpoint, config.googleAiApiKey, fetcher))
  return registry
}
