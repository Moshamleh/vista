import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/terms`
const updated = "20 June 2026"

export const metadata: Metadata = {
  title: "Terms of Use | Vista by Lara",
  description:
    "Terms of Use for Vista by Lara, a Dubai, UAE branding, UX, website development, and generative AI agency. Includes AED fees, VAT, project terms, IP, and acceptable use.",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Terms of Use | Vista by Lara",
    description:
      "Terms of Use for Vista by Lara, the Dubai-based branding, UX, website, and generative AI agency.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
  },
}

const sections = [
  {
    title: "1. Agreement to These Terms",
    body: [
      `These Terms of Use govern your access to ${siteConfig.name}'s website and your use of our branding, UX design, website development, content, strategy, and generative AI services.`,
      "By using this website, submitting an inquiry, approving a proposal, or engaging our services, you agree to these Terms unless a signed agreement states otherwise.",
    ],
  },
  {
    title: "2. Business Information",
    body: [
      `${siteConfig.name} is based in Dubai, United Arab Emirates. Email: ${siteConfig.email}. WhatsApp/phone: ${siteConfig.phone}.`,
      "We serve businesses across Dubai, Abu Dhabi, Sharjah, the wider UAE, and GCC markets.",
    ],
  },
  {
    title: "3. Proposals, Scope, and Deliverables",
    body: [
      "Project scope, deliverables, timelines, revision rounds, dependencies, and fees are confirmed in the relevant proposal, statement of work, invoice, or written agreement.",
      "Any work outside the approved scope may require a change request, revised timeline, and additional AED fee.",
    ],
  },
  {
    title: "4. Fees, AED Pricing, and UAE VAT",
    body: [
      "Website prices and service fees are shown in UAE dirhams (AED) unless stated otherwise in writing.",
      "All prices are exclusive of UAE VAT unless expressly stated. Where VAT applies, it will be added to invoices at the applicable UAE rate, currently 5%.",
      "Payment schedules, deposits, instalments, retainer terms, and late-payment consequences are set out in the approved proposal or invoice.",
    ],
  },
  {
    title: "5. Client Responsibilities",
    body: [
      "You are responsible for providing accurate information, approvals, content, access credentials, brand assets, legal copy, product details, and feedback on time.",
      "Delays in feedback, access, content, or approvals may move project milestones and delivery dates.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "Upon full payment, you receive the rights to final approved deliverables created specifically for your project, subject to any third-party licenses, platform terms, stock assets, fonts, plugins, or open-source software.",
      "We retain ownership of our pre-existing tools, methods, frameworks, templates, code libraries, processes, know-how, and unused concepts.",
      "We may display completed work in portfolios, case studies, awards, proposals, and social channels unless a written confidentiality restriction is agreed.",
    ],
  },
  {
    title: "7. Third-Party Services",
    body: [
      "Projects may use third-party platforms such as hosting providers, CMS tools, analytics, payment processors, AI tools, email tools, stock libraries, fonts, plugins, and social platforms.",
      "You are responsible for third-party fees and compliance with their terms unless our proposal states otherwise.",
    ],
  },
  {
    title: "8. Website Information",
    body: [
      "Website content is provided for general business information and does not create a professional, legal, financial, tax, or technical obligation unless confirmed in a signed agreement.",
      "We aim to keep information accurate, but we do not guarantee that all website content is complete, current, or error-free.",
    ],
  },
  {
    title: "9. Acceptable Use",
    body: [
      "You must not misuse the website, attempt unauthorised access, interfere with security, scrape at unreasonable volume, upload malicious code, or use our content in a misleading or unlawful way.",
      "You must not copy, resell, or commercially exploit website content, designs, assets, or materials without written permission.",
    ],
  },
  {
    title: "10. Confidentiality",
    body: [
      "Each party should protect confidential business information shared during a project. Confidentiality obligations do not apply to information that is public, independently developed, or lawfully received from another source.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Vista by Lara is not liable for indirect, incidental, consequential, special, or lost-profit damages arising from website use or services.",
      "Our total liability for a paid project is limited to the amount paid to us for the specific service giving rise to the claim, unless applicable law requires otherwise.",
    ],
  },
  {
    title: "12. Governing Law",
    body: [
      "These Terms are governed by the laws applicable in the United Arab Emirates, subject to any mandatory local rules or written agreement between the parties.",
    ],
  },
  {
    title: "13. Contact",
    body: [`For questions about these Terms, contact ${siteConfig.email} or ${siteConfig.phone}.`],
  },
]

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Terms of Use",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  dateModified: "2026-06-20",
  inLanguage: "en-AE",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="rounded-3xl border border-accent/10 bg-[#0d111f] p-6 shadow-[0_30px_80px_-64px_rgba(87,217,255,0.24)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">Legal</p>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Terms of Use
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            Last updated: {updated}. These terms explain how visitors, leads, and clients may use the Vista by Lara
            website and how our Dubai-based services are scoped, priced, delivered, and governed.
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
