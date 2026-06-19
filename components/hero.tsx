"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

// Spline scene is client-only and lazy-loaded so it never blocks first paint.
const HeroSpline = dynamic(() => import("./hero-spline").then((m) => m.HeroSpline), {
  ssr: false,
})

const words = ["Vista", "is", "a", "Dubai", "branding", "and", "UX", "design", "agency"]

export function Hero() {
  // Mount the scene only on the client so it never blocks SSR / first paint.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Branding · UX · Technology
          </motion.p>

          <h1 className="max-w-[16ch] font-heading text-5xl font-medium leading-[0.98] tracking-tight text-balance text-foreground sm:text-7xl lg:text-[5.5rem]">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-background shadow-[0_24px_80px_-40px_rgba(87,217,255,0.5)] transition-transform hover:scale-[1.03] hover:bg-accent/90"
            >
              View our work
            </a>
            <a href="#services" className="inline-flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-accent">
              <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-accent">
                Explore services
              </span>
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Spline 3D robot scene — replaces the previous hero object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="order-1 h-[320px] w-full sm:h-[420px] lg:order-2 lg:h-[600px]"
        >
          {mounted && <HeroSpline />}
        </motion.div>
      </div>
    </section>
  )
}
