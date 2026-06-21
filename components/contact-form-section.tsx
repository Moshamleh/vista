"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react"
import { siteConfig } from "@/lib/site"

const services = ["Branding", "Websites", "Digital Products", "Development", "Generative AI", "SEO / AEO / GEO"]
const budgets = ["AED 18k - 35k", "AED 35k - 75k", "AED 75k+", "Monthly retainer", "Not sure yet"]

type Status = {
  type: "idle" | "success" | "error"
  message: string
}

export function ContactFormSection() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: "idle", message: "" })

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please email the Vista by Lara team directly.")
      }

      form.reset()
      setStatus({
        type: "success",
        message: "Thank you. Your project inquiry was sent to Vista by Lara, and we will reply soon.",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Please email the Vista by Lara team directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#030408] px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute left-[12%] top-24 h-72 w-72 rounded-full bg-accent/12 blur-[120px]" />
        <div className="absolute bottom-10 right-[8%] h-80 w-80 rounded-full bg-[#6f8dff]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <div className="flex flex-col justify-between rounded-[2rem] border border-accent/15 bg-[#071018]/90 p-7 shadow-[0_40px_140px_-100px_rgba(87,217,255,0.9)] backdrop-blur sm:p-9">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-accent">
              <Sparkles className="h-4 w-4" />
              Contact us
            </p>
            <h2 className="mt-6 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
              Tell us what you want to build next.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Share your goals, website, timeline, and target market. Vista by Lara will review your request and reply
              from the Dubai team with the right next step.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-accent/12 bg-background/35 p-5">
              <Mail className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm text-muted-foreground">Official email</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-1 block font-semibold text-foreground hover:text-accent">
                {siteConfig.email}
              </a>
            </div>
            <div className="rounded-2xl border border-accent/12 bg-background/35 p-5">
              <MessageSquare className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm text-muted-foreground">Best for</p>
              <p className="mt-1 font-semibold text-foreground">Brand, website, AI, and growth projects</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[2rem] border border-border/25 bg-[#0b101c]/90 p-5 shadow-[0_40px_140px_-110px_rgba(255,255,255,0.45)] backdrop-blur sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Name *</span>
              <input
                name="name"
                required
                autoComplete="name"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-accent"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Email *</span>
              <input
                name="email"
                required
                type="email"
                autoComplete="email"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-accent"
                placeholder="you@company.com"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Contact number *</span>
              <input
                name="phone"
                required
                type="tel"
                autoComplete="tel"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-accent"
                placeholder="+971 50 000 0000"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Company</span>
              <input
                name="company"
                autoComplete="organization"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-accent"
                placeholder="Company or brand"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">Service</span>
              <select
                name="service"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors focus:border-accent"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-foreground">Budget range</span>
              <select
                name="budget"
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-background/55 px-4 text-foreground outline-none transition-colors focus:border-accent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select budget range
                </option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-foreground">Project details *</span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full resize-none rounded-2xl border border-white/10 bg-background/55 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-accent"
                placeholder="Tell us about your goals, current website, launch date, target audience, and what you need Vista by Lara to create."
              />
            </label>
          </div>

          {status.type !== "idle" && (
            <div
              className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-red-400/25 bg-red-400/10 text-red-100"
              }`}
            >
              {status.message}
              {status.type === "error" && (
                <a href={`mailto:${siteConfig.email}`} className="ml-1 underline underline-offset-4">
                  Email directly.
                </a>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 font-heading text-sm font-semibold uppercase tracking-[0.06em] text-background transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send project inquiry"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
