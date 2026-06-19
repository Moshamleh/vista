/**
 * Shared FAQ content.
 * Single source of truth consumed by both the visible FAQ section
 * and the FAQPage JSON-LD, keeping rendered answers and structured
 * data identical — a requirement for valid rich results and AEO.
 */

export type FaqItem = {
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: "What does Vista do?",
    answer:
      "Vista is a global branding and UX design agency. We offer brand strategy and identity, digital product design, website design, software development, content and motion, and generative AI — combining design and engineering under one roof.",
  },
  {
    question: "Who does Vista work with?",
    answer:
      "We partner with early-stage startups, growth-stage companies, and large enterprises worldwide, across fintech, e-commerce, SaaS, and consumer brands. Engagements range from focused project sprints to ongoing retainers.",
  },
  {
    question: "Where is Vista located?",
    answer:
      "Vista is a remote-first, globally distributed agency. Our teams collaborate across North America, Europe, and Asia-Pacific, so we can work alongside clients in nearly any time zone.",
  },
  {
    question: "How much does a project with Vista cost?",
    answer:
      "Every engagement is scoped to your goals, timeline, and complexity. Brand and product projects typically begin in the low five figures, while larger platform builds and retainers are priced per scope. Email hello@vista.global for an estimate.",
  },
  {
    question: "How do I start a project with Vista?",
    answer:
      "Email hello@vista.global with a short description of your goals, timeline, and scope. We usually reply within one business day and follow up with an introductory call to align on the work.",
  },
  {
    question: "What makes Vista different?",
    answer:
      "We combine brand strategy, product design, and engineering in one team, with applied AI woven through both what we ship and how we design it. That lets us move from strategy to a production-ready product without handoffs between agencies.",
  },
]
