import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { HomeProofBand } from "@/components/home-proof-band"
import { AiVisibilityAuthorityLayer } from "@/components/ai-visibility-authority-layer"
import { ServiceFinder } from "@/components/service-finder"
import { Services } from "@/components/services"
import { FeaturedKnowledge } from "@/components/featured-knowledge"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { LatestInsights } from "@/components/latest-insights"
import { SiteFooter } from "@/components/site-footer"
import { siteConfig } from "@/lib/site"

const RadialPattern = dynamic(() => import("@/components/radial-pattern").then((mod) => mod.RadialPattern))
const Clients = dynamic(() => import("@/components/clients").then((mod) => mod.Clients))
const AutomationStory = dynamic(() => import("@/components/automation-story").then((mod) => mod.AutomationStory))
const FeaturedWork = dynamic(() => import("@/components/featured-work").then((mod) => mod.FeaturedWork))
const Stats = dynamic(() => import("@/components/stats").then((mod) => mod.Stats))
const Faq = dynamic(() => import("@/components/faq").then((mod) => mod.Faq))
const ContactFormSection = dynamic(() => import("@/components/contact-form-section").then((mod) => mod.ContactFormSection))
const FooterScrollGlobe = dynamic(() => import("@/components/footer-scroll-globe").then((mod) => mod.FooterScrollGlobe))

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
