/**
 * Central site configuration.
 * Single source of truth for SEO, GEO (generative engine optimization),
 * and AEO (answer engine optimization) metadata across the app.
 */

export const siteConfig = {
  name: "Vista by Lara",
  legalName: "Vista by Lara",
  founder: "Dr. Lara Eros Farbactian",
  url: "https://www.vistabylara.com",
  shortDescription: "Transformative Brands & Digital Experiences - UAE & GCC",
  description:
    "Vista by Lara is a Dubai-based luxury branding and UX design agency creating transformative digital experiences across the UAE and GCC.",
  tagline: "Transformative Brands & Digital Experiences - UAE & GCC",
  email: "solution@vistabylara.com",
  phone: "+971 50 799 4292",
  whatsapp: "https://vista-wa-nurture.vistabylara.workers.dev/wa/general",
  locale: "en_AE",
  foundingYear: 2020,
  teamSize: "10-49",
  pricing: "AED 350-550/hour, projects from AED 18,000",
  address: {
    locality: "Dubai",
    region: "Dubai",
    streetAddress: "Emirates Tower",
    country: "United Arab Emirates",
    countryCode: "AE",
  },
  areaServed: ["UAE", "Dubai", "Abu Dhabi", "Saudi Arabia", "Qatar", "Kuwait"],
  sameAs: [
    "https://www.instagram.com/vistabylara",
    "https://www.tiktok.com/@vistabylara",
    "https://www.linkedin.com/company/vistabylara",
    "https://www.behance.net/vistabylara",
  ],
  twitterHandle: "@vistabylara",
  keywords: [
    "branding agency Dubai",
    "luxury web design UAE",
    "digital product design Dubai",
    "generative AI solutions UAE",
    "full stack development Dubai",
    "UX UI design agency UAE",
    "high-end website design Dubai",
    "premium branding agency GCC",
    "ecommerce development Dubai",
  ],
  ogImage: "/og-image.png",
} as const

export type SiteConfig = typeof siteConfig

export const whatsappLinks = {
  branding: "https://vista-wa-nurture.vistabylara.workers.dev/wa/branding",
  websites: "https://vista-wa-nurture.vistabylara.workers.dev/wa/websites",
  "digital-products": "https://vista-wa-nurture.vistabylara.workers.dev/wa/digital-products",
  development: "https://vista-wa-nurture.vistabylara.workers.dev/wa/development",
  "generative-ai": "https://vista-wa-nurture.vistabylara.workers.dev/wa/generative-ai",
  general: "https://vista-wa-nurture.vistabylara.workers.dev/wa/general",
} as const

export type WhatsappLinkKey = keyof typeof whatsappLinks

export function getWhatsappLink(key?: string) {
  if (key && key in whatsappLinks) {
    return whatsappLinks[key as WhatsappLinkKey]
  }

  return whatsappLinks.general
}
