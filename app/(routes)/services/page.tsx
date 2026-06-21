import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

const services = [
  {
    label: "AI E-commerce",
    href: "/services/ai-ecommerce",
    description: "AI-powered e-commerce UX, Shopify automation, product content, search visibility, and UAE conversion growth.",
  },
  {
    label: "SEO Optimization",
    href: "/services/seo-optimization",
    description: "Technical SEO, AEO, GEO, schema, content clusters, and Dubai-focused search visibility.",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Premium content, conversion journeys, AI visibility, and digital growth campaigns for UAE brands.",
  },
  {
    label: "Maintenance Management",
    href: "/services/maintenance-management",
    description: "Website maintenance, updates, technical checks, SEO health, and post-launch support for Dubai businesses.",
  },
  {
    label: "Branding",
    href: "/services/branding",
    description: "Brand identity, strategy, positioning, and luxury visual systems for Dubai and GCC brands.",
  },
  {
    label: "Digital Products",
    href: "/services/digital-products",
    description: "UX/UI design for apps, SaaS products, portals, and platforms built for UAE users.",
  },
  {
    label: "Websites",
    href: "/services/websites",
    description: "Premium responsive websites built for credibility, speed, SEO, AEO, and conversion.",
  },
  {
    label: "Development",
    href: "/services/development",
    description: "Full-stack engineering, integrations, custom platforms, and scalable UAE digital infrastructure.",
  },
  {
    label: "Generative AI",
    href: "/services/generative-ai",
    description: "AI workflows, creative automation, GEO, intelligent UX, and AI visibility strategy.",
  },
  {
    label: "SEO Services Dubai",
    href: "/services/seo-services-dubai",
    description: "Technical SEO, AEO, GEO, schema, content clusters, and AI-answer visibility for Dubai brands.",
  },
  {
    label: "Shopify Development Dubai",
    href: "/services/shopify-development-dubai",
    description: "Shopify storefronts, product UX, conversion paths, and UAE e-commerce growth systems.",
  },
  {
    label: "Web Design Dubai",
    href: "/services/web-design-dubai",
    description: "Luxury web design for UAE companies that need clarity, trust, and strong first impressions.",
  },
  {
    label: "Web Development Dubai",
    href: "/services/web-development-dubai",
    description: "Fast, scalable website development for Dubai and GCC business requirements.",
  },
]

export const metadata: Metadata = {
  title: "Services Dubai | Branding, Web Design, SEO, AI",
  description:
    "Explore Vista by Lara services for Dubai branding, UX/UI, websites, development, Shopify, SEO, AEO, GEO, and generative AI.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Services Dubai | Vista by Lara",
    description:
      "Branding, UX, websites, development, Shopify, SEO, AEO, GEO, and generative AI services for UAE and GCC brands.",
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
          Branding, web design, SEO, AEO, GEO, and AI services in Dubai.
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
          Vista by Lara builds premium brand and digital systems for UAE and GCC companies that need trust, visibility, and conversion.
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
