import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Web Development Dubai | Website Development UAE",
  description:
    "Web development in Dubai for fast websites, portals, dashboards, and scalable platforms. Vista by Lara builds responsive UAE digital products.",
  keywords: [
    "web development Dubai",
    "website development UAE",
    "Next.js development Dubai",
    "React development UAE",
    "custom website development Dubai",
    "web developers GCC",
    "تطوير مواقع دبي",
    "برمجة مواقع الإمارات",
    "شركة تطوير مواقع دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/web-development-dubai" },
  openGraph: {
    title: "Web Development Dubai | Vista by Lara",
    description: "Full-stack website development for Dubai and UAE businesses.",
    url: "https://www.vistabylara.com/services/web-development-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/development.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Dubai | Vista by Lara",
    description: "Fast, scalable website development for UAE and GCC brands.",
    images: ["https://www.vistabylara.com/og/development.jpg"],
  },
}

export default function WebDevelopmentDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Development service"
        title="Web Development Dubai"
        subtitle="Fast, scalable website development for Dubai businesses, premium brands, and GCC platforms."
        intro="Vista by Lara develops responsive websites and custom digital platforms for Dubai businesses that need speed, stability, SEO readiness, and scalable technical foundations. We build with modern frameworks, structured content, and production-focused QA."
        slug="web-development-dubai"
        serviceName="Web Development Dubai"
        serviceType="Website Development and Engineering"
        keywords={["web development Dubai", "website development UAE", "Next.js Dubai", "React developer UAE", "custom web development Dubai", "full stack development GCC", "تطوير مواقع دبي", "برمجة مواقع الإمارات", "شركة تطوير مواقع دبي"]}
        deliverables={[
          "Next.js and React website development",
          "CMS-driven marketing sites and landing pages",
          "Custom dashboards, portals, and API integrations",
          "Performance, accessibility, and Core Web Vitals optimization",
          "Vercel deployment, QA, and post-launch support",
        ]}
        process={[
          "Audit design files, integrations, hosting, and content requirements",
          "Define component architecture, routes, metadata, and CMS needs",
          "Develop responsive pages and reusable production components",
          "Run QA, build checks, performance review, and deployment",
        ]}
        outcomes={[
          "A faster website that supports SEO and paid traffic",
          "Cleaner code and scalable components for future growth",
          "Reliable deployment for Dubai and GCC campaigns",
        ]}
        districts={["Dubai Internet City", "Business Bay", "DIFC", "Dubai Silicon Oasis", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Bahrain"]}
        faqs={[
          {
            question: "Which web development technologies do you use?",
            answer:
              "Vista by Lara works with modern front-end and full-stack tools including Next.js, React, CMS integrations, APIs, and Vercel deployment workflows.",
          },
          {
            question: "Can you develop from our existing Figma design?",
            answer:
              "Yes. We can convert approved Figma designs into responsive production pages with reusable components and clean handoff.",
          },
          {
            question: "Do you optimize websites for speed?",
            answer:
              "Yes. We review page weight, responsive rendering, image handling, Core Web Vitals, and production build behavior.",
          },
          {
            question: "Can you build portals or dashboards?",
            answer:
              "Yes. We develop custom portals, dashboards, forms, account areas, and business workflows depending on the required integrations.",
          },
          {
            question: "Do you deploy the website?",
            answer:
              "Yes. We support production deployment, DNS coordination, build checks, and launch QA for Dubai and UAE businesses.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
