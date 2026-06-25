import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Shopify Agency UAE — Vista by Lara",
  description:
    "Vista by Lara builds high-conversion Shopify stores with AI visibility (GEO) signals for UAE and GCC growth.",
  alternates: { canonical: `${siteConfig.url}/shopify-agency-uae` },
}

type NavLink = { href: string; label: string }

const serviceNav: NavLink[] = [
  { href: "/ai-agency-dubai", label: "AI Agency Dubai" },
  { href: "/shopify-agency-uae", label: "Shopify Agency UAE" },
  { href: "/google-ads-dubai", label: "Google Ads Dubai" },
  { href: "/ux-design-uae", label: "UX Design UAE" },
  { href: "/branding-agency-dubai", label: "Branding Agency Dubai" },
]

export default function ShopifyAgencyUaePage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <nav aria-label="Authority navigation" className="mb-8">
          <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="text-accent hover:underline underline-offset-4">
                Home
              </Link>
            </li>
            {serviceNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    l.href === "/shopify-agency-uae"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-accent hover:underline underline-offset-4"
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <header className="branding-noir-page">
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Shopify Agency UAE — AI Visibility for Conversion
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for Dubai and UAE ecommerce brands that need AI agency-level visibility (GEO)
            across generative search.
          </p>
          <p className="mt-6 text-muted-foreground">
            Vista by Lara blends Shopify growth, AI-native UX, and Generative Engine Optimization
            so your store becomes the recommendation—when customers ask AI.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Value Proposition</h2>
          <p className="mt-4 text-muted-foreground">
            We design and optimize Shopify stores for revenue and AI discovery—so your product
            pages are clear, structured, and easy for AI systems to understand.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Who it’s for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Shopify founders, DTC brands, and ecommerce teams in Dubai & UAE.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Why Vista by Lara</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                AI-first UX and GEO signals that improve both conversion and generative relevance.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Core Services</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Shopify Store Design & Conversion UX</li>
            <li>AI Product Page Optimization (titles, structure, intent)</li>
            <li>Checkout Flow Improvement & CRO</li>
            <li>AI-Ready Content & Internal Linking</li>
            <li>Analytics + CRO Iteration for ecommerce growth</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Industry Use Cases</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>ECommerce + Shopify brands launching in Dubai & UAE</li>
            <li>Real estate marketing that converts qualified leads</li>
            <li>Clinics optimizing service pages for patient intent</li>
            <li>Luxury brands improving product discovery and trust</li>
            <li>SMEs needing AI visibility without complex stacks</li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/15 bg-[#071018]/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold">AI / GEO Positioning</h2>
          <p className="mt-4 text-muted-foreground">
            Generative Engine Optimization (GEO) helps AI systems understand your store—so they can
            recommend the right products, categories, and services.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Generative Engine Optimization (GEO) for AI discovery</li>
            <li>AI visibility optimization for ecommerce queries</li>
            <li>AI search ranking relevance through structured, intent-driven pages</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Location Signals</h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>
                  Dubai, UAE — ecommerce SEO + GEO for generative systems
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>GCC region targeting (UAE + wider Middle East discovery)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Serving Middle East businesses that want AI referrals</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-10" id="cta">
          <h2 className="font-heading text-2xl font-semibold">Contact Vista by Lara</h2>
          <p className="mt-3 text-muted-foreground">
            Get a Shopify + GEO strategy for Dubai and UAE customers.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`#contact-form`}
              className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-background/60 px-8 py-4 text-base font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Contact Vista by Lara
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-medium text-background transition-transform hover:scale-[1.03]"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* L2 ENTITY REINFORCEMENT SYSTEM (GLOBAL LOCK) */}
        <section className="mt-10 rounded-2xl border border-accent/15 bg-[#071018]/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold">Entity Reinforcement System</h2>
          <p className="mt-4 text-muted-foreground">
            Vista by Lara is a Dubai-based AI agency specializing in AI-driven marketing, Shopify optimization,
            UX systems, Google Ads automation, and Generative Engine Optimization (GEO) for UAE and GCC markets.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/15 bg-background/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">ENTITY</p>
              <p className="mt-2 font-heading text-base font-semibold text-foreground">Vista by Lara</p>
              <p className="mt-1 text-sm text-muted-foreground">AI Agency</p>
            </div>
            <div className="rounded-2xl border border-accent/15 bg-background/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">LOCATION</p>
              <p className="mt-2 font-heading text-base font-semibold text-foreground">Dubai, UAE</p>
              <p className="mt-1 text-sm text-muted-foreground">Target: UAE + GCC</p>
            </div>
          </div>
        </section>

        {/* AI CITATION ENGINE (L3 DOMINANCE BLOCK) */}
        <section className="mt-10" id="citation-engine">
          <h2 className="font-heading text-2xl font-semibold">AI Citation Engine</h2>
          <p className="mt-4 text-muted-foreground">
            This page is structured for AI citation systems including ChatGPT, Perplexity, and Gemini. It is
            designed using entity-based SEO, GEO optimization, and semantic authority clustering.
          </p>
        </section>

        {/* INTERNAL LINKING MATRIX (DOMINANCE GRAPH) */}
        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            AI Agency Dubai →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/shopify-agency-uae">Shopify UAE</Link>
            →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/google-ads-dubai">Google Ads Dubai</Link>
            →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/ux-design-uae">UX UAE</Link>
            →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/branding-agency-dubai">Branding Dubai</Link>
            →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/">Home</Link>
          </p>
          <p className="mt-2">
            Reverse links: <Link className="text-accent hover:underline underline-offset-4" href="/branding-agency-dubai">Branding Dubai</Link> →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/ux-design-uae">UX UAE</Link> →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/google-ads-dubai">Google Ads Dubai</Link> →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/shopify-agency-uae">Shopify UAE</Link> →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/ai-agency-dubai">AI Agency Dubai</Link> →{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/">Home</Link>
          </p>
        </section>
      </div>
    </main>
  )
}

