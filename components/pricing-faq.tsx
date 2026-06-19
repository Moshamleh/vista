"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/reveal"

const FAQS = [
  {
    question: "Can I customise a plan for my project?",
    answer:
      "Absolutely. Our packages are starting points, not rigid boxes. We scope every project individually — so if you need a subset of a plan or something that spans multiple packages, we'll put together a bespoke proposal.",
  },
  {
    question: "Do you work on a retainer basis?",
    answer:
      "Yes. Many clients start with a project and move to a monthly retainer for ongoing design, development, and strategy support. Retainers are available from AED 6,000/month and can be paused or cancelled with 30 days' notice.",
  },
  {
    question: "What currencies do you accept?",
    answer:
      "We invoice in AED, USD, EUR, and GBP. Wire transfers, credit cards, and Stripe are all supported. For enterprise clients we can accommodate purchase orders.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Starter engagements typically run 4–6 weeks. Growth projects run 8–14 weeks. Enterprise timelines are agreed during scoping. We'll give you a clear milestone plan before any work begins.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "Every plan includes a post-launch support window (14 days for Starter, 60 days for Growth). After that, you can move to a retainer or purchase ad-hoc support blocks. We're invested in your long-term success.",
  },
  {
    question: "Do prices include VAT?",
    answer:
      "All prices shown are exclusive of UAE VAT (5%). A compliant tax invoice will be issued for every payment.",
  },
]

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

export function PricingFaq() {
  return (
    <section id="pricing-faq" aria-labelledby="pricing-faq-heading" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Pricing FAQ</p>
          <h2
            id="pricing-faq-heading"
            className="mt-6 font-heading text-3xl font-medium leading-tight tracking-tight text-balance text-foreground sm:text-5xl"
          >
            Everything about our fees
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground/80">
            Still have questions?{" "}
            <a href="mailto:hello@vista.global" className="text-accent underline underline-offset-4 hover:text-accent/90">
              Email us directly
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
