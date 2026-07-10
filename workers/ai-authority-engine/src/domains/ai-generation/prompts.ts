import { AppError } from "../../errors/app-error"
import type { GenerationContentType, PromptTemplateRecord, RagContext } from "./types"

/**
 * Creates a default versioned prompt template for supported content types.
 */
export function createDefaultPromptTemplate(
  contentType: GenerationContentType,
  timestamp: string
): PromptTemplateRecord {
  return {
    id: crypto.randomUUID(),
    name: `${contentType} Authority Prompt`,
    version: 1,
    contentType,
    parentId: null,
    active: true,
    variables: ["question", "ragContext", "minWordCount", "targetKeyword", "language"],
    systemPrompt:
      "You are Vista by Lara's internal AI content engine. Generate only from supplied internal context. Do not invent external facts. Return valid JSON only.",
    userPrompt:
      "Create a {contentType} for question {question}. Use target keyword {targetKeyword}. Minimum words: {minWordCount}. Language: {language}. Internal RAG context: {ragContext}. Return JSON with title, slug, body, outline, seoTitle, seoDescription, aiSummary, schemaType, entities, internalLinks, wordCount, readingTimeMinutes.",
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

/**
 * Resolves inherited prompt text.
 */
export function inheritPrompt(child: PromptTemplateRecord, parent: PromptTemplateRecord | null): PromptTemplateRecord {
  if (!parent) return child
  return {
    ...child,
    systemPrompt: child.systemPrompt.length > 0 ? child.systemPrompt : parent.systemPrompt,
    userPrompt: child.userPrompt.length > 0 ? child.userPrompt : parent.userPrompt,
    variables: Array.from(new Set([...parent.variables, ...child.variables]))
  }
}

/**
 * Renders prompt variables into a template.
 */
export function renderPrompt(template: string, variables: Record<string, string>): string {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/gu, (_match, key: string) => {
    const value = variables[key]
    if (value === undefined) {
      throw new AppError({ status: 500, code: "prompt_variable_missing", message: `Prompt variable ${key} is missing` })
    }
    return value
  })
}

/**
 * Serializes RAG context compactly for prompt use.
 */
export function serializeRagContext(context: RagContext): string {
  return JSON.stringify(context)
}
