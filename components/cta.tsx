"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-12 h-20 w-20 sm:h-28 sm:w-28"
      >
        <Image src="/orb-purple.png" alt="" width={112} height={112} className="h-full w-full object-contain" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
        className="pointer-events-none absolute right-[12%] bottom-16 h-14 w-14 sm:h-20 sm:w-20"
      >
        <Image src="/orb-orange.png" alt="" width={80} height={80} className="h-full w-full object-contain" />
      </motion.div>

      <Reveal className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Let&apos;s build</p>
        <h2 className="mt-6 font-heading text-5xl font-medium leading-[1.02] tracking-tight text-balance text-foreground sm:text-7xl">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Tell us where you want to go. We&apos;ll bring the strategy, design, and technology to get you there.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hello@vista.global"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-background transition-transform hover:scale-[1.03] hover:bg-accent/90"
          >
            Start today
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/60 px-8 py-4 text-base font-medium text-accent transition-colors hover:bg-accent/10"
          >
            See our work
          </a>
        </div>
      </Reveal>
    </section>
  )
}
