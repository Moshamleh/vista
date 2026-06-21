import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "UI UX Design Dubai | UX Design Agency UAE",
  description:
    "UI/UX design in Dubai for apps, websites, dashboards, and SaaS platforms. Vista by Lara creates premium user experiences for UAE brands.",
  keywords: [
    "UI UX design Dubai",
    "UX design agency UAE",
    "UI design Dubai",
    "app UX Dubai",
    "website UX UAE",
    "SaaS UX GCC",
    "تصميم تجربة المستخدم دبي",
    "تصميم واجهات الإمارات",
    "تصميم تطبيقات دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/ui-ux-design-dubai" },
  openGraph: {
    title: "UI UX Design Dubai | Vista by Lara",
    description: "Premium UX/UI design for apps, dashboards, websites, and platforms in Dubai.",
    url: "https://www.vistabylara.com/services/ui-ux-design-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/digital-products.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI UX Design Dubai | Vista by Lara",
    description: "UX/UI design for premium UAE digital products and platforms.",
    images: ["https://www.vistabylara.com/og/digital-products.jpg"],
  },
}

export default function UiUxDesignDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="UI/UX service"
        title="UI UX Design Dubai"
        subtitle="User experience and interface design for premium websites, apps, portals, and SaaS products."
        intro="Vista by Lara creates UI/UX design systems for Dubai businesses that need intuitive flows, premium interfaces, and mobile-first usability. We design experiences that help UAE users understand, trust, and act faster."
        slug="ui-ux-design-dubai"
        serviceName="UI UX Design Dubai"
        serviceType="User Experience and Interface Design"
        keywords={["UI UX design Dubai", "UX agency UAE", "UI design Dubai", "app UX UAE", "website UX Dubai", "SaaS UX GCC", "تصميم تجربة المستخدم دبي", "تصميم واجهات الإمارات", "تصميم تطبيقات دبي"]}
        deliverables={[
          "UX audits, user journey mapping, and information architecture",
          "Wireframes for websites, apps, portals, and dashboards",
          "High-fidelity UI design and responsive screen systems",
          "Interactive prototypes and stakeholder-ready flows",
          "Design systems with components, states, and usage guidance",
        ]}
        process={[
          "Map user needs, business goals, and conversion actions",
          "Define flows, page hierarchy, and content structure",
          "Design UI screens, states, and responsive patterns",
          "Prototype, review, refine, and prepare developer handoff",
        ]}
        outcomes={[
          "Lower friction across key customer journeys",
          "More polished interfaces for premium UAE audiences",
          "Reusable UX patterns for future product growth",
        ]}
        districts={["DIFC", "Dubai Internet City", "Business Bay", "Dubai Marina", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Qatar"]}
        faqs={[
          {
            question: "What is UI/UX design?",
            answer:
              "UI/UX design covers the structure, user flow, interface, and interaction quality of a digital product, website, app, or platform.",
          },
          {
            question: "Do you design dashboards and portals?",
            answer:
              "Yes. We design dashboards, admin portals, SaaS interfaces, booking flows, account areas, and internal business tools.",
          },
          {
            question: "Can UI/UX design improve conversions?",
            answer:
              "Yes. Better UX reduces confusion, improves trust, and makes it easier for users to complete inquiries, bookings, purchases, or signups.",
          },
          {
            question: "Do you provide Figma files?",
            answer:
              "Yes. We provide organized Figma files with responsive screens, components, states, and developer handoff notes.",
          },
          {
            question: "Is UI/UX design useful before development?",
            answer:
              "Yes. UI/UX design reduces technical waste by clarifying flows and screens before engineering begins.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
