"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { FAQS } from "@/lib/faq"

function FaqRow({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-border last:border-b">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
          aria-expanded={open}
        >
          <span className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            {question}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground"
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-5xl"
          >
            Questions, answered
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            The essentials about working with Vista. Have something else in mind?{" "}
            <a href="mailto:hello@vista.global" className="text-foreground underline underline-offset-4">
              Ask us directly
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            {FAQS.map((faq, i) => (
              <FaqRow key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
