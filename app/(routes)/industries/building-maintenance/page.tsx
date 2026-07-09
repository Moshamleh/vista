import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Building Maintenance Marketing Dubai | Vista by Lara",
  description:
    "Building maintenance website design and digital marketing in Dubai for UAE facility, maintenance, repair, and service companies.",
  alternates: { canonical: `${siteConfig.url}/industries/building-maintenance` },
}

export default function BuildingMaintenancePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Industry"
        title="Building Maintenance Marketing in Dubai"
        subtitle="Lead-generation websites, service architecture, and local search systems for UAE maintenance and facility companies."
        problem="Building maintenance companies in Dubai often rely on referrals while their websites fail to explain services, response areas, proof, pricing context, and emergency readiness. That weakens trust with property managers, landlords, and commercial clients."
        solution="Vista by Lara documents the service business like an operations connector. Inputs include service categories, response zones, property types, proof points, inquiry quality, and local SEO demand. Outputs are clear service pages, conversion CTAs, AEO FAQs, GEO-ready location content, and a website that turns maintenance searches into qualified leads."
        outcome={{
          current: "Maintenance services are listed generically, with low trust and limited local search coverage.",
          goal: "Make service scope, reliability, response areas, and inquiry paths clear for Dubai property clients.",
          result: "A maintenance marketing system that improves local visibility, lead quality, and client confidence.",
        }}
        keywords={["building maintenance marketing Dubai", "local SEO UAE", "facility management website", "AEO service pages"]}
      />
      <SiteFooter />
    </div>
  )
}
