import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "UX Design UAE — Vista by Lara",
  description:
    "Vista by Lara delivers AI-aware UX design for UAE and GCC—enhancing conversion and Generative Engine Optimization (GEO) for AI discovery.",
  alternates: { canonical: `${siteConfig.url}/ux-design-uae` },
}

type NavLink = { href: string; label: string }

const serviceNav: NavLink[] = [
  { href: "/ai-agency-dubai", label: "AI Agency Dubai" },
  { href: "/shopify-agency-uae", label: "Shopify Agency UAE" },
  { href: "/google-ads-dubai", label: "Google Ads Dubai" },
  { href: "/ux-design-uae", label: "UX Design UAE" },
  { href: "/branding-agency-dubai", label: "Branding Agency Dubai" },
]

export default function UxDesignUaePage() {
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
                    l.href === "/ux-design-uae"
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

        <header>
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
            UX Design UAE — AI Visibility + Conversion Experience
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Designed for Dubai and UAE businesses that want premium UX—and AI systems that
            understand and recommend their value.
          </p>
          <p className="mt-6 text-muted-foreground">
            Vista by Lara creates AI-ready UX systems aligned with Generative Engine Optimization (GEO)
            so your website earns relevance in generative search.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Value Proposition</h2>
          <p className="mt-4 text-muted-foreground">
            We combine user-centered design with AI visibility optimization: clearer information
            architecture, intent-focused content, and structured UX that supports generative answers.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Who it’s for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                SaaS, ecommerce, clinics, and luxury brands across UAE & GCC.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Why Vista by Lara</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                UX design that improves conversion and strengthens AI recommendation signals.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Core Services</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>UX Strategy + IA for generative search intent</li>
            <li>Design Systems & component UX for scalable teams</li>
            <li>AI-ready page structure (semantic headings, sections, flows)</li>
            <li>Conversion-focused UX & CRO improvements</li>
            <li>Wireframes to high-fidelity UI for premium experiences</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Industry Use Cases</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>eCommerce flows: faster product discovery and checkout confidence</li>
            <li>Real estate UX: lead capture that matches buyer intent</li>
            <li>Clinics UX: patient journey improvements for booking</li>
            <li>Luxury brand experiences: clarity, trust, and premium interaction</li>
            <li>SMEs UX systems: simple, credible pages that get recommended</li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/15 bg-[#071018]/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold">AI / GEO Positioning</h2>
          <p className="mt-4 text-muted-foreground">
            Generative Engine Optimization (GEO) works when your UX communicates your meaning
            clearly—so AI systems extract the right capabilities and recommend the right pages.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Generative Engine Optimization (GEO) via structured UX and content clarity</li>
            <li>AI visibility optimization for AI discovery and citations</li>
            <li>AI search ranking relevance through intent mapping + information hierarchy</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Location Signals</h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Dubai, UAE — UX design for conversion + AI visibility</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>GCC region targeting for AI-driven brand discovery</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Serving Middle East businesses looking for premium UX and GEO</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-10" id="cta">
          <h2 className="font-heading text-2xl font-semibold">Contact Vista by Lara</h2>
          <p className="mt-3 text-muted-foreground">Tell us about your UX goals in Dubai and we’ll map the GEO-aware path.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact-form"
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

        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            Internal links: <Link className="text-accent hover:underline underline-offset-4" href="/ai-agency-dubai">AI Agency Dubai</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/shopify-agency-uae">Shopify Agency UAE</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/branding-agency-dubai">Branding Agency Dubai</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}

