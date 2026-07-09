import type { Metadata } from "next"

import { PaidAdsServicePage } from "@/components/paid-ads-service-page"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/site"

const keywords = [
  "Google Ads Dubai",
  "Google Ads management Dubai",
  "Google Ads agency UAE",
  "PPC agency Dubai",
  "Google Search Ads Dubai",
  "Performance Max Dubai",
  "lead generation Dubai",
  "real estate Google Ads Dubai",
  "clinic Google Ads UAE",
  "إعلانات جوجل دبي",
  "إدارة إعلانات جوجل الإمارات",
]

export const metadata: Metadata = {
  title: "Google Ads Dubai | PPC Management UAE",
  description:
    "Google Ads management in Dubai for UAE brands needing accurate tracking, landing pages, qualified leads, and documented sales growth.",
  keywords,
  alternates: {
    canonical: `${siteConfig.url}/services/google-ads-dubai`,
    languages: {
      "en-AE": `${siteConfig.url}/services/google-ads-dubai`,
      "ar-AE": `${siteConfig.url}/ar/services/google-ads-dubai`,
    },
  },
  openGraph: {
    title: "Google Ads Dubai | PPC Management UAE",
    description:
      "Search, Performance Max, conversion tracking, landing pages, and sales growth reporting for Dubai and UAE campaigns.",
    url: `${siteConfig.url}/services/google-ads-dubai`,
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Ads Dubai | PPC Management UAE",
    description: "Google Ads management in Dubai with accurate tracking, qualified leads, and growth reporting.",
    images: [siteConfig.ogImage],
  },
}

export default function GoogleAdsServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PaidAdsServicePage
        platform="Google Ads"
        eyebrow="Google Ads Dubai"
        title="Google Ads management in Dubai for measurable sales growth."
        subtitle="Search, Performance Max, YouTube, display, retargeting, landing pages, and conversion tracking for UAE companies that need qualified inquiries."
        intro="Vista by Lara manages Google Ads in Dubai as a complete growth system: account architecture, keyword intent, landing page quality, GA4 conversion tracking, Google Tag Manager, CRM feedback, and sales reporting."
        slug="google-ads-dubai"
        serviceName="Google Ads Management Dubai"
        primaryCta="Request Google Ads audit"
        secondaryHref="/services/meta-ads-dubai"
        secondaryLabel="View Meta Ads"
        keywords={keywords}
        serviceBlocks={[
          {
            title: "Search Ads for UAE intent",
            body: "Campaigns are mapped around Dubai and UAE search intent, including high-intent service, location, emergency, comparison, and brand-defense keywords.",
          },
          {
            title: "Performance Max management",
            body: "Performance Max is structured with audience signals, asset groups, conversion hygiene, negative themes, and landing page alignment to reduce wasted automation.",
          },
          {
            title: "Landing page conversion system",
            body: "Ad traffic should not land on weak generic pages. We align page copy, forms, WhatsApp CTAs, proof, schema, and offer clarity with the search query.",
          },
          {
            title: "Retargeting and remarketing",
            body: "We build remarketing audiences for engaged visitors, abandoned forms, key page viewers, and service-specific prospects while respecting consent and platform rules.",
          },
          {
            title: "Lead quality optimization",
            body: "Campaigns are reviewed against qualified inquiries, not just clicks. Search terms, forms, call data, WhatsApp intent, and CRM notes guide optimization.",
          },
          {
            title: "Press-ready growth reporting",
            body: "Where sales figures are verified, we package performance into clear growth narratives for leadership updates, media proof, award entries, and public credibility assets.",
          },
        ]}
        setupBlocks={[
          {
            title: "Google Ads application setup",
            body: "We structure the account, billing readiness, campaign hierarchy, location settings, extensions, assets, policy checks, and launch controls.",
          },
          {
            title: "GA4 and Google Tag Manager",
            body: "We configure GA4, GTM, key events, form submissions, WhatsApp clicks, call clicks, booking actions, and source attribution.",
          },
          {
            title: "Conversion actions and imports",
            body: "Qualified lead events, sales stages, offline conversions, and CRM imports can be mapped so Google optimizes toward better business outcomes.",
          },
          {
            title: "Application and app campaign events",
            body: "For mobile applications, we define app install, registration, purchase, lead, and subscription events so campaigns can learn from real user actions.",
          },
        ]}
        industries={[
          { title: "Real estate and property", body: "Google Ads for off-plan launches, ready units, rentals, property management, and developer campaigns in Dubai, Abu Dhabi, and Sharjah." },
          { title: "Clinics and healthcare", body: "Appointment-focused search campaigns for clinics, dental, aesthetics, wellness, and specialist providers with careful compliance language." },
          { title: "E-commerce and Shopify", body: "Shopping, search, Performance Max, and remarketing for UAE online stores that need revenue visibility and cleaner product feed logic." },
          { title: "Hospitality and restaurants", body: "Search campaigns for bookings, event inquiries, Ramadan offers, brunches, venue hire, and local discovery across Dubai districts." },
          { title: "Home services and maintenance", body: "Lead-generation campaigns for urgent repairs, recurring maintenance, cleaning, fit-out, AC, and building service categories." },
          { title: "Professional services", body: "High-intent search campaigns for legal, consulting, finance, education, B2B, and specialist service providers in the UAE." },
        ]}
        proofPoints={[
          { title: "Sales growth trail", body: "Reports connect ad spend, qualified inquiries, revenue notes, and sales-stage movement so growth can be audited instead of inferred." },
          { title: "Media documentation pack", body: "Verified campaign outcomes can be translated into press-ready evidence, founder updates, case studies, and award-support narratives." },
          { title: "Search term evidence", body: "Search term reviews show exactly which buyer intents are producing serious inquiries and which terms should be excluded." },
          { title: "Landing page proof", body: "Conversion pages document offer clarity, trust signals, tracking events, and user actions so campaign improvements are visible." },
        ]}
        faqs={[
          {
            question: "What does Google Ads management in Dubai include?",
            answer:
              "Google Ads management in Dubai includes campaign setup, keyword strategy, tracking, landing pages, budget control, optimization, and reporting. Vista by Lara connects these elements to qualified UAE lead generation.",
          },
          {
            question: "Can Google Ads generate real estate leads in Dubai?",
            answer:
              "Yes. Google Ads can generate property inquiries when campaigns target clear buyer, tenant, investor, and location intent. Tracking and landing page quality decide whether those inquiries become useful leads.",
          },
          {
            question: "Do you set up GA4 and conversion tracking?",
            answer:
              "Yes. We plan GA4, Google Tag Manager, conversion actions, WhatsApp clicks, form events, calls, bookings, and CRM feedback where the stack allows it.",
          },
          {
            question: "Can you run ads for mobile applications?",
            answer:
              "Yes. App campaigns need event planning for installs, registrations, purchases, subscriptions, and qualified actions. The campaign should optimize beyond installs when enough data exists.",
          },
          {
            question: "How do you prove sales growth from Google Ads?",
            answer:
              "We connect platform metrics with lead quality, CRM notes, sales-stage data, and verified business outcomes. This creates a clearer evidence trail for leadership and press-ready reporting.",
          },
          {
            question: "Should Google Ads link to SEO and AI visibility?",
            answer:
              "Yes. Paid search performs better when landing pages, SEO content, structured data, and AI-readable service pages all explain the business clearly.",
          },
        ]}
      />
      <SiteFooter />
    </div>
  )
}
