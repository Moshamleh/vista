import type { ContentRecord } from "../content-pipeline/types"
import type { InternalLinkRecommendation } from "./types"

/**
 * Recommends internal links using shared entities, content types, and topic keywords.
 */
export function recommendInternalLinks(
  content: ContentRecord,
  candidates: ContentRecord[]
): InternalLinkRecommendation[] {
  return candidates
    .filter((candidate) => candidate.id !== content.id)
    .map((candidate) => {
      const sharedEntities = candidate.entities.filter((entity) => content.entities.includes(entity)).length
      const sameTopic = candidate.targetKeyword.toLowerCase() === content.targetKeyword.toLowerCase()
      const relationType =
        candidate.contentType === "FAQ"
          ? "related-faq"
          : candidate.contentType === "Service Page"
            ? "related-service"
            : sharedEntities > 0
              ? "entity-link"
              : "related-article"
      return {
        sourceContentId: content.id,
        targetContentId: candidate.id,
        relationType,
        anchorText: candidate.title,
        confidenceScore: Math.min(1, 0.35 + sharedEntities * 0.2 + (sameTopic ? 0.25 : 0))
      } satisfies InternalLinkRecommendation
    })
    .filter((item) => item.confidenceScore >= 0.45)
    .sort((left, right) => right.confidenceScore - left.confidenceScore)
    .slice(0, 10)
}
