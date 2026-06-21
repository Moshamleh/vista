import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { RadialPattern } from "@/components/radial-pattern"
import { Services } from "@/components/services"
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
  title: "Vista by Lara | Dubai Branding & UX Design Agency UAE",
  description:
    "Vista by Lara is a Dubai luxury branding, UX design, website, and generative AI agency building premium digital experiences for UAE and GCC brands.",
  keywords: [
    "branding agency Dubai",
    "UX design agency UAE",
    "luxury website design Dubai",
    "digital product design Dubai",
    "generative AI services UAE",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Vista by Lara | Dubai Branding & UX Design Agency",
    description:
      "Luxury branding, UX design, websites, and AI-powered digital experiences for Dubai, UAE, and GCC businesses.",
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vista by Lara | Dubai Branding & UX Design Agency",
    description:
      "Luxury branding, UX design, websites, and AI-powered digital experiences for Dubai, UAE, and GCC businesses.",
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
        <RadialPattern />
        <Clients />
        <Services />
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
