import { getAllKnowledgeArticles } from "@/lib/knowledge/content"
import type { KnowledgeArticlePackage } from "@/lib/knowledge/types"

function names(article: KnowledgeArticlePackage) {
  return new Set([
    article.entities.primaryEntity.name,
    ...article.entities.supportingEntities.map((entity) => entity.name),
    ...article.entities.geographicEntities.map((entity) => entity.name),
    ...article.entities.technologyEntities.map((entity) => entity.name),
    ...article.entities.serviceEntities.map((entity) => entity.name),
    ...article.entities.relatedConcepts.map((entity) => entity.name),
  ])
}

function intersectionScore(source: Set<string>, target: Set<string>, weight: number) {
  let score = 0
  for (const value of target) {
    if (source.has(value)) score += weight
  }
  return score
}

export function getRelatedKnowledgeArticles(article: KnowledgeArticlePackage, limit = 6) {
  const sourceEntities = names(article)
  const allArticles = getAllKnowledgeArticles().filter((candidate) => candidate.meta.id !== article.meta.id)

  return allArticles
    .map((candidate) => {
      let score = intersectionScore(sourceEntities, names(candidate), 8)
      if (candidate.meta.pillar === article.meta.pillar) score += 5
      if (candidate.meta.audience === article.meta.audience) score += 3
      if (candidate.entities.serviceEntities.some((service) => article.entities.serviceEntities.some((item) => item.id === service.id))) score += 4

      return { article: candidate, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article)
}
