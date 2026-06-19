/**
 * Central site configuration.
 * Single source of truth for SEO, GEO (generative engine optimization),
 * and AEO (answer engine optimization) metadata across the app.
 */

export const siteConfig = {
  name: "Vista",
  legalName: "Vista Global",
  // Canonical production URL. Override via NEXT_PUBLIC_SITE_URL in your env.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista.global").replace(/\/$/, ""),
  shortDescription: "Global branding and UX design agency.",
  description:
    "Vista is a global branding and UX design agency. We build transformative digital experiences for the world's leading brands by blending strategy, design, engineering, and AI.",
  tagline: "Branding, UX & technology for the world's leading brands",
  email: "hello@vista.global",
  locale: "en_US",
  foundingYear: 2011,
  // Reachable from the same legal entity — strengthens entity recognition for GEO.
  sameAs: [
    "https://www.linkedin.com/company/vista-global",
    "https://www.instagram.com/vista.global",
    "https://twitter.com/vistaglobal",
    "https://dribbble.com/vista",
    "https://www.behance.net/vista",
  ],
  twitterHandle: "@vistaglobal",
  keywords: [
    "branding agency",
    "UX design agency",
    "product design agency",
    "digital design studio",
    "web design agency",
    "design and development agency",
    "generative AI design",
    "brand strategy",
    "design systems",
    "enterprise UX",
  ],
  ogImage: "/og-image.png",
} as const

export type SiteConfig = typeof siteConfig
