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
  shortDescription: "Dubai-based branding and UX design agency serving the UAE and GCC.",
  description:
    "Vista is a Dubai-based branding and UX design agency. We build transformative digital experiences for ambitious businesses across the UAE, Saudi Arabia, and the wider GCC by blending strategy, design, engineering, and AI.",
  tagline: "Branding, UX & technology for the region's most ambitious brands",
  email: "hello@vista.global",
  locale: "en_AE",
  foundingYear: 2011,
  // Primary studio location — strengthens local SEO and entity recognition.
  address: {
    locality: "Dubai",
    region: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
  },
  // Markets served, used for areaServed in structured data.
  areaServed: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
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
    "branding agency Dubai",
    "UX design agency UAE",
    "web design agency Dubai",
    "product design agency UAE",
    "digital agency Abu Dhabi",
    "design and development agency GCC",
    "brand strategy Dubai",
    "design systems",
    "generative AI design",
    "Saudi Arabia design agency",
  ],
  ogImage: "/og-image.png",
} as const

export type SiteConfig = typeof siteConfig
