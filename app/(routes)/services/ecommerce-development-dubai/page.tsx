import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Ecommerce Development Dubai | Online Store UAE",
  description:
    "Ecommerce development in Dubai for premium UAE brands. Vista by Lara designs and builds fast online stores with conversion UX and SEO.",
  keywords: [
    "ecommerce development Dubai",
    "online store development UAE",
    "ecommerce website Dubai",
    "ecommerce UX UAE",
    "online shopping website GCC",
    "ecommerce agency Dubai",
    "تطوير متجر إلكتروني دبي",
    "تصميم متجر إلكتروني الإمارات",
    "تجارة إلكترونية دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/ecommerce-development-dubai" },
  openGraph: {
    title: "Ecommerce Development Dubai | Vista by Lara",
    description: "Premium ecommerce websites and conversion-focused online stores for UAE brands.",
    url: "https://www.vistabylara.com/services/ecommerce-development-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Development Dubai | Vista by Lara",
    description: "Conversion-ready ecommerce development for Dubai and GCC brands.",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
}

export default function EcommerceDevelopmentDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Ecommerce service"
        title="Ecommerce Development Dubai"
        subtitle="Premium online stores for UAE brands that need speed, trust, and stronger conversion."
        intro="Vista by Lara designs and develops ecommerce experiences for Dubai brands that need product storytelling, mobile-first shopping, smooth checkout journeys, and search-ready category architecture. We build online stores for UAE and GCC growth."
        slug="ecommerce-development-dubai"
        serviceName="Ecommerce Development Dubai"
        serviceType="Ecommerce Website Design and Development"
        keywords={["ecommerce development Dubai", "online store UAE", "ecommerce website Dubai", "ecommerce UX GCC", "conversion optimization UAE", "premium ecommerce Dubai", "تطوير متجر إلكتروني دبي", "تصميم متجر إلكتروني الإمارات", "تجارة إلكترونية دبي"]}
        deliverables={[
          "Ecommerce sitemap, category, product, and collection structures",
          "Mobile-first product listing and product detail page design",
          "Checkout journey planning for UAE customer behavior",
          "SEO metadata, schema, and content hierarchy for product categories",
          "Analytics, conversion, and post-launch improvement guidance",
        ]}
        process={[
          "Review products, margins, traffic sources, and customer objections",
          "Plan category architecture, product content, and conversion flows",
          "Design and develop responsive ecommerce templates",
          "Test mobile UX, checkout logic, tracking, and launch readiness",
        ]}
        outcomes={[
          "A more trustworthy shopping experience for UAE customers",
          "Clearer product discovery and purchase paths",
          "Better foundation for SEO, paid ads, and WhatsApp commerce",
        ]}
        districts={["Dubai", "Abu Dhabi", "Sharjah", "Dubai Design District", "Jumeirah", "Saudi Arabia", "Kuwait", "Qatar"]}
        faqs={[
          {
            question: "What is ecommerce development in Dubai?",
            answer:
              "Ecommerce development in Dubai covers online store structure, product pages, checkout UX, payment integrations, performance, and SEO for UAE shoppers.",
          },
          {
            question: "Do you build ecommerce websites for luxury brands?",
            answer:
              "Yes. We design premium ecommerce experiences for beauty, fashion, lifestyle, hospitality, home, and specialist UAE brands.",
          },
          {
            question: "Can you improve an existing online store?",
            answer:
              "Yes. We audit UX, speed, product pages, checkout friction, analytics, SEO structure, and conversion blockers before redesigning key journeys.",
          },
          {
            question: "Do ecommerce pages include SEO?",
            answer:
              "Yes. We plan category metadata, structured content, product schema, internal links, and mobile-readable sections.",
          },
          {
            question: "Can you connect WhatsApp commerce?",
            answer:
              "Yes. We can design WhatsApp inquiry paths for products or high-consideration purchases where UAE customers want quick answers before buying.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
