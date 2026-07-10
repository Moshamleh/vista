"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Languages, MapPin, Search, SlidersHorizontal, X } from "lucide-react"

type ServiceCategory = "all" | "ai-visibility" | "seo" | "paid" | "web" | "brand" | "commerce" | "automation"
type ServiceLocation = "all" | "dubai" | "uae" | "gcc" | "arabic"
type ServiceIntent = "all" | "visibility" | "leads" | "conversion" | "trust" | "automation"

type ServiceSearchItem = {
  title: string
  titleAr: string
  href: string
  category: Exclude<ServiceCategory, "all">
  locations: Exclude<ServiceLocation, "all">[]
  intents: Exclude<ServiceIntent, "all">[]
  summary: string
  summaryAr: string
  keywords: string[]
  priority?: boolean
}

const serviceItems: ServiceSearchItem[] = [
  {
    title: "AEO & GEO Services",
    titleAr: "خدمات AEO و GEO",
    href: "/services/aeo-geo",
    category: "ai-visibility",
    locations: ["dubai", "uae", "gcc", "arabic"],
    intents: ["visibility", "trust"],
    summary: "Answer and Generative Engine Optimization for ChatGPT, Perplexity, Claude, Bing Copilot, and Google AI Overviews.",
    summaryAr: "تحسين محركات الإجابة والتوليد عبر ChatGPT وPerplexity وClaude وBing Copilot وGoogle AI Overviews.",
    keywords: ["geo", "aeo", "generative engine optimization", "answer engine optimization", "ai citation", "chatgpt", "perplexity", "claude", "bing copilot", "تحسين الظهور بالذكاء الاصطناعي", "دبي"],
    priority: true,
  },
  {
    title: "SEO",
    titleAr: "تحسين محركات البحث SEO",
    href: "/services/seo-optimization",
    category: "seo",
    locations: ["dubai", "uae", "arabic"],
    intents: ["visibility", "leads"],
    summary: "Technical SEO, keyword clusters, structured data, local SEO, Arabic SEO, and crawlability for UAE brands.",
    summaryAr: "سيو تقني، كلمات مفتاحية، بيانات منظمة، سيو محلي، وسيو عربي للعلامات في الإمارات.",
    keywords: ["seo", "technical seo", "local seo", "arabic seo", "خدمات سيو", "شركة سيو دبي"],
    priority: true,
  },
  {
    title: "Google Ads",
    titleAr: "إعلانات جوجل",
    href: "/services/google-ads-dubai",
    category: "paid",
    locations: ["dubai", "uae", "gcc"],
    intents: ["leads", "conversion"],
    summary: "Google Ads, GA4, GTM, conversion tracking, landing pages, and qualified UAE demand generation.",
    summaryAr: "إعلانات جوجل، GA4، GTM، تتبع التحويل، وصفحات هبوط لجذب طلب مؤهل في الإمارات.",
    keywords: ["google ads", "ppc", "lead generation", "ga4", "gtm"],
  },
  {
    title: "Digital Marketing",
    titleAr: "التسويق الرقمي",
    href: "/services/digital-marketing",
    category: "paid",
    locations: ["dubai", "uae", "gcc"],
    intents: ["leads", "conversion"],
    summary: "Content, social, paid social including Meta Ads, CRO, and analytics for UAE brands that need qualified demand.",
    summaryAr: "محتوى، سوشيال ميديا، إعلانات ميتا، تحسين التحويل، وتحليلات للعلامات في الإمارات.",
    keywords: ["digital marketing", "meta ads", "facebook ads", "instagram ads", "social media", "content marketing"],
  },
  {
    title: "Web Design",
    titleAr: "تصميم المواقع",
    href: "/services/web-design-dubai",
    category: "web",
    locations: ["dubai", "uae", "gcc", "arabic"],
    intents: ["conversion", "trust"],
    summary: "Premium websites for UAE brands that need mobile clarity, trust, AEO sections, and conversion paths.",
    summaryAr: "مواقع فاخرة للعلامات في الإمارات تحتاج وضوحا على الهاتف، ثقة، AEO، ومسارات تحويل.",
    keywords: ["web design", "website dubai", "mobile website", "تصميم مواقع دبي"],
  },
  {
    title: "Web Development",
    titleAr: "تطوير المواقع",
    href: "/services/web-development-dubai",
    category: "web",
    locations: ["dubai", "uae", "gcc"],
    intents: ["conversion", "trust"],
    summary: "Full-stack engineering, integrations, and scalable platforms for Dubai and GCC digital infrastructure.",
    summaryAr: "هندسة كاملة، تكاملات، ومنصات قابلة للتوسع للبنية الرقمية في الإمارات والخليج.",
    keywords: ["web development", "full stack", "integrations", "تطوير مواقع"],
  },
  {
    title: "Shopify & E-commerce",
    titleAr: "شوبيفاي والتجارة الإلكترونية",
    href: "/services/shopify-development-dubai",
    category: "commerce",
    locations: ["dubai", "uae", "gcc"],
    intents: ["conversion", "automation", "visibility"],
    summary: "AI-assisted Shopify, product discovery, conversion UX, AEO FAQs, and GEO-ready product content.",
    summaryAr: "شوبيفاي بالذكاء الاصطناعي، اكتشاف المنتجات، تجربة تحويل، AEO، ومحتوى GEO للمنتجات.",
    keywords: ["shopify", "ecommerce", "ai ecommerce", "product seo"],
  },
  {
    title: "Branding",
    titleAr: "الهوية التجارية",
    href: "/services/branding",
    category: "brand",
    locations: ["dubai", "uae", "gcc", "arabic"],
    intents: ["trust", "conversion"],
    summary: "Premium brand identity, positioning, visual systems, and authority language for Dubai and GCC brands.",
    summaryAr: "هوية وتموضع وأنظمة بصرية ولغة سلطة مؤسسية للعلامات في دبي والخليج.",
    keywords: ["branding", "brand identity", "luxury branding", "هوية تجارية", "شركة براندنج دبي"],
  },
  {
    title: "UI/UX Design",
    titleAr: "تصميم UI/UX",
    href: "/services/ui-ux-design-dubai",
    category: "brand",
    locations: ["dubai", "uae", "gcc"],
    intents: ["conversion", "trust"],
    summary: "UX systems for apps, portals, dashboards, and SaaS products built for Dubai, Abu Dhabi, and GCC users.",
    summaryAr: "أنظمة تجربة مستخدم للتطبيقات والبوابات ومنصات SaaS في الإمارات والخليج.",
    keywords: ["ux", "ui", "saas design", "تصميم تجربة المستخدم"],
  },
  {
    title: "AI & Automation",
    titleAr: "الذكاء الاصطناعي والأتمتة",
    href: "/services/uae-ai-agent",
    category: "automation",
    locations: ["dubai", "uae", "gcc", "arabic"],
    intents: ["automation", "leads", "conversion"],
    summary: "AI agents and CRM automation for real estate, clinics, retail, restaurants, and service businesses that need qualified UAE leads.",
    summaryAr: "وكلاء ذكاء اصطناعي وأتمتة CRM للعقارات والعيادات والتجزئة والمطاعم وتأهيل العملاء في الإمارات.",
    keywords: ["ai agent", "whatsapp agent", "lead qualification", "crm automation", "وكيل ذكاء اصطناعي"],
  },
]

const categories: Array<{ value: ServiceCategory; label: string; labelAr: string }> = [
  { value: "all", label: "All services", labelAr: "كل الخدمات" },
  { value: "ai-visibility", label: "AI visibility", labelAr: "ظهور الذكاء الاصطناعي" },
  { value: "seo", label: "SEO", labelAr: "سيو" },
  { value: "paid", label: "Paid media", labelAr: "إعلانات مدفوعة" },
  { value: "web", label: "Websites", labelAr: "مواقع" },
  { value: "brand", label: "Branding", labelAr: "هوية" },
  { value: "commerce", label: "E-commerce", labelAr: "تجارة إلكترونية" },
  { value: "automation", label: "Automation", labelAr: "أتمتة" },
]

const locations: Array<{ value: ServiceLocation; label: string; labelAr: string }> = [
  { value: "all", label: "All markets", labelAr: "كل الأسواق" },
  { value: "dubai", label: "Dubai", labelAr: "دبي" },
  { value: "uae", label: "UAE", labelAr: "الإمارات" },
  { value: "gcc", label: "GCC", labelAr: "الخليج" },
  { value: "arabic", label: "Arabic", labelAr: "عربي" },
]

const intents: Array<{ value: ServiceIntent; label: string; labelAr: string }> = [
  { value: "all", label: "All goals", labelAr: "كل الأهداف" },
  { value: "visibility", label: "Visibility", labelAr: "الظهور" },
  { value: "leads", label: "Leads", labelAr: "عملاء محتملون" },
  { value: "conversion", label: "Conversion", labelAr: "التحويل" },
  { value: "trust", label: "Trust", labelAr: "الثقة" },
  { value: "automation", label: "Automation", labelAr: "الأتمتة" },
]

function searchText(item: ServiceSearchItem) {
  return [
    item.title,
    item.titleAr,
    item.summary,
    item.summaryAr,
    item.category,
    ...item.locations,
    ...item.intents,
    ...item.keywords,
  ].join(" ").toLowerCase()
}

export function ServiceFinder() {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [advanced, setAdvanced] = useState(true)
  const [category, setCategory] = useState<ServiceCategory>("all")
  const [location, setLocation] = useState<ServiceLocation>("all")
  const [intent, setIntent] = useState<ServiceIntent>("all")

  const isArabic = language === "ar"
  const normalizedQuery = query.trim().toLowerCase()
  const filteredServices = useMemo(() => {
    return serviceItems
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => (location === "all" ? true : item.locations.includes(location)))
      .filter((item) => (intent === "all" ? true : item.intents.includes(intent)))
      .filter((item) => (normalizedQuery.length === 0 ? true : searchText(item).includes(normalizedQuery)))
      .sort((a, b) => Number(Boolean(b.priority)) - Number(Boolean(a.priority)))
  }, [category, intent, location, normalizedQuery])

  const visibleServices = filteredServices.slice(0, advanced ? 8 : 5)

  return (
    <section id="service-finder" aria-labelledby="service-finder-heading" className="relative bg-[#05070d] px-5 py-20 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:2.75rem_2.75rem]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
              {isArabic ? "البحث عن الخدمات" : "Service finder"}
            </p>
            <h2 id="service-finder-heading" className="mt-5 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {isArabic ? "ابحث عن خدمات GEO وAEO وSEO في دبي." : "Find GEO, AEO, SEO, and growth services in Dubai."}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {isArabic
                ? "اختر الخدمة حسب السوق والهدف. النتائج تشمل دبي، الإمارات، الخليج، والبحث العربي."
                : "Search by service, market, buyer intent, AI platform, or Arabic keyword across Vista by Lara service pages."}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link href="/services/aeo-geo" className="border border-accent/35 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                AEO &amp; GEO Services
              </Link>
              <Link href="/services/seo-optimization" className="border border-accent/35 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                SEO
              </Link>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0a0d14] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">{isArabic ? "ابحث عن خدمة" : "Search services"}</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" aria-hidden="true" />
                <input
                  id="service-finder-search"
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  dir={isArabic ? "rtl" : "ltr"}
                  placeholder={isArabic ? "مثال: GEO، AEO، سيو عربي، إعلانات جوجل" : "Try GEO, AEO, Arabic SEO, ChatGPT, Google Ads"}
                  className="h-14 w-full border border-white/10 bg-black/35 pl-12 pr-12 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/10 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label={isArabic ? "مسح البحث" : "Clear search"}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <button
                type="button"
                onClick={() => setLanguage((value) => (value === "en" ? "ar" : "en"))}
                className="inline-flex h-14 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Languages className="h-4 w-4" />
                {isArabic ? "AR" : "EN"}
              </button>

              <button
                type="button"
                onClick={() => setAdvanced((value) => !value)}
                className="inline-flex h-14 items-center justify-center gap-2 border border-white/10 px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {isArabic ? "متقدم" : "Advanced"}
              </button>
            </div>

            {advanced && (
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {isArabic ? "الفئة" : "Category"}
                  </span>
                  <select id="service-finder-category" name="category" value={category} onChange={(event) => setCategory(event.target.value as ServiceCategory)} className="h-12 w-full border border-white/10 bg-black/35 px-3 text-sm text-foreground outline-none focus:border-accent">
                    {categories.map((item) => (
                      <option key={item.value} value={item.value} className="bg-[#05070d]">
                        {isArabic ? item.labelAr : item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {isArabic ? "السوق" : "Market"}
                  </span>
                  <select id="service-finder-location" name="location" value={location} onChange={(event) => setLocation(event.target.value as ServiceLocation)} className="h-12 w-full border border-white/10 bg-black/35 px-3 text-sm text-foreground outline-none focus:border-accent">
                    {locations.map((item) => (
                      <option key={item.value} value={item.value} className="bg-[#05070d]">
                        {isArabic ? item.labelAr : item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {isArabic ? "الهدف" : "Goal"}
                  </span>
                  <select id="service-finder-intent" name="intent" value={intent} onChange={(event) => setIntent(event.target.value as ServiceIntent)} className="h-12 w-full border border-white/10 bg-black/35 px-3 text-sm text-foreground outline-none focus:border-accent">
                    {intents.map((item) => (
                      <option key={item.value} value={item.value} className="bg-[#05070d]">
                        {isArabic ? item.labelAr : item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {visibleServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group grid min-h-[132px] gap-4 border border-white/10 bg-white/[0.025] p-4 transition-colors hover:border-accent/45 hover:bg-accent/10 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-xl font-semibold text-foreground">
                        {isArabic ? item.titleAr : item.title}
                      </h3>
                      {item.priority && (
                        <span className="border border-accent/30 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">
                          {isArabic ? "مطلوب" : "High demand"}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {isArabic ? item.summaryAr : item.summary}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      Dubai / UAE / GCC
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 self-end text-sm font-semibold text-accent">
                    {isArabic ? "افتح الخدمة" : "Open service"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {visibleServices.length === 0 && (
              <div className="mt-5 border border-white/10 bg-black/25 p-6 text-sm text-muted-foreground">
                {isArabic ? "لا توجد نتيجة مطابقة. جرب GEO أو AEO أو سيو عربي." : "No matching service. Try GEO, AEO, Arabic SEO, or AI SEO."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
