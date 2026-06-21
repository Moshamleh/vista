import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PricingHero } from "@/components/pricing-hero"
import { PricingPlans } from "@/components/pricing-plans"
import { PricingFaq } from "@/components/pricing-faq"
import { PricingCta } from "@/components/pricing-cta"

export const metadata: Metadata = {
  title: "Pricing in AED | Branding & Web Design Dubai",
  description:
    "Transparent AED pricing for branding, UX design, and web development plans for ambitious businesses in Dubai, UAE, and the GCC.",
  alternates: { canonical: "https://www.vistabylara.com/pricing" },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <PricingHero />
        <PricingPlans />
        <PricingFaq />
        <PricingCta />
      </main>
      <SiteFooter />
    </div>
  )
}
