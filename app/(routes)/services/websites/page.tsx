import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Luxury Website Design Dubai | Web Design Agency UAE",
  description:
    "Luxury website design in Dubai for premium UAE brands. Vista by Lara builds fast, responsive, conversion-ready websites for GCC growth.",
  keywords: [
    "website design Dubai",
    "luxury web design UAE",
    "premium website agency Dubai",
    "web design GCC",
    "bespoke website Dubai",
    "high-end web design UAE",
    "تصميم مواقع دبي",
    "موقع الكتروني الإمارات",
    "تصميم ويب احترافي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/websites" },
  openGraph: {
    title: "Luxury Website Design Dubai | Vista by Lara",
    description: "Premium, responsive, conversion-ready websites for Dubai and UAE businesses.",
    url: "https://www.vistabylara.com/services/websites",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Website Design Dubai | Vista by Lara",
    description: "Premium web design for Dubai, UAE, and GCC brands.",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
}

export default function WebsitesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Website service"
        title="Luxury Website Design Dubai"
        subtitle="Premium websites built for trust, speed, search visibility, and UAE conversion behavior."
        intro="Vista by Lara designs luxury websites for Dubai and UAE businesses that need premium presentation, fast performance, mobile-first UX, and conversion-ready content. Each website is structured for SEO, AEO, GEO, and clear inquiry paths."
        slug="websites"
        serviceName="Luxury Website Design"
        serviceType="Website Design and Conversion UX"
        keywords={["website design Dubai", "luxury web design UAE", "premium website Dubai", "SEO website UAE", "conversion website Dubai", "web design GCC", "تصميم مواقع دبي", "موقع الكتروني الإمارات", "تصميم ويب احترافي"]}
        deliverables={[
          "Responsive website design for desktop, tablet, and mobile",
          "SEO page structure, metadata, schema, and internal links",
          "Conversion-focused sections, CTAs, and WhatsApp paths",
          "Premium visual design aligned with luxury UAE expectations",
          "Developer-ready layouts for Next.js, Webflow, or custom builds",
        ]}
        process={[
          "Define sitemap, buyer journey, SEO goals, and content hierarchy",
          "Design high-fidelity pages with mobile-first responsive behavior",
          "Prepare content blocks, schema, and technical performance guidance",
          "Support launch review, QA, and post-launch improvements",
        ]}
        outcomes={[
          "A high-trust website that explains your offer quickly",
          "Better search and AI answer readiness for Dubai queries",
          "More qualified inquiries from mobile and WhatsApp users",
        ]}
        districts={["Downtown Dubai", "Jumeirah", "Business Bay", "DIFC", "Dubai Design District", "Abu Dhabi", "RAK", "Oman"]}
        faqs={[
          {
            question: "What makes a luxury website work in Dubai?",
            answer:
              "A luxury website in Dubai must feel premium, load quickly, explain the offer clearly, and create trust before the user contacts the business.",
          },
          {
            question: "Do you include SEO in website design?",
            answer:
              "Yes. We plan metadata, headings, schema, internal links, content hierarchy, and mobile readability for Dubai and UAE search intent.",
          },
          {
            question: "Can you redesign an existing website?",
            answer:
              "Yes. We audit the current site, identify conversion and SEO gaps, then redesign the experience around better structure, trust, and performance.",
          },
          {
            question: "Do you design Arabic or bilingual websites?",
            answer:
              "Yes. We can plan bilingual English and Arabic structures with en-AE and ar-AE considerations when the business needs local audience coverage.",
          },
          {
            question: "How do website projects start?",
            answer:
              "Send your current website, target audience, services, and launch timeline. We will recommend the right sitemap and website scope.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
