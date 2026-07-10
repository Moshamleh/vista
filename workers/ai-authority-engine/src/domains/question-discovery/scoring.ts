import { defaultScoringWeights } from "./config"
import type { ExtractedEntity, QuestionIntent } from "./types"

export interface ScoreInput {
  intent: QuestionIntent
  entities: ExtractedEntity[]
  searchDemand: number
  freshnessScore: number
  existingCoverageScore: number
}

/**
 * Clamps a score into the supported 0..1 range.
 */
export function clampScore(value: number): number {
  return Math.max(0, Math.min(1, value))
}

/**
 * Scores UAE relevance from detected entities.
 */
export function scoreUaeRelevance(entities: ExtractedEntity[]): number {
  return entities.some((entity) => entity.key === "dubai" || entity.key === "uae") ? 1 : 0
}

/**
 * Scores AI relevance from detected entities.
 */
export function scoreAiRelevance(entities: ExtractedEntity[]): number {
  return entities.some((entity) => ["ai-automation", "geo", "ai-visibility"].includes(entity.key)) ? 1 : 0
}

/**
 * Computes a weighted priority score for a discovered question.
 */
export function calculatePriorityScore(input: ScoreInput, weights = defaultScoringWeights): number {
  const commercialIntent = input.intent === "commercial" || input.intent === "transactional" ? 1 : 0
  const existingCoverageGap = 1 - clampScore(input.existingCoverageScore)
  const score =
    commercialIntent * weights.commercialIntent +
    scoreUaeRelevance(input.entities) * weights.uaeRelevance +
    scoreAiRelevance(input.entities) * weights.aiRelevance +
    clampScore(input.searchDemand) * weights.searchDemand +
    clampScore(input.freshnessScore) * weights.freshness +
    existingCoverageGap * weights.existingCoverageGap
  return Number(score.toFixed(4))
}
