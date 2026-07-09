import type { BuyingSignalEventType, PublicSignalCandidate } from "./types"

const eventRules: ReadonlyArray<{ eventType: BuyingSignalEventType; terms: string[] }> = [
  { eventType: "shopify-adoption", terms: ["shopify", "shopify plus"] },
  { eventType: "ecommerce-launch", terms: ["e-commerce", "ecommerce", "online store", "digital commerce"] },
  { eventType: "new-website-launch", terms: ["new website", "website launch", "launched website"] },
  { eventType: "website-redesign", terms: ["redesign", "rebrand", "new digital experience", "ux redesign"] },
  {
    eventType: "ppc-hiring",
    terms: ["ppc specialist", "paid search", "google ads specialist", "performance marketing"]
  },
  { eventType: "seo-hiring", terms: ["seo specialist", "organic search", "technical seo"] },
  { eventType: "ai-hiring", terms: ["ai engineer", "automation specialist", "machine learning", "generative ai"] },
  { eventType: "marketing-hiring", terms: ["marketing manager", "digital marketing", "growth marketer"] },
  { eventType: "funding-event", terms: ["funding", "raised", "investment", "series a", "seed round"] },
  { eventType: "new-office-opening", terms: ["new office", "opens office", "regional headquarters"] },
  { eventType: "expansion-announcement", terms: ["expands", "expansion", "enters uae", "gcc expansion"] },
  { eventType: "product-launch", terms: ["product launch", "launches", "new platform", "new service"] }
]

/** Classifies a public signal candidate into a commercial event type. */
export function classifySignal(candidate: PublicSignalCandidate): {
  eventType: BuyingSignalEventType
  confidenceScore: number
} {
  const text = `${candidate.title} ${candidate.summary} ${candidate.technologies.join(" ")}`.toLowerCase()
  for (const rule of eventRules) {
    const matches = rule.terms.filter((term) => text.includes(term)).length
    if (matches > 0) return { eventType: rule.eventType, confidenceScore: Math.min(1, 0.62 + matches * 0.12) }
  }
  return { eventType: "product-launch", confidenceScore: 0.5 }
}

/** Recommends Vista by Lara services for a classified event. */
export function recommendServices(eventType: BuyingSignalEventType, technologies: string[]): string[] {
  const services = new Set<string>()
  if (eventType === "shopify-adoption" || eventType === "ecommerce-launch")
    services.add("Shopify and AI e-commerce infrastructure")
  if (eventType === "ppc-hiring") services.add("Google Ads performance architecture")
  if (eventType === "seo-hiring" || eventType === "website-redesign")
    services.add("SEO, AEO, and GEO authority engineering")
  if (eventType === "ai-hiring") services.add("AI automation systems")
  if (eventType === "funding-event" || eventType === "expansion-announcement" || eventType === "new-office-opening")
    services.add("GCC expansion digital authority system")
  if (technologies.some((technology) => technology.toLowerCase().includes("shopify")))
    services.add("Shopify and AI e-commerce infrastructure")
  if (services.size === 0) services.add("AI visibility and conversion infrastructure")
  return Array.from(services)
}
