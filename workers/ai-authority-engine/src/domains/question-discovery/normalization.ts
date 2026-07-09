const englishStopWords = new Set(["a", "an", "the", "for", "to", "of", "and", "or", "in", "on", "with", "by"])
const arabicPattern = /[\u0600-\u06ff]/

/**
 * Detects whether a question is English or Arabic.
 */
export function detectLanguage(value: string): "en" | "ar" {
  return arabicPattern.test(value) ? "ar" : "en"
}

/**
 * Normalizes Unicode, spacing, and punctuation for question processing.
 */
export function canonicalizeQuestion(value: string): string {
  return value
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[؟?]+$/u, "")
    .toLowerCase()
}

/**
 * Removes common English stop words from a question.
 */
export function removeStopWords(value: string): string {
  return value
    .split(" ")
    .filter((token) => !englishStopWords.has(token))
    .join(" ")
}

/**
 * Generates a stable URL slug from a canonical question.
 */
export function generateSlug(value: string): string {
  const canonical = removeStopWords(canonicalizeQuestion(value))
  const slug = canonical
    .replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
  return slug || crypto.randomUUID()
}

/**
 * Deduplicates questions by canonical form.
 */
export function deduplicateQuestions<T extends { question: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  const result: T[] = []
  for (const item of items) {
    const key = canonicalizeQuestion(item.question)
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}
