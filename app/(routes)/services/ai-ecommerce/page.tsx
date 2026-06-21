import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "AI E-commerce Services Dubai | Vista by Lara",
  description:
        "AI e-commerce services in Dubai for Shopify stores, product discovery, automation, SEO, AEO, GEO, and UAE conversion growth.",
}

export default function AiEcommercePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Service"
        title="AI E-commerce Services in Dubai"
        subtitle="AI-Driven E-commerce for Shopify and premium retail brands that need clearer merchandising, stronger conversion, and faster UAE growth."
        problem="Dubai e-commerce brands often have traffic but weak product discovery, generic content, and low checkout confidence. In luxury and retail categories, the gap is not only design; it is the missing logic between user intent, product data, persuasive content, and measurable conversion."
        solution="Vista by Lara maps the store like an input-output system. Inputs include product data, buyer objections, search intent, Shopify analytics, and UAE market signals. Outputs are clearer product journeys, AI-assisted content workflows, structured SEO, AEO-ready FAQs, and conversion paths built for WhatsApp, mobile, and AED purchase behaviour."
        outcome={{
          current: "Traffic lands on generic product pages with unclear hierarchy and weak AI/search signals.",
          goal: "Turn product discovery into a guided buying journey for Dubai and GCC shoppers.",
          result: "A sharper Shopify Optimization Dubai system with AI-Driven E-commerce workflows, richer content, and higher-intent conversion paths.",
        }}
        keywords={["AI-Driven E-commerce", "Shopify Optimization Dubai", "Dubai e-commerce growth", "Luxury Brand Strategy"]}
      />
      <SiteFooter />
    </div>
  )
}
