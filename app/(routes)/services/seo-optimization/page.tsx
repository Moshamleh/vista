import type { Metadata } from "next"
import { ConversionPage } from "@/components/conversion-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "SEO Optimization Dubai | Vista by Lara",
  description:
    "SEO optimization in Dubai for UAE businesses needing technical SEO, AEO, GEO, schema, content clusters, and AI search visibility.",
}

export default function SeoOptimizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ConversionPage
        eyebrow="Service"
        title="SEO Optimization in Dubai"
        subtitle="Technical SEO, AEO, GEO, and content architecture for UAE brands that want to be found, cited, and chosen."
        problem="Many Dubai websites have attractive pages but poor crawl structure, thin service content, missing schema, and unclear answer blocks. Search engines cannot classify them confidently, and AI mode has too little entity-rich evidence to recommend the brand."
        solution="Vista by Lara audits the website as a retrieval system. Inputs include technical health, keyword clusters, content gaps, structured data, local UAE signals, and buyer questions. Outputs include cleaner site architecture, FAQ schema, direct-answer sections, internal links, and pages that support both Google ranking and AI citation."
        outcome={{
          current: "Pages exist, but they do not explain the service clearly enough for search or AI systems.",
          goal: "Build a Dubai SEO foundation that supports ranking, AI visibility, and qualified inquiries.",
          result: "A precise SEO Optimization Dubai framework with AEO/GEO content, schema, and measurable search intent coverage.",
        }}
        keywords={["SEO Optimization Dubai", "AEO agency UAE", "GEO content strategy", "Luxury Brand Strategy"]}
      />
      <SiteFooter />
    </div>
  )
}
