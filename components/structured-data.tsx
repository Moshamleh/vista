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
  { name: "Oasis Living", description: "Brand identity and e-commerce experience for a Dubai home and lifestyle brand." },
  { name: "Al Safa Grill", description: "Brand identity and ordering app for a Dubai Marina restaurant." },
  {
    name: "Palm Horizon Properties",
    description: "Web platform and product design for a Business Bay real estate agency.",
  },
  {
    name: "Arabian Cloud Solutions",
    description: "Product design for a Dubai Internet City cloud technology company.",
  },
]

export function StructuredData() {
  const { url, name, legalName, description, shortDescription, email, foundingYear, sameAs, ogImage, address, areaServed } =
    siteConfig

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
        address: {
          "@type": "PostalAddress",
          addressLocality: address.locality,
          addressRegion: address.region,
          addressCountry: address.countryCode,
        },
        areaServed: areaServed.map((a) => ({ "@type": "Country", name: a })),
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
