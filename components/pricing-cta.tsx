"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site"

const TRUST = [
  { value: "320+", label: "Projects delivered" },
  { value: String(siteConfig.foundingYear), label: "Founded" },
  { value: "100%", label: "Client satisfaction" },
]

export function PricingCta() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b1020] text-foreground px-5 py-28 sm:px-8 sm:py-40">
      {/* Floating orbs — same pattern as main CTA */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-12 h-20 w-20 sm:h-28 sm:w-28"
      >
        <Image src="/orb-purple.png" alt="Purple Vista by Lara pricing page accent orb" width={112} height={112} className="h-full w-full object-contain opacity-60" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
        className="pointer-events-none absolute right-[12%] bottom-16 h-14 w-14 sm:h-20 sm:w-20"
      >
        <Image src="/orb-orange.png" alt="Orange Vista by Lara pricing page accent orb" width={80} height={80} className="h-full w-full object-contain opacity-60" />
      </motion.div>

      <Reveal className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Let&apos;s build</p>
        <h2 className="mt-6 font-heading text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-7xl">
          Not sure which plan fits?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground/80">
          Tell us what you&apos;re building. We&apos;ll recommend the right engagement and send a tailored proposal within 24 hours.
        </p>

        {/* Trust stats */}
        <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {TRUST.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-heading text-4xl font-medium tracking-tight">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground/70">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-background transition-transform hover:scale-[1.03] hover:bg-accent/90"
          >
            Get a custom quote
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-8 py-4 text-base font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Back to home
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
