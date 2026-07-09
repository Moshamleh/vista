import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

type Faq = {
  question: string
  answer: string
}

type IndustryPageProps = {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  answer: string
  industryName: string
  keywords: string[]
  challenges: string[]
  solutions: string[]
  outcomes: string[]
  marketContext: string
  districts: string[]
  faqs: Faq[]
}

const relatedLinks = [
  { label: "Branding", href: "/services/branding" },
  { label: "Web Design Dubai", href: "/services/web-design-dubai" },
  { label: "UI/UX Design Dubai", href: "/services/ui-ux-design-dubai" },
  { label: "SEO Services Dubai", href: "/services/seo-services-dubai" },
  { label: "Generative AI", href: "/services/generative-ai" },
  { label: "Contact Vista", href: siteConfig.whatsapp },
]

export function IndustryPage({
  slug,
  eyebrow,
  title,
  subtitle,
  answer,
  industryName,
  keywords,
  challenges,
  solutions,
  outcomes,
  marketContext,
  districts,
  faqs,
}: IndustryPageProps) {
  const pageUrl = `${siteConfig.url}/industries/${slug}`
  const whatsappHref = siteConfig.whatsapp
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#industry-service`,
        name: `${industryName} Digital Growth Services in Dubai`,
        serviceType: `${industryName} branding, website, UX, SEO, AEO, GEO, and generative AI`,
        url: pageUrl,
        description: answer,
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.phone,
          priceRange: "AED",
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
        },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "Saudi Arabia", "Qatar", "Kuwait", "GCC"],
        audience: {
          "@type": "Audience",
          audienceType: `${industryName} businesses in UAE and GCC markets`,
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
          { "@type": "ListItem", position: 2, name: "Industries", item: `${siteConfig.url}/industries/${slug}` },
          { "@type": "ListItem", position: 3, name: industryName, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <>
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,rgba(87,217,255,0.18),transparent_46%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground/85">{subtitle}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{answer}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Plan a Dubai project
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-accent/30 px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-accent transition-colors hover:bg-accent/10"
                >
                  WhatsApp consultation
                </a>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#0b111d]/88 p-6 shadow-[0_40px_100px_-70px_rgba(87,217,255,0.38)] backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">SEO keyword cluster</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-accent/15 px-4 py-2 text-sm text-muted-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border/40 bg-[#070a12]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">AEO answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What does Vista by Lara deliver for {industryName.toLowerCase()} in Dubai?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">{answer}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border/30 bg-[#0c111d] p-7">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Industry Challenges</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                {challenges.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-accent/20 bg-[#08131d] p-7 shadow-[0_30px_80px_-70px_rgba(87,217,255,0.34)]">
              <h2 className="font-heading text-2xl font-semibold text-foreground">Vista Solution</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted-foreground">
                {solutions.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
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
          <div className="rounded-[1.75rem] border border-accent/15 bg-[#071018] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">GEO market context</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Built for UAE search, AI answers, and local buyer trust
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{marketContext}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {districts.map((place) => (
                <span key={place} className="rounded-full border border-accent/15 px-4 py-2">
                  {place}
                </span>
              ))}
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

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="grid gap-6 rounded-[1.75rem] border border-border/30 bg-[#0c111d] p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Authority cluster</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Connect {industryName.toLowerCase()} growth with Vista services
              </h2>
            </div>
            <div>
              <p className="text-base leading-7 text-muted-foreground">
                Each industry page links into branding, web design, UX, SEO, GEO, and AI services so search engines and AI systems can understand Vista by Lara as a UAE authority.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-full border border-accent/20 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </>
  )
}
