import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Retail Branding and Website Design Dubai | Vista by Lara",
  description:
    "Retail branding, e-commerce, website design, SEO, AEO, GEO, and conversion UX for Dubai and UAE retail brands.",
}

export default function RetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Industry"
        title="Retail Branding and Website Design in Dubai"
        subtitle="Retail strategy, e-commerce UX, and search-ready content for UAE brands competing across store, social, and Shopify channels."
        problem="Retail brands in Dubai lose revenue when their store experience, website, product content, and marketing channels feel disconnected. Customers compare quickly, and weak digital merchandising makes premium products look ordinary."
        solution="Vista by Lara designs retail growth as a connected funnel. Inputs include product categories, customer objections, campaign traffic, store positioning, and UAE shopping behaviour. Outputs are Luxury Brand Strategy, Shopify Optimization Dubai, AI-Driven E-commerce flows, and SEO/AEO content that supports both discovery and purchase intent."
        outcome={{
          current: "Retail products exist across shelves, posts, and pages without one clear conversion architecture.",
          goal: "Connect product storytelling, search visibility, and purchase journeys across Dubai retail touchpoints.",
          result: "A retail digital system that makes the brand easier to choose online, in-store, and through AI-assisted search.",
        }}
        keywords={["retail branding Dubai", "Shopify Optimization Dubai", "AI-Driven E-commerce", "Luxury Brand Strategy"]}
      />
      <SiteFooter />
    </div>
  )
}
