import { defaultEntityDefinitions } from "./config"
import type { EntityDefinition, ExtractedEntity } from "./types"

/**
 * Extracts configured entities from a canonical question.
 */
export function extractEntities(
  question: string,
  definitions: EntityDefinition[] = defaultEntityDefinitions
): ExtractedEntity[] {
  const lower = question.toLowerCase()
  const entities: ExtractedEntity[] = []
  for (const definition of definitions) {
    const match = definition.aliases.find((alias) => lower.includes(alias.toLowerCase()))
    if (match) entities.push({ key: definition.key, label: definition.label, matchedText: match })
  }
  return entities
}
