import type { ContentRecord } from "../content-pipeline/types"
import type { GeneratedDraft, GenerationValidationResult, RagContext } from "./types"

/**
 * Validates generated drafts for quality, metadata, structure, and internal grounding.
 */
export function validateGeneratedDraft(input: {
  draft: GeneratedDraft
  minWordCount: number
  ragContext: RagContext
  existingContent: ContentRecord[]
}): GenerationValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const body = input.draft.body
  const headingLevels = Array.from(body.matchAll(/^#{1,6}\s/gmu)).map((match) => match[0].trim().length)
  const duplicateDetected = input.existingContent.some(
    (item) => item.slug === input.draft.slug || item.title.toLowerCase() === input.draft.title.toLowerCase()
  )

  if (input.draft.wordCount < input.minWordCount) errors.push("Minimum word count was not met")
  if (duplicateDetected) errors.push("Duplicate content detected")
  if (headingLevels.some((level, index) => index > 0 && level - (headingLevels[index - 1] ?? level) > 1)) {
    errors.push("Heading hierarchy skips a level")
  }
  if (input.draft.seoTitle.length === 0 || input.draft.seoDescription.length === 0)
    errors.push("Required SEO metadata is missing")
  if (input.draft.schemaType.length === 0) errors.push("Required schema type is missing")
  if (input.draft.entities.length === 0) errors.push("Entity coverage is missing")
  if (input.draft.internalLinks.length === 0) warnings.push("Internal link suggestions are missing")
  if (averageSentenceWords(body) > 24) warnings.push("Reading level may be too dense")

  const entityHits = input.ragContext.entities.filter((entity) => input.draft.entities.includes(entity)).length
  const contentScore = Math.max(0, 1 - errors.length * 0.2 - warnings.length * 0.05)
  const entityScore = input.ragContext.entities.length === 0 ? 1 : entityHits / input.ragContext.entities.length
  return {
    score: Number(Math.max(0, contentScore * 0.75 + entityScore * 0.25).toFixed(4)),
    contentScore: Number(contentScore.toFixed(4)),
    errors,
    warnings,
    duplicateDetected
  }
}

function averageSentenceWords(value: string): number {
  const sentences = value
    .split(/[.!?]+/u)
    .map((item) => item.trim())
    .filter(Boolean)
  if (sentences.length === 0) return 0
  const words = sentences.reduce((total, sentence) => total + sentence.split(/\s+/u).filter(Boolean).length, 0)
  return words / sentences.length
}
