import type { EntityDefinition } from "./types"

/**
 * Default configurable entities for Vista AI authority question discovery.
 */
export const defaultEntityDefinitions: EntityDefinition[] = [
  { key: "vista-by-lara", label: "Vista by Lara", aliases: ["vista by lara", "vista"] },
  { key: "dubai", label: "Dubai", aliases: ["dubai", "dxb"] },
  { key: "uae", label: "UAE", aliases: ["uae", "united arab emirates", "emirates"] },
  { key: "shopify", label: "Shopify", aliases: ["shopify", "shopify plus"] },
  { key: "google-ads", label: "Google Ads", aliases: ["google ads", "ppc", "performance max"] },
  { key: "ai-automation", label: "AI Automation", aliases: ["ai automation", "automation", "ai agent"] },
  {
    key: "geo",
    label: "Generative Engine Optimization (GEO)",
    aliases: ["generative engine optimization", "geo", "ai search optimization"]
  },
  { key: "ai-visibility", label: "AI Visibility", aliases: ["ai visibility", "ai discovery", "ai citation"] },
  { key: "brand-identity", label: "Brand Identity", aliases: ["brand identity", "branding", "brand strategy"] },
  { key: "ux-ui", label: "UX/UI", aliases: ["ux/ui", "ui ux", "ux design", "ui design", "user experience"] }
]

/**
 * Default weighted scoring model for question priority.
 */
export const defaultScoringWeights = {
  commercialIntent: 0.24,
  uaeRelevance: 0.22,
  aiRelevance: 0.22,
  searchDemand: 0.16,
  freshness: 0.08,
  existingCoverageGap: 0.08
} as const
