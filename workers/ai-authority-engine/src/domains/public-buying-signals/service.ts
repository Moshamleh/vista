import { AppError } from "../../errors/app-error"
import type { Logger } from "../../logger/logger"
import { classifySignal, recommendServices } from "./classification"
import type { BuyingSignalProviderRegistry } from "./providers"
import type {
  BuyingSignalRecord,
  BuyingSignalScanResult,
  IngestionRunRecord,
  OpportunityRecord,
  OpportunityScoreRecord,
  OrganizationRecord,
  PublicSignalCandidate
} from "./types"
import type {
  BuyingSignalRepository,
  IngestionRunRepository,
  OpportunityRepository,
  OpportunityScoreRepository,
  OrganizationRepository,
  SignalSourceRepository
} from "./repositories"
import { calculateOpportunityScore } from "./scoring"

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "")
}

/** Coordinates public buying signal ingestion, classification, and opportunity scoring. */
export class PublicBuyingSignalService {
  constructor(
    private readonly providers: BuyingSignalProviderRegistry,
    private readonly sources: SignalSourceRepository,
    private readonly organizations: OrganizationRepository,
    private readonly signals: BuyingSignalRepository,
    private readonly opportunities: OpportunityRepository,
    private readonly scores: OpportunityScoreRepository,
    private readonly runs: IngestionRunRepository,
    private readonly logger: Logger
  ) {}

  /** Lists public buying signals. */
  async listSignals(limit: number): Promise<BuyingSignalRecord[]> {
    return this.signals.list(limit)
  }

  /** Gets one public buying signal. */
  async getSignal(id: string): Promise<BuyingSignalRecord> {
    const signal = await this.signals.findById(id)
    if (!signal) throw new AppError({ status: 404, code: "not_found", message: "Buying signal not found" })
    return signal
  }

  /** Lists scored opportunities. */
  async listOpportunities(limit: number): Promise<OpportunityRecord[]> {
    return this.opportunities.list(limit)
  }

  /** Gets one scored opportunity. */
  async getOpportunity(id: string): Promise<OpportunityRecord> {
    const opportunity = await this.opportunities.findById(id)
    if (!opportunity) throw new AppError({ status: 404, code: "not_found", message: "Opportunity not found" })
    return opportunity
  }

  /** Lists active public signal sources. */
  async listSources(limit: number) {
    return this.sources.list(limit)
  }

  /** Scans configured public providers and persists signals and opportunities. */
  async scan(requestId: string, limit = 50): Promise<BuyingSignalScanResult> {
    const startedAt = new Date().toISOString()
    const providers = this.providers.list()
    const run: IngestionRunRecord = {
      id: crypto.randomUUID(),
      status: "running",
      startedAt,
      completedAt: null,
      sourceCount: providers.length,
      signalCount: 0,
      opportunityCount: 0,
      errorMessage: null
    }
    await this.runs.create(run)
    try {
      const candidates: PublicSignalCandidate[] = []
      for (const provider of providers) candidates.push(...(await provider.discover({ limit })))
      const signals: BuyingSignalRecord[] = []
      const opportunities: { opportunity: OpportunityRecord; score: OpportunityScoreRecord }[] = []
      for (const candidate of candidates.slice(0, limit)) {
        await this.sources.upsert(candidate.source)
        const organization = this.organizationFromCandidate(candidate)
        await this.organizations.upsert(organization)
        const signal = this.signalFromCandidate(candidate, organization.id)
        await this.signals.create(signal)
        signals.push(signal)
        const opportunity = this.opportunityFromSignal(signal, organization)
        await this.opportunities.create(opportunity)
        const score = await this.scoreOpportunity(signal, organization, opportunity)
        await this.scores.create(score)
        opportunities.push({ opportunity, score })
      }
      const completed = {
        ...run,
        status: "completed" as const,
        completedAt: new Date().toISOString(),
        signalCount: signals.length,
        opportunityCount: opportunities.length
      }
      await this.runs.update(completed)
      this.logger.info(
        "Public buying signal scan completed",
        { signals: signals.length, opportunities: opportunities.length },
        requestId
      )
      return { run: completed, signals, opportunities }
    } catch (error) {
      const failed = {
        ...run,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        errorMessage: error instanceof Error ? error.message : "Ingestion failed"
      }
      await this.runs.update(failed)
      throw error
    }
  }

  private organizationFromCandidate(candidate: PublicSignalCandidate): OrganizationRecord {
    const timestamp = new Date().toISOString()
    return {
      id: slug(candidate.organizationWebsiteUrl ?? candidate.organizationName),
      name: candidate.organizationName,
      websiteUrl: candidate.organizationWebsiteUrl,
      industry: candidate.organizationIndustry,
      location: candidate.organizationLocation,
      companySize: candidate.companySize,
      technologies: candidate.technologies,
      metadata: { sourceCategory: candidate.source.category },
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  private signalFromCandidate(candidate: PublicSignalCandidate, organizationId: string): BuyingSignalRecord {
    const classification = classifySignal(candidate)
    return {
      id: crypto.randomUUID(),
      sourceId: candidate.source.id,
      organizationId,
      eventType: classification.eventType,
      title: candidate.title,
      summary: candidate.summary,
      url: candidate.url,
      publishedAt: candidate.publishedAt,
      detectedAt: new Date().toISOString(),
      location: candidate.organizationLocation,
      technologies: candidate.technologies,
      confidenceScore: classification.confidenceScore,
      raw: candidate.raw
    }
  }

  private opportunityFromSignal(signal: BuyingSignalRecord, organization: OrganizationRecord): OpportunityRecord {
    const timestamp = new Date().toISOString()
    const recommendedServices = recommendServices(signal.eventType, signal.technologies)
    return {
      id: crypto.randomUUID(),
      organizationId: organization.id,
      primarySignalId: signal.id,
      status: "open",
      title: `${organization.name}: ${signal.eventType.replaceAll("-", " ")}`,
      explanation: `${organization.name} has a public ${signal.eventType.replaceAll("-", " ")} signal. Recommended services: ${recommendedServices.join(", ")}.`,
      recommendedServices,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  private async scoreOpportunity(
    signal: BuyingSignalRecord,
    organization: OrganizationRecord,
    opportunity: OpportunityRecord
  ): Promise<OpportunityScoreRecord> {
    const organizationSignalCount = await this.signals.countForOrganization(organization.id)
    const result = calculateOpportunityScore(signal, organization, organizationSignalCount)
    return {
      id: crypto.randomUUID(),
      opportunityId: opportunity.id,
      score: result.score,
      factors: result.factors,
      explanation: result.explanation,
      createdAt: new Date().toISOString()
    }
  }
}
