import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Fragrance Branding Dubai | Vista by Lara",
  description:
    "Fragrance branding and e-commerce website design in Dubai for perfume brands needing luxury identity, SEO, AEO, GEO, and UAE retail growth.",
  alternates: { canonical: `${siteConfig.url}/industries/fragrance` },
}

export default function FragrancePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Industry"
        title="Fragrance Branding and Websites in Dubai"
        subtitle="Luxury fragrance strategy, Shopify-ready storytelling, and AI-visible product journeys for UAE perfume brands."
        problem="Fragrance brands in Dubai often compete on visuals while under-explaining scent families, gifting logic, ingredients, occasions, and brand story. That creates low conversion rates in the luxury fragrance market, especially when shoppers cannot smell the product before buying."
        solution="Vista by Lara translates fragrance into a digital decision system. Inputs include scent notes, buyer persona, gifting context, Arabic-English search terms, product margins, and retail channels. Outputs are Luxury Brand Strategy, product storytelling, Shopify Optimization Dubai, AI-Driven E-commerce content, and SEO/AEO pages that make the collection easier to understand and buy."
        outcome={{
          current: "Beautiful perfume products are presented with thin copy, weak product discovery, and generic e-commerce flow.",
          goal: "Make scent, emotion, occasion, and trust clear enough for Dubai shoppers to purchase online.",
          result: "A premium fragrance digital system that strengthens brand memory, product confidence, and AI/search recommendation potential.",
        }}
        keywords={["fragrance branding Dubai", "Luxury Brand Strategy", "Shopify Optimization Dubai", "AI-Driven E-commerce"]}
      />
      <SiteFooter />
    </div>
  )
}
