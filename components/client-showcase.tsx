"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import type { ShowcaseClient } from "@/lib/showcase-clients"

function faviconUrl(url: string) {
  const domain = new URL(url).hostname
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

function ClientCard({ client }: { client: ShowcaseClient }) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 border border-white/10 bg-[#070a11] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-[#09101a]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03]">
        {logoFailed ? (
          <span className="font-heading text-sm font-semibold text-muted-foreground">
            {client.name.charAt(0)}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faviconUrl(client.url)}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            onError={() => setLogoFailed(true)}
          />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-heading text-base font-semibold text-foreground transition group-hover:text-accent">
          {client.name}
        </span>
        {client.industry ? (
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {client.industry}
          </span>
        ) : null}
      </span>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
    </a>
  )
}

export function ClientShowcase({ clients }: { clients: ShowcaseClient[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <ClientCard key={client.name} client={client} />
      ))}
    </div>
  )
}
