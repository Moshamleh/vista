import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.vistabylara.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "script-src-attr 'none'",
  [
    "connect-src 'self'",
    "https://prod.spline.design",
    "https://apis.spline.design",
    "https://hooks.spline.design",
    "https://relayserver.spline.design",
    "https://unpkg.com",
    "https://www.gstatic.com",
  ].join(" "),
  [
    "navigate-to 'self'",
    "https://vista-wa-nurture.vistabylara.workers.dev",
    "https://vista-brand-audit.vistabylara.workers.dev",
    "https://bloomcoreventures.com",
    "https://www.instagram.com",
    "https://www.tiktok.com",
    "https://www.linkedin.com",
    "https://www.behance.net",
    "https://x.com",
  ].join(" "),
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "media-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ")

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/crm",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "X-Download-Options",
            value: "noopen",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
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
