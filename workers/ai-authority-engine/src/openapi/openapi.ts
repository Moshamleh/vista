import type { AppConfig } from "../config/env"

/**
 * Generates the foundation OpenAPI 3.1 document.
 */
export function generateOpenApi(config: AppConfig, origin: string): Record<string, unknown> {
  return {
    openapi: "3.1.0",
    info: {
      title: config.openApiTitle,
      version: config.openApiVersion,
      summary: "Shared foundation endpoints for the Vista AI Authority Engine."
    },
    servers: [{ url: origin }],
    paths: {
      "/health": {
        get: {
          summary: "Health check",
          responses: {
            "200": { description: "Service is healthy" }
          }
        }
      },
      "/diagnostics": {
        get: {
          summary: "Authenticated diagnostics",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Foundation diagnostics" },
            "401": { description: "Authentication failed" },
            "503": { description: "Required binding is not configured" }
          }
        }
      },
      "/questions": {
        get: {
          summary: "List discovered questions",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Question list" }
          }
        },
        post: {
          summary: "Create a manually supplied question",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Question created" },
            "400": { description: "Validation failed" }
          }
        }
      },
      "/questions/{id}": {
        get: {
          summary: "Get a discovered question by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Question detail" },
            "404": { description: "Question not found" }
          }
        }
      },
      "/discover/run": {
        post: {
          summary: "Run question discovery",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Discovery run completed" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/discover/status": {
        get: {
          summary: "List discovery run status records",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Discovery run status list" }
          }
        }
      },
      "/stats": {
        get: {
          summary: "Get question discovery statistics",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Question discovery statistics" }
          }
        }
      },
      "/openapi.json": {
        get: {
          summary: "OpenAPI 3.1 contract",
          responses: {
            "200": { description: "OpenAPI document" }
          }
        }
      },
      "/ops/health": {
        get: {
          summary: "Machine-readable production operations health",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Infrastructure and provider health" }
          }
        }
      },
      "/ops/infrastructure": {
        get: {
          summary: "Validate Cloudflare infrastructure and provider configuration",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Infrastructure validation report" }
          }
        }
      },
      "/ops/performance": {
        get: {
          summary: "Review operational performance posture",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Performance review" }
          }
        }
      },
      "/ops/recovery": {
        get: {
          summary: "Return recovery and rollback guidance",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Recovery report" }
          }
        }
      },
      "/ops/budgets": {
        get: {
          summary: "Return AI budget control configuration",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Budget configuration" }
          }
        }
      },
      "/ops/readiness": {
        get: {
          summary: "Return production readiness score and blockers",
          security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
          responses: {
            "200": { description: "Production readiness report" }
          }
        }
      },
      "/content": {
        get: {
          summary: "List content assets",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Content list" }
          }
        },
        post: {
          summary: "Create a content asset",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Content created" },
            "400": { description: "Validation failed" }
          }
        }
      },
      "/content/{id}": {
        get: {
          summary: "Get content by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content detail" },
            "404": { description: "Content not found" }
          }
        },
        patch: {
          summary: "Edit content and create an immutable version",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content updated" },
            "400": { description: "Validation failed" }
          }
        },
        delete: {
          summary: "Archive content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content archived" },
            "409": { description: "Invalid lifecycle transition" }
          }
        }
      },
      "/content/{id}/approve": {
        post: {
          summary: "Approve content for the next lifecycle stage",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content approved" },
            "409": { description: "Content is not approvable" }
          }
        }
      },
      "/content/{id}/reject": {
        post: {
          summary: "Reject content back into planning",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content rejected" },
            "409": { description: "Content is not rejectable" }
          }
        }
      },
      "/content/{id}/schedule": {
        post: {
          summary: "Schedule content for a future publishing domain",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Publication queue item created" },
            "409": { description: "Content is not schedulable" }
          }
        }
      },
      "/content/{id}/rollback": {
        post: {
          summary: "Roll content back to an immutable version",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Content rolled back" },
            "404": { description: "Version not found" }
          }
        }
      },
      "/editorial/queue": {
        get: {
          summary: "List editorial queue items",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Editorial queue list" }
          }
        }
      },
      "/publication/queue": {
        get: {
          summary: "List publication queue items",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publication queue list" }
          }
        }
      },
      "/generate": {
        post: {
          summary: "Create an AI generation job",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Generation completed synchronously" },
            "202": { description: "Generation job queued" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/generate/{contentId}": {
        post: {
          summary: "Generate a draft for an existing content asset",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Generation completed synchronously" },
            "202": { description: "Generation job queued" }
          }
        }
      },
      "/generate/jobs": {
        get: {
          summary: "List AI generation jobs",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Generation job list" }
          }
        }
      },
      "/generate/jobs/{id}": {
        get: {
          summary: "Get AI generation job by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Generation job detail" },
            "404": { description: "Generation job not found" }
          }
        }
      },
      "/generate/jobs/{id}/cancel": {
        post: {
          summary: "Cancel an AI generation job",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Generation job cancelled" },
            "409": { description: "Completed jobs cannot be cancelled" }
          }
        }
      },
      "/generate/providers": {
        get: {
          summary: "List configured AI generation providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Provider list" }
          }
        }
      },
      "/generate/providers/test": {
        post: {
          summary: "Test the active AI generation provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Provider test result" },
            "503": { description: "Provider is not configured" }
          }
        }
      },
      "/publish": {
        post: {
          summary: "Create a publish job",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Publish job completed synchronously" },
            "202": { description: "Publish job queued" },
            "409": { description: "Content is not approved for publishing" }
          }
        }
      },
      "/publish/{contentId}": {
        post: {
          summary: "Publish approved content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Publish job completed synchronously" },
            "202": { description: "Publish job queued" }
          }
        }
      },
      "/publish/{contentId}/retry": {
        post: {
          summary: "Retry a failed publish job for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job retried" },
            "404": { description: "Retryable job not found" }
          }
        }
      },
      "/publish/jobs/{id}/cancel": {
        post: {
          summary: "Cancel a publish job",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job cancelled" },
            "409": { description: "Succeeded jobs cannot be cancelled" }
          }
        }
      },
      "/publish/jobs": {
        get: {
          summary: "List publish jobs",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publish job list" }
          }
        }
      },
      "/publish/jobs/{id}": {
        get: {
          summary: "Get publish job by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Publish job detail" },
            "404": { description: "Publish job not found" }
          }
        }
      },
      "/publish/providers": {
        get: {
          summary: "List publisher providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publisher provider list" }
          }
        }
      },
      "/publish/providers/test": {
        post: {
          summary: "Test publisher providers",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Publisher provider checks" }
          }
        }
      },
      "/geo/status": {
        get: {
          summary: "Get GEO optimization engine status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "GEO status" }
          }
        }
      },
      "/geo/entities": {
        get: {
          summary: "List entity graph nodes",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Entity graph list" }
          }
        }
      },
      "/geo/schema/{contentId}": {
        get: {
          summary: "Get schema documents for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Schema documents" },
            "404": { description: "Content not found" }
          }
        }
      },
      "/geo/optimize/{contentId}": {
        post: {
          summary: "Optimize content for GEO and AI retrieval",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "201": { description: "Optimization result" },
            "404": { description: "Content not found" }
          }
        }
      },
      "/geo/validate/{contentId}": {
        post: {
          summary: "Validate GEO readiness for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Validation result" }
          }
        }
      },
      "/geo/report/{contentId}": {
        get: {
          summary: "Get GEO report for content",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "contentId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "GEO report" }
          }
        }
      },
      "/visibility/status": {
        get: {
          summary: "Get AI visibility scan status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility status" }
          }
        }
      },
      "/visibility/score": {
        get: {
          summary: "Get latest AI visibility score",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Latest visibility score snapshot" }
          }
        }
      },
      "/visibility/history": {
        get: {
          summary: "List historical AI visibility snapshots",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility snapshot history" }
          }
        }
      },
      "/visibility/recommendations": {
        get: {
          summary: "List AI visibility recommendations",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Visibility recommendations" }
          }
        }
      },
      "/visibility/scan": {
        post: {
          summary: "Run an AI visibility signal scan",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Visibility scan completed" }
          }
        }
      },
      "/index/submit": {
        post: {
          summary: "Submit one URL to an external indexing provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Indexing submission job created" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/index/batch": {
        post: {
          summary: "Submit a batch of URLs to an external indexing provider",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Batch indexing job created" },
            "400": { description: "Validation failed" },
            "502": { description: "Provider failed" }
          }
        }
      },
      "/index/status": {
        get: {
          summary: "Get external indexing status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Indexing status" }
          }
        }
      },
      "/search-console/status": {
        get: {
          summary: "Get Google Search Console integration status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Search Console status" }
          }
        }
      },
      "/bing/status": {
        get: {
          summary: "Get Bing Webmaster Tools integration status",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Bing Webmaster status" }
          }
        }
      },
      "/sitemap/generate": {
        post: {
          summary: "Generate and version sitemap resources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Sitemap generated" }
          }
        }
      },
      "/robots/generate": {
        post: {
          summary: "Generate and version robots.txt",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "robots.txt generated" }
          }
        }
      },
      "/llms/generate": {
        post: {
          summary: "Generate and version llms.txt and AI discovery resources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "llms.txt generated" }
          }
        }
      },
      "/signals": {
        get: {
          summary: "List public buying signals",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Public buying signal list" }
          }
        }
      },
      "/signals/{id}": {
        get: {
          summary: "Get a public buying signal by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Public buying signal detail" },
            "404": { description: "Signal not found" }
          }
        }
      },
      "/signals/scan": {
        post: {
          summary: "Scan public buying signal sources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "201": { description: "Public buying signal scan completed" }
          }
        }
      },
      "/opportunities": {
        get: {
          summary: "List scored public buying signal opportunities",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Opportunity list" }
          }
        }
      },
      "/opportunities/{id}": {
        get: {
          summary: "Get a scored opportunity by ID",
          security: [{ ApiKeyAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Opportunity detail" },
            "404": { description: "Opportunity not found" }
          }
        }
      },
      "/sources": {
        get: {
          summary: "List public buying signal sources",
          security: [{ ApiKeyAuth: [] }],
          responses: {
            "200": { description: "Public source list" }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
}
