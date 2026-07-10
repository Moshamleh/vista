import type { KnowledgeArticlePackage } from "@/lib/knowledge/types"
import { siteConfig } from "@/lib/site"

export function generateKnowledgeJsonLd(article: KnowledgeArticlePackage) {
  const imageUrl = new URL(article.meta.image.src, siteConfig.url).toString()
  const hasVisibleFaq = /\n##\s+FAQ\b/i.test(article.article)
  const breadcrumbItems = [
    { name: "Home", item: siteConfig.url },
    { name: "Knowledge", item: `${siteConfig.url}/knowledge` },
    { name: article.meta.pillar, item: `${siteConfig.url}/knowledge/${article.meta.pillar}` },
    { name: article.meta.title, item: article.meta.canonical },
  ]

  const organization = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    sameAs: siteConfig.sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#principal`,
        name: siteConfig.principal.name,
        jobTitle: siteConfig.principal.title,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        sameAs: siteConfig.principal.sameAs,
      },
      {
        "@type": "WebPage",
        "@id": article.meta.canonical,
        url: article.meta.canonical,
        name: article.meta.title,
        description: article.meta.metaDescription,
        inLanguage: "en-AE",
        isPartOf: { "@id": siteConfig.url },
        about: { "@type": "Thing", name: article.entities.primaryEntity.name },
      },
      {
        "@type": "TechArticle",
        headline: article.meta.title,
        alternativeHeadline: article.meta.seoTitle,
        description: article.meta.metaDescription,
        url: article.meta.canonical,
        datePublished: article.meta.publishedAt,
        dateModified: article.meta.updatedAt,
        articleSection: article.meta.pillar,
        proficiencyLevel: article.meta.difficulty,
        keywords: [article.meta.focusKeyword, ...article.meta.secondaryKeywords, ...article.meta.tags],
        author: { "@id": `${siteConfig.url}/#principal` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          caption: article.meta.image.alt,
        },
        mainEntityOfPage: { "@id": article.meta.canonical },
        about: [
          { "@type": "Thing", name: article.entities.primaryEntity.name },
          ...article.entities.serviceEntities.map((entity) => ({ "@type": "Service", name: entity.name })),
          ...article.entities.geographicEntities.map((entity) => ({ "@type": "Place", name: entity.name })),
        ],
        mentions: [
          ...article.entities.supportingEntities,
          ...article.entities.organizations,
          ...article.entities.technologyEntities,
          ...article.entities.relatedConcepts,
        ].map((entity) => ({ "@type": "Thing", name: entity.name })),
      },
      ...(hasVisibleFaq ? [{
        "@type": "FAQPage",
        mainEntity: article.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      },
      {
        "@type": "ImageObject",
        contentUrl: imageUrl,
        name: article.meta.title,
        description: article.meta.image.alt,
      },
    ],
  }
}
