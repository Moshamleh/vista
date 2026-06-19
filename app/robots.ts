import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

/**
 * robots.txt
 * Standard crawlers are allowed. We also explicitly welcome the major
 * AI / answer-engine crawlers (GEO) so Vista can be surfaced and cited
 * by generative search engines such as ChatGPT, Claude, Gemini, and Perplexity.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAndAnswerEngines = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Amazonbot",
    "Bytespider",
    "Meta-ExternalAgent",
    "DuckAssistBot",
    "cohere-ai",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiAndAnswerEngines.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
