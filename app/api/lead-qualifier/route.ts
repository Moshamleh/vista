import { NextResponse } from "next/server"
import { hasAllowedOrigin } from "@/lib/request-security"
import { rateLimit } from "@/lib/rate-limit"
import { fetchWithTimeout, readJsonWithLimit } from "@/lib/http"

const WORKER_URL = "https://vista-lead-qualifier.vistabylara.workers.dev/chat"
const MAX_BODY_BYTES = 16_000
const MAX_MESSAGE_LENGTH = 1_000
const MAX_HISTORY_ITEMS = 12
const MAX_REPLY_LENGTH = 2_000
const MAX_WORKER_RESPONSE_BYTES = 32_000

type LeadQualifierPayload = {
  message?: unknown
  history?: unknown
}

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type WorkerResponse = {
  reply?: unknown
  qualified?: unknown
  whatsapp?: unknown
}

function jsonError(message: string, status: number, retryAfter?: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined,
    },
  )
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function cleanMessage(value: unknown) {
  return cleanText(value, MAX_MESSAGE_LENGTH)
}

function cleanHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return []

  return value
    .slice(-MAX_HISTORY_ITEMS)
    .map((entry): ChatMessage | null => {
      if (!entry || typeof entry !== "object") return null

      const candidate = entry as Partial<ChatMessage>
      if (candidate.role !== "user" && candidate.role !== "assistant") return null

      const content = cleanMessage(candidate.content)
      if (!content) return null

      return { role: candidate.role, content }
    })
    .filter((entry): entry is ChatMessage => Boolean(entry))
}

function cleanWhatsappUrl(value: unknown) {
  if (typeof value !== "string") return undefined

  return /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(value) ? value : undefined
}

function cleanWorkerResponse(value: unknown) {
  if (!value || typeof value !== "object") return null

  const body = value as WorkerResponse
  const reply = cleanText(body.reply, MAX_REPLY_LENGTH)

  if (!reply) return null

  return {
    reply,
    qualified: body.qualified === true,
    whatsapp: cleanWhatsappUrl(body.whatsapp),
  }
}

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return jsonError("Forbidden.", 403)
  }

  const limited = await rateLimit(request, {
    scope: "lead-qualifier",
    limit: 20,
    windowSeconds: 10 * 60,
  })

  if (!limited.allowed) {
    return jsonError("Too many assistant messages. Please wait a moment and try again.", 429, limited.retryAfter)
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Message is too large.", 413)
  }

  const bodyText = await request.text().catch(() => "")
  if (!bodyText || bodyText.length > MAX_BODY_BYTES) {
    return jsonError("Invalid assistant request.", 400)
  }

  let body: LeadQualifierPayload | null = null
  try {
    body = JSON.parse(bodyText) as LeadQualifierPayload
  } catch {
    return jsonError("Invalid assistant request.", 400)
  }

  const message = cleanMessage(body.message)
  if (!message) {
    return jsonError("Message is required.", 400)
  }

  try {
    const response = await fetchWithTimeout(WORKER_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, history: cleanHistory(body.history) }),
      cache: "no-store",
      timeoutMs: 8_000,
    })

    if (!response.ok) {
      return jsonError("Assistant is unavailable right now.", 502)
    }

    const data = cleanWorkerResponse(await readJsonWithLimit(response, MAX_WORKER_RESPONSE_BYTES))
    if (!data) {
      return jsonError("Assistant is unavailable right now.", 502)
    }

    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Lead qualifier proxy failed", error)
    return jsonError("Assistant is unavailable right now.", 502)
  }
}
