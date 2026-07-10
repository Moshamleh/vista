import type { ContentRepository } from "../content-pipeline/repositories"
import type { ContentRecord } from "../content-pipeline/types"
import { defaultEntityDefinitions } from "../question-discovery/config"
import type { QuestionRepository } from "../question-discovery/repositories"
import type { RagContext } from "./types"

const approvedContentStatuses = new Set([
  "APPROVED",
  "PLANNED",
  "GENERATED",
  "REVIEW_REQUIRED",
  "APPROVED_FOR_PUBLISHING",
  "PUBLISHED",
  "UPDATED"
])

/**
 * Builds internal-only retrieval context from questions, content, entities, and templates.
 */
export class RagContextBuilder {
  constructor(
    private readonly questions: QuestionRepository,
    private readonly content: ContentRepository
  ) {}

  /**
   * Retrieves related internal context for one generation question.
   */
  async build(question: string): Promise<RagContext> {
    const [questions, content] = await Promise.all([this.questions.list(25, 0), this.content.list(50, 0)])
    const related = this.relatedContent(question, content)
    return {
      question,
      approvedQuestions: questions.slice(0, 10).map((item) => item.question),
      relatedContent: related.slice(0, 10).map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        status: item.status,
        summary: item.aiSummary,
        entities: item.entities
      })),
      entities: this.entitiesFor(question, related),
      existingFaqs: content
        .filter((item) => item.contentType === "FAQ")
        .slice(0, 10)
        .map((item) => item.title),
      servicePages: content
        .filter((item) => item.contentType === "Service Page")
        .slice(0, 10)
        .map((item) => ({ id: item.id, title: item.title, slug: item.slug })),
      previousArticles: content
        .filter((item) => item.contentType === "Authority Article" || item.contentType === "Knowledge Page")
        .slice(0, 10)
        .map((item) => ({ id: item.id, title: item.title, slug: item.slug })),
      templates: [
        {
          contentType: "Authority Article",
          schemaType: "TechArticle",
          requiredFields: ["title", "body", "seoMetadata", "aiSummary"]
        },
        { contentType: "FAQ", schemaType: "FAQPage", requiredFields: ["title", "body", "entities"] },
        { contentType: "Service Page", schemaType: "Service", requiredFields: ["title", "body", "internalLinks"] }
      ]
    }
  }

  private relatedContent(question: string, content: ContentRecord[]): ContentRecord[] {
    const query = question.toLowerCase()
    return content
      .filter((item) => approvedContentStatuses.has(item.status))
      .map((item) => ({
        item,
        score:
          (query.includes(item.targetKeyword.toLowerCase()) ? 3 : 0) +
          item.entities.filter((entity) => query.includes(entity.toLowerCase())).length +
          (query.includes(item.title.toLowerCase()) ? 2 : 0)
      }))
      .sort((left, right) => right.score - left.score)
      .map(({ item }) => item)
  }

  private entitiesFor(question: string, content: ContentRecord[]): string[] {
    const query = question.toLowerCase()
    const configured = defaultEntityDefinitions
      .filter((entity) => entity.aliases.some((alias) => query.includes(alias.toLowerCase())))
      .map((entity) => entity.label)
    return Array.from(new Set([...configured, ...content.flatMap((item) => item.entities)])).slice(0, 20)
  }
}
