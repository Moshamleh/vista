import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Digital Product Design Dubai | UX UI Agency UAE",
  description:
    "Digital product design in Dubai for apps, portals, SaaS, and platforms. Vista by Lara creates UX/UI systems for UAE and GCC users.",
  keywords: [
    "digital product design Dubai",
    "UX design UAE",
    "UI design agency Dubai",
    "app design GCC",
    "SaaS design Dubai",
    "product design agency UAE",
    "تصميم تطبيقات دبي",
    "تجربة المستخدم الإمارات",
    "تطوير منتجات رقمية",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/digital-products" },
  openGraph: {
    title: "Digital Product Design Dubai | Vista by Lara",
    description: "UX/UI design for apps, SaaS platforms, portals, and premium digital products in the UAE.",
    url: "https://www.vistabylara.com/services/digital-products",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/digital-products.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Product Design Dubai | Vista by Lara",
    description: "UX/UI design for apps, portals, SaaS, and digital platforms in Dubai.",
    images: ["https://www.vistabylara.com/og/digital-products.jpg"],
  },
}

export default function DigitalProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Product design service"
        title="Digital Product Design Dubai"
        subtitle="UX/UI design for apps, SaaS platforms, portals, and digital products built for UAE users."
        intro="Vista by Lara designs digital products for Dubai and GCC businesses that need clear user journeys, premium interfaces, and scalable design systems. We turn product ideas into validated UX, polished UI, and build-ready product experiences."
        slug="digital-products"
        serviceName="Digital Product Design"
        serviceType="UX/UI and Digital Product Design"
        keywords={["digital product design Dubai", "UX design UAE", "UI design Dubai", "app design GCC", "SaaS design UAE", "product strategy Dubai", "تصميم تطبيقات دبي", "تجربة المستخدم الإمارات", "تطوير منتجات رقمية"]}
        deliverables={[
          "Product discovery, user flows, and experience mapping",
          "UX wireframes for web apps, mobile apps, portals, and SaaS",
          "Premium UI design with responsive layouts and component systems",
          "Interactive prototypes for stakeholder approval and testing",
          "Developer-ready design systems and handoff documentation",
        ]}
        process={[
          "Clarify users, business model, and product success metrics",
          "Map journeys, core flows, information architecture, and screens",
          "Design responsive UI and validate the experience with stakeholders",
          "Prepare assets, specifications, and build-ready components",
        ]}
        outcomes={[
          "Lower friction for UAE and GCC users",
          "A polished product experience investors and customers can trust",
          "Reusable design systems that reduce future development cost",
        ]}
        districts={["Dubai Internet City", "DIFC", "Business Bay", "Dubai Marina", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Kuwait"]}
        faqs={[
          {
            question: "What is digital product design?",
            answer:
              "Digital product design covers product strategy, UX flows, UI screens, prototypes, and design systems. Vista by Lara designs apps, portals, SaaS platforms, and customer-facing tools for UAE businesses.",
          },
          {
            question: "Do you design mobile apps in Dubai?",
            answer:
              "Yes. We design responsive mobile app experiences, dashboards, booking flows, e-commerce journeys, and SaaS interfaces for Dubai and GCC audiences.",
          },
          {
            question: "Can developers build from your designs?",
            answer:
              "Yes. We prepare structured design systems, component states, responsive specifications, and handoff notes so developers can build accurately.",
          },
          {
            question: "Do you test UX before development?",
            answer:
              "Yes. We use prototypes, journey reviews, and stakeholder testing to reduce product risk before engineering begins.",
          },
          {
            question: "Who is this service best for?",
            answer:
              "This service fits founders, growth teams, and enterprise groups building apps, portals, SaaS platforms, or digital tools in the UAE and GCC.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
