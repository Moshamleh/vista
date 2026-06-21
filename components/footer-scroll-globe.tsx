"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { GlobeCdn } from "@/components/ui/globe-cdn"
import { cn } from "@/lib/utils"

interface ScrollGlobeSection {
  id: string
  badge?: string
  title: string
  subtitle?: string
  description: string
  align?: "left" | "center" | "right"
  features?: { title: string; description: string }[]
  actions?: { label: string; variant: "primary" | "secondary" }[]
}

const sections: ScrollGlobeSection[] = [
  {
    id: "hero",
    badge: "Welcome",
    title: "Explore",
    subtitle: "Our World",
    description:
      "Journey through an immersive experience where technology meets innovation. Watch as perspectives shift and possibilities unfold with every interaction, creating a symphony of digital artistry.",
    align: "left",
    actions: [
      { label: "Begin Journey", variant: "primary" },
      { label: "Learn More", variant: "secondary" },
    ],
  },
  {
    id: "innovation",
    badge: "Innovation",
    title: "Connected Worldwide",
    description:
      "From every corner of the globe, we witness the interconnected web of human achievement. Each connection represents progress, every interaction drives innovation forward into uncharted territories.",
    align: "center",
  },
  {
    id: "discovery",
    badge: "Discovery",
    title: "Expanding",
    subtitle: "Possibilities",
    description:
      "As we push beyond familiar boundaries, new worlds of opportunity emerge from the horizon. What seemed impossible yesterday becomes tomorrow's foundation for extraordinary achievements.",
    align: "left",
    features: [
      { title: "Limitless Exploration", description: "Discover new dimensions of possibility and innovation" },
      { title: "Seamless Integration", description: "Where cutting-edge technology meets human intuition" },
      { title: "Future-Ready Solutions", description: "Built for tomorrow's challenges and opportunities" },
    ],
  },
  {
    id: "future",
    badge: "Future",
    title: "Our Shared",
    subtitle: "Tomorrow",
    description:
      "In this moment of unity, we see not just a planet, but a canvas of infinite human potential. Every connection represents hope, every innovation builds bridges to our collective future of endless possibilities.",
    align: "center",
    actions: [
      { label: "Join the Movement", variant: "primary" },
      { label: "Explore More", variant: "secondary" },
    ],
  },
]

const globePositions = [
  { x: 0, y: 0, scale: 1 },
  { x: 0, y: -8, scale: 0.96 },
  { x: 0, y: 8, scale: 1.04 },
  { x: 0, y: 0, scale: 1.02 },
]

export function FooterScrollGlobe() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const activePosition = globePositions[activeSection] ?? globePositions[0]

  const updateScrollPosition = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const progressRange = Math.max(rect.height - window.innerHeight, 1)
    const progress = Math.min(Math.max(-rect.top / progressRange, 0), 1)
    setScrollProgress(progress)

    const viewportCenter = window.innerHeight / 2
    let nextActive = 0
    let minDistance = Number.POSITIVE_INFINITY

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return
      const sectionRect = ref.getBoundingClientRect()
      const sectionCenter = sectionRect.top + sectionRect.height / 2
      const distance = Math.abs(sectionCenter - viewportCenter)

      if (distance < minDistance) {
        minDistance = distance
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
        updateScrollPosition()
        ticking = false
      })
      ticking = true
    }

    updateScrollPosition()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [updateScrollPosition])

  const navLabels = useMemo(() => sections.map((section) => section.badge || section.id), [])

  return (
    <section
      ref={containerRef}
      className="relative my-16 w-full max-w-screen overflow-hidden border-y border-white/10 bg-background pt-20 text-foreground sm:my-24 sm:pt-28"
      aria-label="Interactive world exploration"
    >
      <div className="sticky top-0 z-40 h-0.5 w-full bg-gradient-to-r from-border/20 via-border/40 to-border/20">
        <div
          className="h-full bg-gradient-to-r from-accent via-sky-300 to-accent shadow-[0_0_12px_rgba(87,217,255,0.35)] will-change-transform"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
          }}
        />
      </div>

      <div className="sticky top-28 z-40 float-right mr-3 hidden sm:block lg:mr-8">
        <div className="space-y-4 lg:space-y-6">
          {navLabels.map((label, index) => (
            <div key={label} className="group relative flex justify-end">
              <div
                className={cn(
                  "pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-background/95 px-3 py-1.5 text-xs font-medium shadow-xl backdrop-blur-md transition",
                  activeSection === index ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{label}</span>
                </div>
              </div>

              <button
                onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className={cn(
                  "relative h-3 w-3 rounded-full border-2 transition-all duration-300 hover:scale-125",
                  activeSection === index
                    ? "border-accent bg-accent shadow-lg shadow-accent/30"
                    : "border-muted-foreground/40 bg-transparent hover:border-accent/70 hover:bg-accent/10",
                )}
                aria-label={`Go to ${label}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-12">
        <div>
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(element) => {
              sectionRefs.current[index] = element
            }}
            className={cn(
              "relative flex min-h-[88vh] w-full max-w-full flex-col justify-center overflow-visible py-20 sm:py-24 lg:min-h-screen lg:py-24",
              section.align === "center" && "items-center text-center",
              section.align === "right" && "items-end text-right",
              section.align !== "center" && section.align !== "right" && "items-start text-left",
            )}
          >
            <div
              className={cn(
                "w-full max-w-sm transition-all duration-700 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl",
                index === activeSection ? "translate-y-0 opacity-100" : "translate-y-3 opacity-75",
              )}
            >
              <div className="mb-5 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {section.badge}
              </div>

              <h2
                className={cn(
                  "mb-6 font-heading font-extrabold leading-[1.02] tracking-tight",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                )}
              >
                {section.subtitle ? (
                  <span className="block space-y-2">
                    <span className="block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {section.title}
                    </span>
                    <span className="block text-[0.65em] font-semibold tracking-tight text-muted-foreground/90">
                      {section.subtitle}
                    </span>
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                    {section.title}
                  </span>
                )}
              </h2>

              <div
                className={cn(
                  "mb-8 text-base font-light leading-relaxed text-muted-foreground/82 sm:mb-10 sm:text-lg lg:text-xl",
                  section.align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
                )}
              >
                <p>{section.description}</p>
                {index === 0 ? (
                  <div className="mx-auto my-8 w-full max-w-[18rem] rounded-full bg-accent/[0.03] p-3 lg:hidden">
                    <GlobeCdn speed={0.0025} />
                  </div>
                ) : null}
                {index === 0 ? (
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground/60 sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      <span>Interactive Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      <span>Scroll to Explore</span>
                    </div>
                  </div>
                ) : null}
              </div>

              {section.features ? (
                <div className="mb-8 grid gap-3 sm:mb-10 sm:gap-4">
                  {section.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="group rounded-xl border border-white/10 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:bg-card/80 hover:shadow-lg hover:shadow-accent/5 sm:p-5 lg:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent/70 transition-colors group-hover:bg-accent" />
                        <div className="min-w-0 flex-1 space-y-2">
                          <h3 className="font-heading text-base font-bold text-card-foreground sm:text-lg">{feature.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground/80 sm:text-base">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.actions ? (
                <div
                  className={cn(
                    "flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4",
                    section.align === "center" && "justify-center",
                    section.align === "right" && "justify-end",
                    (!section.align || section.align === "left") && "justify-start",
                  )}
                >
                  {section.actions.map((action) => (
                    <a
                      key={action.label}
                      href={action.variant === "primary" ? "#contact-form" : "#services"}
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-base",
                        action.variant === "primary"
                          ? "bg-accent text-background shadow-lg shadow-accent/20 hover:bg-accent/90"
                          : "border-2 border-border/60 bg-background/50 text-foreground backdrop-blur-sm hover:border-accent/30 hover:bg-accent/10",
                      )}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:items-center">
          <div className="relative mx-auto flex min-h-[28rem] w-full max-w-[42rem] items-center justify-center overflow-visible rounded-[2rem] border border-accent/15 bg-[#071018]/88 p-8 shadow-[0_42px_150px_-95px_rgba(87,217,255,0.95)] sm:min-h-[34rem] lg:min-h-[40rem]">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(87,217,255,0.2),rgba(3,4,8,0.96)_70%)]" />
            <div
              className="relative z-10 w-full max-w-[22rem] rounded-full bg-accent/[0.03] p-4 transition-transform duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] sm:max-w-[29rem] lg:max-w-[34rem]"
              style={{
                transform: `translate3d(${activePosition.x}px, ${activePosition.y}px, 0) scale(${activePosition.scale})`,
                opacity: activeSection === 3 ? 0.82 : 0.96,
              }}
            >
              <GlobeCdn speed={0.0025} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
