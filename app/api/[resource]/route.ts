import { NextResponse } from "next/server"
import { getKnowledgeApiPayload } from "@/lib/knowledge-graph"

const validResources = new Set([
  "services",
  "entities",
  "faq",
  "research",
  "statistics",
  "tools",
  "authors",
  "glossary",
  "videos",
  "checklists",
  "templates",
  "competitors",
])

type ApiResourceRouteProps = {
  params: Promise<{ resource: string }>
}

export async function GET(_request: Request, { params }: ApiResourceRouteProps) {
  const { resource } = await params

  if (!validResources.has(resource)) {
    return NextResponse.json(
      {
        error: "Unknown knowledge API resource.",
        availableResources: Array.from(validResources),
      },
      { status: 404 },
    )
  }

  return NextResponse.json(getKnowledgeApiPayload(resource))
}
