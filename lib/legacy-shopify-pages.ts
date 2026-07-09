import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"

export type LegacyPageKind = "article" | "service" | "product" | "collection" | "landing"

export type LegacyShopifyPage = {
  path: string
  title: string
  metaTitle: string
  description: string
  kind: LegacyPageKind
  category: string
  date: string
  primaryKeyword: string
  location: string
  audience: string
  offer: string
  outcome: string
  ctaLabel: string
  related: { label: string; href: string }[]
  sections: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
}

const defaultRelated = [
  { label: "AI Search Authority Engineering", href: "/ai-search-authority-engineering" },
  { label: "SEO, AEO, and GEO Services", href: "/services/seo-optimization" },
  { label: "Shopify Development Dubai", href: "/services/shopify-development-dubai" },
  { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
]

function page(
  path: string,
  title: string,
  primaryKeyword: string,
  category: string,
  date: string,
  options: Partial<Omit<LegacyShopifyPage, "path" | "title" | "primaryKeyword" | "category" | "date">> = {},
): LegacyShopifyPage {
  const location = options.location ?? "Dubai and UAE"
  const offer = options.offer ?? "AI-readable growth infrastructure"
  const audience = options.audience ?? "UAE and GCC founders, principals, and growth teams"
  const outcome = options.outcome ?? "clearer search visibility, stronger AI recommendation readiness, and more qualified enquiries"
  const kind = options.kind ?? "article"
  const description =
    options.description ??
    `${title} explains ${primaryKeyword} for ${location} businesses with Vista by Lara's SEO, AEO, GEO, structured data, and WhatsApp-ready conversion approach.`

  return {
    path,
    title,
    metaTitle: options.metaTitle ?? `${primaryKeyword} | Vista by Lara UAE`,
    description,
    kind,
    category,
    date,
    primaryKeyword,
    location,
    audience,
    offer,
    outcome,
    ctaLabel: options.ctaLabel ?? "Start on WhatsApp",
    related: options.related ?? defaultRelated,
    sections:
      options.sections ?? [
        {
          title: `What is ${primaryKeyword} for ${location}?`,
          body: `${primaryKeyword} is a practical growth system for ${audience}. Vista by Lara connects content, technical SEO, structured data, local UAE trust signals, and conversion routing so the page can be read by Google and AI answer systems.`,
        },
        {
          title: "Why this legacy page is restored",
          body: "This URL existed on the previous Shopify website and had crawl history. The new Vista site restores it as a live, crawlable resource so search engines can resolve the old indexed path instead of reaching an error.",
        },
        {
          title: "How Vista connects the page to the new platform",
          body: `The page links into Vista's current service graph, AI knowledge hub, sitemap, and WhatsApp briefing path. That keeps old crawl equity connected to the new Next.js website architecture.`,
        },
      ],
    faqs:
      options.faqs ?? [
        {
          question: `Is this old Shopify URL still available on Vista by Lara?`,
          answer: "Yes. Vista by Lara restored this legacy URL as a live page on the new website so Google can crawl a valid resource instead of an error.",
        },
        {
          question: `What should this page rank for in the UAE?`,
          answer: `The page targets ${primaryKeyword}, supported by Dubai, UAE, GCC, AEO, GEO, and AI visibility signals.`,
        },
        {
          question: "Does the page include a conversion path?",
          answer: "Yes. The page routes qualified visitors to WhatsApp and relevant Vista service pages for a technical briefing.",
        },
        {
          question: "Is the page blocked by robots.txt?",
          answer: "No. Vista's current robots policy allows public pages and references the sitemap for crawler discovery.",
        },
        {
          question: "How does this help Search Console errors?",
          answer: "A valid 200 page gives Google a crawlable replacement for the old indexed URL and reduces not-found migration issues over time.",
        },
      ],
  }
}

export const legacyShopifyPages: LegacyShopifyPage[] = [
  page("/blogs/insights/ai-video-generators-compared-runway-luma-pika", "AI Video Generators Compared: Runway, Luma, and Pika", "AI video generators UAE", "AI Content Systems", "June 18, 2026", {
    audience: "Dubai brands comparing AI video tools for content, product launches, and paid social campaigns",
    offer: "AI video workflow selection and campaign infrastructure",
    outcome: "faster content testing with clearer governance, brand quality, and tracking",
  }),
  page("/blogs/guides/web-design-company-dubai-2025-build-a-powerful-digital-presence-with-vista-by-lara", "Web Design Company Dubai 2025: Build a Powerful Digital Presence", "web design company Dubai", "Web Design Dubai", "June 12, 2026", {
    kind: "article",
    related: [
      { label: "Web Design Dubai", href: "/services/web-design-dubai" },
      { label: "Web Development Dubai", href: "/services/web-development-dubai" },
      { label: "High Performance Web Development UAE", href: "/blog/high-performance-web-development-uae" },
      { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
    ],
  }),
  page("/blogs/insights/uae-google-meta-ads-losing-money-high-season-ai-closer", "Why UAE Google and Meta Ads Lose Money in High Season Without an AI Closer", "Google Meta ads UAE", "Paid Media Systems", "June 11, 2026", {
    related: [
      { label: "Google Ads Dubai", href: "/services/google-ads-dubai" },
      { label: "Meta Ads Dubai", href: "/services/meta-ads-dubai" },
      { label: "AI Agents UAE", href: "/services/uae-ai-agent" },
      { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
    ],
  }),
  page("/blogs/ai-trends-for-business/geo-mistakes-why-most-uae-brands-are-not-recommended-by-ai", "GEO Mistakes: Why Most UAE Brands Are Not Recommended by AI", "GEO mistakes UAE", "AI Trends for Business", "June 10, 2026"),
  page("/blogs/insights/spotify-advertising-for-uae-shopify-brands-costs-formats-ga4-tracking-2025", "Spotify Advertising for UAE Shopify Brands: Costs, Formats, and GA4 Tracking", "Spotify advertising UAE Shopify", "Retail Media", "June 10, 2026"),
  page("/blogs/ai-trends-for-business/why-generative-engine-optimization-geo-replaces-seo-for-uae-businesses-in-2026", "Why Generative Engine Optimization Replaces SEO for UAE Businesses in 2026", "generative engine optimization UAE", "AI Trends for Business", "June 9, 2026"),
  page("/collections/shopify-services-uae/partner", "Shopify Services UAE Partner", "Shopify services UAE", "Shopify Services", "June 9, 2026", {
    kind: "collection",
    related: [
      { label: "Shopify Agency UAE", href: "/shopify-agency-uae" },
      { label: "Shopify Development Dubai", href: "/services/shopify-development-dubai" },
      { label: "Shopify SEO UAE", href: "/blog/advanced-shopify-seo-dominating-uae-search" },
      { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
    ],
  }),
  page("/pages/ai-promo-hub", "AI Promo Hub UAE", "AI promo hub UAE", "AI Campaign Systems", "June 8, 2026", { kind: "landing" }),
  page("/ar/products/analytics-marketing-qa-retainer-monthly", "Analytics and Marketing QA Retainer UAE", "analytics marketing QA retainer UAE", "Marketing Analytics", "June 8, 2026", { kind: "product" }),
  page("/ar/pages/ai-scent-studio-free-perfume-marketing-ai-uae", "AI Scent Studio: Free Perfume Marketing AI UAE", "perfume marketing AI UAE", "Fragrance AI Marketing", "June 8, 2026", { kind: "landing", related: [{ label: "Fragrance Industry", href: "/industries/fragrance" }, ...defaultRelated.slice(0, 3)] }),
  page("/blogs/offers-deals/new-year-offers-seasonal-promotions-for-uae-businesses-2025-2026", "New Year Offers and Seasonal Promotions for UAE Businesses 2025-2026", "seasonal promotions UAE businesses", "Offers and Campaigns", "June 8, 2026"),
  page("/blogs/google-ads/keyword-match-types-uae-guide-2025", "Keyword Match Types UAE Guide 2025", "keyword match types UAE", "Google Ads", "June 7, 2026", {
    related: [
      { label: "Google Ads Dubai", href: "/services/google-ads-dubai" },
      { label: "PPC Agency Dubai", href: "/services/ppc-agency-dubai" },
      { label: "Landing Page Optimization Dubai", href: "/services/landing-page-optimization-dubai" },
      { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
    ],
  }),
  page("/ar/products/website-seo-pro", "Website SEO Pro UAE", "website SEO pro UAE", "SEO Product", "June 7, 2026", { kind: "product" }),
  page("/ar-bh/products/interior-3d-design-cgi-uae", "Interior 3D Design CGI UAE", "interior 3D design CGI UAE", "3D Design", "June 7, 2026", { kind: "product", location: "Bahrain, Dubai, and UAE" }),
  page("/ar-om/products/website-seo-pro", "Website SEO Pro Oman and UAE", "website SEO pro Oman UAE", "SEO Product", "June 6, 2026", { kind: "product", location: "Oman, Dubai, and UAE" }),
  page("/ar-kw/products/website-launch-basic-uae", "Website Launch Basic UAE", "website launch basic UAE", "Website Product", "June 6, 2026", { kind: "product", location: "Kuwait, Dubai, and UAE" }),
  page("/products/arabic-seo-content-cluster-5-articles", "Arabic SEO Content Cluster: 5 Articles", "Arabic SEO content cluster UAE", "Arabic SEO", "June 6, 2026", { kind: "product", related: [{ label: "Arabic SEO Dubai", href: "/services/arabic-seo-dubai" }, ...defaultRelated.slice(0, 3)] }),
  page("/ar-bh/products/website-launch-basic-uae", "Website Launch Basic UAE for Bahrain", "website launch basic Bahrain UAE", "Website Product", "June 6, 2026", { kind: "product", location: "Bahrain, Dubai, and UAE" }),
  page("/ar/products/website-launch-basic-uae", "Website Launch Basic UAE", "website launch basic UAE", "Website Product", "June 5, 2026", { kind: "product" }),
  page("/products/analytics-marketing-qa-retainer-monthly", "Analytics and Marketing QA Retainer Monthly", "analytics marketing QA retainer UAE", "Marketing Analytics", "June 4, 2026", { kind: "product" }),
  page("/blogs/guides/ai-sales-agent-uae-not-just-chatbot-dubai", "AI Sales Agent UAE: Not Just a Chatbot in Dubai", "AI sales agent UAE", "AI Sales Agents", "June 3, 2026", { related: [{ label: "UAE AI Agent", href: "/services/uae-ai-agent" }, ...defaultRelated.slice(0, 3)] }),
  page("/products/website-seo-pro", "Website SEO Pro UAE", "website SEO pro UAE", "SEO Product", "June 3, 2026", { kind: "product" }),
  page("/blogs/guides/google-cloud-shopify-uae-ai-product-faq-conversion", "Google Cloud and Shopify UAE: AI Product FAQ Conversion", "Google Cloud Shopify UAE", "Shopify AI Systems", "June 2, 2026"),
  page("/ar/products/ai-analytics-insights-auto-reports", "AI Analytics Insights and Auto Reports", "AI analytics reports UAE", "AI Analytics", "June 2, 2026", { kind: "product" }),
  page("/ar/products/amazonae-store-setup-seo", "Amazon.ae Store Setup and SEO", "Amazon UAE store setup SEO", "Marketplace SEO", "June 1, 2026", { kind: "product" }),
  page("/blogs/insights/top-10-best-mobile-games-for-android-in-2025-ultimate-gaming-list-by-vista-by-lara", "Top 10 Best Mobile Games for Android in 2025", "mobile games Android 2025 UAE", "Digital Product Insights", "May 20, 2026", {
    audience: "UAE mobile-first brands studying app engagement, gaming UX, and retention patterns",
    offer: "mobile UX and digital product insight",
    outcome: "clearer mobile experience strategy for apps, campaigns, and digital products",
    related: [
      { label: "Digital Products", href: "/services/digital-products" },
      { label: "UX/UI Design Dubai", href: "/services/ui-ux-design-dubai" },
      { label: "Mobile App Development Dubai", href: "/services/mobile-app-development-dubai" },
      { label: "WhatsApp Technical Briefing", href: siteConfig.whatsapp },
    ],
  }),
  page("/blogs/insights/ai-whatsapp-payment-collections-uae-overdue-recovery", "AI WhatsApp Payment Collections UAE: Overdue Recovery", "AI WhatsApp payment collections UAE", "AI Payment Automation", "May 18, 2026", {
    audience: "UAE service businesses, retailers, clinics, and B2B teams handling overdue payment follow-up",
    offer: "AI WhatsApp payment collection workflow",
    outcome: "faster recovery conversations with clearer tracking and lower manual follow-up",
  }),
]

export const legacyShopifyPathSet = new Set(legacyShopifyPages.map((item) => item.path))

export function normalizeLegacyPath(path: string) {
  const cleanPath = path.split("?")[0].replace(/\/$/u, "")
  return cleanPath || "/"
}

export function getLegacyShopifyPage(path: string) {
  return legacyShopifyPages.find((item) => item.path === normalizeLegacyPath(path))
}

export function getLegacyShopifyMetadata(page: LegacyShopifyPage): Metadata {
  const canonical = `${siteConfig.url}${page.path}`
  return {
    title: page.metaTitle,
    description: page.description,
    keywords: [
      page.primaryKeyword,
      `${page.primaryKeyword} Dubai`,
      `${page.primaryKeyword} UAE`,
      "Vista by Lara",
      "AI visibility Dubai",
      "AEO UAE",
      "GEO Dubai",
    ],
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: canonical,
      type: page.kind === "article" ? "article" : "website",
      siteName: siteConfig.name,
      locale: "en_AE",
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [siteConfig.ogImage],
    },
  }
}
