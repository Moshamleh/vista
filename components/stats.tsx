"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { GlobeCdn } from "@/components/ui/globe-cdn"
import { cn } from "@/lib/utils"
import { getWhatsappLink } from "@/lib/site"

type ApproachSection = {
  id: string
  badge: string
  title: string
  subtitle?: string
  description: string
  features?: { title: string; description: string }[]
  metric: string
  signal: string
}

const approachSections: ApproachSection[] = [
  {
    id: "demand",
    badge: "01 / Demand map",
    title: "Map Dubai buyer intent",
    subtitle: "SEO, AEO, GEO, ads, WhatsApp, and competitor gaps.",
    description:
      "Vista by Lara identifies how premium UAE buyers search, compare, and ask AI tools for recommendations before they contact a brand.",
    features: [
      { title: "Dubai keyword clusters", description: "Branding, UX, websites, AI, and commercial-intent service terms." },
      { title: "AI answer questions", description: "The exact prompts buyers ask ChatGPT, Gemini, Perplexity, and Google AI." },
    ],
    metric: "Dubai",
    signal: "Primary market",
  },
  {
    id: "system",
    badge: "02 / System build",
    title: "Connect every platform",
    subtitle: "Website, brand, content, analytics, CRM, and WhatsApp.",
    description:
      "A premium website should not sit alone. We connect the brand system to content, tracking, lead routing, and follow-up paths.",
    features: [
      { title: "Website as lead machine", description: "Service pages, proof, FAQs, schema, and conversion paths work together." },
      { title: "Platform links", description: "Social, search, WhatsApp, email, and CRM become one operating model." },
    ],
    metric: "360",
    signal: "Connected model",
  },
  {
    id: "visibility",
    badge: "03 / AI visibility",
    title: "Become easier to recommend",
    subtitle: "Structured authority for search engines and AI systems.",
    description:
      "We make your brand easier for AI search systems to understand by clarifying entities, services, locations, outcomes, and proof.",
    features: [
      { title: "AEO-ready answers", description: "Direct answer blocks and FAQs written for UAE search behavior." },
      { title: "GEO signals", description: "Clear Dubai, UAE, and GCC entity relationships for AI-generated citations." },
    ],
    metric: "AI",
    signal: "Recommendation layer",
  },
  {
    id: "conversion",
    badge: "04 / Lead flow",
    title: "Turn attention into inquiries",
    subtitle: "Qualified WhatsApp, form, and sales-ready conversations.",
    description:
      "The final system turns visibility into action with clear CTAs, trust sections, response paths, and measurable lead quality.",
    features: [
      { title: "WhatsApp conversion", description: "Tracked CTAs and page-specific intent help qualify UAE inquiries." },
      { title: "Measurement loop", description: "Search, AI mentions, page behavior, and lead sources feed the next move." },
    ],
    metric: "AED",
    signal: "Revenue path",
  },
]

const globePositions = [
  { x: 16, y: 0, scale: 1 },
  { x: 0, y: -8, scale: 1.08 },
  { x: -10, y: 8, scale: 1.16 },
  { x: 8, y: 0, scale: 1.24 },
]

export function Stats() {
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLElement>(null)

  const activeContent = approachSections[activeSection] ?? approachSections[0]
  const activePosition = globePositions[activeSection] ?? globePositions[0]

  const updateActiveSection = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const total = Math.max(rect.height - window.innerHeight, 1)
    const rawProgress = Math.min(Math.max(-rect.top / total, 0), 1)
    setProgress(rawProgress)

    const viewportCenter = window.innerHeight * 0.52
    let nextActive = 0
    let closest = Number.POSITIVE_INFINITY

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return
      const itemRect = ref.getBoundingClientRect()
      const itemCenter = itemRect.top + itemRect.height / 2
      const distance = Math.abs(itemCenter - viewportCenter)
      if (distance < closest) {
        closest = distance
        nextActive = index
      }
    })

    setActiveSection(nextActive)
  }, [])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        updateActiveSection()
        ticking = false
      })
      ticking = true
    }

    updateActiveSection()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [updateActiveSection])

  const visibleDots = useMemo(() => approachSections.map((item) => item.badge.split(" / ")[1]), [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative my-10 overflow-hidden border-y border-white/10 bg-[#030408] text-foreground sm:my-16"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute right-[-12%] top-[12%] h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-[150px]" />
        <div className="absolute bottom-[6%] left-[-12%] h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[140px]" />
      </div>

      <div className="absolute left-0 top-0 z-20 h-1 w-full bg-white/5">
        <div
          className="h-full origin-left bg-accent shadow-[0_0_22px_rgba(87,217,255,0.55)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.96fr_1.04fr] lg:py-16">
        <div className="space-y-16 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-accent">Our approach</p>
            <h2 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl">
              One connected growth model for Dubai and GCC brands.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Vista by Lara turns branding, websites, SEO, AEO, GEO, analytics, and WhatsApp conversion into one
              operating system. The goal is simple: make your business easier to find, easier to trust, and easier for
              AI search systems to recommend.
            </p>
          </div>

          <div className="space-y-8">
            {approachSections.map((section, index) => (
              <div
                key={section.id}
                ref={(element) => {
                  sectionRefs.current[index] = element
                }}
                className={cn(
                  "rounded-[1.35rem] border p-5 transition-all duration-500 sm:p-6",
                  activeSection === index
                    ? "border-accent/35 bg-accent/[0.065] shadow-[0_28px_100px_-80px_rgba(87,217,255,0.85)]"
                    : "border-white/10 bg-white/[0.025]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{section.badge}</p>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                    {section.signal}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                  {section.title}
                </h3>
                <p className="mt-3 font-heading text-lg font-semibold leading-7 text-foreground/62">{section.subtitle}</p>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{section.description}</p>

                {section.features ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.features.map((feature) => (
                      <div key={feature.title} className="rounded-2xl border border-white/10 bg-background/40 p-4">
                        <div className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <div>
                            <h4 className="font-heading text-base font-bold tracking-tight text-foreground">{feature.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:flex lg:min-h-[calc(100vh-10rem)] lg:items-center">
          <div className="relative w-full overflow-visible rounded-[2rem] border border-accent/15 bg-[#071018]/88 p-4 shadow-[0_42px_150px_-95px_rgba(87,217,255,0.95)] backdrop-blur sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(87,217,255,0.16),transparent_45%)]" />
            <div className="relative grid gap-5 lg:grid-cols-[1fr_0.82fr] lg:items-center">
              <div className="relative flex min-h-[24rem] items-center justify-center overflow-visible rounded-[1.5rem] border border-white/5 bg-[radial-gradient(circle_at_center,rgba(87,217,255,0.2),rgba(3,4,8,0.96)_72%)] p-6 sm:min-h-[32rem] lg:min-h-[34rem]">
                <div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-accent/15 blur-3xl" />
                <div
                  className="relative z-10 w-full max-w-[19rem] transition-transform duration-700 ease-out sm:max-w-[25rem] lg:max-w-[29rem]"
                  style={{
                    transform: `translate3d(${activePosition.x}px, ${activePosition.y}px, 0) scale(${activePosition.scale})`,
                  }}
                >
                  <GlobeCdn speed={0.0024 + activeSection * 0.00035} />
                </div>
              </div>

              <div className="p-3 sm:p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Live signal network
                </div>
                <p className="mt-6 font-heading text-6xl font-extrabold tracking-tight text-accent sm:text-7xl">
                  {activeContent.metric}
                </p>
                <h3 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight text-foreground">
                  {activeContent.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{activeContent.description}</p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {["AEO", "GEO", "SEO", "CRM"].map((label) => (
                    <div key={label} className="rounded-2xl border border-accent/12 bg-background/30 p-4">
                      <p className="font-heading text-2xl font-extrabold text-accent">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {label === "AEO"
                          ? "Answer-ready"
                          : label === "GEO"
                            ? "AI citation"
                            : label === "SEO"
                              ? "Dubai demand"
                              : "Lead routing"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {visibleDots.map((dot, index) => (
                    <button
                      key={dot}
                      onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
                        activeSection === index
                          ? "border-accent bg-accent text-background"
                          : "border-white/15 text-foreground/55 hover:border-accent/40 hover:text-accent",
                      )}
                    >
                      {dot}
                    </button>
                  ))}
                </div>

                <a
                  href={getWhatsappLink("general")}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-heading text-sm font-bold uppercase tracking-[0.06em] text-background transition-transform hover:scale-[1.02]"
                >
                  Build my growth system <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
