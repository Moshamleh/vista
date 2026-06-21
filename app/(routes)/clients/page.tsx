import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Our Clients | Trusted by UAE & GCC Brands — Vista by Lara Dubai",
  description:
    "Vista by Lara partners with leading businesses across Dubai, UAE, and the GCC. See the brands and companies we have transformed through design and strategy.",
  keywords: "branding clients Dubai, design clients UAE, Vista by Lara clients, trusted agency GCC",
  alternates: { canonical: "https://www.vistabylara.com/clients" },
  openGraph: {
    title: "Our Clients | Vista by Lara Dubai",
    description:
      "Trusted by leading UAE and GCC brands. See who we work with at Vista by Lara.",
    url: "https://www.vistabylara.com/clients",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/clients.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clients | Vista by Lara Dubai",
    description:
      "Trusted by leading UAE and GCC brands. See who we work with at Vista by Lara.",
    images: ["https://www.vistabylara.com/og/clients.jpg"],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Clients",
  url: "https://www.vistabylara.com/clients",
  description:
    "A showcase of clients and partnerships for Dubai-based luxury branding and digital design agency Vista by Lara.",
}

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <div className="space-y-8 text-foreground">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Company</p>
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
            Clients
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            We collaborate with Dubai and UAE brands across luxury retail, hospitality, healthcare, and technology.
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our client work emphasizes elevated experiences, strategic storytelling, and measurable digital growth.
          </p>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <SiteFooter />
    </div>
  )
}
