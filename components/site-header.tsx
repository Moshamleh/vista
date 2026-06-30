"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { BrandMark } from "./brand-mark"
import { TypewriterWordmark } from "./typewriter-wordmark"

type NavLink = {
  label: string
  href: string
  description?: string
  accent?: boolean
}

const CORE_SERVICES: NavLink[] = [
  {
    label: "Branding",
    href: "/services/branding",
    description: "Brand identity, positioning, visual systems, and premium guidelines.",
  },
  {
    label: "Digital Products",
    href: "/services/digital-products",
    description: "UX/UI for apps, SaaS platforms, portals, and digital tools.",
  },
  {
    label: "Websites",
    href: "/services/websites",
    description: "High-performance websites built for Dubai and GCC conversion.",
    accent: true,
  },
  {
    label: "Development",
    href: "/services/development",
    description: "Full-stack engineering, integrations, and scalable platforms.",
  },
  {
    label: "Generative AI",
    href: "/services/generative-ai",
    description: "AI workflows, creative automation, GEO, and intelligent experiences.",
    accent: true,
  },
]

const GROWTH_SERVICES: NavLink[] = [
  { label: "AI E-commerce", href: "/services/ai-ecommerce" },
  { label: "SEO Optimization", href: "/services/seo-optimization" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Maintenance Management", href: "/services/maintenance-management" },
  { label: "Web Design Dubai", href: "/services/web-design-dubai" },
  { label: "Web Development Dubai", href: "/services/web-development-dubai" },
  { label: "Ecommerce Development", href: "/services/ecommerce-development-dubai" },
  { label: "Shopify Development", href: "/services/shopify-development-dubai" },
  { label: "UI/UX Design Dubai", href: "/services/ui-ux-design-dubai" },
  { label: "SEO Services Dubai", href: "/services/seo-services-dubai" },
]

const INDUSTRIES: NavLink[] = [
  { label: "Fragrance", href: "/industries/fragrance" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Building Maintenance", href: "/industries/building-maintenance" },
  { label: "E-commerce & Shopify", href: "/industries/ecommerce-shopify" },
  { label: "Real Estate & Property", href: "/industries/real-estate-property" },
  { label: "Hospitality & F&B", href: "/industries/hospitality-fnb" },
  { label: "Clinics & Healthcare", href: "/industries/clinics-healthcare" },
  { label: "Professional Services", href: "/industries/professional-services" },
  { label: "Luxury & Lifestyle", href: "/industries/luxury-lifestyle" },
]

const COMPANY: NavLink[] = [
  { label: "About", href: "/about", description: "Dubai-based team, story, and authority signals." },
  { label: "Work", href: "/work", description: "Selected brand, website, and product outcomes." },
  { label: "Clients", href: "/clients", description: "Client trust, industries, and recognition." },
  { label: "Blog", href: "/blog", description: "SEO, AEO, GEO, AI visibility, and UAE digital strategy." },
  { label: "Careers", href: "/careers", description: "Join Vista by Lara." },
]

const DIRECT_LINKS: NavLink[] = [
  { label: "Free Brand Audit", href: "https://vista-brand-audit.vistabylara.workers.dev" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: siteConfig.whatsapp },
]

const whatsappHref = siteConfig.whatsapp
type DesktopMenu = "services" | "industries" | "company" | null

function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Vista by Lara home">
      <BrandMark priority />
      <TypewriterWordmark className="hidden sm:block" />
    </Link>
  )
}

function MegaLink({ item }: { item: NavLink }) {
  const pathname = usePathname()
  const active = pathname === item.href

  return (
    <a
      href={item.href}
      className={`group/link block rounded-2xl border px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent/10 ${
        active ? "border-accent/30 bg-accent/10" : "border-transparent bg-transparent"
      }`}
    >
      <span className={`font-heading text-base font-semibold ${item.accent || active ? "text-accent" : "text-foreground"}`}>
        {item.label}
      </span>
      {item.description && (
        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
          {item.description}
        </span>
      )}
    </a>
  )
}

function ServicesMegaMenu({ open }: { open: boolean }) {
  return (
    <div
      className={`absolute left-1/2 top-full z-30 w-[min(940px,calc(100vw-2rem))] -translate-x-1/2 pt-4 transition-all duration-150 ${
        open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-5" aria-hidden="true" />
      <div className="grid gap-5 rounded-[1.65rem] border border-accent/20 bg-[#05070d]/96 p-5 shadow-[0_34px_90px_-46px_rgba(87,217,255,0.42)] backdrop-blur-2xl lg:grid-cols-[1.2fr_0.85fr_0.9fr]">
        <div>
          <div className="flex items-center justify-between gap-4 px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Vista Services</p>
            <a href="/services" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-accent">
              View all services
            </a>
          </div>
          <div className="mt-3 grid gap-1">
            {CORE_SERVICES.map((item) => (
              <MegaLink key={item.href} item={item} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-background/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Growth Pages</p>
          <div className="mt-4 grid gap-2">
            {GROWTH_SERVICES.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground/78 transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-accent/20 bg-accent/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Dubai Proof</p>
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-foreground">
              Noble Business Winner 2025 for Business Innovation.
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Built for UAE brands that need branding, UX, websites, AI visibility, and WhatsApp-ready conversion paths.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
          >
            Plan a Dubai project
          </a>
        </div>
      </div>
    </div>
  )
}

function SimpleMegaMenu({ links, label, open, viewAllHref }: { links: NavLink[]; label: string; open: boolean; viewAllHref: string }) {
  return (
    <div
      className={`absolute left-1/2 top-full z-30 w-[min(620px,calc(100vw-2rem))] -translate-x-1/2 pt-4 transition-all duration-150 ${
        open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-5" aria-hidden="true" />
      <div className="grid gap-3 rounded-[1.65rem] border border-accent/20 bg-[#05070d]/96 p-5 shadow-[0_34px_90px_-46px_rgba(87,217,255,0.42)] backdrop-blur-2xl sm:grid-cols-2">
        <div className="flex items-center justify-between gap-4 px-4 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{label}</p>
          <a href={viewAllHref} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-accent">
            View all
          </a>
        </div>
        {links.map((item) => (
          <MegaLink key={`${label}-${item.label}`} item={item} />
        ))}
      </div>
    </div>
  )
}

function NavTrigger({
  active,
  expanded,
  controls,
  onClick,
  children,
}: {
  active?: boolean
  expanded: boolean
  controls: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-sm font-semibold transition-colors ${
        active || expanded ? "text-accent" : "text-foreground/72 hover:text-accent"
      }`}
    >
      {children}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null)
  const desktopNavRef = useRef<HTMLElement>(null)

  const servicesActive = pathname?.startsWith("/services")
  const industriesActive = pathname?.startsWith("/industries")
  const companyActive = COMPANY.some((item) => item.href === pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setDesktopMenu(null)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopMenu(null)
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [])

  return (
    <header className="vista-header-in fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`mt-3 overflow-visible border transition-all duration-300 ${
            scrolled
              ? "rounded-[1.5rem] border-accent/20 bg-background/86 shadow-[0_24px_80px_-54px_rgba(87,217,255,0.32)] backdrop-blur-2xl"
              : "rounded-[1.75rem] border-transparent bg-background/28 backdrop-blur-xl"
          }`}
        >
          <div className="hidden items-center justify-between border-b border-border/35 px-5 py-2 text-xs text-muted-foreground lg:flex">
            <span>Dubai, UAE | Serving Abu Dhabi, Sharjah, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman</span>
            <div className="flex items-center gap-4">
              <span>Pricing in AED</span>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
              <a href={whatsappHref} className="inline-flex items-center gap-1.5 text-accent">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:min-h-[4.5rem] lg:py-0">
            <Logo />

            <nav ref={desktopNavRef} aria-label="Primary" className="hidden items-center gap-6 lg:flex">
              <div
                className="group relative"
                onMouseEnter={() => setDesktopMenu("services")}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <NavTrigger
                  controls="services-mega-menu"
                  expanded={desktopMenu === "services"}
                  active={servicesActive}
                  onClick={() => setDesktopMenu((value) => (value === "services" ? null : "services"))}
                >
                  Services
                </NavTrigger>
                <div id="services-mega-menu">
                  <ServicesMegaMenu open={desktopMenu === "services"} />
                </div>
              </div>

              <div
                className="group relative"
                onMouseEnter={() => setDesktopMenu("industries")}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <NavTrigger
                  controls="industries-mega-menu"
                  expanded={desktopMenu === "industries"}
                  active={industriesActive}
                  onClick={() => setDesktopMenu((value) => (value === "industries" ? null : "industries"))}
                >
                  Industries
                </NavTrigger>
                <div id="industries-mega-menu">
                  <SimpleMegaMenu links={INDUSTRIES} label="UAE industries" viewAllHref="/industries" open={desktopMenu === "industries"} />
                </div>
              </div>

              <a
                href="/work"
                className={`text-sm font-semibold transition-colors ${
                  pathname === "/work" ? "text-accent" : "text-foreground/72 hover:text-accent"
                }`}
              >
                Work
              </a>

              <div
                className="group relative"
                onMouseEnter={() => setDesktopMenu("company")}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <NavTrigger
                  controls="company-mega-menu"
                  expanded={desktopMenu === "company"}
                  active={companyActive}
                  onClick={() => setDesktopMenu((value) => (value === "company" ? null : "company"))}
                >
                  Company
                </NavTrigger>
                <div id="company-mega-menu">
                  <SimpleMegaMenu links={COMPANY} label="Company" viewAllHref="/about" open={desktopMenu === "company"} />
                </div>
              </div>

              {DIRECT_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === item.href ? "text-accent" : "text-foreground/72 hover:text-accent"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] hover:bg-accent/90 sm:inline-flex"
              >
                Speak to an expert
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav
        aria-label="Mobile"
        className={`mx-4 mt-2 overflow-hidden rounded-3xl border border-accent/20 bg-[#05070d]/96 backdrop-blur-2xl transition-[max-height,opacity,transform,visibility] duration-200 lg:hidden ${
          open
            ? "pointer-events-auto visible max-h-[calc(100vh-7rem)] translate-y-0 overflow-y-auto opacity-100"
            : "pointer-events-none invisible max-h-0 -translate-y-2 opacity-0"
        }`}
      >
            <div className="space-y-6 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Services</p>
                <div className="mt-3 grid gap-2">
                  {[...CORE_SERVICES, ...GROWTH_SERVICES].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent/10 hover:text-accent ${
                        pathname === item.href ? "bg-accent/10 text-accent" : "text-foreground/82"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Industries</p>
                <div className="mt-3 grid gap-2">
                  {INDUSTRIES.map((item) => (
                    <a
                      key={`${item.label}-mobile`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-semibold text-foreground/82 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Company</p>
                <div className="mt-3 grid gap-2">
                  {[...COMPANY, ...DIRECT_LINKS].map((item) => (
                    <a
                      key={`${item.href}-mobile`}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent/10 hover:text-accent ${
                        pathname === item.href ? "bg-accent/10 text-accent" : "text-foreground/82"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 border-t border-border/50 pt-5 sm:grid-cols-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-background"
                >
                  Speak to an expert
                </a>
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-5 text-sm font-semibold text-accent"
                >
                  WhatsApp
                </a>
              </div>
            </div>
      </nav>
    </header>
  )
}
