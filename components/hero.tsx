"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

// 3D canvas is client-only and lazy-loaded so it never blocks first paint.
const HeroBubble = dynamic(() => import("./hero-bubble").then((m) => m.HeroBubble), {
  ssr: false,
})

const words = ["Vista", "is", "a", "Dubai", "branding", "and", "UX", "design", "agency"]

export function Hero() {
  // Only mount the WebGL scene on desktop so phones stay light.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* Interactive 3D glass bubble — drag to spin, hover to react */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -right-24 top-10 hidden h-[640px] w-[640px] cursor-grab select-none active:cursor-grabbing lg:block"
      >
        {isDesktop && <HeroBubble />}
      </motion.div>

      {/* Static accent orbs for mobile/tablet — the 3D scene handles these on desktop */}
      <motion.div
        aria-hidden
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[58%] top-24 h-16 w-16 sm:h-20 sm:w-20 lg:hidden"
      >
        <Image src="/orb-purple.png" alt="" width={80} height={80} className="h-full w-full object-contain" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[12%] top-[58%] h-10 w-10 sm:h-12 sm:w-12 lg:hidden"
      >
        <Image src="/orb-orange.png" alt="" width={48} height={48} className="h-full w-full object-contain" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
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
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-medium text-background transition-transform hover:scale-[1.03]"
          >
            View our work
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-base font-medium text-foreground"
          >
            <span className="border-b border-foreground/30 pb-0.5 transition-colors hover:border-foreground">
              Explore services
            </span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
