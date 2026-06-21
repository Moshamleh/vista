import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { BrandMark } from "./brand-mark"
import { TypewriterWordmark } from "./typewriter-wordmark"

type FooterLink = {
  label: string
  href: string
  external?: boolean
  accent?: boolean
  accented?: boolean
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Web Design Dubai", href: "/services/web-design-dubai", accent: true },
      { label: "Web Development Dubai", href: "/services/web-development-dubai", accent: false },
      { label: "Ecommerce Development", href: "/services/ecommerce-development-dubai", accent: false },
      { label: "Shopify Development", href: "/services/shopify-development-dubai", accent: false },
      { label: "UI/UX Design", href: "/services/ui-ux-design-dubai", accent: false },
      { label: "SEO Services", href: "/services/seo-services-dubai", accent: true },
      { label: "Branding", href: "/services/branding", accent: false },
      { label: "Generative AI", href: "/services/generative-ai", accent: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Clients", href: "/clients" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/vistabylara", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@vistabylara", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/vistabylara", external: true },
      { label: "X (Twitter)", href: "https://x.com/vistabylara", external: true },
      { label: "Behance", href: "https://www.behance.net/vistabylara", external: true },
      { label: "Book a consultation", href: siteConfig.whatsapp, external: true, accented: true },
    ],
  },
]

const SOCIAL_LINKS = COLUMNS[2].links.filter((link): link is FooterLink & { external: true } => link.external === true)
const whatsappHref = siteConfig.whatsapp

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-[#05070d]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="overflow-hidden rounded-[1.75rem] border border-accent/15 bg-[#05070d]/92 shadow-[0_40px_110px_-72px_rgba(87,217,255,0.45)]">
          <div className="grid gap-12 p-8 sm:p-10 lg:grid-cols-[1.05fr_1.95fr] lg:gap-16">
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2.5" aria-label="Vista by Lara home">
                <BrandMark />
                <TypewriterWordmark />
              </Link>

              <p className="mt-8 max-w-sm text-base leading-7 text-muted-foreground">
                We craft transformative brands, websites, and digital products built to lead across Dubai, the UAE,
                and GCC markets.
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-6 font-heading text-base font-semibold text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {siteConfig.email}
              </a>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-foreground/25 px-6 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                >
                  Start a project -&gt;
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-foreground/20 px-6 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                >
                  WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Social platforms">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {link.label.replace(" (Twitter)", "")}
                  </a>
                ))}
              </div>
            </div>

            <nav className="grid grid-cols-1 gap-9 sm:grid-cols-3" aria-label="Footer navigation">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">
                    {col.title}
                  </h2>
                  <ul className="mt-5 space-y-3.5">
                    {col.links.map((link) => {
                      const className = `text-base leading-6 transition-colors hover:text-accent ${
                        link.accent || link.accented ? "text-accent" : "text-foreground/72"
                      }`
                      if (link.external) {
                        return (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener"
                              className={className}
                            >
                              {link.label}
                            </a>
                          </li>
                        )
                      }
                      return (
                        <li key={link.label}>
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-6 border-t border-border/70 px-8 py-6 text-sm text-muted-foreground sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <p>&copy; {new Date().getFullYear()} Vista by Lara. All rights reserved.</p>
              <div className="flex flex-wrap gap-5" aria-label="Legal information">
                <a href="/privacy" className="transition-colors hover:text-accent">
                  Privacy
                </a>
                <a href="/terms" className="transition-colors hover:text-accent">
                  Terms
                </a>
                <a href="/cookies" className="transition-colors hover:text-accent">
                  Cookies
                </a>
              </div>
            </div>
            <a
              href="/clients"
              className="inline-flex items-center gap-3 text-left text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <span
                className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(87,217,255,0.8)]"
                aria-hidden="true"
              />
              Noble Business Winner 2025 - Business Innovation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
