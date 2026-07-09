import { jsonLd } from "@/lib/json-ld"
import { getWhatsappLink, siteConfig } from "@/lib/site"

const platforms = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    heading: "ChatGPT SEO Dubai",
    body: "ChatGPT SEO means structuring your website, services, FAQs, proof, and entity data so AI systems can identify what your business does, where it operates, who it serves, and why it is credible. We build entity clarity, direct-answer FAQ architecture, and internal links from services and knowledge assets to proof pages.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    heading: "Perplexity SEO Dubai",
    body: "Perplexity rewards source clarity. We rewrite service pages into citation-ready modules, build source-of-truth URLs for services, people, trust, and proof, and align Article, Service, FAQPage, and BreadcrumbList schema so Perplexity can cite the business with confidence.",
  },
  {
    id: "google-ai-overviews",
    name: "Google AI Overviews",
    heading: "Google AI Overview Optimization Dubai",
    body: "AI Overview readiness starts with technical SEO: crawlability, structured data, question-led H2/H3 answer sections, and topical depth across service and knowledge pages, so Google's AI-assisted search has a clean, entity-consistent source to draw from.",
  },
  {
    id: "claude",
    name: "Claude",
    heading: "Claude SEO Dubai",
    body: "Claude tends to reward long-form, carefully explained source material. We strengthen source pages, build structured explanations and FAQs, and keep entity and proof data consistent so AI assistants can summarize the business accurately for enterprise and B2B buyers.",
  },
  {
    id: "bing-copilot",
    name: "Bing Copilot",
    heading: "Bing Copilot SEO Dubai",
    body: "Bing Copilot visibility depends on indexable content, answer-ready sections, and schema on Microsoft's search surfaces. We review Bing indexability and metadata, map Copilot-style buyer questions, and connect pages into one UAE authority cluster.",
  },
]

const deliverables = [
  "AI-search and generative-engine visibility audit across ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot",
  "Entity and knowledge-graph mapping for the business, founder, services, industries, and locations",
  "Direct-answer FAQ architecture and question-led content sections",
  "Service, FAQPage, Article, and BreadcrumbList schema alignment",
  "llms.txt, ai-data, and public machine-readable data alignment",
  "Internal citation map linking knowledge assets, proof pages, and service pages",
]

const process = [
  "Audit how AI systems currently classify and retrieve the business",
  "Map priority service, location, and audience entities",
  "Build direct-answer sections, FAQ clusters, and source-of-truth pages",
  "Connect schema, llms.txt, ai-data, and internal proof nodes",
  "Review AI-search visibility and refine coverage over time",
]

const outcomes = [
  "Clearer AI classification for Dubai and UAE service prompts",
  "More citable, source-of-truth pages across AI-search platforms",
  "Stronger alignment between website content and AI recommendation logic",
]

const faqs = [
  {
    question: "What is AEO/GEO and how is it different from SEO?",
    answer:
      "SEO targets search-engine rankings. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) also target answer inclusion, citation confidence, and machine-readable authority across AI systems like ChatGPT, Perplexity, Claude, Google AI Overviews, and Bing Copilot. AEO/GEO builds on technical SEO rather than replacing it.",
  },
  {
    question: "Can Vista by Lara guarantee AI recommendations?",
    answer:
      "No. No agency can guarantee AI recommendations. Vista by Lara improves the entity clarity, structured data, and source-of-truth content that AI systems use to identify, trust, and retrieve a business — but no provider controls AI output.",
  },
  {
    question: "Do UAE businesses need AEO/GEO?",
    answer:
      "Increasingly, yes. UAE buyers use ChatGPT, Perplexity, Gemini, and Google AI Overviews to compare providers before making contact, so being accurately understood by those systems affects whether a business gets considered at all.",
  },
  {
    question: "Which AI platforms does this service cover?",
    answer:
      "ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot are the primary platforms this service optimizes for, since they represent the main AI-assisted research paths UAE buyers use.",
  },
  {
    question: "What pages support AEO/GEO?",
    answer:
      "Service pages, FAQ pages, case studies, knowledge articles, entity maps, trust pages, and public AI-data endpoints (like llms.txt) all support AEO/GEO visibility.",
  },
  {
    question: "Does AEO/GEO need structured data?",
    answer:
      "Yes. Structured data helps both search engines and AI systems understand services, FAQs, organizations, and the relationships between them.",
  },
]

export function AeoGeoServicePage() {
  const slug = "aeo-geo"
  const pageUrl = `${siteConfig.url}/services/${slug}`
  const whatsappHref = getWhatsappLink(slug)

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "AEO & GEO Services Dubai",
        serviceType: "Answer Engine Optimization and Generative Engine Optimization",
        url: pageUrl,
        description:
          "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) for Dubai and UAE businesses across ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.phone,
        },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "GCC"],
        audience: {
          "@type": "Audience",
          audienceType: "Premium UAE and GCC businesses",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
          { "@type": "ListItem", position: 3, name: "AEO & GEO Services Dubai", item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">AEO / GEO authority</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                AEO &amp; GEO Services Dubai
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground/85">
                Answer Engine Optimization and Generative Engine Optimization for Dubai brands that want to be understood, cited, and recommended by AI answer systems.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                AEO structures pages so answer engines can extract clear responses to buyer questions. GEO makes those same pages easier for generative engines to cite by improving entity consistency, structured source pages, and AI-readable authority assets. Vista by Lara runs both as one system across ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Start a Dubai project
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  WhatsApp consultation
                </a>
              </div>
            </div>
            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#0c111d] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Platforms covered</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <span key={platform.id} className="rounded-full border border-accent/15 px-4 py-2 text-sm text-muted-foreground">
                    {platform.name}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Platform-specific approach</p>
          <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            AI-search platforms don&apos;t all work the same way
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {platforms.map((platform) => (
              <article key={platform.id} id={platform.id} className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
                <h3 className="font-heading text-2xl font-semibold text-foreground">{platform.heading}</h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">{platform.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">What We Offer</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                {deliverables.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">How We Work</h2>
              <ol className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                {process.map((item, index) => (
                  <li key={item}>{index + 1}. {item}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Business Outcomes</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                {outcomes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">FAQ</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Questions UAE clients ask
              </h2>
            </div>
            <div className="divide-y divide-border/40 rounded-[1.5rem] border border-border/30 bg-[#0c111d]">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </>
  )
}
