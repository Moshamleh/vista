import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Website Maintenance Management Dubai | Vista by Lara",
  description:
    "Website maintenance management in Dubai for UAE brands needing updates, monitoring, technical support, SEO health, and conversion reliability.",
}

export default function MaintenanceManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Service"
        title="Website Maintenance Management in Dubai"
        subtitle="Post-launch website management for UAE brands that need stable performance, SEO health, and reliable digital operations."
        problem="Websites often decline after launch because content, plugins, analytics, schema, speed, and conversion paths are not maintained. For UAE service and e-commerce brands, that means lost trust, broken inquiries, weaker rankings, and slower response to market changes."
        solution="Vista by Lara treats maintenance as an operational loop. Inputs include performance data, content requests, SEO health, technical updates, and conversion issues. Outputs are controlled releases, monitored fixes, updated landing pages, schema hygiene, and a site that keeps supporting revenue instead of becoming static."
        outcome={{
          current: "The website is live but unmanaged, with outdated content and invisible technical risk.",
          goal: "Keep the website fast, credible, searchable, and conversion-ready after launch.",
          result: "A maintenance management system that protects SEO equity, brand trust, and lead flow for Dubai businesses.",
        }}
        keywords={["website maintenance Dubai", "SEO health UAE", "Shopify Optimization Dubai", "Luxury Brand Strategy"]}
      />
      <SiteFooter />
    </div>
  )
}
