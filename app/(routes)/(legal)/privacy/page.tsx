import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const pageUrl = `${siteConfig.url}/privacy`
const updated = "20 June 2026"

export const metadata: Metadata = {
  title: "Privacy Policy | Vista by Lara",
  description:
    "Privacy Policy for Vista by Lara in Dubai, UAE, covering website inquiries, project communications, analytics, cookies, and UAE data protection rights.",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Privacy Policy | Vista by Lara",
    description:
      "Privacy Policy for Vista by Lara, a Dubai-based branding, UX, website, and generative AI agency.",
    url: pageUrl,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
  },
}

const sections = [
  {
    title: "1. Who We Are",
    body: [
      `${siteConfig.name} is a Dubai-based branding, UX design, website development, and generative AI agency serving clients across the UAE and GCC.`,
      `For privacy questions, contact us at ${siteConfig.email} or WhatsApp ${siteConfig.phone}.`,
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We collect information you submit through forms, email, WhatsApp, calls, project briefs, consultation bookings, and proposal requests. This may include your name, company, email address, phone number, location, service interest, budget range, project details, and files you choose to share.",
      "We may also collect technical information such as IP address, device type, browser, referring page, pages visited, approximate location, and analytics events.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    body: [
      "We use your information to respond to inquiries, prepare proposals, deliver services, manage projects, improve the website, measure marketing performance, prevent misuse, meet legal obligations, and maintain business records.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "4. Legal Basis and UAE Compliance",
    body: [
      "We process personal data where it is necessary to respond to your request, perform a contract, pursue legitimate business interests, comply with UAE legal requirements, or where you have given consent.",
      "We aim to handle personal data in line with applicable UAE data protection principles, including transparency, purpose limitation, data minimisation, security, and retention only for as long as needed.",
    ],
  },
  {
    title: "5. Cookies, Analytics, and Advertising",
    body: [
      "We may use cookies and similar technologies to operate the website, understand traffic, improve content, remember preferences, and measure campaign performance.",
      "You can control cookies through your browser settings. Some features may not work correctly if cookies are disabled.",
    ],
  },
  {
    title: "6. Service Providers",
    body: [
      "We may share limited information with trusted providers who help us operate the website, host content, process forms, manage analytics, deliver email, support payments, or provide project tools.",
      "These providers are only given information needed to perform their services.",
    ],
  },
  {
    title: "7. International Transfers",
    body: [
      "Some technology providers may process data outside the UAE. Where this happens, we use reasonable safeguards and work with reputable providers that maintain security and privacy controls.",
    ],
  },
  {
    title: "8. Data Retention",
    body: [
      "Inquiry and project records are kept only as long as needed for communication, service delivery, legal, accounting, tax, security, and legitimate business purposes.",
      "If a lead does not become a client, we may retain inquiry records for a reasonable period to manage follow-ups and avoid duplicate requests.",
    ],
  },
  {
    title: "9. Your Rights",
    body: [
      "You may request access, correction, deletion, restriction, or withdrawal of consent where applicable. You may also ask us to stop marketing communications.",
      `Send requests to ${siteConfig.email}. We may need to verify your identity before acting on a request.`,
    ],
  },
  {
    title: "10. Security",
    body: [
      "We use reasonable technical and organisational measures to protect personal data. No online system is completely secure, so please avoid sending highly sensitive information through website forms unless requested through an agreed secure channel.",
    ],
  },
  {
    title: "11. Children",
    body: ["Our website and services are intended for business users and are not directed to children."],
  },
  {
    title: "12. Updates",
    body: [
      "We may update this Privacy Policy when our services, legal requirements, or website technologies change. The latest version will be posted on this page.",
    ],
  },
]

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Privacy Policy",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
  dateModified: "2026-06-20",
  inLanguage: "en-AE",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="rounded-3xl border border-accent/10 bg-[#0d111f] p-6 shadow-[0_30px_80px_-64px_rgba(87,217,255,0.24)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-accent">Legal</p>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            Last updated: {updated}. This policy explains how Vista by Lara collects, uses, protects, and retains
            personal information from website visitors, leads, clients, suppliers, and business contacts in Dubai,
            the UAE, and GCC markets.
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
