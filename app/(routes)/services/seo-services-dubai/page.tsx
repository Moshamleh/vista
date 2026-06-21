import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "SEO Services Dubai | SEO Agency UAE",
  description:
    "SEO services in Dubai for UAE brands. Vista by Lara builds technical SEO, content clusters, AEO, GEO, schema, and local search visibility.",
  keywords: [
    "SEO services Dubai",
    "SEO agency UAE",
    "technical SEO Dubai",
    "AEO services UAE",
    "GEO optimization Dubai",
    "local SEO Dubai",
    "خدمات سيو دبي",
    "تحسين محركات البحث الإمارات",
    "شركة سيو دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/seo-services-dubai" },
  openGraph: {
    title: "SEO Services Dubai | Vista by Lara",
    description: "Technical SEO, content clusters, AEO, GEO, schema, and UAE search visibility.",
    url: "https://www.vistabylara.com/services/seo-services-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services Dubai | Vista by Lara",
    description: "SEO, AEO, and GEO optimization for Dubai and UAE brands.",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
}

export default function SeoServicesDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="SEO service"
        title="SEO Services Dubai"
        subtitle="Technical SEO, AEO, GEO, schema, and content clusters for UAE search visibility."
        intro="Vista by Lara provides SEO services for Dubai businesses that need stronger Google visibility, AI answer visibility, technical structure, and conversion-ready content. We build UAE keyword clusters, schema, internal links, and pages designed for both search engines and answer engines."
        slug="seo-services-dubai"
        serviceName="SEO Services Dubai"
        serviceType="Search Engine Optimization, AEO, and GEO"
        keywords={["SEO services Dubai", "SEO agency UAE", "technical SEO Dubai", "AEO Dubai", "GEO optimization UAE", "local SEO Dubai", "خدمات سيو دبي", "تحسين محركات البحث الإمارات", "شركة سيو دبي"]}
        deliverables={[
          "Technical SEO audit, crawl checks, robots, sitemap, and metadata",
          "Dubai and UAE keyword clusters for service and location intent",
          "AEO FAQ sections and direct-answer content blocks",
          "GEO entity signals, schema, internal links, and topical authority maps",
          "Content briefs for service, industry, blog, and comparison pages",
        ]}
        process={[
          "Audit indexing, technical issues, content gaps, and competitor pages",
          "Map service, industry, location, and blog keyword clusters",
          "Optimize page structure, metadata, schema, headings, and internal links",
          "Track priority pages and expand topical authority over time",
        ]}
        outcomes={[
          "Cleaner indexing in Google Search Console",
          "More visibility for Dubai and UAE high-intent queries",
          "Better answer readiness for AI search systems",
        ]}
        districts={["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "Saudi Arabia", "Qatar", "Kuwait"]}
        faqs={[
          {
            question: "What are SEO services in Dubai?",
            answer:
              "SEO services in Dubai improve how a website is crawled, indexed, ranked, and understood for UAE search queries and commercial intent.",
          },
          {
            question: "What is AEO?",
            answer:
              "AEO means Answer Engine Optimization. It structures content so AI search and answer systems can extract direct, accurate answers.",
          },
          {
            question: "What is GEO?",
            answer:
              "GEO means Generative Engine Optimization. It improves entity clarity, authority, and citation readiness for AI-generated search results.",
          },
          {
            question: "Do you fix Google Search Console issues?",
            answer:
              "Yes. We review crawl, sitemap, indexing, robots, canonical, metadata, and page quality issues that affect Google visibility.",
          },
          {
            question: "How long does SEO take in the UAE?",
            answer:
              "Technical fixes can help quickly, while competitive Dubai rankings usually require ongoing content, authority, and optimization over several months.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
