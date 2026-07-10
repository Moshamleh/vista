import type { ContentType } from "../content-pipeline/types"

/**
 * Supported AI provider identifiers.
 */
export type AiProviderName = "openai" | "anthropic" | "google-ai"

/**
 * Generation job status values.
 */
export type GenerationJobStatus = "queued" | "running" | "completed" | "failed" | "cancelled"

/**
 * Content types accepted by the AI generation engine.
 */
export type GenerationContentType =
  | "Authority Article"
  | "FAQ"
  | "Knowledge Page"
  | "Service Page"
  | "Landing Page"
  | "News Article"
  | "Press Release"
  | "Comparison Article"
  | "Case Study"
  | "Glossary Page"

/**
 * Internal RAG context used to ground generation.
 */
export interface RagContext {
  question: string
  approvedQuestions: string[]
  relatedContent: { id: string; title: string; slug: string; status: string; summary: string; entities: string[] }[]
  entities: string[]
  existingFaqs: string[]
  servicePages: { id: string; title: string; slug: string }[]
  previousArticles: { id: string; title: string; slug: string }[]
  templates: { contentType: string; schemaType: string; requiredFields: string[] }[]
}

/**
 * Versioned prompt template stored in D1.
 */
export interface PromptTemplateRecord {
  id: string
  name: string
  version: number
  contentType: GenerationContentType
  parentId: string | null
  systemPrompt: string
  userPrompt: string
  variables: string[]
  active: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Structured content returned by providers.
 */
export interface GeneratedDraft {
  title: string
  slug: string
  body: string
  outline: string[]
  seoTitle: string
  seoDescription: string
  aiSummary: string
  schemaType: string
  entities: string[]
  internalLinks: { targetUrl: string; anchorText: string; targetContentId?: string }[]
  wordCount: number
  readingTimeMinutes: number
}

/**
 * Provider token usage when available.
 */
export interface TokenUsage {
  inputTokens?: number
  outputTokens?: number
  totalTokens?: number
}

/**
 * Provider generation response.
 */
export interface ProviderGenerationResult {
  draft: GeneratedDraft
  model: string
  provider: AiProviderName
  tokenUsage?: TokenUsage
}

/**
 * Provider request payload.
 */
export interface ProviderGenerationRequest {
  model: string
  systemPrompt: string
  userPrompt: string
  timeoutMs: number
}

/**
 * Replaceable provider contract.
 */
export interface AiGenerationProvider {
  readonly name: AiProviderName
  generate(request: ProviderGenerationRequest): Promise<ProviderGenerationResult>
  test(model: string, timeoutMs: number): Promise<{ ok: boolean; latencyMs: number; errorMessage: string | null }>
}

/**
 * Validation result for generated drafts.
 */
export interface GenerationValidationResult {
  score: number
  contentScore: number
  errors: string[]
  warnings: string[]
  duplicateDetected: boolean
}

/**
 * Metadata stored for every generation job.
 */
export interface GenerationMetadata {
  model: string
  provider: AiProviderName
  promptVersion: number
  generationTimeMs: number
  tokenUsage: TokenUsage | null
  validationScore: number
  contentScore: number
}

/**
 * D1 generation job record.
 */
export interface GenerationJobRecord {
  id: string
  contentId: string | null
  questionId: string | null
  status: GenerationJobStatus
  contentType: GenerationContentType
  question: string
  provider: AiProviderName
  model: string
  promptTemplateId: string
  promptVersion: number
  ragContext: RagContext
  generatedContent: GeneratedDraft | null
  validation: GenerationValidationResult | null
  generationMetadata: GenerationMetadata | null
  retryCount: number
  maxRetries: number
  cancellationReason: string | null
  errorMessage: string | null
  startedAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
}

/**
 * API input for a generation request.
 */
export interface GenerateRequestInput {
  question: string
  questionId: string | null
  contentId: string | null
  contentType: GenerationContentType
  minWordCount: number
  language: "en" | "ar"
  targetKeyword: string
  async: boolean
}

/**
 * Mapping between generation and content repository types.
 */
export function toContentRepositoryType(contentType: GenerationContentType): ContentType {
  if (contentType === "Comparison Article") return "Comparison Page"
  if (contentType === "Glossary Page") return "Knowledge Page"
  return contentType
}
