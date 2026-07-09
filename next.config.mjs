import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Removed fabricated/unconfirmed case studies (2026-07-09 trust-signal cleanup)
      { source: "/case-studies/ounass", destination: "/work", permanent: true },
      { source: "/case-studies/stylishop", destination: "/work", permanent: true },
      { source: "/case-studies/liu-jo", destination: "/work", permanent: true },
      { source: "/case-studies/perfume-gallery", destination: "/work", permanent: true },
      { source: "/case-studies/keyspace-realty", destination: "/work", permanent: true },

      // Doorway-page consolidation (2026-07-09): ~50 keyword-swap service pages
      // collapsed into 10 canonical /services pages per the SEO/AEO/GEO audit.
      { source: "/services/seo-agency-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/technical-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/arabic-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/local-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/seo-audit-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/on-page-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/off-page-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/seo-consulting-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/keyword-research-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/seo-content-writing-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/multilingual-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/real-estate-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/healthcare-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/ecommerce-seo-dubai", destination: "/services/seo-optimization", permanent: true },
      { source: "/services/seo-services-dubai", destination: "/services/seo-optimization", permanent: true },

      { source: "/services/ai-seo-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/geo-services-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/aeo-agency-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/claude-seo-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/bing-copilot-seo-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/chatgpt-seo-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/perplexity-seo-dubai", destination: "/services/aeo-geo", permanent: true },
      { source: "/services/google-ai-overview-optimization-dubai", destination: "/services/aeo-geo", permanent: true },

      { source: "/services/development", destination: "/services/web-development-dubai", permanent: true },
      { source: "/services/mobile-app-development-dubai", destination: "/services/web-development-dubai", permanent: true },
      { source: "/services/website-maintenance-dubai", destination: "/services/web-development-dubai", permanent: true },
      { source: "/services/maintenance-management", destination: "/services/web-development-dubai", permanent: true },

      { source: "/services/websites", destination: "/services/web-design-dubai", permanent: true },

      { source: "/services/ecommerce-development-dubai", destination: "/services/shopify-development-dubai", permanent: true },

      { source: "/services/digital-products", destination: "/services/ui-ux-design-dubai", permanent: true },

      { source: "/services/hubspot-crm-dubai", destination: "/services/uae-ai-agent", permanent: true },
      { source: "/services/generative-ai", destination: "/services/uae-ai-agent", permanent: true },
      { source: "/services/ai-ecommerce", destination: "/services/uae-ai-agent", permanent: true },

      { source: "/services/ppc-agency-dubai", destination: "/services/google-ads-dubai", permanent: true },

      { source: "/services/digital-marketing-company-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/lead-generation-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/landing-page-optimization-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/conversion-rate-optimization-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/online-reputation-management-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/google-analytics-setup-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/google-tag-manager-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/social-media-marketing-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/content-marketing-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/video-marketing-dubai", destination: "/services/digital-marketing", permanent: true },
      { source: "/services/meta-ads-dubai", destination: "/services/digital-marketing", permanent: true },

      // Arabic mirrors for the folds above that had hand-authored Arabic content
      { source: "/ar/services/seo-services-dubai", destination: "/ar/services/seo-optimization", permanent: true },
      { source: "/ar/services/development", destination: "/ar/services/web-development-dubai", permanent: true },
      { source: "/ar/services/websites", destination: "/ar/services/web-design-dubai", permanent: true },
      { source: "/ar/services/digital-products", destination: "/ar/services/ui-ux-design-dubai", permanent: true },
      { source: "/ar/services/ecommerce-development-dubai", destination: "/ar/services/shopify-development-dubai", permanent: true },
      { source: "/ar/services/ai-ecommerce", destination: "/ar/services/uae-ai-agent", permanent: true },
      { source: "/ar/services/generative-ai", destination: "/ar/services/uae-ai-agent", permanent: true },
      { source: "/ar/services/maintenance-management", destination: "/ar/services/web-development-dubai", permanent: true },
      { source: "/ar/services/meta-ads-dubai", destination: "/ar/services/digital-marketing", permanent: true },

      // Top-level keyword-swap doorway pages folded into canonical service pages
      { source: "/ai-agency-dubai", destination: "/services/uae-ai-agent", permanent: true },
      { source: "/branding-agency-dubai", destination: "/services/branding", permanent: true },
      { source: "/shopify-agency-uae", destination: "/services/shopify-development-dubai", permanent: true },
      { source: "/ux-design-uae", destination: "/services/ui-ux-design-dubai", permanent: true },
    ]
  },
}

export default nextConfig
