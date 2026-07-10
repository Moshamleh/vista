import type { BuyingSignalRecord, OpportunityScoreFactors, OrganizationRecord } from "./types"

const commercialEvents = new Set([
  "shopify-adoption",
  "ecommerce-launch",
  "website-redesign",
  "ppc-hiring",
  "seo-hiring",
  "ai-hiring",
  "funding-event",
  "expansion-announcement"
])

function clamp(value: number): number {
  return Number(Math.max(0, Math.min(1, value)).toFixed(4))
}

function includesAny(value: string, terms: string[]): boolean {
  const text = value.toLowerCase()
  return terms.some((term) => text.includes(term))
}

/** Calculates explainable opportunity score factors. */
export function calculateOpportunityScore(
  signal: BuyingSignalRecord,
  organization: OrganizationRecord,
  organizationSignalCount: number,
  now = new Date()
): { score: number; factors: OpportunityScoreFactors; explanation: string } {
  const ageDays = Math.max(0, (now.getTime() - new Date(signal.publishedAt).getTime()) / 86400000)
  const text = `${signal.title} ${signal.summary} ${signal.location ?? ""} ${organization.location ?? ""} ${organization.industry ?? ""}`
  const technologyText = `${signal.technologies.join(" ")} ${organization.technologies.join(" ")}`
  const factors: OpportunityScoreFactors = {
    commercialRelevance: commercialEvents.has(signal.eventType) ? 0.92 : 0.62,
    industryFit: includesAny(text, [
      "retail",
      "ecommerce",
      "e-commerce",
      "hospitality",
      "real estate",
      "luxury",
      "services"
    ])
      ? 0.9
      : 0.58,
    uaeGccRelevance: includesAny(text, [
      "dubai",
      "uae",
      "abu dhabi",
      "sharjah",
      "gcc",
      "saudi",
      "qatar",
      "kuwait",
      "bahrain",
      "oman"
    ])
      ? 1
      : 0.35,
    recency: clamp(ageDays <= 7 ? 1 : ageDays <= 30 ? 0.75 : ageDays <= 90 ? 0.45 : 0.2),
    companySize: organization.companySize ? 0.75 : 0.45,
    technologyMatch: includesAny(technologyText, ["shopify", "google ads", "seo", "ai", "automation", "analytics"])
      ? 1
      : 0.4,
    multipleSignalConfirmation: organizationSignalCount > 1 ? 0.9 : 0.35
  }
  const score = Number(
    (
      factors.commercialRelevance * 0.22 +
      factors.industryFit * 0.14 +
      factors.uaeGccRelevance * 0.18 +
      factors.recency * 0.14 +
      factors.companySize * 0.08 +
      factors.technologyMatch * 0.16 +
      factors.multipleSignalConfirmation * 0.08
    ).toFixed(4)
  )
  return {
    score,
    factors,
    explanation: `${organization.name} scored ${String(Math.round(score * 100))} because the public signal indicates ${signal.eventType.replaceAll("-", " ")}, with UAE/GCC relevance ${String(Math.round(factors.uaeGccRelevance * 100))} and technology match ${String(Math.round(factors.technologyMatch * 100))}.`
  }
}
