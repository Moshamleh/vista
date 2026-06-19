/**
 * Central site configuration.
 * Single source of truth for SEO, GEO (generative engine optimization),
 * and AEO (answer engine optimization) metadata across the app.
 */

export const siteConfig = {
  name: "Vista by Lara",
  legalName: "Vista by Lara",
  founder: "Dr. Lara Eros Farbactian",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vistabylara.com").replace(/\/$/, ""),
  shortDescription: "Dubai-based AEO, Shopify, and lead generation agency for UAE businesses.",
  description:
    "Vista by Lara is a Dubai-based digital growth agency specializing in AEO, Shopify ecommerce development, SEO, GEO, and lead generation for UAE businesses.",
  tagline: "AEO, Shopify and lead generation for UAE brands",
  email: "solution@vistabylara.com",
  phone: "+971 50 799 4292",
  locale: "en_AE",
  foundingYear: 2020,
  teamSize: "10-49",
  pricing: "$100-$149/hour, projects from $5,000",
  address: {
    locality: "Dubai",
    region: "Dubai",
    streetAddress: "Emirates Tower",
    country: "United Arab Emirates",
    countryCode: "AE",
  },
  areaServed: ["United Arab Emirates", "Dubai", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Qatar", "Kuwait"],
  sameAs: [
    "https://www.instagram.com/vistabylara",
    "https://vistabylara.com",
  ],
  twitterHandle: "@vistabylara",
  keywords: [
    "AEO agency Dubai",
    "Answer Engine Optimization Dubai",
    "AI search optimization UAE",
    "Shopify development Dubai",
    "Shopify agency UAE",
    "lead generation agency Dubai",
    "GEO agency Dubai",
    "Generative Engine Optimization UAE",
    "SEO agency Dubai",
    "Google Business Profile optimization Dubai",
    "Arabic English content strategy UAE",
    "medical clinic lead generation Dubai",
    "fashion ecommerce agency UAE",
    "interior design marketing Dubai",
  ],
  ogImage: "/og-image.png",
} as const

export type SiteConfig = typeof siteConfig
