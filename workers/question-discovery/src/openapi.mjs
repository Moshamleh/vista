import { discoverRequestSchema, discoverResponseSchema } from "./schema.mjs"

/**
 * Creates the OpenAPI contract for the Question Discovery Worker.
 * @param {string} origin Worker origin.
 * @returns {Record<string, unknown>}
 */
export function createOpenApi(origin) {
  return {
    openapi: "3.1.0",
    info: {
      title: "Vista Question Discovery Worker",
      version: "1.0.0",
      summary: "Discovers UAE/GCC search questions from replaceable external suggestion providers."
    },
    servers: [{ url: origin }],
    security: [{ ApiKeyAuth: [] }],
    paths: {
      "/health": {
        get: {
          security: [],
          summary: "Health check",
          responses: {
            "200": {
              description: "Worker health",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/schema": {
        get: {
          security: [],
          summary: "JSON schemas",
          responses: {
            "200": {
              description: "Request and response JSON schemas",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/openapi.json": {
        get: {
          security: [],
          summary: "OpenAPI 3.1 document",
          responses: {
            "200": {
              description: "OpenAPI document",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/discover": {
        post: {
          summary: "Discover questions",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: discoverRequestSchema,
                examples: {
                  "dubai-ai-website": {
                    value: {
                      seed: "AI website Dubai",
                      market: "AE",
                      language: "en-AE",
                      limit: 25,
                      providers: ["google-suggest", "bing-suggest"]
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Discovered question list",
              content: { "application/json": { schema: discoverResponseSchema } }
            },
            "400": { description: "Validation error" },
            "401": { description: "Missing or invalid API key" },
            "429": { description: "Rate limit exceeded" },
            "502": { description: "Every configured provider failed" },
            "503": { description: "Authentication not configured" }
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
        }
      },
      schemas: {
        DiscoverRequest: discoverRequestSchema,
        DiscoverResponse: discoverResponseSchema
      }
    }
  }
}
