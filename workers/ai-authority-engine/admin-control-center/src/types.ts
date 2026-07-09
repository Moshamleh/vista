export type StatusTone = "neutral" | "good" | "warning" | "danger"

export interface EngineSession {
  readonly baseUrl: string
  readonly apiKey: string
}

export interface QuestionRecord {
  readonly id: string
  readonly question: string
  readonly intent?: string
  readonly priorityScore?: number
  readonly status?: string
}

export interface ContentRecord {
  readonly id: string
  readonly title: string
  readonly status: string
  readonly slug?: string
  readonly contentType?: string
  readonly language?: string
  readonly canonicalUrl?: string | null
  readonly targetKeyword?: string
  readonly entities?: string[]
  readonly internalLinks?: Array<{ readonly targetUrl: string; readonly anchorText: string }>
  readonly schemaType?: string
  readonly readingTimeMinutes?: number
  readonly wordCount?: number
  readonly seoMetadata?: { readonly title?: string; readonly description?: string }
  readonly aiSummary?: string
  readonly body?: string
  readonly currentVersion?: number
  readonly updatedAt?: string
}

export interface JobRecord {
  readonly id: string
  readonly status: string
  readonly contentId?: string
  readonly provider?: string
  readonly generationMetadata?: UnknownRecord
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly publishedUrl?: string
}

export interface VisibilityRecommendation {
  readonly id: string
  readonly severity: string
  readonly category: string
  readonly message: string
  readonly action: string
}

export interface OpportunityRecord {
  readonly id: string
  readonly title: string
  readonly explanation: string
  readonly organizationName?: string
  readonly score?: number
  readonly sourceName?: string
  readonly signalType?: string
  readonly recommendedServices?: string[]
  readonly status?: string
  readonly updatedAt?: string
}

export interface SourceRecord {
  readonly id: string
  readonly name: string
  readonly category: string
  readonly enabled: boolean
}

export type UnknownRecord = Record<string, unknown>
