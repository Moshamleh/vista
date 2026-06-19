import { siteConfig } from "@/lib/site"
import { FAQS } from "@/lib/faq"

/**
 * Centralized JSON-LD structured data using a linked @graph.
 * Entities reference each other by @id so search and answer engines
 * can resolve Vista as a single, well-defined organization with a
 * site, services, portfolio, and FAQ. Powers rich results (SEO),
 * answer extraction (AEO), and entity grounding for LLMs (GEO).
 */

const SERVICES = [
  {
    name: "Brand Strategy & Identity",
    description:
      "Brand strategy, identity systems, naming, and visual languages that make category leaders unmistakable.",
  },
  {
    name: "Digital Product Design",
    description:
      "End-to-end product design — research, UX, and polished UI for apps that millions of people love to use.",
  },
  {
    name: "Website Design & Development",
    description:
      "Editorial, conversion-driven marketing sites and immersive web experiences built to perform.",
  },
  {
    name: "Software Development",
    description: "Production-grade engineering across web and mobile, shipped fast on a modern, scalable stack.",
  },
  {
    name: "Content & Motion",
    description: "Story, copy, art direction, and motion that give your brand a distinct, consistent voice.",
  },
  {
    name: "Generative AI",
    description:
      "AI woven into design and product workflows to build smarter, more adaptive experiences.",
  },
]

const WORK = [
  { name: "Meem Banking", description: "Fintech product design for a digital banking experience." },
  { name: "Joe Coffee", description: "Branding and loyalty app design for a specialty coffee brand." },
  { name: "Atelier Mode", description: "E-commerce web design for a fashion house." },
  { name: "Northwind Analytics", description: "SaaS design system and product design for an analytics platform." },
]

export function StructuredData() {
  const { url, name, legalName, description, shortDescription, email, foundingYear, sameAs, ogImage } = siteConfig

  const orgId = `${url}/#organization`
  const siteId = `${url}/#website`

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name,
        legalName,
        url,
        description,
        slogan: siteConfig.tagline,
        email,
        foundingDate: String(foundingYear),
        logo: {
          "@type": "ImageObject",
          url: `${url}/icon.svg`,
        },
        image: `${url}${ogImage}`,
        sameAs: [...sameAs],
        knowsAbout: [
          "Branding",
          "Brand Strategy",
          "UX Design",
          "UI Design",
          "Product Design",
          "Web Design",
          "Software Development",
          "Design Systems",
          "Generative AI",
        ],
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        contactPoint: {
          "@type": "ContactPoint",
          email,
          contactType: "New business",
          availableLanguage: ["English"],
        },
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url,
        name,
        description: shortDescription,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        isPartOf: { "@id": siteId },
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}/#work`,
        name: "Selected work",
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        hasPart: WORK.map((w) => ({
          "@type": "CreativeWork",
          name: w.name,
          description: w.description,
          creator: { "@id": orgId },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static and trusted; this is the standard Next.js pattern.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
