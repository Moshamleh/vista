"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion } from "framer-motion"
import { Reveal } from "@/components/reveal"

const FEATURED = {
  value: 33,
  suffix: "%",
  label: "Average increase in leads, inquiries, and online engagement within the first six months after launch.",
}

const STATS = [
  { value: 14, suffix: "+", label: "Years crafting digital products" },
  { value: 320, suffix: "+", label: "Projects shipped worldwide" },
  { value: 6, suffix: " mo", label: "To measurable results" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section id="about" className="bg-card text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Our approach</p>
            <h2 className="mt-6 font-heading text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
              Websites built for speed, trust, and conversion.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground/80">
              We design websites that turn more visitors into customers — pairing fast, trustworthy experiences with
              craft and a relentless eye for detail, then refining with data long after launch.
            </p>
          </Reveal>

          <div className="flex flex-col gap-10">
            {/* Featured Clay-style hero stat */}
            <Reveal>
              <div className="rounded-[2rem] border border-accent/15 bg-[#0c1321] p-10 shadow-[0_40px_90px_-64px_rgba(87,217,255,0.35)]">
                <p className="font-heading text-[5.5rem] font-medium leading-[0.9] tracking-tight text-accent sm:text-[7rem]">
                  <Counter value={FEATURED.value} suffix={FEATURED.suffix} />
                </p>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground/70">{FEATURED.label}</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="rounded-3xl border border-accent/10 bg-[#0b1221] p-8 shadow-[0_24px_80px_-70px_rgba(87,217,255,0.22)]">
                    <p className="font-heading text-4xl font-medium tracking-tight text-accent sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground/70">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
