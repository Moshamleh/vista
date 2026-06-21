"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/site"

const words = ["Simple,", "transparent", "AED", "pricing."]

export function PricingHero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          Pricing - Plans - Value
        </motion.p>

        <h1 className="max-w-[20ch] font-heading text-5xl font-medium leading-[0.98] tracking-tight text-balance text-foreground sm:text-7xl lg:text-[5.5rem]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Every engagement is tailored, but our packages give UAE businesses a clear AED starting point. No hidden
          fees, no surprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <a
            href="#plans"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-medium text-background shadow-[0_24px_80px_-40px_rgba(87,217,255,0.5)] transition-transform hover:scale-[1.03] hover:bg-accent/90"
          >
            See AED plans
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-accent"
          >
            <span className="border-b border-accent/30 pb-0.5 transition-colors hover:border-accent">
              Talk to us first
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
