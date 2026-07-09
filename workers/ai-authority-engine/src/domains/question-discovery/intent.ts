import type { QuestionIntent } from "./types"

/**
 * Classifies a search question into buyer intent.
 */
export function classifyIntent(question: string): QuestionIntent {
  const lower = question.toLowerCase()
  if (/\b(login|official|website|vista by lara|brand name|contact)\b/.test(lower)) return "navigational"
  if (/\b(buy|book|hire|quote|whatsapp|proposal|audit|consultation)\b/.test(lower)) return "transactional"
  if (/\b(cost|price|agency|company|service|best|near me|dubai|uae)\b/.test(lower)) return "commercial"
  return "informational"
}
