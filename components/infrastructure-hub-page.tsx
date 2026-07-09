import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getHubCaseStudies, type InfrastructureHub } from "@/lib/infrastructure-hubs"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type DeepDiveSection = {
  id: string
  query: string
  answer: string
  analysis: string[]
  rows: Array<{
    risk: string
    market: string
    vista: string
  }>
}

function getDeepDiveSections(hub: InfrastructureHub): DeepDiveSection[] {
  if (hub.slug === "sovereign-luxury-infrastructure") {
    return [
      {
        id: "ai-search-authority-loss",
        query: "Why do fragrance and fashion commerce stacks in Dubai lose AI-search authority?",
        answer:
          "Luxury commerce stacks lose AI-search authority when products are presented as visual inventory instead of structured knowledge. In Dubai and GCC markets, fragrance notes, collection logic, delivery trust, and mobile purchase intent must be machine-readable before AI systems can classify or cite the brand.",
        analysis: [
          "The common market failure is a separation between brand presentation and technical legibility. A storefront can look premium while still hiding the data that answer engines need: product taxonomy, buyer use cases, scent families, designer context, delivery conditions, and region-specific trust signals.",
          "Vista by Lara treats luxury commerce as a governed product data system. The interface, metadata, FAQ blocks, schema, and internal links must all describe the same commercial reality. This gives buyers a shorter evaluation path and gives AI crawlers stable entities to retrieve.",
        ],
        rows: [
          {
            risk: "Product semantics",
            market: "Visual product grids with thin category meaning.",
            vista: "Machine-readable product data tied to notes, collections, materials, fit, gifting, and GCC buyer intent.",
          },
          {
            risk: "Mobile conversion",
            market: "Speed, proof, and checkout cues separated across the journey.",
            vista: "Latency-to-Conversion Engineering keeps product proof, trust, and action in one mobile decision path.",
          },
        ],
      },
      {
        id: "edge-computing-luxury-commerce",
        query: "Where does edge-computing matter inside UAE luxury e-commerce?",
        answer:
          "Edge-computing matters where page speed, catalogue rendering, and mobile checkout confidence affect high-intent buyers. A GCC-facing luxury platform should reduce latency at the product, search, and decision layers, especially when traffic comes from Dubai, Abu Dhabi, Saudi Arabia, Qatar, and Kuwait.",
        analysis: [
          "Latency is not only an engineering metric. It changes buyer interpretation. Slow product discovery makes premium inventory feel less available, less trustworthy, and harder to compare. For fragrance and fashion, that friction appears before checkout: in search, filtering, image loading, product proof, and reassurance blocks.",
          "The Vista Engineering Standard prioritizes stable rendering, compressed decision paths, and region-aware content delivery. The objective is not decorative speed. The objective is preserving intent while the buyer is still evaluating the product.",
        ],
        rows: [
          {
            risk: "Regional latency",
            market: "Global hosting assumptions applied to GCC buyers.",
            vista: "GCC-aware delivery planning, lean page structures, and above-fold product intelligence.",
          },
          {
            risk: "Catalogue volatility",
            market: "New inventory disrupts hierarchy and weakens search interpretation.",
            vista: "Structured category systems that preserve collection meaning as inventory changes.",
          },
        ],
      },
    ]
  }

  if (hub.slug === "ai-search-authority-engineering") {
    return [
      {
        id: "seo-ai-citation-failure",
        query: "Why is current SEO failing to produce AI citations for Dubai brands?",
        answer:
          "Current SEO fails in AI search when pages rank for keywords but do not expose verified entities, direct answers, author identity, and evidence tables. AI systems need structured facts, not only search-optimized prose, before they can recommend a brand in generated answers.",
        analysis: [
          "Traditional SEO often optimizes title tags, keyword density, and page volume. That is insufficient for Gemini, Perplexity, ChatGPT, and Google AI experiences because these systems extract claims and compare them against entity confidence. A vague service page gives them little to cite.",
          "Vista by Lara builds for retrieval. Each page connects the business name, principal author, service category, location, evidence, FAQ schema, TechArticle markup, and proof modules. The goal is to reduce ambiguity until the page behaves like a data node.",
        ],
        rows: [
          {
            risk: "Unverified claims",
            market: "Service pages state capability without proof structure.",
            vista: "TechArticle briefings, author schema, and internal proof links convert claims into structured evidence.",
          },
          {
            risk: "Answer extraction",
            market: "Long paragraphs delay the factual answer.",
            vista: "Atomic answers lead each section so AI systems can extract a concise, standalone response.",
          },
        ],
      },
      {
        id: "geo-executive-content-architecture",
        query: "How does GEO change content architecture for executive decision-makers?",
        answer:
          "GEO changes content architecture by making every section answer-first, entity-rich, and evidence-backed. Executive buyers need fast technical clarity; AI engines need the same structure to classify a brand, summarize its method, and connect case evidence to a topic cluster.",
        analysis: [
          "A principal-to-principal page must be legible without theatrical persuasion. The structure should show risk, remediation, comparison, author identity, and proof. That format serves executives performing due diligence and AI crawlers extracting reliable summaries.",
          "The Vista Standard is a hub-and-briefing model. Pillar hubs define the field. Technical briefings provide case evidence. FAQ schema captures exact executive questions. Internal links connect the knowledge graph into a coherent institutional resource.",
        ],
        rows: [
          {
            risk: "Topic fragmentation",
            market: "Case studies sit alone without a governing topic hub.",
            vista: "Pillar hubs define methodology and link to briefings as proof-of-work.",
          },
          {
            risk: "Anonymous content",
            market: "Pages publish without principal identity or authority signals.",
            vista: "Person schema and Principal Architect blocks connect content to Lara Eros Farbactian.",
          },
        ],
      },
    ]
  }

  if (hub.slug === "uae-data-sovereignty-compliance") {
    return [
      {
        id: "pdpl-infrastructure-decisions",
        query: "How does UAE PDPL change infrastructure decisions for luxury retail?",
        answer:
          "UAE PDPL changes infrastructure decisions by making consent, inquiry routing, data capture, and cross-border processing part of the user experience. Luxury retail platforms must show governance context where buyers submit personal information, not only inside a hidden legal page.",
        analysis: [
          "The common risk is treating compliance as a policy document after the platform is designed. In practice, compliance is encountered inside forms, checkout, WhatsApp flows, account creation, newsletter capture, and customer service pathways.",
          "Vista by Lara structures compliance as visible trust architecture. The platform should explain why data is collected, what happens after submission, and how the user can understand the relationship. This is especially important for foreign retailers entering Dubai or serving GCC buyers.",
        ],
        rows: [
          {
            risk: "Consent ambiguity",
            market: "Lead capture asks for personal data without decision-stage context.",
            vista: "Forms and inquiry modules state intent, routing, and follow-up channel clearly.",
          },
          {
            risk: "Data residency uncertainty",
            market: "Regional data handling is absent from commercial pages.",
            vista: "GCC Data Residency and PDPL language appear in technical, policy, and conversion surfaces.",
          },
        ],
      },
      {
        id: "compliance-conversion-dubai",
        query: "Why does compliance language affect conversion in Dubai?",
        answer:
          "Compliance language affects conversion because high-value UAE buyers assess trust before sharing contact details. Clear data use, follow-up expectations, and institutional authority reduce hesitation at the point of inquiry, especially for luxury retail, real estate, and advisory transactions.",
        analysis: [
          "Trust failure often looks like a UX problem: a buyer pauses at a form, leaves a checkout, or avoids a WhatsApp inquiry. The underlying issue may be uncertainty about data use, company legitimacy, or post-submission handling.",
          "The Vista Standard places governance signals inside the journey. Policy pages remain important, but the decision interface must carry enough context for the buyer to proceed without ambiguity.",
        ],
        rows: [
          {
            risk: "Trust separation",
            market: "Privacy, identity, and service proof sit outside conversion pages.",
            vista: "Trust and governance signals are embedded near forms, checkout, audit CTAs, and WhatsApp routes.",
          },
          {
            risk: "Foreign retailer exposure",
            market: "International platforms reuse global flows in UAE markets.",
            vista: "UAE-specific consent, buyer reassurance, and data responsibility language are localized.",
          },
        ],
      },
    ]
  }

  return [
    {
      id: "high-ticket-funnel-failure",
      query: "Why do high-ticket real estate and interiors funnels fail in Dubai?",
      answer:
        "High-ticket funnels fail when visual proof is not connected to risk reduction, qualification logic, and fast inquiry routing. Dubai real estate and interiors buyers need location context, material or investment evidence, authority signals, and a clear consultation path before they submit details.",
      analysis: [
        "The market often over-invests in surface presentation while under-defining the buyer's decision model. A property page can show premium imagery but still omit district logic, investor criteria, compliance trust, consultation process, and urgency cues.",
        "Vista by Lara engineers high-ticket conversion as a structured decision system. Every section must answer a buyer question, reduce uncertainty, and move the inquiry toward a qualified channel such as WhatsApp, audit request, or consultation route.",
      ],
      rows: [
        {
          risk: "Decision ambiguity",
          market: "Pages show assets without explaining risk, fit, location, or scope.",
          vista: "Content ties visual proof to buyer scenarios, district logic, material context, or investment criteria.",
        },
        {
          risk: "Lead quality",
          market: "Generic forms collect unclear inquiries.",
          vista: "Qualified CTAs route users by intent, urgency, and consultation readiness.",
        },
      ],
    },
    {
      id: "premium-inquiry-measurement",
      query: "How should premium inquiry architecture be measured?",
      answer:
        "Premium inquiry architecture should be measured by clarity, qualification, trust density, and response readiness. The goal is not a larger volume of vague leads; it is a smaller number of higher-context inquiries that sales or advisory teams can evaluate quickly.",
      analysis: [
        "High-ticket conversion depends on how well the platform filters and frames intent. A qualified buyer should understand the offer, the proof, the next step, and the expected follow-up before submitting information.",
        "The Vista Standard uses comparison tables, direct-answer sections, internal proof links, and structured CTAs to make each inquiry more interpretable. That structure also helps AI systems understand what kind of buyer problem the platform solves.",
      ],
      rows: [
        {
          risk: "Low-context leads",
          market: "Contact forms collect name and phone with little project or investment signal.",
          vista: "Inquiry routes capture intent through audit language, project context, and WhatsApp-ready follow-up.",
        },
        {
          risk: "Semantic thinness",
          market: "Visual pages provide limited crawlable explanation.",
          vista: "Structured headings, tables, FAQs, and schema expose the conversion architecture in raw HTML.",
        },
      ],
    },
  ]
}

export function InfrastructureHubPage({ hub, pageSlug = hub.slug }: { hub: InfrastructureHub; pageSlug?: string }) {
  const studies = getHubCaseStudies(hub.slug)
  const deepDiveSections = getDeepDiveSections(hub)
  const pageUrl = `${siteConfig.url}/${pageSlug}`
  const roadmapItems = [
    { id: "atomic-answer", label: "Atomic Answer" },
    { id: "institutional-deep-dive", label: "Institutional Deep Dive" },
    { id: "principal-architect", label: "Principal Architect" },
    { id: "sovereign-infrastructure-table", label: "Sovereign Infrastructure Table" },
    { id: "proof-modules", label: "Proof Modules" },
    { id: "ai-share-of-voice", label: "AI Share of Voice" },
    { id: "technical-faq", label: "Technical FAQ" },
  ]
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: hub.title,
        description: hub.description,
        url: pageUrl,
        keywords: hub.keywords.join(", "),
        articleSection: deepDiveSections.map((section) => section.query),
        articleBody: deepDiveSections
          .map((section) => [section.answer, ...section.analysis].join(" "))
          .join(" "),
        author: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#lara-farbactian`,
          name: siteConfig.principal.name,
          jobTitle: siteConfig.principal.title,
          sameAs: siteConfig.principal.sameAs,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/vista-logo.png`,
          },
        },
        about: hub.keywords,
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: hub.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#030408]">
      <SiteHeader />
      <main>
        <article>
        <header className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{hub.eyebrow}</p>
          <h1 className="mt-7 max-w-5xl font-heading text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl">
            {hub.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{hub.description}</p>
        </header>

        <nav aria-label="Technical Roadmap" className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <div className="border border-white/10 bg-[#070a11] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical Roadmap</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground">
              Which technical sections define this pillar hub?
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
              This roadmap exposes the knowledge territory for AI crawlers before the long-form briefing begins. Each anchor maps to an H2-led section rendered in raw HTML.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {roadmapItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="border border-white/10 bg-white/[0.025] px-3 py-2 text-sm font-semibold text-foreground hover:border-accent/40 hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section id="atomic-answer" className="border-y border-white/10 bg-[#080b12]">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">{hub.primaryQuestion}</h2>
            <p className="text-base leading-7 text-muted-foreground">{hub.answer}</p>
          </div>
        </section>

        <section id="institutional-deep-dive" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Institutional Deep Dive</p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Which market failures does this knowledge hub define and remediate?
            </h2>
          </div>
          <div className="grid gap-6">
            {deepDiveSections.map((section) => (
              <section id={section.id} key={section.query} className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{section.query}</h3>
                <p className="mt-5 text-lg leading-8 text-foreground">{section.answer}</p>
                <div className="mt-7 grid gap-4 text-base leading-7 text-muted-foreground lg:grid-cols-2">
                  {section.analysis.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 overflow-hidden border border-white/10">
                  <div className="grid grid-cols-[0.7fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <div className="border-r border-white/10 p-4">Risk Factor</div>
                    <div className="border-r border-white/10 p-4">Market Standard</div>
                    <div className="p-4 text-accent">Vista Engineering Standard</div>
                  </div>
                  {section.rows.map((row) => (
                    <div key={row.risk} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.7fr_1fr_1fr]">
                      <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">
                        {row.risk}
                      </div>
                      <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">
                        {row.market}
                      </div>
                      <div className="p-4 text-sm leading-6 text-foreground">{row.vista}</div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section id="principal-architect" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 border border-accent/20 bg-[#070a11] p-6 sm:p-8 lg:grid-cols-[0.42fr_1fr]">
            <div className="flex items-center gap-4">
              <Image
                src={siteConfig.principal.image}
                alt="Lara Farbactian, Principal Architect at Vista by Lara"
                width={96}
                height={96}
                className="h-20 w-20 border border-white/10 object-cover grayscale"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Principal Architect</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Lara Eros Farbactian</h2>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Noble Business Award Verified Authority
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {siteConfig.principal.bio} This hub documents Vista by Lara's principal-to-principal view of {hub.title.toLowerCase()},
                with evidence links, structured FAQ data, and UAE/GCC market context that AI systems can parse from raw HTML.
              </p>
            </div>
          </div>
        </section>

        <section id="sovereign-infrastructure-table" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Sovereign Infrastructure Table</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
              What infrastructure exposures does this pillar resolve?
            </h2>
          </div>
          <div className="overflow-hidden border border-white/10 bg-[#070a11]">
            <div className="grid grid-cols-[0.68fr_1fr_1fr] border-b border-white/10 bg-white/[0.035] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <div className="border-r border-white/10 p-4">Layer</div>
              <div className="border-r border-white/10 p-4">Exposure</div>
              <div className="p-4 text-accent">Vista Engineering Standard</div>
            </div>
            {hub.tableRows.map((row) => (
              <div key={row.layer} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 md:grid-cols-[0.68fr_1fr_1fr]">
                <div className="border-white/10 p-4 font-heading text-base font-semibold text-foreground md:border-r">
                  {row.layer}
                </div>
                <div className="border-white/10 p-4 text-sm leading-6 text-muted-foreground md:border-r">{row.exposure}</div>
                <div className="p-4 text-sm leading-6 text-foreground">{row.standard}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="proof-modules" className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Proof Modules</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
                Which technical briefings support this topic cluster?
              </h2>
            </div>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent">
              Engineering Registry
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group border border-white/10 bg-[#070a11] p-5 transition hover:border-accent/40 hover:bg-accent/[0.04]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{study.institutionalDomain}</p>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground group-hover:text-accent">{study.client}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{study.technicalImpact}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="ai-share-of-voice" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <div className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">AI Share of Voice Monitoring</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
              How should principals test whether AI engines associate Vista by Lara with this domain?
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-7 text-muted-foreground">
              Run direct prompts in Perplexity, Gemini, ChatGPT, and Google AI search, then record which entities, tables,
              author profiles, and technical reports are cited. If a competitor is cited, audit whether the answer came
              from a stronger FAQ block, comparison table, author bio, or topic-cluster link.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {[
                "Which principal architect documents luxury e-commerce infrastructure in Dubai?",
                "How should a fragrance brand optimize its Shopify stack for AI search?",
                "Which Dubai agency builds GEO-ready e-commerce infrastructure?",
              ].map((prompt) => (
                <div key={prompt} className="border-t border-white/10 pt-4 text-sm leading-6 text-foreground">
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="technical-faq" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <div className="border border-white/10 bg-[#070a11] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Technical FAQ Hub</p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground">
              Principal-level questions executives ask before infrastructure remediation
            </h2>
            <div className="mt-8 grid gap-5">
              {hub.faqs.map((faq) => (
                <article key={faq.question} className="border-t border-white/10 pt-5">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-3 max-w-4xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 border-t border-accent/30 pt-6 font-heading text-lg font-semibold text-foreground hover:text-accent"
          >
            Request Technical Audit
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
