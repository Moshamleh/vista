import { Calculator, LineChart, Megaphone, type LucideIcon } from "lucide-react"
import { siteConfig } from "@/lib/site"

export type AiToolSlug = "vat-calculator-uae" | "google-ads-calculator" | "meta-ads-calculator"

export type AiTool = {
  slug: AiToolSlug
  name: string
  shortName: string
  category: string
  icon: LucideIcon
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  arabicKeyword: string
  estimatedTime: string
  updatedDate: string
  version: string
  primaryQuestion: string
  aiSummary: string
  formula: string
  legalDisclaimer: string
  references: { label: string; href: string }[]
  examples: { label: string; value: string; explanation: string }[]
  faq: { q: string; a: string }[]
  relatedServices: { label: string; href: string }[]
  relatedTools: AiToolSlug[]
}

export const aiTools: AiTool[] = [
  {
    slug: "vat-calculator-uae",
    name: "UAE VAT Calculator",
    shortName: "VAT Calculator",
    category: "Tax",
    icon: Calculator,
    description:
      "Calculate UAE VAT at 5% for VAT-exclusive, VAT-inclusive, and reverse VAT scenarios in AED and GCC currencies.",
    metaTitle: "UAE VAT Calculator | Free 5% VAT Tool Dubai",
    metaDescription:
      "Free UAE VAT calculator for Dubai businesses. Calculate 5% VAT inclusive, exclusive, reverse VAT, invoices, bulk rows and exports.",
    keywords: ["UAE VAT calculator", "VAT calculator Dubai", "5% VAT UAE", "VAT inclusive calculator UAE"],
    arabicKeyword: "حاسبة ضريبة القيمة المضافة الإمارات",
    estimatedTime: "30 seconds",
    updatedDate: "2026-07-04",
    version: "3.0",
    primaryQuestion: "How do I calculate UAE VAT at 5%?",
    aiSummary:
      "The UAE VAT Calculator by Vista by Lara calculates 5% VAT for Dubai and UAE invoices. It supports VAT-exclusive, VAT-inclusive, reverse VAT, bulk rows, exports, print, share links, copy results, history, and AED-first business use.",
    formula:
      "VAT-exclusive: VAT = net amount x 5%, gross = net + VAT. VAT-inclusive: net = gross / 1.05, VAT = gross - net.",
    legalDisclaimer:
      "This calculator is an educational business tool. It does not replace advice from a UAE tax agent, accountant, or the Federal Tax Authority.",
    references: [
      { label: "Federal Tax Authority - VAT", href: "https://tax.gov.ae/en/taxes/vat.aspx" },
      { label: "FTA guides, references and public clarifications", href: "https://tax.gov.ae/en/taxes/vat/guides-references-public-clarifications.aspx" },
    ],
    examples: [
      { label: "100 AED", value: "5 AED VAT, 105 AED total", explanation: "A 100 AED VAT-exclusive invoice adds 5 AED VAT." },
      { label: "500 AED", value: "25 AED VAT, 525 AED total", explanation: "Useful for small UAE service invoices and retail orders." },
      { label: "1,000 AED", value: "50 AED VAT, 1,050 AED total", explanation: "Common for professional-service retainers and deposits." },
      { label: "5,000 AED", value: "250 AED VAT, 5,250 AED total", explanation: "Useful for campaign, design, or maintenance invoices." },
      { label: "10,000 AED", value: "500 AED VAT, 10,500 AED total", explanation: "A clear B2B example for UAE proposals." },
      { label: "100,000 AED", value: "5,000 AED VAT, 105,000 AED total", explanation: "Enterprise invoices need careful tax invoice formatting and review." },
    ],
    faq: [
      {
        q: "What is VAT in the UAE?",
        a: "VAT is a consumption tax applied through the supply chain and usually borne by the final consumer. The standard UAE VAT rate used by this calculator is 5%.",
      },
      {
        q: "How do I calculate VAT-exclusive prices in Dubai?",
        a: "Multiply the net amount by 5% to get VAT, then add that VAT to the net amount. For 1,000 AED, VAT is 50 AED and the gross amount is 1,050 AED.",
      },
      {
        q: "How do I reverse calculate VAT from a UAE total?",
        a: "Divide the VAT-inclusive amount by 1.05 to find the net amount. Subtract the net amount from the total to find the VAT portion.",
      },
      {
        q: "Can I use this for tax invoices?",
        a: "You can use the result as a calculation aid for invoice preparation. Your actual UAE tax invoice should still follow FTA requirements and your accountant's review.",
      },
      {
        q: "Does UAE VAT apply to every transaction?",
        a: "No. Some supplies can be zero-rated or exempt under UAE VAT rules. Confirm the correct treatment with official FTA guidance or a qualified adviser.",
      },
    ],
    relatedServices: [
      { label: "Ecommerce Development Dubai", href: "/services/ecommerce-development-dubai" },
      { label: "Shopify Development Dubai", href: "/services/shopify-development-dubai" },
      { label: "AI E-commerce", href: "/services/ai-ecommerce" },
    ],
    relatedTools: ["google-ads-calculator", "meta-ads-calculator"],
  },
  {
    slug: "google-ads-calculator",
    name: "Google Ads Calculator",
    shortName: "Google Ads ROI",
    category: "Advertising",
    icon: LineChart,
    description:
      "Forecast Google Ads clicks, impressions, leads, revenue, ROAS, ROI, CPA, profit, and UAE budget recommendations.",
    metaTitle: "Google Ads Calculator Dubai | ROI ROAS Tool",
    metaDescription:
      "Forecast Google Ads ROI, ROAS, CPC, CPA, leads and revenue for Dubai and UAE campaigns with free AI recommendations.",
    keywords: ["Google Ads calculator Dubai", "Google Ads ROI calculator UAE", "ROAS calculator Dubai", "PPC calculator UAE"],
    arabicKeyword: "حاسبة إعلانات جوجل دبي",
    estimatedTime: "2 minutes",
    updatedDate: "2026-07-04",
    version: "3.0",
    primaryQuestion: "How much revenue can Google Ads generate in Dubai?",
    aiSummary:
      "The Google Ads Calculator by Vista by Lara estimates clicks, impressions, leads, sales, ROAS, ROI, CPA, profit, break-even revenue, budget recommendations, and campaign health for Dubai and UAE advertisers.",
    formula:
      "Clicks = spend / average CPC. Impressions = clicks / CTR. Leads = clicks x conversion rate. Revenue = leads x value. ROAS = revenue / ad spend. ROI = profit / total cost.",
    legalDisclaimer:
      "Google Ads forecasts are estimates. Actual results depend on auction competition, Quality Score, landing pages, tracking quality, seasonality, and market demand.",
    references: [
      { label: "Google Ads Help - CTR definition", href: "https://support.google.com/google-ads/answer/2615875?hl=en" },
      { label: "Google Ads Help - CPC definition", href: "https://support.google.com/google-ads/answer/6297?hl=en" },
      { label: "Google Ads API", href: "https://developers.google.com/google-ads/api/docs/start" },
    ],
    examples: [
      { label: "Lead generation", value: "AED budget to leads", explanation: "Estimate how many qualified Dubai leads a campaign can produce." },
      { label: "Ecommerce", value: "ROAS and profit", explanation: "Model revenue and margin before scaling Shopping or Search campaigns." },
      { label: "B2B services", value: "Target CPA", explanation: "Compare cost per lead against deal value and sales team capacity." },
    ],
    faq: [
      {
        q: "What is CTR in Google Ads?",
        a: "CTR is clicks divided by impressions. Google Ads uses it to show how often people who see an ad click it.",
      },
      {
        q: "What is CPC in Dubai Google Ads campaigns?",
        a: "CPC is the cost paid for a click. Dubai CPC varies by industry, competition, Quality Score, targeting, and ad relevance.",
      },
      {
        q: "How is Google Ads ROAS calculated?",
        a: "ROAS is estimated revenue divided by ad spend. A 4.0 ROAS means 4 AED revenue for every 1 AED spent on media.",
      },
      {
        q: "How does this calculator estimate leads?",
        a: "It divides spend by average CPC to estimate clicks, then multiplies clicks by conversion rate. The result is a forecast, not a guarantee.",
      },
      {
        q: "What should a Dubai business improve first?",
        a: "Start with tracking, landing page speed, UAE proof, keyword intent, ad assets, and WhatsApp lead handling. These usually improve CPA before budget increases.",
      },
    ],
    relatedServices: [
      { label: "Google Ads Dubai", href: "/services/google-ads-dubai" },
      { label: "Lead Generation Dubai", href: "/services/lead-generation-dubai" },
      { label: "SEO Services Dubai", href: "/services/seo-services-dubai" },
    ],
    relatedTools: ["meta-ads-calculator", "vat-calculator-uae"],
  },
  {
    slug: "meta-ads-calculator",
    name: "Meta Ads Calculator",
    shortName: "Meta Ads ROI",
    category: "Advertising",
    icon: Megaphone,
    description:
      "Forecast Facebook and Instagram reach, impressions, clicks, conversions, ROAS, ROI, CPA, frequency, and scaling health.",
    metaTitle: "Meta Ads Calculator Dubai | Facebook Instagram ROI",
    metaDescription:
      "Free Meta Ads calculator for Dubai and UAE. Estimate Facebook and Instagram reach, CPM, CTR, conversions, ROAS, ROI and CPA.",
    keywords: ["Meta Ads calculator Dubai", "Facebook Ads ROI UAE", "Instagram Ads calculator Dubai", "CPM calculator UAE"],
    arabicKeyword: "حاسبة إعلانات ميتا دبي",
    estimatedTime: "2 minutes",
    updatedDate: "2026-07-04",
    version: "3.0",
    primaryQuestion: "How do I forecast Meta Ads performance in Dubai?",
    aiSummary:
      "The Meta Ads Calculator by Vista by Lara forecasts reach, impressions, clicks, conversions, revenue, ROI, ROAS, CPA, CPC, profit, budget recommendations, campaign health, and AI suggestions for Facebook and Instagram campaigns in Dubai and the UAE.",
    formula:
      "Impressions = spend / CPM x 1,000. Reach = impressions / frequency. Clicks = impressions x CTR. Conversions = clicks x conversion rate. ROAS = revenue / spend.",
    legalDisclaimer:
      "Meta Ads forecasts are estimates. Actual results depend on creative quality, auction competition, audience size, placement mix, tracking, offer strength, and landing page conversion.",
    references: [
      { label: "Meta Business Help Center", href: "https://www.facebook.com/business/help" },
      { label: "Meta Marketing API Insights", href: "https://developers.facebook.com/docs/marketing-api/insights" },
      { label: "Meta Ads Manager", href: "https://www.facebook.com/business/tools/ads-manager" },
    ],
    examples: [
      { label: "Awareness", value: "Reach and frequency", explanation: "Plan audience coverage across Facebook and Instagram." },
      { label: "Lead generation", value: "CPA and lead value", explanation: "Estimate how much each qualified WhatsApp or form lead may cost." },
      { label: "Sales", value: "ROAS and profit", explanation: "Model ecommerce revenue before scaling campaign budgets." },
    ],
    faq: [
      {
        q: "What is CPM in Meta Ads?",
        a: "CPM is the estimated cost for 1,000 impressions. It helps Dubai advertisers compare reach efficiency across audiences and placements.",
      },
      {
        q: "How does frequency affect Meta campaign performance?",
        a: "Frequency shows how often people see ads on average. High frequency can signal creative fatigue or an audience that is too narrow.",
      },
      {
        q: "How is Meta Ads ROAS calculated?",
        a: "ROAS is estimated revenue divided by ad spend. The calculator uses conversion volume and purchase or lead value to forecast it.",
      },
      {
        q: "Can this calculator forecast Facebook and Instagram together?",
        a: "Yes. It models Meta campaign performance across Facebook, Instagram, Messenger, and Audience Network using blended CPM, CTR, and conversion assumptions.",
      },
      {
        q: "What should UAE brands improve first?",
        a: "Improve creative hooks, audience fit, mobile landing pages, WhatsApp routing, and offer clarity before scaling spend.",
      },
    ],
    relatedServices: [
      { label: "Meta Ads Dubai", href: "/services/meta-ads-dubai" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "High Ticket Conversion Architecture", href: "/high-ticket-conversion-architecture" },
    ],
    relatedTools: ["google-ads-calculator", "vat-calculator-uae"],
  },
]

export const aiToolCategories = [
  "Tax",
  "Advertising",
  "Marketing",
  "SEO",
  "AI",
  "Business",
  "Ecommerce",
  "Finance",
  "Analytics",
  "Shopify",
  "Google",
  "Meta",
]

export function getAiTool(slug: string) {
  return aiTools.find((tool) => tool.slug === slug)
}

export function getAiToolUrl(slug: AiToolSlug) {
  return `${siteConfig.url}/ai-tools/${slug}`
}
