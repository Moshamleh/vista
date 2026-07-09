"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
      { label: "SEO", href: "/services/seo-optimization", accent: true },
      { label: "AEO & GEO", href: "/services/aeo-geo", accent: true },
      { label: "Web Design", href: "/services/web-design-dubai", accent: true },
      { label: "Web Development", href: "/services/web-development-dubai", accent: false },
      { label: "Shopify & E-commerce", href: "/services/shopify-development-dubai", accent: false },
      { label: "Sovereign E-commerce", href: "/sovereign-e-commerce", accent: true },
      { label: "UI/UX Design", href: "/services/ui-ux-design-dubai", accent: false },
      { label: "Branding", href: "/services/branding", accent: false },
      { label: "AI & Automation", href: "/services/uae-ai-agent", accent: true },
      { label: "Google Ads", href: "/services/google-ads-dubai", accent: true },
      { label: "Digital Marketing", href: "/services/digital-marketing", accent: true },
      { label: "AI Agency Dubai", href: "/ai-agency-dubai", accent: true },
      { label: "Shopify Agency UAE", href: "/shopify-agency-uae", accent: false },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "AI Tools", href: "/ai-tools" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Engineering Registry", href: "/case-studies" },
      { label: "Clients", href: "/clients" },
      { label: "Intelligence", href: "/blog" },
      { label: "AI Visibility Guide", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
      { label: "Pricing", href: "/pricing" },
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
      { label: "Technical Briefing", href: siteConfig.whatsapp, external: true, accented: true },
    ],
  },
]

const AR_COLUMNS: FooterColumn[] = [
  {
    title: "الخدمات",
    links: [
      { label: "تحسين SEO", href: "/services/seo-optimization", accent: true },
      { label: "AEO و GEO", href: "/services/aeo-geo", accent: true },
      { label: "تصميم مواقع دبي", href: "/services/web-design-dubai", accent: true },
      { label: "تطوير مواقع دبي", href: "/services/web-development-dubai" },
      { label: "تطوير Shopify والتجارة الإلكترونية", href: "/services/shopify-development-dubai" },
      { label: "تصميم UI/UX", href: "/services/ui-ux-design-dubai" },
      { label: "العلامة التجارية", href: "/services/branding" },
      { label: "الذكاء الاصطناعي والأتمتة", href: "/services/uae-ai-agent", accent: true },
      { label: "إعلانات جوجل", href: "/services/google-ads-dubai", accent: true },
      { label: "التسويق الرقمي", href: "/services/digital-marketing", accent: true },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "لوحة التحكم", href: "/dashboard" },
      { label: "سجل الهندسة", href: "/case-studies" },
      { label: "العملاء", href: "/clients" },
      { label: "المعرفة", href: "/blog" },
      { label: "دليل ظهور الذكاء الاصطناعي", href: "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business" },
      { label: "الأسعار", href: "/pricing" },
      { label: "الوظائف", href: "/careers" },
    ],
  },
  {
    title: "تواصل",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/vistabylara", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@vistabylara", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/vistabylara", external: true },
      { label: "X", href: "https://x.com/vistabylara", external: true },
      { label: "Behance", href: "https://www.behance.net/vistabylara", external: true },
      { label: "جلسة تقنية", href: siteConfig.whatsapp, external: true, accented: true },
    ],
  },
]

const SOCIAL_LINKS = COLUMNS[2].links.filter((link): link is FooterLink & { external: true } => link.external === true)
const whatsappHref = siteConfig.whatsapp
const footerAddress = `${siteConfig.address.streetAddress}, ${siteConfig.address.locality}, ${siteConfig.address.country}`

function isArabicPath(pathname: string | null) {
  return pathname === "/ar" || Boolean(pathname?.startsWith("/ar/"))
}

function localizeHref(href: string, isArabic: boolean) {
  if (!isArabic || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return href
  if (href === "/") return "/ar"
  if (href === "/knowledge/ai-visibility/why-ai-isnt-recommending-your-business") {
    return "/ar/knowledge/ai-visibility/why-ai-isnt-recommending-your-business"
  }
  if (href.startsWith("/ar")) return href
  return `/ar${href}`
}

export function SiteFooter() {
  const pathname = usePathname()
  const isArabic = isArabicPath(pathname)
  const columns = isArabic ? AR_COLUMNS : COLUMNS
  const socialLinks = columns[2].links.filter((link): link is FooterLink & { external: true } => link.external === true)

  return (
    <footer className="border-t border-border/40 bg-[#05070d]" lang={isArabic ? "ar-AE" : "en-AE"} dir={isArabic ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="overflow-hidden rounded-[1.75rem] border border-accent/15 bg-[#05070d]/92 shadow-[0_40px_110px_-72px_rgba(87,217,255,0.45)]">
          <div className="grid gap-12 p-8 sm:p-10 lg:grid-cols-[1.05fr_1.95fr] lg:gap-16">
            <div className="flex flex-col items-start">
              <Link href={isArabic ? "/ar" : "/"} className="flex items-center gap-2.5" aria-label={isArabic ? "الرئيسية - Vista by Lara" : "Vista by Lara home"}>
                <BrandMark />
                <TypewriterWordmark />
              </Link>

              <p className="mt-8 max-w-sm text-base leading-7 text-muted-foreground">
                {isArabic
                  ? "ظهور مدعوم بالبحث في الذكاء الاصطناعي، مواقع عالية الأداء، وأنظمة نمو لشركات الإمارات والخليج التي تريد أن يكتشفها الناس ومحركات الذكاء الاصطناعي."
                  : "Research-backed AI visibility, high-performance websites, and growth systems for UAE and GCC businesses that want to be discovered by people and AI."}
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-6 font-heading text-base font-semibold text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {siteConfig.email}
              </a>

              <address
                className="mt-4 not-italic text-sm leading-6 text-muted-foreground"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="block text-foreground transition-colors hover:text-accent"
                  itemProp="telephone"
                >
                  {siteConfig.phone}
                </a>
                <span className="block" itemProp="streetAddress">{footerAddress}</span>
              </address>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-foreground/25 px-6 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                >
                  {isArabic ? "ابدأ مشروعا" : "Start a project ->"}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-foreground/20 px-6 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10 hover:text-accent"
                >
                  {isArabic ? "واتساب" : "WhatsApp"}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2" aria-label="Social platforms">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {link.label.replace(" (Twitter)", "")}
                  </a>
                ))}
              </div>

            </div>

            <nav className="grid grid-cols-1 gap-9 sm:grid-cols-3" aria-label={isArabic ? "تنقل التذييل" : "Footer navigation"}>
              {columns.map((col) => (
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
                              rel="noopener noreferrer"
                              className={className}
                            >
                              {link.label}
                            </a>
                          </li>
                        )
                      }
                      return (
                        <li key={link.label}>
                          <Link href={localizeHref(link.href, isArabic)} className={className}>
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

          <section className="border-t border-border/70 px-8 py-6 sm:px-10" aria-labelledby="principal-profile-heading">
            <div className="grid gap-4 lg:grid-cols-[0.72fr_1.55fr_0.45fr] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">{isArabic ? "ملف القيادة" : "Principal Profile"}</p>
                <h2 id="principal-profile-heading" className="mt-2 font-heading text-base font-semibold text-foreground sm:text-lg">
                  {isArabic ? "لارا إيروس فارباكتيان، المعمارية الرئيسية" : "Lara Eros Farbactian, Principal Architect"}
                </h2>
              </div>
              <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
                {isArabic
                  ? "لارا فارباكتيان، المعمارية الرئيسية في Vista by Lara. حاصلة على دكتوراه في السياسة والاقتصاد من جامعة Vrije Universiteit Brussel، كما هو مدرج في LinkedIn. فائزة بجائزة Noble Business، وهي إشارة موثوقة للخبرة المؤسسية."
                  : siteConfig.principal.bio}
              </p>
              <a
                href={siteConfig.principal.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex justify-start text-sm font-semibold text-foreground transition-colors hover:text-accent lg:justify-end"
              >
                {isArabic ? "ملف LinkedIn المهني" : "LinkedIn authority profile"}
              </a>
            </div>
          </section>

          <div className="flex flex-col gap-6 border-t border-border/70 px-8 py-6 text-sm text-muted-foreground sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <p>&copy; {new Date().getFullYear()} Vista by Lara. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
              <div className="flex flex-wrap gap-5" aria-label={isArabic ? "المعلومات القانونية" : "Legal information"}>
                <a href={localizeHref("/privacy", isArabic)} className="transition-colors hover:text-accent">
                  {isArabic ? "الخصوصية" : "Privacy"}
                </a>
                <a href={localizeHref("/terms", isArabic)} className="transition-colors hover:text-accent">
                  {isArabic ? "الشروط" : "Terms"}
                </a>
                <a href={localizeHref("/cookies", isArabic)} className="transition-colors hover:text-accent">
                  {isArabic ? "ملفات تعريف الارتباط" : "Cookies"}
                </a>
              </div>
            </div>
            <Link
              href={localizeHref("/clients", isArabic)}
              className="inline-flex items-center gap-3 text-left text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <span
                className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(87,217,255,0.8)]"
                aria-hidden="true"
              />
              {isArabic ? "الفائزة بجائزة Noble Business 2025 - الابتكار في الأعمال" : "Noble Business Winner 2025 - Business Innovation"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
