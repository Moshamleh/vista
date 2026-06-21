import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Web Design Dubai | Luxury Website Design UAE",
  description:
    "Premium web design in Dubai for UAE brands. Vista by Lara creates responsive, conversion-ready websites with SEO, AEO, and luxury UX.",
  keywords: [
    "web design Dubai",
    "website design Dubai",
    "luxury website design UAE",
    "responsive web design Dubai",
    "premium web agency UAE",
    "Dubai website designers",
    "تصميم مواقع دبي",
    "تصميم ويب الإمارات",
    "شركة تصميم مواقع دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/web-design-dubai" },
  openGraph: {
    title: "Web Design Dubai | Vista by Lara",
    description: "Responsive luxury website design for Dubai, UAE, and GCC brands.",
    url: "https://www.vistabylara.com/services/web-design-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Dubai | Vista by Lara",
    description: "Luxury responsive web design for UAE and GCC businesses.",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
}

export default function WebDesignDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Web design service"
        title="Web Design Dubai"
        subtitle="Responsive, premium website design for Dubai brands that need trust, speed, and conversion."
        intro="Vista by Lara designs high-end websites for Dubai and UAE businesses that need premium presentation, clear messaging, mobile-first layouts, and strong conversion paths. Each page is planned for SEO, AEO, GEO, and WhatsApp-led inquiry behavior."
        slug="web-design-dubai"
        serviceName="Web Design Dubai"
        serviceType="Website Design and UX"
        keywords={["web design Dubai", "website design UAE", "luxury website Dubai", "responsive web design UAE", "web agency Dubai", "premium website design GCC", "تصميم مواقع دبي", "تصميم ويب الإمارات", "شركة تصميم مواقع دبي"]}
        deliverables={[
          "Homepage and landing page design for UAE buyer intent",
          "Responsive layouts for mobile, tablet, and desktop",
          "Conversion sections, trust signals, and WhatsApp CTAs",
          "SEO-friendly headings, content blocks, and internal links",
          "Premium visual direction aligned with your brand identity",
        ]}
        process={[
          "Define website goals, audience, sitemap, and offer hierarchy",
          "Create wireframes and page structures for fast decision-making",
          "Design responsive UI with luxury spacing, typography, and motion guidance",
          "Prepare launch-ready sections for development and SEO implementation",
        ]}
        outcomes={[
          "A website that communicates value in the first screen",
          "Better mobile readability for UAE users",
          "Higher trust before a visitor clicks WhatsApp or email",
        ]}
        districts={["Downtown Dubai", "Business Bay", "DIFC", "Dubai Design District", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Qatar"]}
        faqs={[
          {
            question: "What does a web design agency in Dubai do?",
            answer:
              "A web design agency in Dubai plans the site structure, user experience, visual design, and conversion journey. Vista by Lara designs premium responsive websites for UAE and GCC brands.",
          },
          {
            question: "Do you design websites for mobile-first UAE users?",
            answer:
              "Yes. Every layout is designed for mobile-first behavior because UAE buyers often research and contact brands from smartphones.",
          },
          {
            question: "Can you design a luxury website without development?",
            answer:
              "Yes. We can deliver design-only Figma files, or continue into development with build-ready responsive specifications.",
          },
          {
            question: "Do web design pages include SEO structure?",
            answer:
              "Yes. We plan H1, H2, content sections, internal links, metadata, schema, and UAE keyword clusters before design is finalized.",
          },
          {
            question: "How do I start a web design project in Dubai?",
            answer:
              "Send your current website, offer, target audience, and timeline through the contact page or WhatsApp. We will recommend a focused web design scope.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
