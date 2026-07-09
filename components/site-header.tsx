"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Languages, Menu, MessageCircle, Search, X } from "lucide-react"
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
    label: "UI/UX Design",
    href: "/services/ui-ux-design-dubai",
    description: "UX/UI for apps, SaaS platforms, portals, and digital tools.",
  },
  {
    label: "Web Design",
    href: "/services/web-design-dubai",
    description: "High-performance websites built for Dubai and GCC conversion.",
    accent: true,
  },
  {
    label: "Web Development",
    href: "/services/web-development-dubai",
    description: "Full-stack engineering, integrations, and scalable platforms.",
  },
  {
    label: "AI & Automation",
    href: "/services/uae-ai-agent",
    description: "AI agents, CRM automation, and generative AI product design for UAE businesses.",
    accent: true,
  },
  {
    label: "AEO & GEO",
    href: "/services/aeo-geo",
    description: "Answer and Generative Engine Optimization for AI citations and UAE/GCC answer visibility.",
    accent: true,
  },
  {
    label: "SEO",
    href: "/services/seo-optimization",
    description: "Technical SEO, on-page, off-page, local, and industry SEO for UAE search visibility.",
    accent: true,
  },
  {
    label: "Vista AI Authority Engine",
    href: "/dashboard",
    description: "AI visibility scoring, recommendation readiness, and authority monitoring for UAE brands.",
    accent: true,
  },
]

const GROWTH_SERVICES: NavLink[] = [
  { label: "AI & Automation", href: "/services/uae-ai-agent" },
  { label: "Google Ads", href: "/services/google-ads-dubai" },
  { label: "AEO & GEO", href: "/services/aeo-geo" },
  { label: "SEO", href: "/services/seo-optimization" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Web Design", href: "/services/web-design-dubai" },
  { label: "Web Development", href: "/services/web-development-dubai" },
  { label: "Shopify & E-commerce", href: "/services/shopify-development-dubai" },
  { label: "UI/UX Design", href: "/services/ui-ux-design-dubai" },
  { label: "Vista AI Authority Engine", href: "/dashboard" },
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
  { label: "Engineering Registry", href: "/case-studies", description: "Technical briefings, infrastructure assets, and measured resilience." },
  { label: "Clients", href: "/clients", description: "Client trust, industries, and recognition." },
  { label: "Intelligence", href: "/blog", description: "Evidence-led AI citation and infrastructure briefings for UAE/GCC markets." },
  { label: "AI Visibility Guide", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business", description: "Flagship guide to AI visibility, GEO, AEO, and digital trust in Dubai." },
  { label: "Careers", href: "/careers", description: "Join Vista by Lara." },
]

const DIRECT_LINKS: NavLink[] = [
  { label: "AI Tools", href: "/ai-tools" },
  { label: "Free Brand Audit", href: "https://vista-brand-audit.vistabylara.workers.dev" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: siteConfig.whatsapp },
]

const HEADER_SEARCH_LINKS: NavLink[] = [
  {
    label: "AEO & GEO",
    href: "/services/aeo-geo",
    description: "Answer and Generative Engine Optimization, AI citations, entity confidence, and UAE/GCC visibility.",
  },
  {
    label: "SEO",
    href: "/services/seo-optimization",
    description: "Technical SEO, schema, content clusters, and local search.",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    description: "Content, social, paid social, CRO, and analytics for UAE growth.",
  },
  {
    label: "Google Ads",
    href: "/services/google-ads-dubai",
    description: "PPC, GA4, GTM, landing pages, and qualified UAE lead generation.",
  },
  {
    label: "Web Design",
    href: "/services/web-design-dubai",
    description: "Premium websites built for credibility, speed, AEO, and conversion.",
  },
  {
    label: "Web Development",
    href: "/services/web-development-dubai",
    description: "Full-stack engineering and scalable UAE digital infrastructure.",
  },
  {
    label: "Shopify & E-commerce",
    href: "/services/shopify-development-dubai",
    description: "Shopify storefronts, product UX, and UAE e-commerce growth systems.",
  },
  {
    label: "AI & Automation",
    href: "/services/uae-ai-agent",
    description: "AI agents for real estate, clinics, retail, restaurants, and qualified leads.",
  },
]

const whatsappHref = siteConfig.whatsapp
type DesktopMenu = "services" | "industries" | "company" | null

const AR_CORE_SERVICES: NavLink[] = [
  { label: "العلامة التجارية", href: "/services/branding", description: "هوية العلامة، التموضع، الأنظمة البصرية، وإرشادات الاستخدام الفاخر." },
  { label: "تصميم UI/UX", href: "/services/ui-ux-design-dubai", description: "تصميم UX/UI للتطبيقات، منصات SaaS، البوابات، والأدوات الرقمية." },
  { label: "تصميم المواقع", href: "/services/web-design-dubai", description: "مواقع عالية الأداء مبنية للتحويل في دبي والخليج.", accent: true },
  { label: "تطوير المواقع", href: "/services/web-development-dubai", description: "هندسة كاملة، تكاملات، ومنصات قابلة للتوسع." },
  { label: "الذكاء الاصطناعي والأتمتة", href: "/services/uae-ai-agent", description: "وكلاء ذكاء اصطناعي وأتمتة CRM للشركات في الإمارات.", accent: true },
  { label: "AEO و GEO", href: "/services/aeo-geo", description: "تحسين محركات الإجابة والتوليد للاقتباسات عبر الذكاء الاصطناعي في الإمارات والخليج.", accent: true },
  { label: "تحسين محركات البحث SEO", href: "/services/seo-optimization", description: "تحسين تقني، محلي، وقطاعي لمحركات البحث في الإمارات.", accent: true },
  { label: "Vista AI Authority Engine", href: "/dashboard", description: "منصة قياس جاهزية الظهور في الذكاء الاصطناعي وسلطة التوصية للعلامات في الإمارات.", accent: true },
]

const AR_GROWTH_SERVICES: NavLink[] = [
  { label: "الذكاء الاصطناعي والأتمتة", href: "/services/uae-ai-agent" },
  { label: "إعلانات جوجل", href: "/services/google-ads-dubai" },
  { label: "AEO و GEO", href: "/services/aeo-geo" },
  { label: "تحسين SEO", href: "/services/seo-optimization" },
  { label: "التسويق الرقمي", href: "/services/digital-marketing" },
  { label: "تصميم مواقع دبي", href: "/services/web-design-dubai" },
  { label: "تطوير مواقع دبي", href: "/services/web-development-dubai" },
  { label: "تطوير Shopify والتجارة الإلكترونية", href: "/services/shopify-development-dubai" },
  { label: "تصميم UI/UX دبي", href: "/services/ui-ux-design-dubai" },
  { label: "Vista AI Authority Engine", href: "/dashboard" },
]

const AR_INDUSTRIES: NavLink[] = [
  { label: "العطور", href: "/industries/fragrance" },
  { label: "التجزئة", href: "/industries/retail" },
  { label: "صيانة المباني", href: "/industries/building-maintenance" },
  { label: "التجارة الإلكترونية وShopify", href: "/industries/ecommerce-shopify" },
  { label: "العقارات والأصول", href: "/industries/real-estate-property" },
  { label: "الضيافة والمطاعم", href: "/industries/hospitality-fnb" },
  { label: "العيادات والرعاية الصحية", href: "/industries/clinics-healthcare" },
  { label: "الخدمات المهنية", href: "/industries/professional-services" },
  { label: "الفخامة ونمط الحياة", href: "/industries/luxury-lifestyle" },
]

const AR_COMPANY: NavLink[] = [
  { label: "من نحن", href: "/about", description: "الفريق في دبي، القصة، وإشارات الثقة المؤسسية." },
  { label: "سجل الهندسة", href: "/case-studies", description: "ملفات تقنية، أصول بنية تحتية، ومؤشرات مرونة قابلة للقياس." },
  { label: "العملاء", href: "/clients", description: "ثقة العملاء، القطاعات، والتقدير المهني." },
  { label: "المعرفة", href: "/blog", description: "تحليلات قابلة للاستشهاد حول الذكاء الاصطناعي والبنية الرقمية في الإمارات والخليج." },
  { label: "دليل ظهور الذكاء الاصطناعي", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business", description: "دليل رئيسي حول AI Visibility وGEO وAEO والثقة الرقمية في دبي." },
  { label: "الوظائف", href: "/careers", description: "انضم إلى Vista by Lara." },
]

const AR_DIRECT_LINKS: NavLink[] = [
  { label: "أدوات الذكاء الاصطناعي", href: "/ai-tools" },
  { label: "تدقيق مجاني للعلامة", href: "https://vista-brand-audit.vistabylara.workers.dev" },
  { label: "الأسعار", href: "/pricing" },
  { label: "تواصل معنا", href: siteConfig.whatsapp },
]

const ARABIC_KNOWLEDGE_PATH = "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
const ENGLISH_KNOWLEDGE_PATH = "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"

function isArabicPath(pathname: string | null) {
  return pathname === "/ar" || Boolean(pathname?.startsWith("/ar/"))
}

function localizeHref(href: string, isArabic: boolean) {
  if (!isArabic || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return href
  if (href === "/") return "/ar"
  if (href === ENGLISH_KNOWLEDGE_PATH) return ARABIC_KNOWLEDGE_PATH
  if (href.startsWith("/ar")) return href
  return `/ar${href}`
}

function getLocalizedHref(pathname: string | null, locale: "en" | "ar") {
  const currentPath = pathname || "/"

  if (locale === "ar") {
    if (currentPath === "/ar" || currentPath.startsWith("/ar/")) return currentPath
    if (currentPath === ENGLISH_KNOWLEDGE_PATH) return ARABIC_KNOWLEDGE_PATH
    return currentPath === "/" ? "/ar" : `/ar${currentPath}`
  }

  if (currentPath === ARABIC_KNOWLEDGE_PATH) return ENGLISH_KNOWLEDGE_PATH
  if (currentPath === "/ar") return "/"
  if (currentPath.startsWith("/ar/")) return currentPath.replace(/^\/ar/, "") || "/"
  return currentPath
}

function LanguageSwitch({ pathname, mobile = false, onNavigate }: { pathname: string | null; mobile?: boolean; onNavigate?: () => void }) {
  const isArabic = isArabicPath(pathname)
  const linkClass = (active: boolean) =>
    `inline-flex min-h-9 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
      active
        ? "bg-accent text-background"
        : "border border-border/70 text-foreground/72 hover:border-accent/45 hover:text-accent"
    }`

  return (
    <div
      className={`flex items-center ${mobile ? "justify-between rounded-2xl border border-border/50 p-3" : "gap-2"}`}
      aria-label="Choose language"
    >
      <span className={`inline-flex items-center gap-1.5 ${mobile ? "text-sm text-muted-foreground" : "text-xs text-muted-foreground"}`}>
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        {isArabic ? "اللغة" : "Language"}
      </span>
      <div className="flex items-center gap-2">
        <Link href={getLocalizedHref(pathname, "en")} hrefLang="en-AE" onClick={onNavigate} className={linkClass(!isArabic)}>
          EN
        </Link>
        <Link href={getLocalizedHref(pathname, "ar")} hrefLang="ar-AE" lang="ar" dir="rtl" onClick={onNavigate} className={linkClass(isArabic)}>
          العربية
        </Link>
      </div>
    </div>
  )
}

function HeaderServiceSearch({ isArabic, mobile = false, onNavigate }: { isArabic: boolean; mobile?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const matches = HEADER_SEARCH_LINKS.filter((item) => {
    const haystack = `${item.label} ${item.description ?? ""} ${item.href} خدمات سيو تحسين محركات البحث دبي الامارات الخليج`.toLowerCase()
    return normalizedQuery.length === 0 ? true : haystack.includes(normalizedQuery)
  }).slice(0, 5)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = () => {
    setOpen(false)
    setQuery("")
    onNavigate?.()
  }

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`} data-header-service-search>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex min-h-9 items-center justify-center gap-2 border border-border/70 text-xs font-semibold text-foreground/72 transition-colors hover:border-accent/45 hover:text-accent ${
          mobile ? "w-full rounded-2xl px-3" : "rounded-full px-3"
        } ${open ? "border-accent/45 text-accent" : ""}`}
        aria-expanded={open}
        aria-controls={mobile ? "mobile-header-service-search" : "desktop-header-service-search"}
      >
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        {isArabic ? "بحث" : "Search"}
      </button>

      {open && (
        <div
          id={mobile ? "mobile-header-service-search" : "desktop-header-service-search"}
          className={`z-50 mt-2 border border-accent/20 bg-[#05070d]/98 p-3 shadow-[0_28px_70px_-42px_rgba(87,217,255,0.52)] backdrop-blur-2xl ${
            mobile ? "relative w-full rounded-2xl" : "absolute right-0 top-full w-[min(360px,calc(100vw-2rem))] rounded-2xl"
          }`}
        >
          <label className="relative block">
            <span className="sr-only">{isArabic ? "ابحث عن خدمة" : "Search for a service"}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              dir={isArabic ? "rtl" : "ltr"}
              placeholder={isArabic ? "اكتب GEO أو AEO أو SEO" : "Type GEO, AEO, SEO, ads..."}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/35 px-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
            />
            <button
              type="button"
              onClick={() => (query ? setQuery("") : setOpen(false))}
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-accent"
              aria-label={isArabic ? "إغلاق البحث" : "Close search"}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </label>

          <div className="mt-3 grid gap-1">
            {matches.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(item.href, isArabic)}
                onClick={close}
                className="block rounded-xl px-3 py-2 transition-colors hover:bg-accent/10"
              >
                <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                {item.description && (
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.description}</span>
                )}
              </Link>
            ))}
            {matches.length === 0 && (
              <Link
                href={localizeHref("/services", isArabic)}
                onClick={close}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10"
              >
                {isArabic ? "عرض كل الخدمات" : "View all services"}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Logo() {
  const pathname = usePathname()
  const href = isArabicPath(pathname) ? "/ar" : "/"
  return (
    <Link href={href} className="flex min-w-0 items-center gap-2.5" aria-label={isArabicPath(pathname) ? "الرئيسية - Vista by Lara" : "Vista by Lara home"}>
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

function ServicesMegaMenu({ open, coreServices, growthServices, isArabic }: { open: boolean; coreServices: NavLink[]; growthServices: NavLink[]; isArabic: boolean }) {
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "خدمات فيستا" : "Vista Services"}</p>
            <a href={localizeHref("/services", isArabic)} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-accent">
              {isArabic ? "عرض كل الخدمات" : "View all services"}
            </a>
          </div>
          <div className="mt-3 grid gap-1">
            {coreServices.map((item) => (
              <MegaLink key={item.href} item={{ ...item, href: localizeHref(item.href, isArabic) }} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-background/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{isArabic ? "صفحات النمو" : "Growth Pages"}</p>
          <div className="mt-4 grid gap-2">
            {growthServices.map((item) => (
              <a
                key={item.href}
                href={localizeHref(item.href, isArabic)}
                className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground/78 transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-accent/20 bg-accent/10 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "دليل دبي" : "Dubai Proof"}</p>
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-foreground">
              {isArabic ? "الفائزة بجائزة Noble Business لعام 2025 عن الابتكار في الأعمال." : "Noble Business Winner 2025 for Business Innovation."}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {isArabic
                ? "مصممة لعلامات الإمارات التي تحتاج إلى هوية، تجربة مستخدم، مواقع، ظهور في الذكاء الاصطناعي، ومسارات تحويل جاهزة لواتساب."
                : "Built for UAE brands that need branding, UX, websites, AI visibility, and WhatsApp-ready conversion paths."}
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
          >
            {isArabic ? "خطط لمشروع في دبي" : "Plan a Dubai project"}
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
  const isArabic = isArabicPath(pathname)
  const coreServices = isArabic ? AR_CORE_SERVICES : CORE_SERVICES
  const growthServices = isArabic ? AR_GROWTH_SERVICES : GROWTH_SERVICES
  const industries = isArabic ? AR_INDUSTRIES : INDUSTRIES
  const company = isArabic ? AR_COMPANY : COMPANY
  const directLinks = isArabic ? AR_DIRECT_LINKS : DIRECT_LINKS
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [desktopMenu, setDesktopMenu] = useState<DesktopMenu>(null)
  const desktopNavRef = useRef<HTMLElement>(null)

  const servicesActive = pathname?.startsWith("/services")
    || pathname?.startsWith("/ar/services")
  const industriesActive = pathname?.startsWith("/industries")
    || pathname?.startsWith("/ar/industries")
  const companyActive = company.some((item) => localizeHref(item.href, isArabic) === pathname)

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
            <span>
              {isArabic
                ? "دبي، الإمارات | نخدم أبوظبي، الشارقة، السعودية، قطر، الكويت، البحرين، وعمان"
                : "Dubai, UAE | Serving Abu Dhabi, Sharjah, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman"}
            </span>
            <div className="flex items-center gap-4">
              <LanguageSwitch pathname={pathname} />
              <HeaderServiceSearch isArabic={isArabic} />
              <span>{isArabic ? "الأسعار بالدرهم الإماراتي" : "Pricing in AED"}</span>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
              <a href={whatsappHref} className="inline-flex items-center gap-1.5 text-accent">
                <MessageCircle className="h-3.5 w-3.5" />
                {isArabic ? "واتساب" : "WhatsApp"}
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
                  {isArabic ? "خدماتنا" : "Services"}
                </NavTrigger>
                <div id="services-mega-menu">
                  <ServicesMegaMenu open={desktopMenu === "services"} coreServices={coreServices} growthServices={growthServices} isArabic={isArabic} />
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
                  {isArabic ? "القطاعات" : "Industries"}
                </NavTrigger>
                <div id="industries-mega-menu">
                  <SimpleMegaMenu
                    links={industries.map((item) => ({ ...item, href: localizeHref(item.href, isArabic) }))}
                    label={isArabic ? "قطاعات الإمارات" : "UAE industries"}
                    viewAllHref={localizeHref("/industries", isArabic)}
                    open={desktopMenu === "industries"}
                  />
                </div>
              </div>

              <a
                href={localizeHref("/case-studies", isArabic)}
                className={`text-sm font-semibold transition-colors ${
                  pathname?.startsWith("/case-studies") || pathname?.startsWith("/ar/case-studies") ? "text-accent" : "text-foreground/72 hover:text-accent"
                }`}
              >
                {isArabic ? "السجل" : "Registry"}
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
                  {isArabic ? "الشركة" : "Company"}
                </NavTrigger>
                <div id="company-mega-menu">
                  <SimpleMegaMenu
                    links={company.map((item) => ({ ...item, href: localizeHref(item.href, isArabic) }))}
                    label={isArabic ? "الشركة" : "Company"}
                    viewAllHref={localizeHref("/about", isArabic)}
                    open={desktopMenu === "company"}
                  />
                </div>
              </div>

              {directLinks.map((item) => (
                <a
                  key={item.href}
                  href={localizeHref(item.href, isArabic)}
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
                {isArabic ? "تحدث إلى خبير" : "Speak to an expert"}
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
              <LanguageSwitch pathname={pathname} mobile onNavigate={() => setOpen(false)} />
              <HeaderServiceSearch isArabic={isArabic} mobile onNavigate={() => setOpen(false)} />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "خدماتنا" : "Services"}</p>
                <div className="mt-3 grid gap-2">
                  {[...coreServices, ...growthServices].map((item) => (
                    <a
                      key={item.href}
                      href={localizeHref(item.href, isArabic)}
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "القطاعات" : "Industries"}</p>
                <div className="mt-3 grid gap-2">
                  {industries.map((item) => (
                    <a
                      key={`${item.label}-mobile`}
                      href={localizeHref(item.href, isArabic)}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-semibold text-foreground/82 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "الشركة" : "Company"}</p>
                <div className="mt-3 grid gap-2">
                  {[...company, ...directLinks].map((item) => (
                    <a
                      key={`${item.href}-mobile`}
                      href={localizeHref(item.href, isArabic)}
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
                  {isArabic ? "تحدث إلى خبير" : "Speak to an expert"}
                </a>
                <a
                  href={whatsappHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-5 text-sm font-semibold text-accent"
                >
                  {isArabic ? "واتساب" : "WhatsApp"}
                </a>
              </div>
            </div>
      </nav>
    </header>
  )
}
