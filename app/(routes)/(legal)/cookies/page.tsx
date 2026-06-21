import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/cookies`
const updated = "20 June 2026"

export const metadata: Metadata = {
  title: "Cookie Policy | Vista by Lara",
  description:
    "Cookie Policy for Vista by Lara in Dubai, UAE. Learn how we use essential, analytics, preference, and marketing cookies on vistabylara.com.",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Cookie Policy | Vista by Lara",
    description:
      "Cookie Policy for Vista by Lara, the Dubai luxury branding, UX, website, and generative AI agency.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
  },
}

const sections = [
  {
    title: "1. What Cookies Are",
    body: [
      "Cookies are small files placed on your browser or device when you visit a website. Similar technologies include pixels, local storage, tags, and analytics scripts.",
      "They help websites work, remember preferences, understand usage, and measure campaigns.",
    ],
  },
  {
    title: "2. How Vista by Lara Uses Cookies",
    body: [
      "Vista by Lara uses cookies and similar technologies to operate the website, keep pages secure, understand visitor behaviour, improve content, measure campaigns, and support inquiry workflows.",
      "We use these tools to make the website more useful for Dubai, UAE, and GCC business visitors.",
    ],
  },
  {
    title: "3. Types of Cookies We May Use",
    body: [
      "Essential cookies help the website load, route pages, maintain security, and support basic functionality.",
      "Analytics cookies help us understand page views, traffic sources, device types, and content performance.",
      "Preference cookies may remember choices such as form state or display preferences.",
      "Marketing cookies may help measure advertising performance, retargeting, and lead attribution where enabled.",
    ],
  },
  {
    title: "4. Third-Party Tools",
    body: [
      "We may use trusted third-party tools for hosting, analytics, forms, advertising measurement, embedded media, security, performance monitoring, and customer communication.",
      "These providers may place their own cookies subject to their privacy and cookie policies.",
    ],
  },
  {
    title: "5. Managing Cookies",
    body: [
      "You can block, delete, or limit cookies through your browser settings. Browser controls usually allow you to remove existing cookies and prevent future cookies.",
      "If you disable essential cookies, parts of the website may not work correctly.",
    ],
  },
  {
    title: "6. Consent and Preferences",
    body: [
      "Where required, we will request consent before using non-essential cookies. You may withdraw or change cookie preferences through browser settings or any consent tool shown on the website.",
    ],
  },
  {
    title: "7. Updates",
    body: [
      "We may update this Cookie Policy when we change website tools, analytics setup, advertising systems, or legal requirements.",
    ],
  },
  {
    title: "8. Contact",
    body: [`For questions about cookies or privacy, contact ${siteConfig.email} or ${siteConfig.phone}.`],
  },
]

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Cookie Policy",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  dateModified: "2026-06-20",
  inLanguage: "en-AE",
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="rounded-3xl border border-accent/10 bg-[#0d111f] p-6 shadow-[0_30px_80px_-64px_rgba(87,217,255,0.24)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">Legal</p>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Cookie Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            Last updated: {updated}. This Cookie Policy explains how Vista by Lara uses cookies and similar
            technologies on vistabylara.com for website functionality, analytics, preferences, and marketing
            measurement.
          </p>
          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-border/60 pt-7">
                <h2 className="font-heading text-2xl font-semibold text-foreground">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <SiteFooter />
    </div>
  )
}
