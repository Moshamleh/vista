import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type ServiceCard = {
  title: string
  eyebrow: string
  description: string
  href: string
  shape: "diamond" | "sphere" | "cube" | "ring" | "stack" | "prism" | "core" | "beam"
  className?: string
  stats?: string
  tags: string[]
}

const SERVICES: ServiceCard[] = [
  {
    title: "Technical SEO",
    eyebrow: "Search visibility",
    description:
      "Technical SEO, schema, UAE keyword clusters, local search, and crawlability that support Google and AI discovery.",
    href: "/services/seo-optimization",
    shape: "ring",
    tags: ["SEO", "Schema", "Crawlability"],
  },
  {
    title: "AEO & GEO Services",
    eyebrow: "ChatGPT, Perplexity, AI Overview",
    description:
      "Answer and Generative Engine Optimization for AI citations, entity confidence, and UAE/GCC answer visibility across ChatGPT, Perplexity, Claude, and Google AI Overviews.",
    href: "/services/aeo-geo",
    shape: "core",
    stats: "ChatGPT, Perplexity, Claude, Bing Copilot",
    tags: ["AEO", "GEO", "AI Citations"],
  },
  {
    title: "Web Design",
    eyebrow: "High-performance web",
    description:
      "Cinematic, premium websites built for credibility, speed, and conversion for Dubai and GCC brands.",
    href: "/services/web-design-dubai",
    shape: "cube",
    stats: "Fast, responsive, conversion-ready",
    tags: ["Next.js", "Design", "Performance"],
  },
  {
    title: "Web Development",
    eyebrow: "Full-stack engineering",
    description:
      "Full-stack engineering, integrations, and scalable foundations for premium digital growth.",
    href: "/services/web-development-dubai",
    shape: "stack",
    tags: ["Engineering", "Integrations", "Scale"],
  },
  {
    title: "Shopify & E-commerce",
    eyebrow: "AI-ready commerce",
    description:
      "AI-driven e-commerce architecture for Shopify stores, product pages, conversion paths, and search-ready category content.",
    href: "/services/shopify-development-dubai",
    shape: "sphere",
    tags: ["Shopify", "Conversion", "AI Search"],
  },
  {
    title: "UI/UX Design",
    eyebrow: "UX/UI platforms",
    description:
      "UX systems for apps, portals, dashboards, and SaaS products built for Dubai, Abu Dhabi, and GCC users.",
    href: "/services/ui-ux-design-dubai",
    shape: "diamond",
    tags: ["UX", "UI", "SaaS"],
  },
  {
    title: "Branding",
    eyebrow: "Brand identity Dubai",
    description:
      "Strategic naming, positioning, visual identity, and brand systems for premium UAE companies that need to look established before the first pitch.",
    href: "/services/branding",
    shape: "diamond",
    stats: "Identity, guidelines, launch assets",
    tags: ["Brand Strategy", "Visual Identity", "Dubai Luxury"],
  },
  {
    title: "AI & Automation",
    eyebrow: "Agents and CRM",
    description:
      "AI agents, CRM automation, and lead routing for real estate, clinics, restaurants, retail, and service businesses that need faster inquiry handling and qualified UAE leads.",
    href: "/services/uae-ai-agent",
    shape: "beam",
    stats: "WhatsApp-ready, SEO-aware, CRM-friendly",
    tags: ["AI Agents", "CRM", "Automation"],
  },
  {
    title: "Google Ads",
    eyebrow: "PPC and search demand",
    description:
      "Google Ads management with GA4, GTM, conversion tracking, landing pages, and sales growth reporting for UAE lead generation.",
    href: "/services/google-ads-dubai",
    shape: "ring",
    tags: ["Google Ads", "PPC", "GA4"],
  },
  {
    title: "Digital Marketing",
    eyebrow: "Demand generation",
    description:
      "Premium campaigns, content, paid social, landing pages, and analytics loops for UAE brands that need qualified leads without cheap noise.",
    href: "/services/digital-marketing",
    shape: "prism",
    tags: ["Campaigns", "Content", "Analytics"],
  },
]

function ServiceShape({ shape }: { shape: ServiceCard["shape"] }) {
  return (
    <span className="relative inline-flex h-16 w-16 items-center justify-center [perspective:700px]" aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-accent/15 blur-2xl" />
      <span
        className={cn(
          "relative block border border-accent/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(87,217,255,0.18)_42%,rgba(4,8,12,0.78))] shadow-[inset_0_1px_1px_rgba(255,255,255,0.42),0_22px_60px_rgba(87,217,255,0.18)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105",
          shape === "diamond" && "h-10 w-10 rotate-45",
          shape === "sphere" && "h-12 w-12 rounded-full",
          shape === "cube" && "h-11 w-11 rotate-6 [transform-style:preserve-3d]",
          shape === "ring" && "h-12 w-12 rounded-full border-[6px] bg-transparent",
          shape === "stack" && "h-10 w-12 -skew-y-6",
          shape === "prism" && "h-12 w-10 [clip-path:polygon(50%_0,100%_32%,82%_100%,18%_100%,0_32%)]",
          shape === "core" && "h-12 w-12 rounded-[35%] rotate-12",
          shape === "beam" && "h-9 w-14 skew-x-[-18deg]",
        )}
      />
      {(shape === "stack" || shape === "cube") && (
        <span className="absolute h-10 w-12 translate-x-2 translate-y-2 -skew-y-6 border border-accent/18 bg-accent/5" />
      )}
    </span>
  )
}

function ServiceBentoCard({ service, index }: { service: ServiceCard; index: number }) {
  return (
    <Link
      href={service.href}
      className={cn(
        "group relative min-h-[280px] overflow-hidden border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-[#0b0d0d] sm:p-7",
        service.className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:2.25rem_2.25rem]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[80px] transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="relative flex h-full flex-col justify-between gap-10">
        <div>
          <div className="flex items-start justify-between gap-6">
            <ServiceShape shape={service.shape} />
            <span className="font-mono text-xs text-muted-foreground/70">0{index + 1}</span>
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-accent">{service.eyebrow}</p>
          <h3 className="mt-4 max-w-xl font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{service.description}</p>
        </div>

        <div>
          {service.stats && (
            <p className="mb-5 border-l border-accent/45 pl-4 text-sm font-medium text-foreground/80">{service.stats}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            View service
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function Services() {
  const topServices = SERVICES.slice(0, 4)
  const bottomServices = SERVICES.slice(4)

  return (
    <section id="services" aria-labelledby="services-heading" className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid auto-rows-fr gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {topServices.map((service, index) => (
            <ServiceBentoCard key={service.title} service={service} index={index} />
          ))}

          <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden border border-white/10 bg-[#0a0a0a] p-7 text-center sm:p-10 lg:min-h-[420px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(87,217,255,0.12),transparent_58%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
            <div className="relative">
              <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                <Sparkles className="h-4 w-4" />
                Service architecture
              </p>
              <h2 id="services-heading" className="mt-6 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Digital systems for Dubai brands that need to rank, convert, and scale.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Vista by Lara combines luxury brand strategy, UX design, AI visibility, and production engineering into
                one connected growth system for UAE and GCC companies.
              </p>
            </div>
          </div>

          {bottomServices.map((service, index) => (
            <ServiceBentoCard key={service.title} service={service} index={index + topServices.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
