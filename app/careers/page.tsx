import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Careers at Vista by Lara | Dubai Creative Studio Jobs",
  description:
    "Join Vista by Lara in Dubai. We are hiring creative strategists, designers, developers, and AI product builders for luxury digital experiences.",
  alternates: { canonical: "https://www.vistabylara.com/careers" },
  openGraph: {
    title: "Careers at Vista by Lara",
    description:
      "Work with a Dubai luxury creative studio building premium brand, product, and AI experiences for UAE clients.",
    url: "https://www.vistabylara.com/careers",
    type: "website",
    siteName: "Vista by Lara",
    locale: "en_AE",
    images: ["https://www.vistabylara.com/og/careers.jpg"],
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Careers at Vista by Lara",
  hiringOrganization: {
    "@type": "Organization",
    name: "Vista by Lara",
    sameAs: "https://www.vistabylara.com",
  },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" } },
  description:
    "Career opportunities at Vista by Lara for designers, developers, strategists, and AI product specialists in Dubai.",
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <div className="space-y-8 text-foreground">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Company</p>
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
            Careers
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Join our Dubai-based design studio to shape luxury digital products, brands, and AI experiences.
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            We are hiring creative strategists, designers, developers, and AI innovators.
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
