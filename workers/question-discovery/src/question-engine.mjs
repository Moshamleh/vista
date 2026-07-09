const questionStarters = [
  "what",
  "why",
  "how",
  "when",
  "where",
  "which",
  "who",
  "can",
  "do",
  "does",
  "is",
  "are",
  "should",
  "will",
  "cost"
]

const sourceQueryPrefixes = ["what is", "how to", "why", "which", "best", "cost of", "near me", "dubai", "uae"]

/**
 * Normalizes spacing and punctuation for a discovered question.
 * @param {string} value Raw question candidate.
 * @returns {string}
 */
export function normalizeQuestion(value) {
  return value.trim().replace(/\s+/g, " ").replace(/[؟?]+$/u, "")
}

/**
 * Checks whether a suggestion is question-like.
 * @param {string} value Suggestion text.
 * @returns {boolean}
 */
export function isQuestionLike(value) {
  const normalized = normalizeQuestion(value).toLowerCase()
  return questionStarters.some((starter) => normalized === starter || normalized.startsWith(`${starter} `))
}

/**
 * Classifies buyer intent for a discovered question.
 * @param {string} question Normalized question.
 * @returns {"informational"|"commercial"|"local"|"transactional"}
 */
export function classifyIntent(question) {
  const lower = question.toLowerCase()
  if (/\b(price|cost|quote|package|agency|company|service|services|hire|near me|dubai|uae|abu dhabi|sharjah)\b/.test(lower)) return "commercial"
  if (/\bwhere|near me|dubai|uae|abu dhabi|sharjah|ajman|rak\b/.test(lower)) return "local"
  if (/\bbook|buy|contact|whatsapp|audit|consultation|proposal\b/.test(lower)) return "transactional"
  return "informational"
}

/**
 * Builds source queries used to ask external suggestion providers.
 * @param {string} seed Seed phrase.
 * @returns {string[]}
 */
export function buildSourceQueries(seed) {
  return Array.from(new Set([seed, ...sourceQueryPrefixes.map((prefix) => `${prefix} ${seed}`)]))
}

/**
 * Converts provider suggestions into ranked question records.
 * @param {{suggestion:string,provider:string,sourceQuery:string}[]} candidates Provider candidates.
 * @param {{market:string,language:string,limit:number}} request Discovery request.
 * @returns {Array<{question:string,normalized:string,intent:string,sourceProvider:string,sourceQuery:string,confidence:number,market:string,language:string}>}
 */
export function rankQuestions(candidates, request) {
  const seen = new Set()
  const questions = []

  for (const candidate of candidates) {
    if (!isQuestionLike(candidate.suggestion)) continue
    const normalized = normalizeQuestion(candidate.suggestion)
    const key = normalized.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)

    const intent = classifyIntent(normalized)
    const confidence = intent === "commercial" || intent === "local" ? 0.92 : 0.84
    questions.push({
      question: `${normalized}?`,
      normalized,
      intent,
      sourceProvider: candidate.provider,
      sourceQuery: candidate.sourceQuery,
      confidence,
      market: request.market,
      language: request.language
    })
  }

  return questions
    .sort((a, b) => b.confidence - a.confidence || a.normalized.localeCompare(b.normalized))
    .slice(0, request.limit)
}

/**
 * Runs discovery against replaceable provider adapters.
 * @param {{seed:string,market:string,language:string,limit:number,providers:string[]}} request Validated discovery request.
 * @param {Record<string,{name:string,discover:(query:string,context:{market:string,language:string})=>Promise<string[]>}>} registry Provider registry.
 * @returns {Promise<{seed:string,market:string,language:string,providers:string[],questions:ReturnType<typeof rankQuestions>,providerErrors:Array<{provider:string,sourceQuery:string,code:string,message:string}>}>}
 */
export async function discoverQuestions(request, registry) {
  const sourceQueries = buildSourceQueries(request.seed)
  const candidates = []
  const providerErrors = []

  for (const providerName of request.providers) {
    const provider = registry[providerName]
    for (const sourceQuery of sourceQueries) {
      try {
        const suggestions = await provider.discover(sourceQuery, request)
        for (const suggestion of suggestions) {
          candidates.push({ suggestion, provider: provider.name, sourceQuery })
        }
      } catch (error) {
        providerErrors.push({
          provider: provider.name,
          sourceQuery,
          code: error?.code || "provider_error",
          message: error?.message || "Provider request failed."
        })
      }
    }
  }

  return {
    seed: request.seed,
    market: request.market,
    language: request.language,
    providers: request.providers,
    sourceQueries,
    questions: rankQuestions(candidates, request),
    providerErrors
  }
}
