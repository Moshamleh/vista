import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { siteConfig } from '@/lib/site'
import { StructuredData } from '@/components/structured-data'
import { GsapScrollEffects } from '@/components/gsap-scroll-effects'
import { VercelSpeedInsights } from '@/components/vercel-speed-insights'
import { VistaLeadQualifier } from '@/components/vista-lead-qualifier'
import { TrackedWhatsappLinks } from '@/components/tracked-whatsapp-links'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: 'v0.app',
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'Design',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  other: {
    'geo.region': 'AE-DU',
    'geo.placename': 'Dubai',
    'geo.position': '25.2048;55.2708',
    ICBM: '25.2048, 55.2708',
    'content-language': 'en-AE, ar-AE',
    language: 'English',
    'language:alternate': 'Arabic',
    author: siteConfig.name,
    publisher: siteConfig.name,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [{ url: '/vista-logo.png', type: 'image/png', sizes: '500x500' }],
    apple: '/vista-logo.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} bg-background`}
    >
      <head>
        <StructuredData />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              location: {
                "@type": "Place",
                name: "Dubai, UAE",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Dubai",
                  addressRegion: "Dubai",
                  addressCountry: "United Arab Emirates",
                },
              },
              serviceType: ["AI Design", "Shopify", "Google Ads", "GEO"],
              sameAs: siteConfig.sameAs,
              founder: {
                "@type": "Person",
                name: siteConfig.founder,
              },
            }),
          }}
        />
      </head>
      <body className="tactile-brutalist font-sans antialiased">
        <GsapScrollEffects />
        {children}
        <TrackedWhatsappLinks />
        <VistaLeadQualifier />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <VercelSpeedInsights />}
      </body>
    </html>
  )
}
