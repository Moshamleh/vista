import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const RECIPIENT_EMAIL = "vistabylara@gmail.com"

type BookletPayload = {
  name?: string
  email?: string
  phone?: string
  company?: string
  website?: string
  market?: string
  priority?: string
  message?: string
  source?: string
  termsConsent?: string
  offersConsent?: string
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
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
  const payload = (await request.json().catch(() => null)) as BookletPayload | null

  if (!payload) {
    return NextResponse.json({ error: "Invalid booklet access request." }, { status: 400 })
  }

  const name = clean(payload.name)
  const email = clean(payload.email)
  const phone = clean(payload.phone)
  const company = clean(payload.company)
  const website = clean(payload.website)
  const market = clean(payload.market)
  const priority = clean(payload.priority)
  const message = clean(payload.message)
  const source = clean(payload.source) || "AI Authority Engine booklet gate"
  const termsConsent = clean(payload.termsConsent)
  const offersConsent = clean(payload.offersConsent)

  if (!name || !email || !phone || !company || !website || !market || !priority || !message) {
    return NextResponse.json(
      { error: "Please complete all required business fields before requesting the booklet." },
      { status: 400 }
    )
  }

  if (termsConsent !== "accepted" || offersConsent !== "accepted") {
    return NextResponse.json(
      { error: "Please accept the required access terms and communication consent." },
      { status: 400 }
    )
  }

  const smtpUser = process.env.GMAIL_USER
  const smtpPass = process.env.GMAIL_APP_PASSWORD

  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        error:
          "The booklet form is ready, but private email delivery still needs the mail environment variables in Vercel.",
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
    ["Request", "AI Authority Engine booklet access"],
    ["Name", name],
    ["Email", email],
    ["Mobile / WhatsApp", phone],
    ["Company", company],
    ["Website", website],
    ["Primary market", market],
    ["AI authority priority", priority],
    ["Business context", message],
    ["Source", source],
    ["Terms and privacy consent", "Accepted"],
    ["Offers and promotions consent", "Accepted"],
    ["Submitted at", new Date().toISOString()],
  ]

  await transporter.sendMail({
    from: `"Vista by Lara Website" <${smtpUser}>`,
    to: RECIPIENT_EMAIL,
    replyTo: email,
    subject: `[Booklet Access] AI Authority Engine request from ${name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h2 style="margin:0 0 16px">AI Authority Engine booklet access request</h2>
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

  return NextResponse.json({ ok: true })
}
