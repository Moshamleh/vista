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

type AiDataResourceRouteProps = {
  params: Promise<{ resource: string }>
}

export const dynamic = "force-static"

export async function GET(_request: Request, { params }: AiDataResourceRouteProps) {
  const { resource } = await params

  if (!validResources.has(resource)) {
    return NextResponse.json(
      {
        error: "Unknown AI data resource.",
        availableResources: Array.from(validResources),
      },
      { status: 404 },
    )
  }

  return NextResponse.json(getKnowledgeApiPayload(resource))
}
