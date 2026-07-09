import { NextResponse } from "next/server"
import { getKnowledgeApiPayload } from "@/lib/knowledge-graph"

export const dynamic = "force-static"

export function GET() {
  return NextResponse.json(getKnowledgeApiPayload())
}
