import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Web Development Dubai | Full Stack Agency UAE",
  description:
    "Full-stack web development in Dubai for custom websites, platforms, portals, and scalable digital products across UAE and GCC markets.",
  keywords: [
    "web development Dubai",
    "full stack developer UAE",
    "custom web development Dubai",
    "Next.js development UAE",
    "React development Dubai",
    "software development GCC",
    "تطوير مواقع دبي",
    "برمجة تطبيقات الإمارات",
    "تطوير برمجيات دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/development" },
  openGraph: {
    title: "Web Development Dubai | Vista by Lara",
    description: "Full-stack development for custom platforms, websites, and scalable UAE digital products.",
    url: "https://www.vistabylara.com/services/development",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/development.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Dubai | Vista by Lara",
    description: "Full-stack web development for Dubai and UAE businesses.",
    images: ["https://www.vistabylara.com/og/development.jpg"],
  },
}

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Development service"
        title="Web Development Dubai"
        subtitle="Full-stack engineering for fast websites, custom platforms, portals, and scalable UAE products."
        intro="Vista by Lara builds full-stack digital platforms for Dubai businesses that need performance, reliability, responsive UX, and scalable technical foundations. We work across modern front-end, CMS, APIs, dashboards, and custom application workflows."
        slug="development"
        serviceName="Full-Stack Web Development"
        serviceType="Web Development and Engineering"
        keywords={["web development Dubai", "full stack development UAE", "Next.js Dubai", "React development UAE", "custom platform Dubai", "software development GCC", "تطوير مواقع دبي", "برمجة تطبيقات الإمارات", "تطوير برمجيات دبي"]}
        deliverables={[
          "Next.js, React, and modern front-end implementation",
          "CMS, API, booking, dashboard, and portal integrations",
          "Responsive UI development from approved design systems",
          "Performance optimization, accessibility, and deployment support",
          "Technical QA and scalable component architecture",
        ]}
        process={[
          "Audit requirements, integrations, hosting, and launch risks",
          "Plan architecture, data models, user flows, and release phases",
          "Build responsive components, pages, APIs, and CMS structures",
          "Test performance, accessibility, content, and production deployment",
        ]}
        outcomes={[
          "A stable codebase that can grow with your UAE business",
          "Faster user experiences across mobile and desktop",
          "Cleaner handoff between design, development, and marketing teams",
        ]}
        districts={["Dubai Internet City", "DIFC", "Business Bay", "Dubai Silicon Oasis", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Bahrain"]}
        faqs={[
          {
            question: "What web development services do you offer in Dubai?",
            answer:
              "We build websites, portals, dashboards, custom platforms, CMS systems, APIs, and responsive front-end experiences for UAE and GCC companies.",
          },
          {
            question: "Do you develop Next.js websites?",
            answer:
              "Yes. Vista by Lara develops Next.js websites and applications with responsive components, structured metadata, and production deployment support.",
          },
          {
            question: "Can you work with an existing design?",
            answer:
              "Yes. We can develop from existing Figma designs, audit the system, and convert approved screens into responsive production components.",
          },
          {
            question: "Do you handle deployment?",
            answer:
              "Yes. We support deployment on Vercel and suitable hosting environments, including launch QA and production checks.",
          },
          {
            question: "Is this suitable for enterprise projects?",
            answer:
              "Yes. We can structure phased builds, role-based dashboards, scalable code, and integration planning for larger UAE and GCC organizations.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
