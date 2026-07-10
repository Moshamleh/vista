/**
 * Supported discovery provider identifiers.
 */
export type DiscoveryProviderName =
  "bing-autosuggest" | "youtube-suggest" | "internal-seed" | "manual-import" | "google-search-console"

/**
 * Supported search-question intent categories.
 */
export type QuestionIntent = "informational" | "commercial" | "transactional" | "navigational"

/**
 * Configurable entity definition used by extraction.
 */
export interface EntityDefinition {
  key: string
  label: string
  aliases: string[]
}

/**
 * Entity detected inside a discovered question.
 */
export interface ExtractedEntity {
  key: string
  label: string
  matchedText: string
}

/**
 * Request accepted by the discovery run endpoint.
 */
export interface DiscoveryRunRequest {
  seed: string
  market: "AE" | "SA" | "QA" | "KW" | "BH" | "OM"
  language: "en" | "ar"
  providers: DiscoveryProviderName[]
  limit: number
  manualQuestions: string[]
}

/**
 * Normalized question persisted in D1.
 */
export interface QuestionRecord {
  id: string
  question: string
  canonicalQuestion: string
  slug: string
  language: "en" | "ar"
  market: string
  intent: QuestionIntent
  priorityScore: number
  searchDemand: number
  freshnessScore: number
  existingCoverageScore: number
  entities: ExtractedEntity[]
  sourceProvider: DiscoveryProviderName
  sourceRunId: string
  firstSeenAt: string
  lastSeenAt: string
}

/**
 * Discovery provider metadata stored in D1.
 */
export interface ProviderRecord {
  name: DiscoveryProviderName
  enabled: boolean
  lastRunAt: string | null
}

/**
 * Discovery run status stored in D1.
 */
export interface DiscoveryRunRecord {
  id: string
  seed: string
  status: "running" | "completed" | "failed"
  providers: DiscoveryProviderName[]
  questionCount: number
  errorMessage: string | null
  startedAt: string
  finishedAt: string | null
}

/**
 * Raw provider question before normalization and scoring.
 */
export interface ProviderQuestion {
  question: string
  sourceProvider: DiscoveryProviderName
  searchDemand?: number
  freshnessScore?: number
}

/**
 * Replaceable provider contract for discovery sources.
 */
export interface DiscoveryProvider {
  readonly name: DiscoveryProviderName
  discover(request: DiscoveryRunRequest): Promise<ProviderQuestion[]>
}
