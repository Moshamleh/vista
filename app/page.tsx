import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { RadialPattern } from "@/components/radial-pattern"
import { HomeProofBand } from "@/components/home-proof-band"
import { AiVisibilityAuthorityLayer } from "@/components/ai-visibility-authority-layer"
import { ServiceFinder } from "@/components/service-finder"
import { Services } from "@/components/services"
import { FeaturedKnowledge } from "@/components/featured-knowledge"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { AutomationStory } from "@/components/automation-story"
import { Clients } from "@/components/clients"
import { FeaturedWork } from "@/components/featured-work"
import { LatestInsights } from "@/components/latest-insights"
import { Stats } from "@/components/stats"
import { Faq } from "@/components/faq"
import { ContactFormSection } from "@/components/contact-form-section"
import { FooterScrollGlobe } from "@/components/footer-scroll-globe"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Visibility Agency Dubai | SEO, AEO & GEO in UAE",
  description:
    "Vista by Lara is a Dubai-based AI visibility and digital growth agency for UAE and GCC businesses — SEO, AEO/GEO, Shopify optimization, and conversion-focused design.",
  keywords: [
    "AI visibility Dubai",
    "AI visibility agency Dubai",
    "AI visibility UAE",
    "GEO agency UAE",
    "AEO agency Dubai",
    "ChatGPT SEO Dubai",
    "Perplexity SEO Dubai",
    "Google AI Overview optimization Dubai",
    "Arabic SEO Dubai",
    "Local SEO Dubai",
    "AI agent UAE",
    "branding agency Dubai",
    "high-performance website Dubai",
    "web design Dubai",
    "generative AI services UAE",
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-AE": siteConfig.url,
      "ar-AE": `${siteConfig.url}/ar`,
    },
  },
  openGraph: {
    title: "AI Visibility Agency Dubai | SEO, AEO & GEO in UAE",
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility Agency Dubai | SEO, AEO & GEO in UAE",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

export default function Page() {
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
        <Hero />
        <HomeProofBand />
        <ServiceFinder />
        <AiVisibilityAuthorityLayer />
        <RadialPattern />
        <Clients />
        <Services />
        <FeaturedKnowledge />
        <CompetitorComparison />
        <AutomationStory />
        <FeaturedWork />
        <LatestInsights />
        <Stats />
        <Faq />
        <ContactFormSection />
        <FooterScrollGlobe />
      </main>
      <SiteFooter />
    </div>
  )
}
