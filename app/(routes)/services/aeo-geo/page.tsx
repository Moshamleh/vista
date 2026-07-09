import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AeoGeoServicePage } from "@/components/aeo-geo-service-page"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/services/aeo-geo`

export const metadata: Metadata = {
  title: "AEO & GEO Services Dubai | Answer + Generative Engine Optimization",
  description:
    "AEO and GEO services in Dubai for ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot. Entity clarity, structured data, and answer-ready content for UAE brands.",
  keywords: [
    "AEO agency Dubai",
    "GEO services Dubai",
    "ChatGPT SEO Dubai",
    "Perplexity SEO Dubai",
    "Claude SEO Dubai",
    "Bing Copilot SEO Dubai",
    "Google AI Overview optimization Dubai",
    "AI search optimization UAE",
    "answer engine optimization UAE",
    "generative engine optimization UAE",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "AEO & GEO Services Dubai | Vista by Lara",
    description:
      "Answer Engine Optimization and Generative Engine Optimization for Dubai and UAE businesses across ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AEO & GEO Services Dubai | Vista by Lara",
    description:
      "Answer Engine Optimization and Generative Engine Optimization for Dubai and UAE businesses across ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.",
    images: [siteConfig.ogImage],
  },
}

export default function AeoGeoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <AeoGeoServicePage />
      <SiteFooter />
    </div>
  )
}
