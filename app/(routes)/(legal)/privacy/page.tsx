import { siteConfig } from "@/lib/site"

type Section = {
  title: string
  body: string[]
}

const sections: Section[] = [
  {
    title: "1. Company Information",
    body: [
      `${siteConfig.name} ("Vista by Lara", "we", "our", or "us") is a Dubai, United Arab Emirates based digital growth agency providing branding, website development, Shopify solutions, UX design, conversion optimisation, paid advertising, search marketing, generative engine optimisation (GEO), artificial intelligence implementation, automation, and consulting services.`,
      `For privacy-related enquiries, data requests, or compliance questions, contact us at ${siteConfig.email} or ${siteConfig.phone}.`,
      "This Privacy Policy explains how we collect, use, disclose, store, transfer, and protect personal information when you visit our website, communicate with us, engage our services, use our AI-powered tools, or interact with our marketing campaigns.",
    ],
  },
  {
    title: "2. Categories of Personal Information We Collect",
    body: [
      "We may collect identity information including name, company name, job title, business information, and professional details.",
      "We may collect contact information including email address, phone number, WhatsApp details, social media profiles, billing information, and communication preferences.",
      "We may collect project-related information including business goals, service requirements, budgets, uploaded documents, creative assets, website credentials, marketing data, analytics access, and campaign information provided by you.",
      "We may automatically collect technical information including IP address, browser type, operating system, device identifiers, session information, referral sources, website usage behaviour, location indicators, and performance data.",
    ],
  },
  {
    title: "3. How We Collect Information",
    body: [
      "Information may be collected directly through website forms, contact forms, lead generation forms, WhatsApp conversations, email communications, consultations, contracts, project onboarding processes, newsletter subscriptions, chatbot interactions, and customer support requests.",
      "Information may also be collected through cookies, analytics technologies, server-side tracking, advertising platforms, CRM systems, social media platforms, publicly available sources, and trusted business partners.",
    ],
  },
  {
    title: "4. Purposes of Processing",
    body: [
      "We process personal information to respond to enquiries, prepare proposals, deliver services, manage projects, provide customer support, process transactions, maintain client relationships, improve website performance, and fulfil contractual obligations.",
      "Information may also be used for business analytics, service improvement, fraud prevention, cybersecurity monitoring, legal compliance, marketing performance measurement, conversion tracking, and operational management.",
      "We do not sell personal information.",
    ],
  },
  {
    title: "5. Legal Basis for Processing",
    body: [
      "Where required by applicable law, personal information is processed based on consent, contractual necessity, legitimate business interests, legal obligations, protection of rights, fraud prevention, security requirements, and operational business purposes.",
      "You may withdraw consent at any time where processing relies on consent.",
    ],
  },
  {
    title: "6. Cookies, Pixels and Similar Technologies",
    body: [
      "Our website may use cookies, pixels, tags, local storage technologies, scripts, SDKs, session identifiers, and similar technologies.",
      "These technologies help operate the website, improve user experience, understand website performance, remember preferences, measure marketing effectiveness, prevent abuse, and optimise advertising campaigns.",
      "Cookie categories may include essential cookies, analytics cookies, preference cookies, advertising cookies, security cookies, and performance cookies.",
    ],
  },
  {
    title: "7. Analytics, Tracking and Advertising Platforms",
    body: [
      "We may use Google Analytics, Google Ads, Google Tag Manager, Google Search Console, Meta Ads technologies, LinkedIn Ads, Microsoft Clarity, server-side tracking solutions, conversion APIs, remarketing technologies, and attribution tools.",
      "These systems help us understand website traffic, visitor behaviour, campaign effectiveness, conversion performance, and business demand.",
      "Where applicable, data may be aggregated, pseudonymised, or processed for reporting and optimisation purposes.",
    ],
  },
  {
    title: "8. Artificial Intelligence and Automated Technologies",
    body: [
      "Our services may utilise artificial intelligence systems, large language models, chatbots, AI assistants, recommendation systems, workflow automations, generative AI tools, and machine-learning technologies.",
      "Information submitted to AI-powered systems may be processed to provide requested functionality, automate workflows, generate responses, analyse information, improve user experiences, and support business operations.",
      "No solely automated decision producing significant legal effects is intentionally made based solely on website interactions.",
    ],
  },
  {
    title: "9. WhatsApp, Email and Communication Services",
    body: [
      "If you communicate with us through WhatsApp, email, phone calls, video meetings, messaging platforms, or social media channels, we may retain communication records to manage enquiries, support requests, proposals, projects, and business relationships.",
      "Communication records may be retained for compliance, quality assurance, dispute resolution, and legitimate business purposes.",
    ],
  },
  {
    title: "10. Sharing Information with Service Providers",
    body: [
      "We may share information with carefully selected service providers including cloud hosting providers, website platforms, analytics providers, payment processors, communication platforms, CRM systems, AI providers, legal advisers, accountants, cybersecurity providers, and regulatory authorities where required.",
      "Service providers only receive information reasonably necessary to perform their services.",
    ],
  },
  {
    title: "11. International Transfers",
    body: [
      "Because we use international technology platforms and cloud services, personal information may be processed outside the United Arab Emirates.",
      "Where transfers occur, we implement reasonable organisational, contractual, and technical safeguards designed to protect personal information.",
    ],
  },
  {
    title: "12. Security Measures",
    body: [
      "We maintain technical and organisational safeguards including encrypted communications, secure hosting environments, access controls, role-based permissions, monitoring systems, backups, cybersecurity protections, and operational security procedures.",
      "While we take reasonable steps to protect personal information, no system can guarantee absolute security.",
    ],
  },
  {
    title: "13. Data Retention",
    body: [
      "Contact enquiries may be retained for up to 24 months.",
      "Client records, contracts, invoices, and accounting documentation may be retained for up to 7 years or longer where required by law.",
      "Analytics information, website logs, and security monitoring records may be retained according to operational and legal requirements.",
      "Retention periods may vary depending on legal, contractual, accounting, security, and business obligations.",
    ],
  },
  {
    title: "14. Your Privacy Rights",
    body: [
      "Subject to applicable law, you may request access, correction, deletion, restriction of processing, withdrawal of consent, objection to certain processing activities, and information regarding how your personal information is used.",
      `Requests may be submitted to ${siteConfig.email}.`,
      "Identity verification may be required before processing requests.",
    ],
  },
  {
    title: "15. Marketing Communications",
    body: [
      "We may send newsletters, educational content, service announcements, event invitations, industry updates, and promotional communications where permitted by law.",
      "You may unsubscribe from marketing communications at any time.",
    ],
  },
  {
    title: "16. Business Transfers",
    body: [
      "In connection with a merger, acquisition, restructuring, financing transaction, business transfer, investment activity, or asset sale, personal information may be transferred subject to applicable legal requirements and confidentiality obligations.",
    ],
  },
  {
    title: "17. Third-Party Services and Websites",
    body: [
      "Our website may contain links to third-party websites, software, platforms, services, and external resources.",
      "We are not responsible for the privacy practices, content, or policies of third parties.",
    ],
  },
  {
    title: "18. Children and Minors",
    body: [
      "Our services are intended for business users and professional audiences.",
      "We do not knowingly collect personal information from children under the age of 18.",
    ],
  },
  {
    title: "19. Security Incidents and Breach Response",
    body: [
      "If we become aware of a security incident affecting personal information, we will take appropriate actions consistent with applicable legal obligations, contractual commitments, and industry practices.",
    ],
  },
  {
    title: "20. Changes to This Policy",
    body: [
      "We may update this Privacy Policy periodically to reflect legal developments, service changes, technology updates, operational requirements, or business practices.",
      "The most recent version will always be available on this page.",
    ],
  },
  {
    title: "21. Contact Information",
    body: [
      `${siteConfig.name}`,
      "Dubai, United Arab Emirates",
      `Email: ${siteConfig.email}`,
      `Phone: ${siteConfig.phone}`,
      `Website: ${siteConfig.url}`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          This policy explains how Vista by Lara handles personal information when you visit our website or contact us.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-heading text-2xl font-semibold">{s.title}</h2>
              <div className="mt-4 space-y-3 text-muted-foreground">
                {s.body.map((p, idx) => (
                  <p key={idx} className="leading-7">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

