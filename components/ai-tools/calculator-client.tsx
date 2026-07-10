"use client"

import { useEffect, useMemo, useState } from "react"
import {
  BarChart3,
  Copy,
  Download,
  History,
  Printer,
  QrCode,
  Redo2,
  RotateCcw,
  Share2,
  Star,
  Undo2,
} from "lucide-react"
import type { AiToolSlug } from "@/lib/ai-tools/tools"
import {
  calculateGoogleAds,
  calculateMetaAds,
  calculateVat,
  type GoogleAdsInputs,
  type MetaAdsInputs,
  type VatInputs,
} from "@/lib/ai-tools/calculations"

type Props = {
  slug: AiToolSlug
}

type Snapshot = {
  label: string
  at: string
  values: Record<string, string | number>
}

const defaultVat: VatInputs = { amount: 1000, mode: "exclusive", currency: "AED", roundTo: 2 }
const defaultGoogle: GoogleAdsInputs = {
  budget: 12000,
  budgetType: "monthly",
  durationDays: 30,
  ctr: 4,
  averageCpc: 9,
  conversionRate: 5,
  leadValue: 650,
  averageOrderValue: 1200,
  targetRoas: 3,
  targetCpa: 220,
  profitMargin: 45,
  agencyFee: 2500,
  vatRate: 5,
  searchVolume: 30000,
  impressionShare: 35,
}
const defaultMeta: MetaAdsInputs = {
  budget: 9000,
  cpm: 38,
  ctr: 1.4,
  frequency: 2.6,
  audienceSize: 180000,
  conversionRate: 3,
  purchaseValue: 450,
  leadValue: 280,
  profitMargin: 42,
  agencyFee: 1800,
  campaignObjective: "leads",
}

function numberFormat(value: number, currency = "AED") {
  return new Intl.NumberFormat("en-AE", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
    currency,
  }).format(Number.isFinite(value) ? value : 0)
}

function metricFormat(value: number) {
  return new Intl.NumberFormat("en-AE", { maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0)
}

function toCsv(rows: Record<string, string | number>[]) {
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n")
}

function downloadFile(filename: string, body: string, type: string) {
  const blob = new Blob([body], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function Field({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  suffix,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  step?: number
  suffix?: string
}) {
  const invalid = !Number.isFinite(value) || value < min
  const fieldId = `calc-field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
        {label}
        {suffix ? <span className="text-xs text-cyan-200">{suffix}</span> : null}
      </span>
      <input
        id={fieldId}
        name={fieldId}
        className={`mt-2 w-full rounded-xl border bg-slate-950/70 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300 ${
          invalid ? "border-red-400/70" : "border-white/10"
        }`}
        type="number"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {invalid ? <span className="mt-1 block text-xs text-red-200">Enter a valid number.</span> : null}
    </label>
  )
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  const fieldId = `calc-field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <select
        id={fieldId}
        name={fieldId}
        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function ResultCard({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "good" | "warn" }) {
  return (
    <div className={`rounded-2xl border p-4 ${tone === "good" ? "border-emerald-300/30 bg-emerald-400/10" : tone === "warn" ? "border-amber-300/30 bg-amber-400/10" : "border-white/10 bg-white/[0.045]"}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

function MiniBars({ values }: { values: { label: string; value: number }[] }) {
  const max = Math.max(...values.map((item) => item.value), 1)
  return (
    <div className="space-y-3" aria-label="Forecast chart">
      {values.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-xs text-slate-300">
            <span>{item.label}</span>
            <span>{metricFormat(item.value)}</span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300" style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AiToolCalculator({ slug }: Props) {
  const [dark, setDark] = useState(true)
  const [favorite, setFavorite] = useState(false)
  const [history, setHistory] = useState<Snapshot[]>([])
  const [future, setFuture] = useState<Snapshot[]>([])
  const [vat, setVat] = useState(defaultVat)
  const [google, setGoogle] = useState(defaultGoogle)
  const [meta, setMeta] = useState(defaultMeta)
  const storageKey = `vista-ai-tool-${slug}`

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as { vat?: VatInputs; google?: GoogleAdsInputs; meta?: MetaAdsInputs; history?: Snapshot[]; favorite?: boolean }
      if (parsed.vat) setVat(parsed.vat)
      if (parsed.google) setGoogle(parsed.google)
      if (parsed.meta) setMeta(parsed.meta)
      if (parsed.history) setHistory(parsed.history)
      if (parsed.favorite) setFavorite(parsed.favorite)
    } catch {
      window.localStorage.removeItem(storageKey)
    }
  }, [storageKey])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ vat, google, meta, history, favorite }))
  }, [favorite, google, history, meta, storageKey, vat])

  const result = useMemo(() => {
    if (slug === "vat-calculator-uae") return calculateVat(vat)
    if (slug === "google-ads-calculator") return calculateGoogleAds(google)
    return calculateMetaAds(meta)
  }, [google, meta, slug, vat])

  const rows = useMemo<Record<string, string | number>[]>(() => {
    if (slug === "vat-calculator-uae") {
      const r = calculateVat(vat)
      return [{ input: vat.amount, mode: vat.mode, currency: vat.currency, net: r.netAmount, vat: r.vatAmount, gross: r.grossAmount }]
    }
    if (slug === "google-ads-calculator") {
      const r = calculateGoogleAds(google)
      return [{ spend: r.spend, clicks: r.estimatedClicks, impressions: r.estimatedImpressions, leads: r.estimatedLeads, revenue: r.estimatedRevenue, roas: r.roas, roi: `${r.roi}%`, profit: r.profit }]
    }
    const r = calculateMetaAds(meta)
    return [{ spend: r.spend, reach: r.reach, impressions: r.impressions, clicks: r.clicks, conversions: r.conversions, revenue: r.revenue, roas: r.roas, roi: `${r.roi}%`, profit: r.estimatedProfit }]
  }, [google, meta, result, slug, vat])

  const pushHistory = (label = "Saved session") => {
    const snapshot = { label, at: new Date().toISOString(), values: rows[0] }
    setHistory((items) => [snapshot, ...items].slice(0, 12))
    setFuture([])
  }

  const reset = () => {
    pushHistory("Before reset")
    setVat(defaultVat)
    setGoogle(defaultGoogle)
    setMeta(defaultMeta)
  }

  const undo = () => {
    const [latest, ...rest] = history
    if (!latest) return
    setFuture((items) => [latest, ...items])
    setHistory(rest)
  }

  const redo = () => {
    const [latest, ...rest] = future
    if (!latest) return
    setHistory((items) => [latest, ...items])
    setFuture(rest)
  }

  const shareUrl = typeof window === "undefined" ? "" : window.location.href
  const copyResults = async () => {
    await navigator.clipboard.writeText(JSON.stringify(rows[0], null, 2))
    pushHistory("Copied result")
  }

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Vista by Lara AI Tool", url: shareUrl })
    } else {
      await navigator.clipboard.writeText(shareUrl)
    }
    pushHistory("Shared calculator")
  }

  const exportCsv = () => downloadFile(`${slug}-vista-results.csv`, toCsv(rows), "text/csv;charset=utf-8")
  const exportExcel = () => downloadFile(`${slug}-vista-results.xls`, toCsv(rows), "application/vnd.ms-excel")
  const exportPdf = () => {
    const content = `<html><body><h1>Vista by Lara ${slug}</h1><pre>${JSON.stringify(rows[0], null, 2)}</pre></body></html>`
    downloadFile(`${slug}-vista-results.html`, content, "text/html;charset=utf-8")
  }

  const shellClass = dark
    ? "border-white/10 bg-slate-950 text-white"
    : "border-slate-200 bg-white text-slate-950"

  return (
    <section className={`rounded-[1.5rem] border p-4 shadow-[0_35px_120px_-70px_rgba(87,217,255,0.7)] sm:p-6 ${shellClass}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Live calculator</p>
          <h2 className="mt-2 text-2xl font-semibold">Interactive UAE forecast workspace</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-white/15 px-3 py-2 text-xs" onClick={() => setDark((value) => !value)} type="button">Dark Mode</button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs" onClick={() => setFavorite((value) => !value)} type="button">
            <Star className="h-3.5 w-3.5" /> {favorite ? "Favorited" : "Favorite"}
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs" onClick={undo} type="button"><Undo2 className="h-3.5 w-3.5" /> Undo</button>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs" onClick={redo} type="button"><Redo2 className="h-3.5 w-3.5" /> Redo</button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          {slug === "vat-calculator-uae" ? (
            <div className="grid gap-4">
              <Field label="Amount" value={vat.amount} onChange={(amount) => setVat((state) => ({ ...state, amount }))} suffix={vat.currency} />
              <SelectField label="VAT mode" value={vat.mode} onChange={(mode) => setVat((state) => ({ ...state, mode }))} options={[
                { value: "exclusive", label: "VAT Exclusive" },
                { value: "inclusive", label: "VAT Inclusive" },
                { value: "reverse", label: "Reverse calculation" },
              ]} />
              <SelectField label="Currency" value={vat.currency} onChange={(currency) => setVat((state) => ({ ...state, currency }))} options={["AED", "USD", "SAR", "QAR", "KWD", "BHD", "OMR", "EUR", "GBP"].map((currency) => ({ value: currency as VatInputs["currency"], label: currency }))} />
              <Field label="Round precision" value={vat.roundTo} min={0} step={1} onChange={(roundTo) => setVat((state) => ({ ...state, roundTo }))} suffix="decimals" />
            </div>
          ) : slug === "google-ads-calculator" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Budget" value={google.budget} onChange={(budget) => setGoogle((state) => ({ ...state, budget }))} suffix="AED" />
              <SelectField label="Budget type" value={google.budgetType} onChange={(budgetType) => setGoogle((state) => ({ ...state, budgetType }))} options={[{ value: "monthly", label: "Monthly budget" }, { value: "daily", label: "Daily budget" }]} />
              <Field label="Campaign duration" value={google.durationDays} onChange={(durationDays) => setGoogle((state) => ({ ...state, durationDays }))} suffix="days" />
              <Field label="CTR" value={google.ctr} onChange={(ctr) => setGoogle((state) => ({ ...state, ctr }))} suffix="%" step={0.1} />
              <Field label="Average CPC" value={google.averageCpc} onChange={(averageCpc) => setGoogle((state) => ({ ...state, averageCpc }))} suffix="AED" step={0.1} />
              <Field label="Conversion rate" value={google.conversionRate} onChange={(conversionRate) => setGoogle((state) => ({ ...state, conversionRate }))} suffix="%" step={0.1} />
              <Field label="Lead value" value={google.leadValue} onChange={(leadValue) => setGoogle((state) => ({ ...state, leadValue }))} suffix="AED" />
              <Field label="Average order value" value={google.averageOrderValue} onChange={(averageOrderValue) => setGoogle((state) => ({ ...state, averageOrderValue }))} suffix="AED" />
              <Field label="Target ROAS" value={google.targetRoas} onChange={(targetRoas) => setGoogle((state) => ({ ...state, targetRoas }))} step={0.1} />
              <Field label="Target CPA" value={google.targetCpa} onChange={(targetCpa) => setGoogle((state) => ({ ...state, targetCpa }))} suffix="AED" />
              <Field label="Profit margin" value={google.profitMargin} onChange={(profitMargin) => setGoogle((state) => ({ ...state, profitMargin }))} suffix="%" />
              <Field label="Agency fee" value={google.agencyFee} onChange={(agencyFee) => setGoogle((state) => ({ ...state, agencyFee }))} suffix="AED" />
              <Field label="VAT option" value={google.vatRate} onChange={(vatRate) => setGoogle((state) => ({ ...state, vatRate }))} suffix="%" />
              <Field label="Search volume" value={google.searchVolume} onChange={(searchVolume) => setGoogle((state) => ({ ...state, searchVolume }))} />
              <Field label="Impression share" value={google.impressionShare} onChange={(impressionShare) => setGoogle((state) => ({ ...state, impressionShare }))} suffix="%" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Budget" value={meta.budget} onChange={(budget) => setMeta((state) => ({ ...state, budget }))} suffix="AED" />
              <Field label="CPM" value={meta.cpm} onChange={(cpm) => setMeta((state) => ({ ...state, cpm }))} suffix="AED" step={0.1} />
              <Field label="CTR" value={meta.ctr} onChange={(ctr) => setMeta((state) => ({ ...state, ctr }))} suffix="%" step={0.1} />
              <Field label="Frequency" value={meta.frequency} onChange={(frequency) => setMeta((state) => ({ ...state, frequency }))} step={0.1} />
              <Field label="Audience size" value={meta.audienceSize} onChange={(audienceSize) => setMeta((state) => ({ ...state, audienceSize }))} />
              <Field label="Conversion rate" value={meta.conversionRate} onChange={(conversionRate) => setMeta((state) => ({ ...state, conversionRate }))} suffix="%" step={0.1} />
              <Field label="Purchase value" value={meta.purchaseValue} onChange={(purchaseValue) => setMeta((state) => ({ ...state, purchaseValue }))} suffix="AED" />
              <Field label="Lead value" value={meta.leadValue} onChange={(leadValue) => setMeta((state) => ({ ...state, leadValue }))} suffix="AED" />
              <Field label="Profit margin" value={meta.profitMargin} onChange={(profitMargin) => setMeta((state) => ({ ...state, profitMargin }))} suffix="%" />
              <Field label="Agency fee" value={meta.agencyFee} onChange={(agencyFee) => setMeta((state) => ({ ...state, agencyFee }))} suffix="AED" />
              <SelectField label="Campaign objective" value={meta.campaignObjective} onChange={(campaignObjective) => setMeta((state) => ({ ...state, campaignObjective }))} options={[
                { value: "leads", label: "Leads" },
                { value: "sales", label: "Sales" },
                { value: "traffic", label: "Traffic" },
                { value: "awareness", label: "Awareness" },
              ]} />
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {slug === "vat-calculator-uae" ? (
              <>
                <ResultCard label="Net amount" value={numberFormat(calculateVat(vat).netAmount, vat.currency)} />
                <ResultCard label="VAT 5%" value={numberFormat(calculateVat(vat).vatAmount, vat.currency)} tone="warn" />
                <ResultCard label="Total amount" value={numberFormat(calculateVat(vat).grossAmount, vat.currency)} tone="good" />
                <ResultCard label="Tax invoice rate" value="5%" />
              </>
            ) : slug === "google-ads-calculator" ? (
              <>
                <ResultCard label="Estimated clicks" value={metricFormat(calculateGoogleAds(google).estimatedClicks)} />
                <ResultCard label="Estimated leads" value={metricFormat(calculateGoogleAds(google).estimatedLeads)} />
                <ResultCard label="Revenue" value={numberFormat(calculateGoogleAds(google).estimatedRevenue)} tone="good" />
                <ResultCard label="ROAS / Grade" value={`${calculateGoogleAds(google).roas}x / ${calculateGoogleAds(google).grade}`} tone="warn" />
                <ResultCard label="ROI" value={`${calculateGoogleAds(google).roi}%`} />
                <ResultCard label="Profit" value={numberFormat(calculateGoogleAds(google).profit)} tone={calculateGoogleAds(google).profit > 0 ? "good" : "warn"} />
              </>
            ) : (
              <>
                <ResultCard label="Reach" value={metricFormat(calculateMetaAds(meta).reach)} />
                <ResultCard label="Impressions" value={metricFormat(calculateMetaAds(meta).impressions)} />
                <ResultCard label="Conversions" value={metricFormat(calculateMetaAds(meta).conversions)} />
                <ResultCard label="ROAS / Grade" value={`${calculateMetaAds(meta).roas}x / ${calculateMetaAds(meta).grade}`} tone="warn" />
                <ResultCard label="CPA" value={numberFormat(calculateMetaAds(meta).cpa)} />
                <ResultCard label="Profit" value={numberFormat(calculateMetaAds(meta).estimatedProfit)} tone={calculateMetaAds(meta).estimatedProfit > 0 ? "good" : "warn"} />
              </>
            )}
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <BarChart3 className="h-4 w-4" />
              Interactive forecast chart
            </div>
            <MiniBars values={Object.entries(rows[0]).filter(([, value]) => typeof value === "number").slice(0, 6).map(([label, value]) => ({ label, value: Number(value) }))} />
          </div>

          {slug !== "vat-calculator-uae" ? (
            <div className="rounded-[1.25rem] border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-sm font-semibold text-amber-100">AI recommendations</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {(slug === "google-ads-calculator" ? calculateGoogleAds(google).suggestions : calculateMetaAds(meta).suggestions).map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {slug === "vat-calculator-uae" ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
          <p className="font-semibold text-white">Bulk VAT examples</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[100, 500, 1000, 5000, 10000, 100000].map((amount) => {
              const item = calculateVat({ ...vat, amount, mode: "exclusive" })
              return (
                <button key={amount} type="button" className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-cyan-300/50" onClick={() => setVat((state) => ({ ...state, amount, mode: "exclusive" }))}>
                  <span className="block text-sm text-slate-300">{numberFormat(amount, vat.currency)}</span>
                  <span className="mt-1 block font-semibold text-white">{numberFormat(item.grossAmount, vat.currency)} total</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => pushHistory()} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"><History className="h-4 w-4" /> Save Session</button>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><RotateCcw className="h-4 w-4" /> Reset</button>
        <button type="button" onClick={copyResults} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Copy className="h-4 w-4" /> Copy Results</button>
        <button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Share2 className="h-4 w-4" /> Share URL</button>
        <button type="button" onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Download className="h-4 w-4" /> CSV</button>
        <button type="button" onClick={exportExcel} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Download className="h-4 w-4" /> Excel</button>
        <button type="button" onClick={exportPdf} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Download className="h-4 w-4" /> PDF</button>
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm"><Printer className="h-4 w-4" /> Print</button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
          <p className="font-semibold text-white">History and compare</p>
          <div className="mt-3 max-h-56 overflow-auto">
            {history.length === 0 ? (
              <p className="text-sm text-slate-400">No saved sessions yet. Save a calculation to compare benchmarks over time.</p>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <details key={`${item.at}-${item.label}`} className="rounded-xl border border-white/10 p-3">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-100">{item.label} - {new Date(item.at).toLocaleString("en-AE")}</summary>
                    <pre className="mt-2 overflow-auto text-xs text-slate-300">{JSON.stringify(item.values, null, 2)}</pre>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <QrCode className="h-4 w-4" />
            QR Code
          </div>
          <img
            className="mt-3 aspect-square w-full rounded-xl border border-white/10 bg-white p-2"
            alt="QR code for sharing this Vista by Lara calculator"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl || `https://www.vistabylara.com/ai-tools/${slug}`)}`}
            loading="lazy"
          />
          <p className="mt-3 break-all text-xs text-slate-400">{shareUrl}</p>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Keyboard access: tab through inputs and actions. Results update live. No client-side secrets are used.
      </p>
    </section>
  )
}
