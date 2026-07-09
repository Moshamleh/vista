import { getBuildTimeKnowledgeSearchIndex } from "@/lib/search/knowledge-index"

export const dynamic = "force-static"

export function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
    records: getBuildTimeKnowledgeSearchIndex(),
  })
}
