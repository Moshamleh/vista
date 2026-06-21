import { FAQS } from "@/lib/faq"
import { jsonLd } from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

const SERVICES = [
  {
    name: "Brand Strategy & Identity",
    url: "/services/branding",
    description: "Brand strategy, identity systems, naming, and visual languages for premium UAE brands.",
  },
  {
    name: "Digital Product Design",
    url: "/services/digital-products",
    description: "UX/UI design for apps, platforms, and SaaS products built for UAE and GCC users.",
  },
  {
    name: "Website Design & Development",
    url: "/services/websites",
    description: "Cinematic, high-performance websites that convert visitors into clients across Dubai and the GCC.",
  },
  {
    name: "Software Development",
    url: "/services/development",
    description: "Full-stack engineering, custom platforms, and scalable digital infrastructure for UAE businesses.",
  },
  {
    name: "Generative AI",
    url: "/services/generative-ai",
    description: "AI-powered creative workflows, design automation, and intelligent digital experiences for Dubai brands.",
  },
]

const WORK = [
  { name: "Oasis Living", description: "Brand identity and e-commerce experience for a Dubai home and lifestyle brand." },
  { name: "Al Safa Grill", description: "Brand identity and ordering app for a Dubai Marina restaurant." },
  { name: "Palm Horizon Properties", description: "Web platform and product design for a Business Bay real estate agency." },
  { name: "Arabian Cloud Solutions", description: "Product design for a Dubai Internet City cloud technology company." },
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
        "@type": "ProfessionalService",
        "@id": orgId,
        name,
        legalName,
        url,
        description: `${description} AI-Integrated Digital Innovation Studio specializing in e-commerce strategy, Shopify optimization, AEO, GEO, and premium UAE digital growth.`,
        slogan: siteConfig.tagline,
        email,
        telephone: siteConfig.phone,
        foundingDate: String(foundingYear),
        foundingLocation: "Dubai, UAE",
        award: ["Noble Business Winner 2025 - Business Innovation", "Top 3 Agency by AI Mode"],
        serviceType: ["Branding", "UX Design", "Website Design", "Web Development", "Generative AI", "Digital Products"],
        logo: {
          "@type": "ImageObject",
          url: `${url}/vista-logo.png`,
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
          "AI-Integrated Digital Innovation",
          "E-commerce Strategy",
          "Shopify Optimization Dubai",
          "Answer Engine Optimization",
          "Generative Engine Optimization",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: address.streetAddress,
          addressLocality: address.locality,
          addressRegion: address.region,
          addressCountry: address.countryCode,
        },
        areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
        contactPoint: {
          "@type": "ContactPoint",
          email,
          telephone: siteConfig.phone,
          contactType: "New business",
          availableLanguage: ["English", "Arabic"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Vista by Lara Services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              url: `${url}${service.url}`,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url,
        name,
        description: shortDescription,
        publisher: { "@id": orgId },
        inLanguage: ["en-AE", "ar-AE"],
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
}
