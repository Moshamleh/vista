import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
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
