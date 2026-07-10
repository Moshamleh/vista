import type { Metadata } from "next"
import type { KnowledgeArticlePackage } from "@/lib/knowledge/types"
import { siteConfig } from "@/lib/site"

export function generateKnowledgeMetadata(article: KnowledgeArticlePackage): Metadata {
  const imageUrl = new URL(article.meta.image.src, siteConfig.url).toString()

  return {
    title: article.meta.metaTitle || article.meta.seoTitle,
    description: article.meta.metaDescription,
    keywords: [article.meta.focusKeyword, ...article.meta.secondaryKeywords, ...article.meta.tags],
    alternates: {
      canonical: article.meta.canonical,
      languages: {
        "en-AE": article.meta.canonical,
        "ar-AE": `${siteConfig.url}/ar${article.meta.path}`,
      },
    },
    openGraph: {
      title: article.meta.ogTitle || article.meta.seoTitle,
      description: article.meta.ogDescription || article.meta.metaDescription,
      url: article.meta.canonical,
      type: "article",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: article.meta.publishedAt,
      modifiedTime: article.meta.updatedAt,
      authors: [article.meta.author],
      images: [
        {
          url: imageUrl,
          width: 1400,
          height: 700,
          alt: article.meta.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.ogTitle || article.meta.seoTitle,
      description: article.meta.ogDescription || article.meta.metaDescription,
      images: [imageUrl],
    },
  }
}
