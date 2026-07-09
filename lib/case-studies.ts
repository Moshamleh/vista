import { siteConfig } from "@/lib/site"

export type CaseStudyMetric = {
  label: string
  before: string
  after: string
}

export type CaseStudyAsset = {
  slug: string
  client: string
  lastUpdated: string
  lastUpdatedIso: string
  pillar: string
  domain: "Infrastructure Resilience" | "AI-Search Sovereignty" | "Conversion Engineering"
  institutionalDomain: string
  status: string
  technicalImpact: string
  locationSignal: string
  shortBrief: string
  assetClass: string
  externalUrl?: string
  vulnerabilities: string[]
  framework: string[]
  evidence: CaseStudyMetric[]
  beforeAfter: {
    before: string
    after: string
  }
  briefingSummary: string
}

export const caseStudies: CaseStudyAsset[] = [
  {
    slug: "smokey-oud",
    client: "Smokey Oud",
    lastUpdated: "June 28, 2026",
    lastUpdatedIso: "2026-06-28",
    pillar: "Fragrance / Luxury",
    domain: "AI-Search Sovereignty",
    institutionalDomain: "Sovereign Luxury E-commerce",
    status: "Sovereign Architecture",
    technicalImpact: "Restoring AI-citation authority for a luxury fragrance maison.",
    locationSignal: "Dubai luxury fragrance e-commerce serving UAE and GCC buyers",
    shortBrief:
      "A technical briefing on moving a fragrance brand from a generic Shopify presentation into a structured commerce asset built for AI discovery, mobile conversion, and GCC trust signals.",
    assetClass: "Fragrance commerce infrastructure",
    vulnerabilities: [
      "Generic theme patterns weakened product differentiation, entity clarity, and crawlable fragrance taxonomy.",
      "Product storytelling was visually premium but too thin for answer engines comparing Dubai perfume brands.",
      "Mobile purchase paths carried avoidable friction for WhatsApp-led UAE buying behaviour.",
    ],
    framework: [
      "Rebuilt the storefront around a custom-engineered product architecture with clearer collection hierarchy and fragrance note semantics.",
      "Added AI-readable answer blocks, structured product context, and Dubai/GCC trust signals for generative search retrieval.",
      "Stabilized mobile commerce flows with sharper above-fold product signals, premium proof, and WhatsApp-ready inquiry paths.",
    ],
    evidence: [
      { label: "AI discovery signal", before: "Baseline", after: "Improved" },
    ],
    beforeAfter: {
      before:
        "Smokey Oud operated from a generic Shopify theme that made the brand look interchangeable to crawlers, AI answer systems, and high-intent UAE fragrance buyers.",
      after:
        "Vista by Lara shifted the experience into a custom-engineered stack with stronger collection logic and richer semantic product signals.",
    },
    briefingSummary:
      "Smokey Oud became a sovereign luxury e-commerce asset with clearer product intelligence, stronger mobile buying paths, and better machine-readable evidence for Dubai fragrance discovery.",
  },
  {
    slug: "musk-al-khulood",
    client: "Musk Al Khulood",
    lastUpdated: "June 28, 2026",
    lastUpdatedIso: "2026-06-28",
    pillar: "Fragrance / Luxury",
    domain: "AI-Search Sovereignty",
    institutionalDomain: "Sovereign Luxury E-commerce",
    status: "AI-Citation Rebuilt",
    technicalImpact: "Reclassifying a heritage scent catalogue for AI-search visibility.",
    locationSignal: "UAE fragrance retail with Arabic and English buyer intent",
    shortBrief:
      "A fragrance catalogue architecture focused on clearer entity signals, bilingual discovery context, and premium product trust for UAE buyers.",
    assetClass: "Luxury catalogue infrastructure",
    vulnerabilities: [
      "Scent families, ingredients, and collection intent were not structured for machine interpretation.",
      "Arabic and English search intent lacked a consistent taxonomy across product paths.",
      "The interface did not surface enough proof for luxury buyers comparing UAE fragrance houses.",
    ],
    framework: [
      "Mapped scent families into direct-answer product groupings that support English and Arabic discovery.",
      "Structured category pages around buyer questions, gifting intent, and GCC fragrance preferences.",
      "Aligned premium UI hierarchy with crawlable product evidence and conversion-ready WhatsApp routes.",
    ],
    evidence: [
      { label: "Catalogue clarity", before: "Unmapped", after: "Indexed" },
    ],
    beforeAfter: {
      before:
        "The catalogue depended on visual browsing, leaving AI systems with weak context about scent families, use cases, and UAE purchase intent.",
      after:
        "The rebuilt architecture gave each category a clearer technical role, making the brand easier to classify, cite, and convert from mobile research.",
    },
    briefingSummary:
      "The engagement turned a luxury fragrance catalogue into a structured discovery asset for UAE search, answer engines, and WhatsApp-led conversion.",
  },
  {
    slug: "provance",
    client: "Provance",
    lastUpdated: "June 28, 2026",
    lastUpdatedIso: "2026-06-28",
    pillar: "Design & Interiors",
    domain: "Conversion Engineering",
    institutionalDomain: "Precision Asset & Virtual Showroom Engineering",
    status: "Virtual Showroom Engineered",
    technicalImpact: "Turning interior design browsing into a high-intent showroom system.",
    locationSignal: "Dubai interiors and premium home buyers",
    shortBrief:
      "A showroom architecture report for improving visual inspection, product confidence, and inquiry quality for UAE interiors buyers.",
    assetClass: "Virtual showroom infrastructure",
    vulnerabilities: [
      "Interior buyers need material, scale, mood, and availability context before inquiry.",
      "Gallery-led browsing created weak conversion signals and limited AI-readable product meaning.",
      "Premium imagery required stronger technical framing to support high-ticket decisions.",
    ],
    framework: [
      "Structured showroom modules around room intent, collection logic, and buyer decision criteria.",
      "Added direct-answer content for material, usage, delivery, and UAE interior planning queries.",
      "Connected visual assets to inquiry architecture so high-ticket interest becomes traceable.",
    ],
    evidence: [
      { label: "Showroom clarity", before: "Gallery", after: "System" },
    ],
    beforeAfter: {
      before:
        "The experience showed premium interiors but did not behave like a structured digital showroom for Dubai buyers.",
      after:
        "Vista by Lara engineered a clearer inspection path with room logic, product context, and high-intent inquiry triggers.",
    },
    briefingSummary:
      "Provance became a virtual showroom asset where imagery, technical content, and conversion routes support premium interior decisions.",
  },
  {
    slug: "inside-home-studio",
    client: "Inside Home Studio",
    lastUpdated: "June 28, 2026",
    lastUpdatedIso: "2026-06-28",
    pillar: "Design & Interiors",
    domain: "Infrastructure Resilience",
    institutionalDomain: "Precision Asset & Virtual Showroom Engineering",
    status: "Experience Stabilized",
    technicalImpact: "Stabilizing a premium interiors presence for consultative project inquiries.",
    locationSignal: "UAE interior studio and high-end residential projects",
    shortBrief:
      "A technical briefing for an interiors studio requiring stronger service architecture, evidence clarity, and qualified consultation paths.",
    assetClass: "Interior studio authority system",
    vulnerabilities: [
      "The studio's service scope needed clearer separation between design, sourcing, and execution.",
      "Visual proof assets required stronger context to support trust before a consultation.",
      "Search and AI systems needed more structured evidence about location, audience, and project type.",
    ],
    framework: [
      "Rebuilt service hierarchy around client intent, project stage, and UAE residential expectations.",
      "Created evidence modules that connect visual proof to technical scope and decision criteria.",
      "Strengthened local authority with Dubai/UAE entity signals and direct-answer service copy.",
    ],
    evidence: [
      { label: "Service architecture", before: "Blended", after: "Segmented" },
    ],
    beforeAfter: {
      before:
        "The site communicated taste, but not enough operational clarity for high-value clients choosing an interiors partner.",
      after:
        "The new architecture clarified services, proof, and next steps so buyers can evaluate the studio with less friction.",
    },
    briefingSummary:
      "Inside Home Studio is structured as a precision showroom and authority asset for premium UAE interior projects.",
  },
  {
    slug: "wabel",
    client: "Wabel",
    lastUpdated: "June 28, 2026",
    lastUpdatedIso: "2026-06-28",
    pillar: "Real Estate",
    domain: "Conversion Engineering",
    institutionalDomain: "High-Ticket Conversion Architecture",
    status: "Lead Architecture Secured",
    technicalImpact: "Engineering high-ticket property inquiry paths for investor-grade decisions.",
    locationSignal: "Dubai real estate and investor conversion",
    shortBrief:
      "A real estate briefing on transforming property interest into qualified inquiry through stronger trust, location, and lead architecture.",
    assetClass: "Real estate conversion infrastructure",
    vulnerabilities: [
      "Property decisions require location, proof, investment logic, and inquiry speed in one path.",
      "Generic real estate layouts create weak differentiation in Dubai's hyper-competitive market.",
      "AI systems need district, offer, developer, and audience signals to recommend accurately.",
    ],
    framework: [
      "Structured the experience around investor questions, district context, and high-ticket trust signals.",
      "Connected property proof, availability cues, and WhatsApp lead capture into a single conversion system.",
      "Built AI-readable sections for Dubai real estate intent, buyer scenarios, and consultation routing.",
    ],
    evidence: [
      { label: "Lead path clarity", before: "Generic", after: "Investor-grade" },
    ],
    beforeAfter: {
      before:
        "The property experience relied on conventional showcase patterns that did not explain enough risk, context, or next-step value.",
      after:
        "Vista by Lara reframed the site as a high-ticket conversion asset with better investor logic and faster inquiry routes.",
    },
    briefingSummary:
      "Wabel gained a more disciplined conversion architecture for Dubai property buyers, investors, and high-value leads.",
  },
]

export const caseStudyDomains = ["Infrastructure Resilience", "AI-Search Sovereignty", "Conversion Engineering"] as const

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function getCaseStudyUrl(slug: string) {
  return `${siteConfig.url}/case-studies/${slug}`
}
