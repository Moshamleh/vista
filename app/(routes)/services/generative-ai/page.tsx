import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicePage } from "@/components/service-page"

export const metadata: Metadata = {
  title: "Generative AI Services Dubai | AI Design Agency UAE",
  description:
    "Generative AI services in Dubai for premium brands and digital products. Vista by Lara designs AI features, workflows, and intelligent UX.",
  keywords: [
    "generative AI Dubai",
    "AI design agency UAE",
    "AI services Dubai",
    "creative AI solutions UAE",
    "intelligent product design Dubai",
    "ذكاء اصطناعي دبي",
    "خدمات الذكاء الاصطناعي الإمارات",
    "أتمتة التصميم دبي",
    "AI UX design GCC",
  ],
  alternates: { canonical: "https://www.vistabylara.com/services/generative-ai" },
  openGraph: {
    title: "Generative AI Services Dubai | Vista by Lara",
    description: "AI strategy, intelligent UX, and creative AI product design for Dubai and UAE brands.",
    url: "https://www.vistabylara.com/services/generative-ai",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/generative-ai.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative AI Services Dubai | Vista by Lara",
    description: "Generative AI strategy and intelligent product design for UAE businesses.",
    images: ["https://www.vistabylara.com/og/generative-ai.jpg"],
  },
}

export default function GenerativeAIPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <ServicePage
        eyebrow="AI service"
        title="Generative AI Services Dubai"
        subtitle="AI strategy, intelligent UX, and creative product systems for UAE and GCC businesses."
        intro="Vista by Lara designs generative AI experiences for Dubai businesses that want useful automation, premium user journeys, and intelligent digital products. We connect AI strategy, interface design, content systems, and practical workflows."
        slug="generative-ai"
        serviceName="Generative AI Services"
        serviceType="Generative AI Strategy and Product Design"
        keywords={["generative AI Dubai", "AI services UAE", "AI design agency Dubai", "AI UX GCC", "creative AI UAE", "intelligent product design Dubai", "ذكاء اصطناعي دبي", "خدمات الذكاء الاصطناعي الإمارات", "أتمتة التصميم دبي"]}
        deliverables={[
          "AI opportunity mapping and product feature strategy",
          "Prompted workflows, AI assistants, and content systems",
          "UX/UI for AI-powered apps, tools, and customer journeys",
          "Governance notes for tone, safety, and brand consistency",
          "Prototype concepts for stakeholder testing and investment decisions",
        ]}
        process={[
          "Identify valuable AI use cases for your Dubai business model",
          "Map workflows, data needs, risk points, and user expectations",
          "Design AI interactions, screens, prompts, and system behavior",
          "Prototype, test, and prepare implementation guidance",
        ]}
        outcomes={[
          "Clearer AI roadmap without vague technology claims",
          "Useful AI features customers can understand and trust",
          "Premium intelligent experiences aligned with brand standards",
        ]}
        districts={["Dubai Future District", "DIFC", "Dubai Internet City", "Business Bay", "Abu Dhabi", "Saudi Arabia", "Qatar", "Oman"]}
        faqs={[
          {
            question: "What are generative AI services?",
            answer:
              "Generative AI services help businesses plan, design, and prototype AI-powered workflows, assistants, content systems, and product features.",
          },
          {
            question: "Do Dubai businesses need AI strategy before development?",
            answer:
              "Yes. AI strategy prevents expensive experiments by clarifying use cases, user value, data needs, and brand safety before development begins.",
          },
          {
            question: "Can AI be added to an existing website or product?",
            answer:
              "Yes. We can identify useful AI features, design the UX, and prepare implementation guidance for an existing website, app, or platform.",
          },
          {
            question: "Do you build AI chatbots?",
            answer:
              "We design AI assistant experiences, conversation flows, brand behavior, and interface patterns. Development scope depends on the platform and data requirements.",
          },
          {
            question: "Is this service for luxury brands?",
            answer:
              "Yes. We focus on premium AI experiences that feel clear, controlled, and aligned with high-end UAE customer expectations.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
