"use client"

import { ArrowRight, Bot, DatabaseZap, Link2, MessageCircle, SearchCheck, Workflow } from "lucide-react"

import FlowArt, { FlowSection } from "@/components/story-scroll"
import { siteConfig } from "@/lib/site"

const panels = [
  {
    eyebrow: "Section 05 / Automated business model Dubai",
    title: "Build a business model that captures demand before your team replies.",
    answer:
      "A fully automated business model connects your website, CRM, WhatsApp, ads, SEO, AEO, and GEO content into one Dubai-ready revenue system.",
    body:
      "Vista by Lara designs the website as the command center, then links every lead source into clean tracking, qualification, and follow-up workflows. UAE buyers compare brands fast, so your digital system must answer, persuade, and route the lead without delay.",
    metric: "24/7",
    metricLabel: "AI-assisted lead capture for UAE and GCC buyers",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    icon: Workflow,
    tags: ["business automation Dubai", "AI workflow UAE", "lead generation website"],
  },
  {
    eyebrow: "Platform linking / CRM, WhatsApp, ads, analytics",
    title: "Link every platform so no lead, message, or insight disappears.",
    answer:
      "Platform linking gives Dubai businesses one connected view of traffic, leads, campaigns, WhatsApp conversations, and customer intent.",
    body:
      "Your website should connect forms, WhatsApp, Google Analytics, Meta campaigns, search pages, email, and CRM stages. This creates a closed loop where every channel teaches the next campaign and every inquiry has a clear next action.",
    metric: "1",
    metricLabel: "connected operating layer across marketing and sales",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    icon: Link2,
    tags: ["CRM integration UAE", "WhatsApp automation Dubai", "marketing analytics GCC"],
  },
  {
    eyebrow: "SEO / AEO / GEO lead engine",
    title: "Turn your website into a machine AI systems can cite and buyers can trust.",
    answer:
      "A lead generation website uses SEO for rankings, AEO for direct answers, and GEO for AI recommendations across Dubai, Abu Dhabi, Sharjah, and the GCC.",
    body:
      "We structure service pages, FAQ answers, schema, internal links, comparison content, and conversion CTAs so Google, ChatGPT, Gemini, Perplexity, and Bing Copilot can understand the brand and send high-intent users to the right action.",
    metric: "3x",
    metricLabel: "visibility layer: search, answer engines, and generative engines",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    icon: SearchCheck,
    tags: ["SEO services Dubai", "AEO agency UAE", "GEO optimization GCC"],
  },
]

const platformLinks = [
  { label: "Website", icon: DatabaseZap },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "CRM", icon: Workflow },
  { label: "AI search", icon: Bot },
]

export function AutomationStory() {
  return (
    <section id="automation-growth" aria-labelledby="automation-growth-heading" className="relative bg-[#030408]">
      <FlowArt aria-label="Automated business model story scroll" className="relative">
        {panels.map((panel, index) => {
          const Icon = panel.icon

          return (
            <FlowSection
              key={panel.title}
              aria-label={panel.title}
              className="bg-[#030408]"
              style={{ background: "linear-gradient(135deg, rgba(3,4,8,0.98), rgba(7,16,29,0.96))" }}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute right-[-12%] top-[8%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[140px]" />
                <div className="absolute bottom-[-18%] left-[10%] h-[420px] w-[420px] rounded-full bg-indigo-500/8 blur-[130px]" />
              </div>

              <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8vw)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="max-w-3xl">
                  <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    <Icon className="h-4 w-4" />
                    {panel.eyebrow}
                  </p>
                  <h2
                    id={index === 0 ? "automation-growth-heading" : undefined}
                    className="mt-7 font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl"
                  >
                    {panel.title}
                  </h2>
                  <p className="mt-7 max-w-2xl border-l border-accent/35 pl-5 text-lg font-medium leading-8 text-foreground/88">
                    {panel.answer}
                  </p>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{panel.body}</p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {panel.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={siteConfig.whatsapp}
                    className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-background shadow-[0_22px_60px_rgba(87,217,255,0.24)] transition-transform hover:scale-[1.02]"
                  >
                    Build my automated lead system
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101d]/88 p-4 shadow-[0_40px_110px_-70px_rgba(87,217,255,0.45)] backdrop-blur-xl">
                  <img
                    src={panel.image}
                    alt=""
                    className="absolute right-4 top-4 h-40 w-52 rounded-[1.25rem] object-cover opacity-78 saturate-75 sm:h-52 sm:w-72"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(87,217,255,0.16),transparent_34%),linear-gradient(180deg,transparent,rgba(3,4,8,0.86)_72%)]" />

                  <div className="relative flex h-full min-h-[430px] flex-col justify-end gap-7 p-5 sm:p-8">
                    <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                      {platformLinks.map((item) => {
                        const LinkIcon = item.icon

                        return (
                          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                            <LinkIcon className="h-5 w-5 text-accent" />
                            <p className="mt-3 text-sm font-semibold text-foreground">{item.label}</p>
                          </div>
                        )
                      })}
                    </div>

                    <div className="rounded-[1.5rem] border border-accent/20 bg-accent/10 p-6">
                      <p className="font-heading text-6xl font-semibold tracking-tight text-accent">{panel.metric}</p>
                      <p className="mt-3 max-w-sm text-sm font-medium uppercase tracking-[0.16em] text-foreground/78">
                        {panel.metricLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FlowSection>
          )
        })}
      </FlowArt>
    </section>
  )
}
