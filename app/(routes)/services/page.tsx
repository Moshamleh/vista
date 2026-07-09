import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

const services = [
  {
    label: "SEO",
    href: "/services/seo-optimization",
    description: "Technical SEO, on-page and off-page authority, local and industry SEO, and Dubai-focused search visibility.",
  },
  {
    label: "AEO & GEO",
    href: "/services/aeo-geo",
    description: "Answer and Generative Engine Optimization for ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.",
  },
  {
    label: "Web Design",
    href: "/services/web-design-dubai",
    description: "Luxury web design for UAE companies that need clarity, trust, and strong first impressions.",
  },
  {
    label: "Web Development",
    href: "/services/web-development-dubai",
    description: "Full-stack engineering, integrations, custom platforms, and scalable UAE digital infrastructure.",
  },
  {
    label: "Shopify & E-commerce",
    href: "/services/shopify-development-dubai",
    description: "Shopify storefronts, product UX, conversion paths, and UAE e-commerce growth systems.",
  },
  {
    label: "UI/UX Design",
    href: "/services/ui-ux-design-dubai",
    description: "UX/UI design for apps, SaaS products, portals, and platforms built for UAE users.",
  },
  {
    label: "Branding",
    href: "/services/branding",
    description: "Brand identity, strategy, positioning, and luxury visual systems for Dubai and GCC brands.",
  },
  {
    label: "AI & Automation",
    href: "/services/uae-ai-agent",
    description: "AI agents, CRM automation, and generative AI product design for UAE real estate, clinics, retail, and service businesses.",
  },
  {
    label: "Google Ads",
    href: "/services/google-ads-dubai",
    description: "Google Ads, PPC, GA4, GTM, conversion tracking, landing pages, and qualified lead growth for UAE brands.",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Content, social, paid social, CRO, analytics, and conversion journeys for UAE and GCC digital growth.",
  },
]

export const metadata: Metadata = {
  title: "Services Dubai | Branding, Web Design, SEO, AI",
  description:
    "Explore Vista by Lara services for Dubai branding, UX/UI, websites, Google Ads, Meta Ads, AI agents, Shopify, SEO, AEO, GEO, and generative AI.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Services Dubai | Vista by Lara",
    description:
      "Branding, UX, websites, Google Ads, Meta Ads, AI agents, Shopify, SEO, AEO, GEO, and generative AI services for UAE and GCC brands.",
    url: `${siteConfig.url}/services`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Services</p>
        <h1 className="mt-6 max-w-4xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
          Branding, web design, SEO, AEO, GEO, and AI agent services in Dubai.
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
          Vista by Lara builds premium brand, AI agent, and digital growth systems for UAE and GCC companies that need trust, visibility, and conversion.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              className="group flex min-h-64 flex-col justify-between rounded-[1.75rem] border border-border/25 bg-[#0c111d] p-7 transition-all hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0b1420]"
            >
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{service.label}</h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{service.description}</p>
              </div>
              <span className="mt-8 text-sm font-semibold text-accent">Open service page -&gt;</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
