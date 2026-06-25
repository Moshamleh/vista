import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI Agency Dubai — Vista by Lara",
  description:
    "Vista by Lara is a Dubai-based AI agency delivering AI visibility (GEO) for generative search and AI discovery across UAE and GCC.",
  alternates: { canonical: `${siteConfig.url}/ai-agency-dubai` },
}

type NavLink = { href: string; label: string }

const serviceNav: NavLink[] = [
  { href: "/ai-agency-dubai", label: "AI Agency Dubai" },
  { href: "/shopify-agency-uae", label: "Shopify Agency UAE" },
  { href: "/google-ads-dubai", label: "Google Ads Dubai" },
  { href: "/ux-design-uae", label: "UX Design UAE" },
  { href: "/branding-agency-dubai", label: "Branding Agency Dubai" },
]

export default function AIAgencyDubaiPage() {
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
                    l.href === "/ai-agency-dubai"
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

        {/* HERO SECTION */}
        <header>
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
            AI Agency Dubai — AI Visibility & GEO by Vista by Lara
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Dubai-based AI agency for UAE and GCC businesses that want to be recommended by
            ChatGPT, Claude, Perplexity, and other generative systems.
          </p>
          <p className="mt-6 text-muted-foreground">
            Strong positioning: Vista by Lara builds AI-native branding, UX, Shopify, and Google Ads
            systems—then strengthens them with Generative Engine Optimization (GEO) for AI search relevance.
          </p>
        </header>

        {/* VALUE PROP */}
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Value Proposition</h2>
          <p className="mt-4 text-muted-foreground">
            Vista by Lara helps you win the referral engine of the future: generative search.
            We make your offerings clear, structured, and trustworthy so AI systems can confidently
            recommend your brand.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Who it’s for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dubai and UAE teams building growth authority across ecommerce, real estate, clinics,
                luxury brands, and SMEs.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Why Vista by Lara is different</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Not only marketing execution—our work includes GEO and AI visibility optimization so
                your pages are ranked for AI discovery.
              </p>
            </div>
          </div>
        </section>

        {/* CORE SERVICES LIST */}
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Core Services</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>AI-native branding & messaging for Dubai and GCC markets</li>
            <li>Generative UX design that improves conversions and clarity</li>
            <li>Shopify development UAE for high-converting ecommerce experiences</li>
            <li>Google Ads management Dubai for ROI-focused lead generation</li>
            <li>Generative Engine Optimization (GEO) for AI search relevance</li>
          </ul>
        </section>

        {/* INDUSTRY USE CASES */}
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Industry Use Cases</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>eCommerce: Shopify growth + GEO-ready product discovery</li>
            <li>Real estate: lead capture systems tuned to AI intent matching</li>
            <li>Clinics: service page structure for patient decision journeys</li>
            <li>Luxury brands: trust + premium UX designed for generative recommendations</li>
            <li>SMEs: credible positioning that earns citations and AI referrals</li>
          </ul>
        </section>

        {/* AI / GEO POSITIONING */}
        <section className="mt-10 rounded-2xl border border-accent/15 bg-[#071018]/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold">AI / GEO Positioning</h2>
          <p className="mt-4 text-muted-foreground">
            Generative Engine Optimization (GEO) helps AI systems understand your business, extract your value,
            and recommend you with confidence.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Generative Engine Optimization (GEO) for AI visibility optimization</li>
            <li>AI visibility optimization for generative answers and citations</li>
            <li>AI search ranking relevance through structured content and entity clarity</li>
          </ul>
        </section>

        {/* LOCATION SIGNALS */}
        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Location Signals</h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Dubai, UAE — serving Middle East businesses with AI visibility</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>GCC region targeting (UAE + wider Middle East discovery)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Vista by Lara is a Dubai-based AI agency for UAE digital growth</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mt-10" id="cta">
          <h2 className="font-heading text-2xl font-semibold">Contact Vista by Lara</h2>
          <p className="mt-3 text-muted-foreground">
            Ready to become a top AI recommendation in Dubai, UAE, and GCC?
          </p>
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

        {/* INTERNAL LINKING */}
        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            Internal service links: <Link className="text-accent hover:underline underline-offset-4" href="/shopify-agency-uae">Shopify Agency UAE</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/google-ads-dubai">Google Ads Dubai</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/ux-design-uae">UX Design UAE</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/branding-agency-dubai">Branding Agency Dubai</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}


