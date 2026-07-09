/** Permitted public provider categories. */
export type SignalSourceCategory =
  | "company-announcements"
  | "press-releases"
  | "procurement-notices"
  | "startup-launch-feeds"
  | "funding-announcements"
  | "business-directory-api"
  | "technology-adoption-feeds"
  | "job-postings"
  | "public-rss-feeds"
  | "custom-feeds"

/** Commercial event classifications detected from public signals. */
export type BuyingSignalEventType =
  | "new-website-launch"
  | "ecommerce-launch"
  | "shopify-adoption"
  | "website-redesign"
  | "marketing-hiring"
  | "ppc-hiring"
  | "seo-hiring"
  | "ai-hiring"
  | "expansion-announcement"
  | "funding-event"
  | "new-office-opening"
  | "product-launch"

/** Public signal source configuration. */
export interface SignalSourceRecord {
  id: string
  name: string
  category: SignalSourceCategory
  endpoint: string
  enabled: boolean
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/** Public organization profile derived only from permitted source data. */
export interface OrganizationRecord {
  id: string
  name: string
  websiteUrl: string | null
  industry: string | null
  location: string | null
  companySize: string | null
  technologies: string[]
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/** Persisted buying signal. */
export interface BuyingSignalRecord {
  id: string
  sourceId: string
  organizationId: string
  eventType: BuyingSignalEventType
  title: string
  summary: string
  url: string
  publishedAt: string
  detectedAt: string
  location: string | null
  technologies: string[]
  confidenceScore: number
  raw: Record<string, unknown>
}

/** Opportunity generated from a buying signal. */
export interface OpportunityRecord {
  id: string
  organizationId: string
  primarySignalId: string
  status: "open" | "reviewed" | "dismissed"
  title: string
  explanation: string
  recommendedServices: string[]
  organizationName?: string
  score?: number
  sourceName?: string
  signalType?: BuyingSignalEventType
  createdAt: string
  updatedAt: string
}

/** Opportunity score with explainable factors. */
export interface OpportunityScoreRecord {
  id: string
  opportunityId: string
  score: number
  factors: OpportunityScoreFactors
  explanation: string
  createdAt: string
}

/** Score factor model. */
export interface OpportunityScoreFactors {
  commercialRelevance: number
  industryFit: number
  uaeGccRelevance: number
  recency: number
  companySize: number
  technologyMatch: number
  multipleSignalConfirmation: number
}

/** Ingestion run audit record. */
export interface IngestionRunRecord {
  id: string
  status: "running" | "completed" | "failed"
  startedAt: string
  completedAt: string | null
  sourceCount: number
  signalCount: number
  opportunityCount: number
  errorMessage: string | null
}

/** Provider output before persistence. */
export interface PublicSignalCandidate {
  source: SignalSourceRecord
  organizationName: string
  organizationWebsiteUrl: string | null
  organizationIndustry: string | null
  organizationLocation: string | null
  companySize: string | null
  technologies: string[]
  title: string
  summary: string
  url: string
  publishedAt: string
  raw: Record<string, unknown>
}

/** Provider discovery request. */
export interface BuyingSignalDiscoveryRequest {
  limit: number
  since?: string
}

/** Provider SDK contract for public buying signal sources. */
export interface BuyingSignalProvider {
  readonly name: string
  readonly category: SignalSourceCategory
  discover(request: BuyingSignalDiscoveryRequest): Promise<PublicSignalCandidate[]>
}

/** Full scan output. */
export interface BuyingSignalScanResult {
  run: IngestionRunRecord
  signals: BuyingSignalRecord[]
  opportunities: { opportunity: OpportunityRecord; score: OpportunityScoreRecord }[]
}
