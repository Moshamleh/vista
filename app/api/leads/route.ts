import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
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

