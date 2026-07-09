import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Digital Marketing Dubai | Vista by Lara",
  description:
    "Digital marketing services in Dubai for premium UAE brands needing strategy, content, SEO, AEO, GEO, websites, and conversion growth.",
  alternates: { canonical: `${siteConfig.url}/services/digital-marketing` },
}

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Service"
        title="Digital Marketing in Dubai"
        subtitle="Performance-aware digital marketing for premium UAE brands that need visibility, authority, and qualified client demand."
        problem="A luxury brand can publish constantly and still fail to convert if campaigns, landing pages, search content, and sales follow-up are disconnected. The pain point is not volume; it is the lack of a precise system that turns attention into qualified UAE inquiries."
        solution="Vista by Lara connects creative, SEO, AEO, GEO, and conversion UX into one operating model. Inputs include audience intent, offer clarity, channel data, UAE seasonality, and brand positioning. Outputs are campaign pages, content clusters, AI-search signals, and contact paths that guide serious buyers to act."
        outcome={{
          current: "Marketing activity is active but fragmented across social, website, search, and sales channels.",
          goal: "Create one conversion system that makes the brand easier to discover and easier to contact.",
          result: "A sophisticated Dubai digital marketing engine with Luxury Brand Strategy, AI visibility, and clearer lead quality.",
        }}
        keywords={["digital marketing Dubai", "Luxury Brand Strategy", "AI-Driven E-commerce", "AEO content UAE"]}
      />
      <SiteFooter />
    </div>
  )
}
