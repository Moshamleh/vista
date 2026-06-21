import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Shopify Development Dubai | Shopify Agency UAE",
  description:
    "Shopify development in Dubai for UAE ecommerce brands. Vista by Lara builds premium Shopify stores, sections, UX, SEO, and integrations.",
  keywords: [
    "Shopify development Dubai",
    "Shopify agency UAE",
    "Shopify web design Dubai",
    "Shopify SEO UAE",
    "Shopify ecommerce Dubai",
    "Shopify experts GCC",
    "شوبيفاي دبي",
    "تطوير متجر شوبيفاي الإمارات",
    "تصميم متجر شوبيفاي دبي",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/shopify-development-dubai" },
  openGraph: {
    title: "Shopify Development Dubai | Vista by Lara",
    description: "Premium Shopify stores, custom sections, UX, SEO, and ecommerce integrations for UAE brands.",
    url: "https://www.vistabylara.com/services/shopify-development-dubai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Development Dubai | Vista by Lara",
    description: "Shopify design and development for Dubai and UAE ecommerce brands.",
    images: ["https://www.vistabylara.com/og/websites.jpg"],
  },
}

export default function ShopifyDevelopmentDubaiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="Shopify service"
        title="Shopify Development Dubai"
        subtitle="Premium Shopify stores, custom sections, SEO structure, and ecommerce UX for UAE brands."
        intro="Vista by Lara builds Shopify experiences for Dubai ecommerce brands that need premium design, mobile-first product journeys, clean theme sections, stronger SEO, and conversion-focused shopping flows for UAE and GCC customers."
        slug="shopify-development-dubai"
        serviceName="Shopify Development Dubai"
        serviceType="Shopify Design and Development"
        keywords={["Shopify development Dubai", "Shopify agency UAE", "Shopify website Dubai", "Shopify SEO UAE", "Shopify ecommerce GCC", "custom Shopify sections Dubai", "شوبيفاي دبي", "تطوير متجر شوبيفاي الإمارات", "تصميم متجر شوبيفاي دبي"]}
        deliverables={[
          "Shopify theme customization and custom sections",
          "Collection, product, cart, and landing page UX",
          "Shopify SEO structure for UAE product categories",
          "App integration planning and conversion tracking guidance",
          "Mobile-first checkout and product discovery improvements",
        ]}
        process={[
          "Audit your Shopify theme, apps, analytics, and customer journey",
          "Plan store architecture, collection strategy, and conversion priorities",
          "Design and build premium sections and responsive templates",
          "Test product flow, mobile UX, performance, and launch readiness",
        ]}
        outcomes={[
          "A cleaner Shopify store built for UAE buyer trust",
          "Better product discovery and conversion paths",
          "A stronger base for SEO, paid ads, email, and WhatsApp sales",
        ]}
        districts={["Dubai", "Jumeirah", "Dubai Design District", "Business Bay", "Abu Dhabi", "Sharjah", "Saudi Arabia", "Oman"]}
        faqs={[
          {
            question: "Do you build Shopify stores in Dubai?",
            answer:
              "Yes. Vista by Lara designs and develops Shopify stores for UAE brands, including custom sections, premium UI, product pages, and conversion paths.",
          },
          {
            question: "Can you improve my existing Shopify store?",
            answer:
              "Yes. We can audit theme structure, product pages, app load, mobile UX, SEO, and checkout friction, then improve the highest-impact areas.",
          },
          {
            question: "Do you handle Shopify SEO?",
            answer:
              "Yes. We plan collection metadata, product content, internal links, schema, speed improvements, and UAE keyword clusters.",
          },
          {
            question: "Can you create custom Shopify sections?",
            answer:
              "Yes. We can design and build custom sections for landing pages, product storytelling, offers, trust signals, and campaign pages.",
          },
          {
            question: "Is Shopify suitable for UAE ecommerce?",
            answer:
              "Yes. Shopify is suitable for many UAE ecommerce brands when payment, shipping, language, mobile UX, and app choices are planned properly.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
