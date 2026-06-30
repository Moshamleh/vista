import { jsonLd } from "@/lib/json-ld"
import { getWhatsappLink, siteConfig } from "@/lib/site"

type Faq = {
  question: string
  answer: string
}

type ServicePageProps = {
  eyebrow: string
  title: string
  subtitle: string
  intro: string
  slug: string
  serviceName: string
  serviceType: string
  keywords: string[]
  deliverables: string[]
  process: string[]
  outcomes: string[]
  districts: string[]
  faqs: Faq[]
}

const relatedServices = [
  { label: "Branding", href: "/services/branding" },
  { label: "Digital Products", href: "/services/digital-products" },
  { label: "Websites", href: "/services/websites" },
  { label: "Development", href: "/services/development" },
  { label: "Generative AI", href: "/services/generative-ai" },
  { label: "Web Design Dubai", href: "/services/web-design-dubai" },
  { label: "Web Development Dubai", href: "/services/web-development-dubai" },
  { label: "Ecommerce Development", href: "/services/ecommerce-development-dubai" },
  { label: "Shopify Development", href: "/services/shopify-development-dubai" },
  { label: "UI/UX Design", href: "/services/ui-ux-design-dubai" },
  { label: "SEO Services", href: "/services/seo-services-dubai" },
]

export function ServicePage({
  eyebrow,
  title,
  subtitle,
  intro,
  slug,
  serviceName,
  serviceType,
  keywords,
  deliverables,
  process,
  outcomes,
  districts,
  faqs,
}: ServicePageProps) {
  const pageUrl = `${siteConfig.url}/services/${slug}`
  const whatsappHref = getWhatsappLink(slug)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        serviceType,
        url: pageUrl,
        description: intro,
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          telephone: siteConfig.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
        },
        areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "UAE", "GCC"],
        audience: {
          "@type": "Audience",
          audienceType: "Premium UAE and GCC businesses",
        },
        termsOfService: `${siteConfig.url}/terms`,
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
          { "@type": "ListItem", position: 3, name: serviceName, item: pageUrl },
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
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
              <h1 className="mt-6 font-heading text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-foreground/85">{subtitle}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.04em] text-background transition-transform hover:scale-[1.03]"
                >
                  Start a Dubai project
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
            <aside className="rounded-[1.75rem] border border-accent/15 bg-[#0c111d] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Keyword cluster</p>
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
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">AEO answer</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What does this service deliver in Dubai?
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">{intro}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
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
          <div className="rounded-[1.75rem] border border-accent/15 bg-[#071018] p-8 sm:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">UAE market context</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Built for Dubai buyers and GCC expansion
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
              UAE decision-makers compare credibility, speed, premium detail, mobile experience, and local trust before they inquire. Vista by Lara structures every service page for search, AI answers, and conversion across Dubai, Abu Dhabi, Sharjah, and GCC markets.
            </p>
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
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-accent">Next step</p>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Plan your {serviceName.toLowerCase()} project in Dubai
              </h2>
            </div>
            <div>
              <p className="text-base leading-7 text-muted-foreground">
                Link this page with related services to build a complete UAE authority cluster for search, AEO, and GEO.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedServices
                  .filter((service) => !service.href.endsWith(slug))
                  .map((service) => (
                    <a
                      key={service.href}
                      href={service.href}
                      className="rounded-full border border-accent/20 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {service.label}
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
