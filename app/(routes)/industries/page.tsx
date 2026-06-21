import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { industries } from "@/lib/industries"
import { siteConfig } from "@/lib/site"

const extraIndustries = [
  {
    slug: "fragrance",
    label: "Fragrance",
    eyebrow: "Luxury fragrance UAE",
    subtitle:
      "Perfume branding, e-commerce websites, product storytelling, SEO, AEO, GEO, and Dubai/GCC fragrance visibility.",
  },
  {
    slug: "retail",
    label: "Retail",
    eyebrow: "Retail growth Dubai",
    subtitle:
      "Retail branding, Shopify-ready websites, conversion UX, SEO, AEO, GEO, and premium content for UAE shoppers.",
  },
  {
    slug: "building-maintenance",
    label: "Building Maintenance",
    eyebrow: "Maintenance leads UAE",
    subtitle:
      "Building maintenance websites, local SEO, service pages, AEO, GEO, and lead journeys for Dubai property clients.",
  },
]

const allIndustries = [...extraIndustries, ...industries]

export const metadata: Metadata = {
  title: "Industries We Serve Dubai | Vista by Lara",
  description:
    "Explore Vista by Lara industry pages for Dubai and UAE e-commerce, real estate, hospitality, healthcare, professional services, and luxury brands.",
  alternates: { canonical: `${siteConfig.url}/industries` },
  openGraph: {
    title: "Industries We Serve Dubai | Vista by Lara",
    description:
      "Industry-specific branding, web design, UX, SEO, AEO, GEO, and AI visibility pages for UAE and GCC businesses.",
    url: `${siteConfig.url}/industries`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
}

export default function IndustriesIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">Industries</p>
        <h1 className="mt-6 max-w-4xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
          Industry growth pages for Dubai, UAE, and GCC brands.
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
          Choose an industry to explore Vista by Lara services for branding, websites, UX, SEO, AEO, GEO, and AI-ready authority content.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allIndustries.map((industry) => (
            <a
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-border/25 bg-[#0c111d] p-7 transition-all hover:-translate-y-1 hover:border-accent/35 hover:bg-[#0b1420]"
            >
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">{industry.eyebrow}</p>
                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground">
                  {industry.label}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{industry.subtitle}</p>
              </div>
              <span className="mt-8 text-sm font-semibold text-accent">Open industry page -&gt;</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
