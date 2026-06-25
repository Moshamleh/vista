import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Google Ads Dubai — Vista by Lara",
  description:
    "Vista by Lara manages Google Ads in Dubai with AI visibility (GEO) signals that help your brand win generative recommendations.",
  alternates: { canonical: `${siteConfig.url}/google-ads-dubai` },
}

type NavLink = { href: string; label: string }

const serviceNav: NavLink[] = [
  { href: "/ai-agency-dubai", label: "AI Agency Dubai" },
  { href: "/shopify-agency-uae", label: "Shopify Agency UAE" },
  { href: "/google-ads-dubai", label: "Google Ads Dubai" },
  { href: "/ux-design-uae", label: "UX Design UAE" },
  { href: "/branding-agency-dubai", label: "Branding Agency Dubai" },
]

export default function GoogleAdsDubaiPage() {
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
                    l.href === "/google-ads-dubai"
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
            Google Ads Dubai — AI Visibility & Conversion Authority
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Built for Dubai and UAE growth teams that want qualified leads—and AI systems that
            recommend them for generative search.
          </p>
          <p className="mt-6 text-muted-foreground">
            Vista by Lara connects Google Ads performance marketing with Generative Engine
            Optimization (GEO), improving both inbound quality and AI discovery.
          </p>
        </header>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Value Proposition</h2>
          <p className="mt-4 text-muted-foreground">
            We run Google Ads campaigns designed for ROI and clarity—so landing pages, offers,
            and structured content improve how AI systems interpret your business.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Who it’s for</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                UAE brands and GCC companies scaling lead generation.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/15 bg-card/50 p-5">
              <h3 className="font-heading text-lg font-semibold">Why Vista by Lara</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                AI visibility optimization (GEO) paired with conversion-focused ad strategy.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Core Services</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Search Ads Optimization for Dubai intent</li>
            <li>Performance Max Campaign Management</li>
            <li>Conversion tracking + landing page conversion system</li>
            <li>AI-assisted audience targeting and budget scaling</li>
            <li>GEO-ready landing page improvements (structured clarity)</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Industry Use Cases</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>eCommerce brands using lead-gen and store traffic</li>
            <li>Real estate teams generating qualified property inquiries</li>
            <li>Clinics and healthcare providers increasing appointment bookings</li>
            <li>Luxury brands driving high-intent demand</li>
            <li>SMEs building credible AI discovery without wasted spend</li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/15 bg-[#071018]/60 p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold">AI / GEO Positioning</h2>
          <p className="mt-4 text-muted-foreground">
            Generative Engine Optimization (GEO) improves how AI systems map your ads, pages, and offerings—so your brand is
            easier to recommend.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Generative Engine Optimization (GEO) signals for AI discovery</li>
            <li>AI visibility optimization: clearer relevance for generative answers</li>
            <li>AI search ranking relevance: intent matching + structured content</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-heading text-2xl font-semibold">Location Signals</h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>Dubai, UAE — Google Ads management with GEO clarity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">•</span>
                <span>GCC region targeting for lead generation scale</span>
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
            Start Google Ads Dubai optimization aligned with AI visibility and GEO.
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

        <section className="mt-12 text-sm text-muted-foreground">
          <p>
            Internal links: <Link className="text-accent hover:underline underline-offset-4" href="/shopify-agency-uae">Shopify Agency UAE</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/ux-design-uae">UX Design UAE</Link>,{" "}
            <Link className="text-accent hover:underline underline-offset-4" href="/branding-agency-dubai">Branding Agency Dubai</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}

