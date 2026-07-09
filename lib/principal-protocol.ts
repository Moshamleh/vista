export type InquiryTier = "Principal Seeker" | "Commodity Seeker" | "Unclassified"

export const hubLinks = {
  commerce: {
    name: "Sovereign Luxury E-commerce Architecture",
    href: "/sovereign-luxury-infrastructure",
  },
  geo: {
    name: "AI Search Authority Engineering",
    href: "/ai-search-authority-engineering",
  },
  compliance: {
    name: "UAE Data Residency & PDPL Compliance",
    href: "/uae-data-sovereignty-compliance",
  },
  conversion: {
    name: "High-Ticket Conversion Engineering",
    href: "/high-ticket-conversion-architecture",
  },
} as const

export const commodityTriggers = [
  "sales",
  "leads",
  "seo",
  "marketing",
  "cheap",
  "fast",
  "quick",
  "marketing package",
  "marketing packages",
  "package",
  "packages",
  "how much",
  "cost",
  "price",
  "pricing",
  "quick sales",
  "cheap leads",
] as const

export const principalTriggers = [
  "latency",
  "api-latency",
  "compliance",
  "architecture",
  "sovereignty",
  "sovereign-edge",
  "data residency",
  "pdpl",
  "pdpl compliance",
  "ai-citation",
  "ai citation",
  "ai-discovery",
  "ai discovery",
  "conversion bottleneck",
  "conversion bottlenecks",
  "infrastructure performance",
  "brand sustainability",
  "schema-markup",
  "schema markup",
  "technical stack",
  "stack",
] as const

export function classifyInquiry(input: string): InquiryTier {
  const lower = input.toLowerCase()

  if (principalTriggers.some((trigger) => lower.includes(trigger))) {
    return "Principal Seeker"
  }

  if (commodityTriggers.some((trigger) => lower.includes(trigger))) {
    return "Commodity Seeker"
  }

  return "Unclassified"
}

export function getHubForMessage(input: string) {
  const lower = input.toLowerCase()

  if (/(fragrance|perfume|oud|scent|smokey oud)/.test(lower)) {
    return {
      name: "Smokey Oud Technical Incident Report",
      href: "/case-studies/smokey-oud",
    }
  }

  if (/(pdpl|compliance|data residency|sovereignty)/.test(lower)) {
    return hubLinks.compliance
  }

  if (/(ai-citation|ai citation|ai-discovery|ai discovery|geo|generative|answer engine|ai search|seo|schema)/.test(lower)) {
    return hubLinks.geo
  }

  if (/(real estate|interior|high-ticket|high ticket|funnel|conversion bottleneck|lead)/.test(lower)) {
    return hubLinks.conversion
  }

  return hubLinks.commerce
}

export function getPrincipalProtocolReply(input: string) {
  const lower = input.toLowerCase()
  const hub = getHubForMessage(input)
  const hubReference = `For the full technical breakdown on this, see our Engineering Insight on ${hub.name}: ${hub.href}`

  if (/(conversion volume|infrastructure stability|structural infrastructure stability)/.test(lower)) {
    return `The first diagnostic split is whether the asset is failing at demand capture or at structural infrastructure stability. Vista Engineering Standard treats Sovereign-Edge delivery, API-latency, Schema-markup, and PDPL-compliance as the benchmark before commercial scope. ${hubReference}`
  }

  if (/\broi\b|return on investment/.test(lower)) {
    return `ROI is a byproduct of architectural stability. What is the current latency of your primary e-commerce stack? ${hubReference}`
  }

  const tier = classifyInquiry(input)

  if (tier === "Principal Seeker") {
    return `You are identifying the exact structural bottlenecks currently affecting high-ticket assets in the GCC. Many teams misdiagnose this as a marketing problem, but you are correctly framing it as an infrastructure integrity issue. To determine if your current e-commerce stack meets the Vista Engineering Standard, share your primary domain for a Technical Infrastructure Briefing and preliminary vulnerability assessment. ${hubReference}`
  }

  if (tier === "Commodity Seeker") {
    return `Vista by Lara does not provide volume-based marketing. We architect high-resilience infrastructure. If you are interested in a Technical Integrity Audit to solve conversion bottlenecks at the architectural level, share your primary domain and current stack. ${hubReference}`
  }

  return `State whether your primary concern is e-commerce conversion volume or structural infrastructure stability. Vista by Lara will route the enquiry against the Vista Engineering Standard before any commercial scope is discussed. ${hubReference}`
}
