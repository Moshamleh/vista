import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedWork } from "@/components/featured-work"
import { jsonLd } from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Our Work | Brand Identity & Digital Projects Dubai — Vista by Lara",
  description:
    "Explore Vista by Lara's portfolio of luxury brand identities, digital products, and award-winning websites created for UAE and GCC businesses.",
  keywords: "branding portfolio Dubai, design work UAE, digital projects GCC, website portfolio Dubai",
  alternates: { canonical: "https://www.vistabylara.com/work" },
  openGraph: {
    title: "Portfolio | Vista by Lara Dubai",
    description:
      "Luxury brand identities, digital products, and award-winning websites for UAE and GCC businesses.",
    url: "https://www.vistabylara.com/work",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/work.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Vista by Lara Dubai",
    description:
      "Luxury brand identities, digital products, and award-winning websites for UAE and GCC businesses.",
    images: ["https://www.vistabylara.com/og/work.jpg"],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Vista by Lara Work",
  url: "https://www.vistabylara.com/work",
  description:
    "A curated portfolio of luxury branding, websites, digital products, and AI services designed for Dubai and GCC brands.",
}

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <div className="space-y-8 text-foreground">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Company</p>
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
            Our Work
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Luxury projects from brand identity to digital platforms for Dubai, UAE, and GCC clients.
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our portfolio highlights premium design systems, product experiences, and conversion-driven websites.
          </p>
        </div>
      </main>

      <FeaturedWork />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <SiteFooter />
    </div>
  )
}
