import { NextResponse } from "next/server"

export const runtime = "edge"

function hasValidToken(request: Request) {
  const expectedToken = process.env.LEADS_ADMIN_TOKEN
  const suppliedToken = request.headers.get("x-auth-token") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")

  return Boolean(expectedToken && suppliedToken && suppliedToken === expectedToken)
}

export async function GET(request: Request) {
  if (!process.env.LEADS_ADMIN_TOKEN) {
    return NextResponse.json({ error: "Lead access is not configured." }, { status: 503 })
  }

  if (!hasValidToken(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  const res = await fetch("https://vista-ai-visibility.workers.dev/leads", {
    headers: {
      "content-type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch leads", status: res.status },
      { status: 502 }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}

