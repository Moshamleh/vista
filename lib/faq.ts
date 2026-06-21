/**
 * Shared FAQ content.
 * Single source of truth consumed by both the visible FAQ section
 * and the FAQPage JSON-LD, keeping rendered answers and structured
 * data identical for valid rich results and AEO.
 */

import { siteConfig } from "@/lib/site"

export type FaqItem = {
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: "What does Vista do?",
    answer:
      "Vista is a Dubai-based branding and UX design agency. We offer brand strategy and identity, digital product design, website design, software development, content and motion, and generative AI, combining design and engineering under one roof.",
  },
  {
    question: "Who does Vista work with?",
    answer:
      "We partner with startups, growth-stage companies, and established enterprises across the UAE, Saudi Arabia, and the wider GCC, spanning hospitality, real estate, healthcare, logistics, professional services, retail, and technology.",
  },
  {
    question: "Where is Vista located?",
    answer:
      "Vista is based in Dubai, United Arab Emirates, and works with clients across the UAE, Saudi Arabia, and the wider GCC. Our team collaborates in-region and remotely, so we stay aligned with your timeline and time zone.",
  },
  {
    question: "How much does a project with Vista cost?",
    answer: `Every engagement is scoped to your goals, timeline, and complexity. Brand and product projects typically begin from AED 18,000, while larger platform builds and retainers are priced per scope. Email ${siteConfig.email} for an AED estimate.`,
  },
  {
    question: "How do I start a project with Vista?",
    answer: `Email ${siteConfig.email} with a short description of your goals, timeline, and scope. We usually reply within one business day and follow up with an introductory call to align on the work.`,
  },
  {
    question: "What makes Vista different?",
    answer:
      "We combine brand strategy, product design, and engineering in one team, with applied AI woven through both what we ship and how we design it. That lets us move from strategy to production without handoffs between agencies.",
  },
]
