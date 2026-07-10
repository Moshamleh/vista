export const UAE_VAT_RATE = 0.05

export type Currency = "AED" | "USD" | "SAR" | "QAR" | "KWD" | "BHD" | "OMR" | "EUR" | "GBP"

export type VatMode = "exclusive" | "inclusive" | "reverse"

export type VatInputs = {
  amount: number
  mode: VatMode
  currency: Currency
  roundTo: number
}

export type VatResult = {
  netAmount: number
  vatAmount: number
  grossAmount: number
  rate: number
}

export type GoogleAdsInputs = {
  budget: number
  budgetType: "daily" | "monthly"
  durationDays: number
  ctr: number
  averageCpc: number
  conversionRate: number
  leadValue: number
  averageOrderValue: number
  targetRoas: number
  targetCpa: number
  profitMargin: number
  agencyFee: number
  vatRate: number
  searchVolume: number
  impressionShare: number
}

export type GoogleAdsResult = {
  spend: number
  estimatedClicks: number
  estimatedImpressions: number
  estimatedLeads: number
  estimatedSales: number
  estimatedRevenue: number
  roas: number
  roi: number
  costPerLead: number
  costPerSale: number
  profit: number
  breakEvenRevenue: number
  expectedGrowth: number
  budgetRecommendation: number
  grade: string
  suggestions: string[]
}

export type MetaAdsInputs = {
  budget: number
  cpm: number
  ctr: number
  frequency: number
  audienceSize: number
  conversionRate: number
  purchaseValue: number
  leadValue: number
  profitMargin: number
  agencyFee: number
  campaignObjective: "leads" | "sales" | "traffic" | "awareness"
}

export type MetaAdsResult = {
  spend: number
  reach: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  roi: number
  roas: number
  cpa: number
  cpc: number
  estimatedProfit: number
  budgetRecommendation: number
  grade: string
  suggestions: string[]
}

function finite(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, finite(value)))
}

function round(value: number, precision = 2) {
  const factor = 10 ** clamp(Math.round(precision), 0, 6)
  return Math.round((finite(value) + Number.EPSILON) * factor) / factor
}

function percent(value: number) {
  return clamp(value, 0, 100) / 100
}

export function calculateVat(inputs: VatInputs): VatResult {
  const amount = Math.max(0, finite(inputs.amount))
  const precision = inputs.roundTo

  if (inputs.mode === "inclusive" || inputs.mode === "reverse") {
    const netAmount = amount / (1 + UAE_VAT_RATE)
    const vatAmount = amount - netAmount
    return {
      netAmount: round(netAmount, precision),
      vatAmount: round(vatAmount, precision),
      grossAmount: round(amount, precision),
      rate: UAE_VAT_RATE,
    }
  }

  const vatAmount = amount * UAE_VAT_RATE
  return {
    netAmount: round(amount, precision),
    vatAmount: round(vatAmount, precision),
    grossAmount: round(amount + vatAmount, precision),
    rate: UAE_VAT_RATE,
  }
}

export function calculateGoogleAds(inputs: GoogleAdsInputs): GoogleAdsResult {
  const baseBudget = Math.max(0, finite(inputs.budget))
  const spend = inputs.budgetType === "daily"
    ? baseBudget * clamp(inputs.durationDays, 1, 366)
    : baseBudget
  const totalCost = spend + Math.max(0, finite(inputs.agencyFee)) + spend * percent(inputs.vatRate)
  const averageCpc = Math.max(0.01, finite(inputs.averageCpc, 1))
  const estimatedClicks = spend / averageCpc
  const ctr = percent(inputs.ctr)
  const estimatedImpressions = ctr > 0 ? estimatedClicks / ctr : 0
  const estimatedLeads = estimatedClicks * percent(inputs.conversionRate)
  const estimatedSales = estimatedLeads
  const value = Math.max(finite(inputs.averageOrderValue), finite(inputs.leadValue), 0)
  const estimatedRevenue = estimatedSales * value
  const profit = estimatedRevenue * percent(inputs.profitMargin) - totalCost
  const roas = spend > 0 ? estimatedRevenue / spend : 0
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
  const costPerLead = estimatedLeads > 0 ? totalCost / estimatedLeads : 0
  const costPerSale = estimatedSales > 0 ? totalCost / estimatedSales : 0
  const breakEvenRevenue = percent(inputs.profitMargin) > 0 ? totalCost / percent(inputs.profitMargin) : totalCost
  const targetRoas = Math.max(0.1, finite(inputs.targetRoas, 3))
  const budgetRecommendation = estimatedRevenue > 0 ? estimatedRevenue / targetRoas : spend
  const availableImpressions = Math.max(0, finite(inputs.searchVolume)) * percent(inputs.impressionShare)
  const expectedGrowth = availableImpressions > 0 ? ((estimatedImpressions / availableImpressions) - 1) * 100 : roi

  const suggestions: string[] = []
  if (inputs.ctr < 3) suggestions.push("Increase CTR with tighter Dubai keyword groups, stronger ad assets, and clearer offer language.")
  if (inputs.averageCpc > 25) suggestions.push("Lower CPC by improving Quality Score, match types, landing page relevance, and negative keywords.")
  if (inputs.conversionRate < 3) suggestions.push("Improve the landing page, WhatsApp route, proof blocks, and mobile page speed before scaling spend.")
  if (costPerLead > inputs.targetCpa && inputs.targetCpa > 0) suggestions.push("Cost per lead is above target CPA. Reduce wasted queries or raise lead value before increasing budget.")
  if (roas < targetRoas) suggestions.push("ROAS is below target. Rebalance budget toward higher-intent Dubai and UAE campaigns.")
  if (suggestions.length === 0) suggestions.push("The forecast is commercially healthy. Monitor search terms, Quality Score, and conversion quality weekly.")

  const grade = roas >= targetRoas && roi > 35 ? "A" : roas >= targetRoas * 0.75 ? "B" : roi > 0 ? "C" : "D"

  return {
    spend: round(spend),
    estimatedClicks: round(estimatedClicks),
    estimatedImpressions: round(estimatedImpressions),
    estimatedLeads: round(estimatedLeads),
    estimatedSales: round(estimatedSales),
    estimatedRevenue: round(estimatedRevenue),
    roas: round(roas, 2),
    roi: round(roi, 2),
    costPerLead: round(costPerLead),
    costPerSale: round(costPerSale),
    profit: round(profit),
    breakEvenRevenue: round(breakEvenRevenue),
    expectedGrowth: round(expectedGrowth, 2),
    budgetRecommendation: round(budgetRecommendation),
    grade,
    suggestions,
  }
}

export function calculateMetaAds(inputs: MetaAdsInputs): MetaAdsResult {
  const spend = Math.max(0, finite(inputs.budget))
  const cpm = Math.max(0.01, finite(inputs.cpm, 35))
  const impressions = (spend / cpm) * 1000
  const frequency = Math.max(1, finite(inputs.frequency, 2))
  const reach = Math.min(Math.max(0, finite(inputs.audienceSize)), impressions / frequency)
  const clicks = impressions * percent(inputs.ctr)
  const conversions = clicks * percent(inputs.conversionRate)
  const value = inputs.campaignObjective === "sales"
    ? Math.max(0, finite(inputs.purchaseValue))
    : Math.max(0, finite(inputs.leadValue))
  const revenue = conversions * value
  const totalCost = spend + Math.max(0, finite(inputs.agencyFee))
  const estimatedProfit = revenue * percent(inputs.profitMargin) - totalCost
  const roi = totalCost > 0 ? (estimatedProfit / totalCost) * 100 : 0
  const roas = spend > 0 ? revenue / spend : 0
  const cpa = conversions > 0 ? totalCost / conversions : 0
  const cpc = clicks > 0 ? totalCost / clicks : 0
  const budgetRecommendation = inputs.frequency > 4 ? spend * 0.82 : spend * 1.15

  const suggestions: string[] = []
  if (inputs.audienceSize > 0 && reach / inputs.audienceSize < 0.08) suggestions.push("Audience reach is narrow. Expand UAE audience layers or refresh creative before judging demand.")
  if (inputs.frequency > 4) suggestions.push("Frequency is high. Rotate creative, widen audiences, or cap spend to reduce fatigue.")
  if (inputs.ctr < 1) suggestions.push("CTR is weak. Test stronger hooks, offer clarity, Arabic-English creative variants, and mobile-first landing pages.")
  if (inputs.conversionRate < 2) suggestions.push("Conversion rate is low. Improve WhatsApp handoff, page speed, social proof, and lead form friction.")
  if (roas < 2 && inputs.campaignObjective === "sales") suggestions.push("ROAS is low. Rebuild the offer, product feed, and retargeting sequence before scaling.")
  if (suggestions.length === 0) suggestions.push("Campaign health is strong. Scale gradually while monitoring frequency, CPA, and creative fatigue.")

  const grade = roas >= 4 || roi > 75 ? "A" : roas >= 2.5 || roi > 30 ? "B" : roi > 0 ? "C" : "D"

  return {
    spend: round(spend),
    reach: round(reach),
    impressions: round(impressions),
    clicks: round(clicks),
    conversions: round(conversions),
    revenue: round(revenue),
    roi: round(roi, 2),
    roas: round(roas, 2),
    cpa: round(cpa),
    cpc: round(cpc),
    estimatedProfit: round(estimatedProfit),
    budgetRecommendation: round(budgetRecommendation),
    grade,
    suggestions,
  }
}
