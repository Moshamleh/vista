"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, FileDown, ShieldCheck } from "lucide-react"

type Status = {
  type: "idle" | "success" | "error"
  message: string
}

const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "RAK", "Umm Al Quwain", "Fujairah", "GCC outside UAE"]
const priorities = [
  "AI visibility and recommendation readiness",
  "SEO, AEO, and GEO authority",
  "Entity trust and structured data",
  "Competitor visibility in Dubai",
  "Lead generation and WhatsApp conversion",
  "Executive dashboard access",
]

export function AiAuthorityBookletForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: "idle", message: "" })

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/ai-authority-booklet", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok) {
        throw new Error(data.error || "The booklet request could not be sent. Please try again.")
      }

      form.reset()
      setDownloadReady(true)
      setStatus({
        type: "success",
        message: "Your access request was received. The AI Authority Engine booklet is unlocked below.",
      })
    } catch (error) {
      setDownloadReady(false)
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Please try again or request access by email.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="booklet-access" className="relative mx-auto max-w-7xl px-6 pb-20">
      <div className="grid gap-6 rounded-3xl border border-amber-300/25 bg-slate-950/70 p-6 shadow-[0_30px_110px_-80px_rgba(251,191,36,0.75)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            <FileDown className="h-4 w-4" />
            Free gated booklet
          </p>
          <h2 className="mt-4 text-2xl font-bold md:text-3xl">
            Download the AI Authority Engine booklet after access review
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
            Request the free Vista AI Authority Engine booklet for Dubai and UAE businesses. The form collects business
            context so Vista by Lara can route the request, assess AI-search intent, and follow up through the right UAE
            channel.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <p className="inline-flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Includes SEO, AEO, GEO, entity trust, recommendation readiness, and AI visibility signals.
            </p>
            <p className="inline-flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Submission details are sent to Vista by Lara for access follow-up and recorded consent.
            </p>
          </div>
          {downloadReady && (
            <Link
              href="/downloads/ai-authority-engine-booklet.pdf"
              target="_blank"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
            >
              Download AI Authority Engine Booklet
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <input type="hidden" name="source" value="AI Authority Engine dashboard booklet gate" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Name *</span>
              <input
                name="name"
                required
                autoComplete="name"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Work email *</span>
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="you@company.com"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Mobile / WhatsApp *</span>
              <input
                name="phone"
                required
                type="tel"
                autoComplete="tel"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="+971 50 000 0000"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Company *</span>
              <input
                name="company"
                required
                autoComplete="organization"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="Company or brand"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Website *</span>
              <input
                name="website"
                required
                type="url"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="https://example.ae"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-100">Primary market *</span>
              <select
                name="market"
                required
                defaultValue=""
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none focus:border-amber-300"
              >
                <option value="" disabled>
                  Select market
                </option>
                {emirates.map((emirate) => (
                  <option key={emirate} value={emirate}>
                    {emirate}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-100">Main priority *</span>
              <select
                name="priority"
                required
                defaultValue=""
                className="min-h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-slate-100 outline-none focus:border-amber-300"
              >
                <option value="" disabled>
                  Select AI authority priority
                </option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-slate-100">Business context *</span>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-300"
                placeholder="Share your Dubai/UAE audience, current SEO or AI visibility issue, and preferred follow-up channel."
              />
            </label>
          </div>

          <label className="flex gap-3 rounded-xl border border-white/10 bg-slate-900/45 p-4 text-sm text-slate-300">
            <input name="termsConsent" value="accepted" required type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
            <span>
              I agree to the Vista by Lara{" "}
              <Link href="/terms" className="text-amber-200 underline underline-offset-4">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-amber-200 underline underline-offset-4">
                Privacy Policy
              </Link>
              . I understand my submitted business details will be sent to Vista by Lara for booklet access and follow-up.
            </span>
          </label>

          <label className="flex gap-3 rounded-xl border border-white/10 bg-slate-900/45 p-4 text-sm text-slate-300">
            <input name="offersConsent" value="accepted" required type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
            <span>
              I agree to receive Vista AI Authority Engine offers, promotions, and access updates related to SEO, AEO,
              GEO, and AI visibility services in the UAE and GCC.
            </span>
          </label>

          {status.type !== "idle" && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                  : "border-red-300/30 bg-red-300/10 text-red-100"
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 px-6 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending access request..." : "Request Access and Unlock Booklet"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
