import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { hasAllowedOrigin } from "@/lib/request-security"
import { rateLimit } from "@/lib/rate-limit"

const RECIPIENT_EMAIL = "vistabylara@gmail.com"
const MAX_BODY_BYTES = 16_000
const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  phone: 60,
  company: 160,
  service: 120,
  budget: 80,
  message: 4_000,
}

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  message?: string
  website?: string
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function cleanSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim()
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(request: Request) {
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 })
  }

  const limited = await rateLimit(request, {
    scope: "contact",
    limit: 5,
    windowSeconds: 10 * 60,
  })

  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many inquiries. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    )
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 })
  }

  const bodyText = await request.text().catch(() => "")
  if (!bodyText || bodyText.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 })
  }

  const payload = (() => {
    try {
      return JSON.parse(bodyText) as ContactPayload | null
    } catch {
      return null
    }
  })()

  if (!payload) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 })
  }

  if (clean(payload.website)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(payload.name)
  const email = clean(payload.email)
  const phone = clean(payload.phone)
  const company = clean(payload.company)
  const service = clean(payload.service)
  const budget = clean(payload.budget)
  const message = clean(payload.message)

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Please add your name, email, contact number, and project details." }, { status: 400 })
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please add a valid email address." }, { status: 400 })
  }

  const tooLong =
    name.length > MAX_FIELD_LENGTHS.name ||
    email.length > MAX_FIELD_LENGTHS.email ||
    phone.length > MAX_FIELD_LENGTHS.phone ||
    company.length > MAX_FIELD_LENGTHS.company ||
    service.length > MAX_FIELD_LENGTHS.service ||
    budget.length > MAX_FIELD_LENGTHS.budget ||
    message.length > MAX_FIELD_LENGTHS.message

  if (tooLong) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 })
  }

  const smtpUser = process.env.GMAIL_USER
  const smtpPass = process.env.GMAIL_APP_PASSWORD

  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        error:
          "The contact form is designed, but private email delivery still needs the mail environment variables in Vercel.",
      },
      { status: 503 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Contact number", phone],
    ["Company", company || "Not provided"],
    ["Service", service || "Not selected"],
    ["Budget", budget || "Not selected"],
    ["Message", message],
  ]

  try {
    await transporter.sendMail({
      from: `"Vista by Lara Website" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Vista by Lara project inquiry from ${cleanSingleLine(name)}`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2 style="margin:0 0 16px">New Vista by Lara project inquiry</h2>
          ${rows
            .map(
              ([label, value]) => `
                <p style="margin:0 0 12px">
                  <strong>${escapeHtml(label)}:</strong><br />
                  ${escapeHtml(value).replaceAll("\n", "<br />")}
                </p>
              `
            )
            .join("")}
        </div>
      `,
    })
  } catch (error) {
    console.error("Contact email delivery failed", error)
    return NextResponse.json({ error: "Could not send the inquiry right now." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
