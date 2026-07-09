import { NextResponse } from "next/server"
import { getRequestToken, hasAllowedOrigin, hasValidToken } from "@/lib/request-security"
import { rateLimit } from "@/lib/rate-limit"
import { fetchWithTimeout, readJsonWithLimit } from "@/lib/http"

type Lead = {
  query?: string
  service?: string
  timestamp?: string
}

type LeadsPayload = {
  leads?: unknown
  data?: unknown
}

const MAX_LEADS_RESPONSE_BYTES = 128_000
const MAX_LEADS = 200

function isAuthorized(request: Request) {
  const expectedToken = process.env.LEADS_ADMIN_TOKEN
  const suppliedToken = getRequestToken(request)

  return hasValidToken(suppliedToken, expectedToken)
}

function cleanText(value: unknown, maxLength = 1_000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined
}

function normalizeLead(value: unknown): Lead | null {
  if (!value || typeof value !== "object") return null

  const candidate = value as Lead
  const lead = {
    query: cleanText(candidate.query),
    service: cleanText(candidate.service, 160),
    timestamp: cleanText(candidate.timestamp, 120),
  }

  return lead.query || lead.service || lead.timestamp ? lead : null
}

function normalizeLeads(value: unknown) {
  const payload = value as LeadsPayload
  const source = Array.isArray(payload?.leads) ? payload.leads : Array.isArray(payload?.data) ? payload.data : []

  return {
    leads: source.slice(0, MAX_LEADS).map(normalizeLead).filter((lead): lead is Lead => Boolean(lead)),
  }
}

export async function GET(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 })
  }

  const limited = await rateLimit(request, {
    scope: "leads-admin",
    limit: 30,
    windowSeconds: 10 * 60,
  })

  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many lead access attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    )
  }

  if (!process.env.LEADS_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Lead access is not configured." }, { status: 503 })
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  try {
    const res = await fetchWithTimeout("https://vista-ai-visibility.workers.dev/leads", {
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
      timeoutMs: 8_000,
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch leads." }, { status: 502 })
    }

    const data = normalizeLeads(await readJsonWithLimit(res, MAX_LEADS_RESPONSE_BYTES))
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Lead fetch failed", error)
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 502 })
  }
}

