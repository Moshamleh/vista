import { caseStudies, type CaseStudyAsset } from "@/lib/case-studies"

export type InfrastructureHub = {
  slug: string
  title: string
  eyebrow: string
  description: string
  primaryQuestion: string
  answer: string
  keywords: string[]
  proofFilter: (study: CaseStudyAsset) => boolean
  tableRows: Array<{
    layer: string
    exposure: string
    standard: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const infrastructureHubs: InfrastructureHub[] = [
  {
    slug: "sovereign-luxury-infrastructure",
    title: "Sovereign E-commerce Infrastructure in Dubai",
    eyebrow: "Luxury Commerce Infrastructure",
    description:
      "A UAE and GCC authority hub for Headless Shopify, luxury e-commerce systems, fragrance commerce, premium fashion catalogues, and machine-readable product data.",
    primaryQuestion: "How should luxury brands in Dubai engineer e-commerce infrastructure for AI-search and conversion authority?",
    answer:
      "Luxury infrastructure in Dubai must combine premium brand semantics, fast mobile commerce, and machine-readable product data. Vista by Lara treats each product, collection, and conversion path as a governed evidence layer for buyers and AI crawlers.",
    keywords: [
      "Sovereign E-commerce Architecture",
      "Headless Shopify Dubai",
      "GCC Data Residency",
      "luxury e-commerce Dubai",
      "fragrance e-commerce UAE",
      "fashion commerce GCC",
    ],
    proofFilter: (study) => study.pillar.includes("Fragrance") || study.pillar.includes("Fashion"),
    tableRows: [
      {
        layer: "Product Intelligence",
        exposure: "Generic product grids make luxury inventory difficult for AI systems to classify.",
        standard: "Machine-readable product data, collection semantics, and direct-answer content clarify buyer intent.",
      },
      {
        layer: "Mobile Commerce",
        exposure: "High-value buyers abandon when speed, trust, and product proof are separated.",
        standard: "Latency-to-Conversion Engineering keeps proof, product, and action in one mobile decision path.",
      },
      {
        layer: "Regional Authority",
        exposure: "Global luxury copy often misses UAE gifting, Arabic-English, and GCC trust signals.",
        standard:
          "Dubai, UAE, GCC Data Residency, PDPL Compliance, and Arabic-English entity signals are embedded into content, metadata, schema, and internal links.",
      },
    ],
    faqs: [
      {
        question: "What are the common technical failure points for Shopify-based fragrance brands in the UAE?",
        answer:
          "The common failures are generic theme architecture, thin fragrance taxonomy, slow mobile product evaluation, and weak machine-readable product data. These issues reduce AI citation confidence and make premium scent collections harder to compare.",
      },
      {
        question: "Why do luxury e-commerce brands in Dubai need sovereign product data?",
        answer:
          "Sovereign product data gives each product, collection, note, material, and buyer use case a clear semantic role. AI systems cite brands more confidently when product meaning is structured instead of hidden inside visual design.",
      },
      {
        question: "How does Generative Engine Optimization change luxury commerce architecture?",
        answer:
          "GEO requires product pages to answer buyer questions directly, expose entity relationships, and support citation-ready summaries. For UAE luxury brands, that means structured product intelligence, local trust signals, and fast mobile pathways.",
      },
    ],
  },
  {
    slug: "ai-search-authority-engineering",
    title: "Generative Engine Optimization (GEO) Authority Engineering",
    eyebrow: "GEO Methodology",
    description:
      "A technical hub explaining Vista by Lara's Generative Engine Optimization methodology for brands that need AI-crawler visibility and answer-engine citation.",
    primaryQuestion: "How does Vista by Lara engineer brand authority for ChatGPT, Gemini, Perplexity, and Google AI search?",
    answer:
      "AI-search authority is engineered by turning brand claims into structured evidence. Vista by Lara uses direct-answer content, FAQ schema, entity-rich tables, internal links, and TechArticle markup so AI systems can classify and cite the business.",
    keywords: [
      "Generative Engine Optimization (GEO)",
      "AI search authority Dubai",
      "answer engine optimization UAE",
      "AI crawler visibility",
      "Machine-Readable Product Data",
      "TechArticle schema",
    ],
    proofFilter: (study) => study.domain === "AI-Search Sovereignty",
    tableRows: [
      {
        layer: "Entity Definition",
        exposure: "AI models cannot recommend brands when services, locations, audiences, and proof signals are vague.",
        standard:
          "Every page defines brand, service, location, audience, differentiator, Headless Shopify relevance, and outcome in citation-ready form.",
      },
      {
        layer: "Answer Extraction",
        exposure: "Long marketing paragraphs are difficult for AI systems to quote accurately.",
        standard: "Principal-level Q&A blocks and FAQPage schema make answers explicit and extractable.",
      },
      {
        layer: "Evidence Graph",
        exposure: "Single pages rarely establish topical authority by themselves.",
        standard: "Pillar pages link to technical briefings, and each briefing links back to its hub to build a semantic web.",
      },
    ],
    faqs: [
      {
        question: "What makes an AI-crawler trust a Dubai agency's technical content?",
        answer:
          "AI-crawlers trust content that names the entity, author, service category, market, evidence, and methodology consistently. Schema, internal links, and structured tables reduce ambiguity for retrieval systems.",
      },
      {
        question: "How should executives evaluate GEO work before hiring an agency?",
        answer:
          "Executives should ask whether the agency can map entities, create FAQ schema, build topic clusters, and prove technical authority through structured case evidence. GEO is an infrastructure discipline, not only a copywriting exercise.",
      },
      {
        question: "Why do technical briefings outperform generic portfolio pages in AI search?",
        answer:
          "Technical briefings expose problem, architecture, metrics, author, and schema in a format AI systems can parse. Generic galleries usually hide the evidence that answer engines need for citation.",
      },
    ],
  },
  {
    slug: "uae-data-sovereignty-compliance",
    title: "UAE Data Residency & PDPL Compliance Infrastructure",
    eyebrow: "PDPL & Legal-Tech Readiness",
    description:
      "A UAE technical hub for PDPL-aware e-commerce, data residency compliance, governance language, consent architecture, and trust-led digital infrastructure.",
    primaryQuestion: "How does UAE PDPL compliance influence e-commerce and digital infrastructure decisions?",
    answer:
      "PDPL compliance affects how platforms collect, route, store, explain, and govern personal data. Vista by Lara structures public-facing digital systems with clear consent paths, governance language, data minimization cues, and trust signals for UAE buyers.",
    keywords: [
      "Data Residency Compliance",
      "GCC Data Residency",
      "PDPL Compliance",
      "UAE PDPL e-commerce",
      "Dubai legal tech infrastructure",
      "privacy architecture UAE",
    ],
    proofFilter: () => true,
    tableRows: [
      {
        layer: "Consent & Capture",
        exposure: "Lead forms and checkout flows often collect data without enough governance context.",
        standard: "Forms, inquiry paths, and commerce journeys explain intent, routing, and user action clearly.",
      },
      {
        layer: "Data Residency Signals",
        exposure: "Foreign retailers entering Dubai may not communicate where data risk and platform responsibility sit.",
        standard: "Data Residency Compliance language is added to technical content, policies, and high-trust conversion paths.",
      },
      {
        layer: "Executive Trust",
        exposure: "Compliance content is often isolated in legal pages that buyers never read.",
        standard: "Trust, privacy, and infrastructure assurance are surfaced inside decision-making pages and technical briefings.",
      },
    ],
    faqs: [
      {
        question: "How does PDPL compliance impact e-commerce infrastructure for foreign retailers in Dubai?",
        answer:
          "PDPL affects consent, data collection, processor accountability, privacy language, and cross-border data handling. Foreign retailers need visible governance signals in forms, checkout flows, policies, and customer communication.",
      },
      {
        question: "What should a UAE digital platform disclose before collecting high-value leads?",
        answer:
          "It should explain why the data is collected, how the inquiry will be handled, and which channel will be used for follow-up. Clear disclosure improves trust and reduces friction for executive buyers.",
      },
      {
        question: "Is compliance only a legal-page problem?",
        answer:
          "No. Compliance is also a UX and infrastructure problem because users encounter data capture inside forms, checkout, chat, WhatsApp flows, and booking paths. Trust must be embedded where the decision happens.",
      },
    ],
  },
  {
    slug: "high-ticket-conversion-architecture",
    title: "High-Ticket Conversion Engineering in Dubai",
    eyebrow: "Real Estate & Interiors Infrastructure",
    description:
      "A technical hub for high-ticket digital conversion systems across Dubai real estate, property advisory, interiors, and premium virtual showroom experiences.",
    primaryQuestion: "How should high-ticket UAE brands engineer trust before a buyer submits an inquiry?",
    answer:
      "High-ticket conversion requires proof, context, risk reduction, and direct inquiry architecture. Vista by Lara builds structured journeys that connect visual evidence, district or material context, authority signals, and WhatsApp-ready consultation paths.",
    keywords: [
      "high-ticket conversion Dubai",
      "real estate lead architecture UAE",
      "virtual showroom engineering",
      "premium interiors conversion",
      "Latency-to-Conversion Engineering",
      "GCC Data Residency",
    ],
    proofFilter: (study) => study.pillar.includes("Real Estate") || study.pillar.includes("Interiors"),
    tableRows: [
      {
        layer: "Decision Context",
        exposure: "High-ticket pages fail when they show assets without risk, location, or material context.",
        standard: "Pages connect proof to buyer questions, investment logic, room use, or consultation criteria.",
      },
      {
        layer: "Lead Qualification",
        exposure: "Generic contact CTAs produce unclear inquiries and slow follow-up.",
        standard: "Inquiry paths route users toward technical audit, WhatsApp, or qualified consultation intent.",
      },
      {
        layer: "AI Interpretation",
        exposure: "Real estate and interiors pages are often visually rich but semantically thin.",
        standard: "Structured headings, data tables, FAQs, and internal links expose the full service and proof graph.",
      },
    ],
    faqs: [
      {
        question: "What technical failure points reduce high-ticket real estate inquiries in Dubai?",
        answer:
          "The main failures are weak district context, generic property language, missing trust evidence, and unclear inquiry routing. Buyers need investment logic and proof before they share contact details.",
      },
      {
        question: "How does virtual showroom engineering improve interiors conversion?",
        answer:
          "Virtual showroom engineering connects imagery to material context, room intent, consultation steps, and structured product evidence. It helps premium buyers evaluate fit before making a high-value inquiry.",
      },
      {
        question: "Why should real estate and interiors case studies link to one conversion architecture hub?",
        answer:
          "Both categories depend on high-trust decisions, not impulse purchases. A shared hub tells AI systems that Vista by Lara owns a broader methodology for premium inquiry architecture.",
      },
    ],
  },
]

export function getHub(slug: string) {
  return infrastructureHubs.find((hub) => hub.slug === slug)
}

export function getHubUrl(slug: string) {
  return `/${slug}`
}

export function getRelevantHubs(study: CaseStudyAsset) {
  return infrastructureHubs.filter((hub) => hub.proofFilter(study))
}

export function getHubCaseStudies(slug: string) {
  const hub = getHub(slug)
  return hub ? caseStudies.filter((study) => hub.proofFilter(study)) : []
}
