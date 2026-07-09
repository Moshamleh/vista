import type { Metadata } from "next"
import { ArrowRight, Bot, Building2, CheckCircle2, Database, Home, MessageCircle, ShieldCheck, Sparkles, Workflow } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { jsonLd } from "@/lib/json-ld"
import { getWhatsappLink, siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/services/uae-ai-agent`
const whatsappHref = getWhatsappLink("uae-ai-agent")

const keywordCluster = [
  "AI agent UAE",
  "AI agent Dubai",
  "AI automation Dubai",
  "CRM automation UAE",
  "real estate AI agent Dubai",
  "property lead generation UAE",
  "AI chatbot for real estate agents Dubai",
  "AI automation for brokers UAE",
  "AI customer support agent Dubai",
  "AI sales assistant UAE",
  "HubSpot CRM Dubai",
  "وكيل ذكاء اصطناعي دبي",
  "تسويق عقاري بالذكاء الاصطناعي الإمارات",
]

const outcomes = [
  "More qualified WhatsApp, website, and campaign inquiries",
  "Faster response to buyers, tenants, patients, diners, shoppers, and service prospects",
  "Cleaner lead qualification before your team spends time manually following up",
  "Higher visibility across search, social, landing pages, and AI answer systems",
]

const agentTypes = [
  {
    title: "Real Estate AI Agent",
    eyebrow: "Property inquiries",
    icon: Home,
    description:
      "For Dubai brokers, real estate agencies, and developers that need faster buyer and tenant qualification for off-plan, ready units, rentals, and investment properties.",
    features: [
      "Property inquiry capture from landing pages, WhatsApp, Instagram, and ads",
      "Buyer and tenant qualification by budget, location, timeline, property type, and financing status",
      "Listing recommendation logic for Dubai, Abu Dhabi, Sharjah, and selected GCC investors",
      "Follow-up scripts for off-plan launches, ready units, rentals, viewings, and handover timelines",
    ],
  },
  {
    title: "Clinic AI Agent",
    eyebrow: "Appointments",
    icon: ShieldCheck,
    description:
      "For clinics, dental practices, aesthetic centers, and wellness providers that need structured appointment inquiries without exposing sensitive medical advice.",
    features: [
      "Service inquiry routing for treatments, consultation requests, pricing ranges, and appointment availability",
      "Safety-first answers that avoid diagnosis and route medical questions to the clinic team",
      "Arabic and English intake flows for Dubai, Abu Dhabi, and Sharjah patients",
      "Follow-up reminders for consultation bookings and missed inquiries",
    ],
  },
  {
    title: "Hospitality and Restaurant AI Agent",
    eyebrow: "Bookings",
    icon: Building2,
    description:
      "For restaurants, cafes, hotels, and venues that need reservation support, event inquiry capture, menu guidance, and campaign follow-up.",
    features: [
      "Reservation and private event inquiry qualification",
      "Menu, location, parking, dress code, and timing answers for UAE guests",
      "Lead routing for corporate bookings, Ramadan offers, brunches, and seasonal events",
      "Social campaign response support for Instagram and landing page traffic",
    ],
  },
  {
    title: "Retail and E-commerce AI Agent",
    eyebrow: "Sales support",
    icon: Sparkles,
    description:
      "For Shopify stores, luxury retail, beauty, fragrance, and fashion brands that need product guidance, order support, and cart recovery workflows.",
    features: [
      "Product discovery and buying guidance for mobile-first UAE shoppers",
      "Order status, returns, delivery area, and policy answer flows",
      "Cart recovery and post-purchase follow-up prompts",
      "SEO and GEO-ready product knowledge base structure",
    ],
  },
  {
    title: "Maintenance and Home Services AI Agent",
    eyebrow: "Service requests",
    icon: Workflow,
    description:
      "For maintenance companies, fit-out teams, cleaning services, and property service providers that need structured job requests and dispatch-ready details.",
    features: [
      "Inquiry capture by service type, urgency, location, building type, and preferred timing",
      "Photo, issue description, and access-detail request flows",
      "Priority routing for emergency, inspection, quotation, and recurring maintenance leads",
      "Dubai, Abu Dhabi, Sharjah, Ajman, and RAK service-area logic",
    ],
  },
  {
    title: "Education and Training AI Agent",
    eyebrow: "Admissions",
    icon: Database,
    description:
      "For training centers, academies, and education providers that need course guidance, lead qualification, and admissions support.",
    features: [
      "Course recommendation by goal, level, location, language, and preferred schedule",
      "Admissions inquiry capture for parents, professionals, and corporate training buyers",
      "FAQ automation for fees, certificates, timing, and enrollment steps",
      "Follow-up paths for brochure downloads, trial sessions, and advisor calls",
    ],
  },
]

const framework = [
  {
    title: "1. Knowledge Base",
    description: "We structure your services, listings, FAQs, offers, locations, and brand rules so the AI agent has a reliable source of truth.",
  },
  {
    title: "2. Conversation Logic",
    description: "We design questions, answers, qualification rules, escalation moments, and follow-up paths for UAE buyer behavior.",
  },
  {
    title: "3. Lead Routing",
    description: "We connect qualified inquiries to WhatsApp, forms, CRM, email, calendars, or sales teams according to your operating model.",
  },
  {
    title: "4. AI Visibility Layer",
    description: "We align agent answers with SEO, AEO, GEO, schema, and landing page content so humans and AI systems understand your business.",
  },
  {
    title: "5. CRM & Automation",
    description: "We connect qualified conversations to HubSpot or your CRM of choice — lifecycle stages, source tracking, automation workflows, and a reporting loop so every AI-qualified lead has an owner and a next action.",
  },
]

const comparisonRows = [
  ["Lead response", "Manual follow-up after the team sees the message", "Instant first response with structured qualification"],
  ["Real estate inquiries", "Ask budget and location manually each time", "Capture buyer intent, budget, area, timeline, and preferred property type"],
  ["Campaign performance", "Ads generate messages but many are unqualified", "Landing pages and AI agents filter serious buyers, tenants, and prospects"],
  ["AI readability", "Content is hidden in chats, PDFs, or social captions", "Service knowledge is structured for search engines and AI answer systems"],
  ["Team workload", "Sales team repeats basic answers", "Team handles better-qualified conversations and high-value decisions"],
]

const faqs = [
  {
    question: "What is a UAE AI agent?",
    answer:
      "A UAE AI agent is a guided digital assistant that answers questions, qualifies leads, and routes inquiries for Dubai and UAE businesses. It can support websites, landing pages, WhatsApp flows, campaigns, and customer service journeys.",
  },
  {
    question: "How does a real estate AI agent help Dubai brokers?",
    answer:
      "A real estate AI agent helps Dubai brokers capture buyer and tenant intent faster. It can ask about budget, area, property type, timeline, financing, and viewing preferences before the broker follows up.",
  },
  {
    question: "Can an AI agent generate property leads in the UAE?",
    answer:
      "Yes. An AI agent can improve lead capture by responding quickly, qualifying inquiries, and routing serious buyers or tenants to your sales team. It works best when connected to strong landing pages, social ads, SEO, and clear listings.",
  },
  {
    question: "Is this only for real estate companies?",
    answer:
      "No. Vista by Lara designs AI agents for real estate, clinics, restaurants, retail, e-commerce, maintenance companies, education, hospitality, and professional services in the UAE.",
  },
  {
    question: "Can the AI agent work in Arabic and English?",
    answer:
      "Yes. The agent strategy can support English and Arabic flows for UAE audiences. Arabic content should be written natively, use RTL presentation, and match the tone expected by Emirati and regional users.",
  },
  {
    question: "Do you build WhatsApp AI agents?",
    answer:
      "We design WhatsApp-ready inquiry flows, qualification logic, and routing architecture. Final implementation depends on the selected WhatsApp Business, CRM, and automation platform.",
  },
  {
    question: "What does the AI agent need before launch?",
    answer:
      "It needs a structured knowledge base, approved answers, lead qualification rules, escalation paths, privacy guidance, and integration planning. Real estate agents also need listing rules and inquiry categories.",
  },
  {
    question: "Can an AI agent replace my sales team?",
    answer:
      "No. The best use is to support your sales team, not replace it. The agent handles repetitive first responses and qualification so the team can focus on serious conversations and closing.",
  },
  {
    question: "Do you set up CRM automation as well as AI agents?",
    answer:
      "Yes. We connect AI-qualified conversations to HubSpot or another CRM — lifecycle stages, website form and WhatsApp lead routing, pipeline tracking, and automation workflows — so qualified leads have an owner and a reporting trail, not just a chat transcript.",
  },
  {
    question: "What should a CRM track for lead generation?",
    answer:
      "A CRM should track source, service interest, location, lead quality, owner, response time, lifecycle stage, and sales outcome, so SEO, ads, and AI agent conversations can be judged by qualified pipeline, not raw message volume.",
  },
]

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "AI & Automation Services",
      serviceType: "AI Agent Strategy, CRM & Marketing Automation, Generative AI Product Design, AI Visibility",
      url: pageUrl,
      description:
        "AI and automation services in Dubai and the UAE — AI agents, CRM automation, and generative AI product design for real estate, clinics, restaurants, retail, e-commerce, maintenance, education, and professional services.",
      provider: {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
      },
      areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman"],
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Real estate agents, brokers, developers, clinics, retailers, restaurants, service businesses, and UAE SMEs",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "UAE AI Agent Industry Solutions",
        itemListElement: agentTypes.map((agent) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: agent.title,
            description: agent.description,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
        { "@type": "ListItem", position: 3, name: "UAE AI Agent", item: pageUrl },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: "AI & Automation Services Dubai | AI Agents + CRM Automation UAE",
  description:
    "AI & automation services in Dubai: AI agents, CRM automation, and generative AI product design for real estate, clinics, retail, restaurants, and service businesses across the UAE.",
  keywords: keywordCluster,
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-AE": pageUrl,
      "ar-AE": `${siteConfig.url}/ar/services/uae-ai-agent`,
    },
  },
  openGraph: {
    title: "AI & Automation Services Dubai | Vista by Lara",
    description:
      "AI agents, CRM automation, and generative AI product design for UAE real estate, clinics, retail, restaurants, e-commerce, and service businesses.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Automation Services Dubai | Vista by Lara",
    description: "AI agents, CRM automation, and lead qualification systems for UAE businesses.",
    images: [siteConfig.ogImage],
  },
}

export default function UAEAIAgentPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-accent">
                <Bot className="h-4 w-4" aria-hidden="true" />
                UAE AI agent service
              </p>
              <h1 className="mt-6 max-w-5xl font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                AI Agent UAE for real estate, service, and growth teams.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground/84">
                Vista by Lara designs AI agents for Dubai and UAE businesses that need faster lead qualification, smarter inquiry handling, and stronger visibility across search, social, WhatsApp, and AI answer systems.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                For real estate agents, brokers, developers, clinics, restaurants, retailers, and service companies, the goal is simple: stop chasing weak leads and start attracting prospects who are ready to ask, book, view, buy, rent, or visit.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Plan an AI agent
                </a>
                <a
                  href="/knowledge/ai-visibility"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  Read AI visibility hub
                </a>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#071018]/88 p-6 shadow-[0_40px_100px_-72px_rgba(87,217,255,0.55)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">AEO direct answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground">
                What does a UAE AI agent do?
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                A UAE AI agent answers common questions, qualifies leads, captures intent, routes serious inquiries, and supports follow-up across website, WhatsApp, landing pages, ads, and CRM workflows.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {keywordCluster.slice(0, 8).map((keyword) => (
                  <span key={keyword} className="rounded-full border border-accent/15 px-3 py-1.5 text-xs text-muted-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-base leading-7 text-muted-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Real estate AI agent</p>
            <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Ready to sell and rent faster online in the UAE?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A real estate AI agent helps agents, brokers, and developers attract ready buyers and tenants instead of manually chasing every message. It qualifies property inquiries, explains listing options, captures viewing intent, and routes serious prospects to your team.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.75rem] border border-accent/15 bg-[#0c111d] p-7">
              <h3 className="font-heading text-3xl font-semibold text-foreground">Built for UAE property growth</h3>
              <ul className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
                <li>More property inquiries from website, social media, landing pages, and WhatsApp.</li>
                <li>Qualified buyer and tenant leads by budget, location, timeline, and intent.</li>
                <li>Higher listing visibility through SEO, social content, reels, virtual tours, and structured landing pages.</li>
                <li>Stronger brand presence for Dubai, Abu Dhabi, and Sharjah real estate competition.</li>
                <li>Lead generation campaigns for off-plan launches, ready units, rentals, and investment properties.</li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {["Property posts and reels", "Virtual tour inquiry flows", "Facebook and Instagram ads", "SEO landing pages", "Off-plan lead campaigns", "Ready-unit rental campaigns"].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-border/30 bg-[#071018] p-5">
                  <p className="font-heading text-lg font-semibold text-foreground">{item}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Structured for Dubai, Abu Dhabi, Sharjah, and UAE real estate buyers who compare options before they speak to an agent.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {agentTypes.map((agent) => {
              const Icon = agent.icon
              return (
                <article key={agent.title} className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{agent.eyebrow}</p>
                      <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">{agent.title}</h2>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-7 text-muted-foreground">{agent.description}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                    {agent.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Vista implementation model</p>
                <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  From content to conversations to qualified leads.
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We do not treat an AI agent as a basic chatbot. We treat it as a digital growth layer connected to your service knowledge, lead qualification, SEO, AEO, GEO, and UAE conversion journey.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {framework.map((item) => (
                  <div key={item.title} className="rounded-[1.35rem] border border-accent/15 bg-[#0c111d] p-6">
                    <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Comparison</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Manual lead handling vs AI agent workflows.
              </h2>
            </div>
            <div className="overflow-x-auto rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              <table className="min-w-[760px] text-left text-sm">
                <thead className="bg-accent/10 text-foreground">
                  <tr>
                    <th className="px-5 py-4 font-heading text-base">Area</th>
                    <th className="px-5 py-4 font-heading text-base">Traditional workflow</th>
                    <th className="px-5 py-4 font-heading text-base">Vista AI agent workflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td key={cell} className="px-5 py-4 leading-6">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">FAQ</p>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Questions UAE businesses ask about AI agents.
              </h2>
            </div>
            <div className="divide-y divide-border/40 rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              {faqs.map((faq) => (
                <article key={faq.question} className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid gap-8 rounded-[1.75rem] border border-accent/20 bg-[#071018] p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Next step</p>
              <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Start with one AI agent for your highest-value inquiry flow.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-muted-foreground">
                For real estate, that may be buyer and tenant qualification. For clinics, it may be appointment inquiries. For retail, it may be product guidance. Vista by Lara can map the first workflow and prepare the implementation architecture.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Request AI agent audit
                </a>
                <a
                  href="/services/digital-marketing"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  View digital marketing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
