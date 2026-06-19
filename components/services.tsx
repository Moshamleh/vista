"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/reveal"

const SERVICES = [
  {
    title: "Branding",
    body: "Brand strategy, identity systems, naming, and visual languages that make category leaders unmistakable.",
    tags: ["Strategy", "Identity", "Naming", "Guidelines"],
  },
  {
    title: "Digital Products",
    body: "End-to-end product design — research, UX, and polished UI for apps that millions of people love to use.",
    tags: ["Research", "UX", "UI", "Design Systems"],
  },
  {
    title: "Websites",
    body: "Editorial, conversion-driven marketing sites and immersive web experiences built to perform.",
    tags: ["Web Design", "CMS", "SEO", "Motion"],
  },
  {
    title: "Development",
    body: "Production-grade engineering across web and mobile, shipped fast on a modern, scalable stack.",
    tags: ["Frontend", "Backend", "Mobile", "Platforms"],
  },
  {
    title: "Content",
    body: "Story, copy, and art direction that gives your brand a distinct, consistent voice everywhere.",
    tags: ["Copy", "Art Direction", "Video", "Social"],
  },
  {
    title: "Generative AI",
    body: "We blend AI into design and product workflows to build smarter, more adaptive experiences.",
    tags: ["AI Product", "Agents", "Prototyping", "Automation"],
  },
]

function ServiceRow({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="border-t border-border last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
        aria-expanded={open}
      >
        <h3 className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
          {service.title}
        </h3>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground"
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{service.body}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">What we do</p>
          <h2 className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-4xl">
            We build transformative digital experiences for the world&apos;s leading brands by blending AI, design, and
            technology.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            {SERVICES.map((service, i) => (
              <ServiceRow key={service.title} service={service} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
