import { getAllKnowledgeArticles } from "@/lib/knowledge/content"
import type { Entity } from "@/lib/knowledge/types"

export function getEntityRegistry() {
  const map = new Map<string, Entity>()

  for (const article of getAllKnowledgeArticles()) {
    const entities = [
      article.entities.primaryEntity,
      ...article.entities.supportingEntities,
      ...article.entities.organizations,
      ...article.entities.people,
      ...article.entities.geographicEntities,
      ...article.entities.technologyEntities,
      ...article.entities.serviceEntities,
      ...article.entities.products,
      ...article.entities.relatedConcepts,
    ]

    for (const entity of entities) {
      map.set(entity.id, entity)
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}
