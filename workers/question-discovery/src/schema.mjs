/**
 * JSON Schema for POST /discover requests.
 */
export const discoverRequestSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://www.vistabylara.com/schemas/question-discovery-request.json",
  "type": "object",
  "additionalProperties": false,
  "required": ["seed"],
  "properties": {
    "seed": { "type": "string", "minLength": 2, "maxLength": 120 },
    "market": { "type": "string", "enum": ["AE", "SA", "QA", "KW", "BH", "OM"], "default": "AE" },
    "language": { "type": "string", "enum": ["en-AE", "ar-AE"], "default": "en-AE" },
    "limit": { "type": "integer", "minimum": 1, "maximum": 100, "default": 25 },
    "providers": {
      "type": "array",
      "minItems": 1,
      "uniqueItems": true,
      "items": { "type": "string", "enum": ["google-suggest", "bing-suggest"] },
      "default": ["google-suggest", "bing-suggest"]
    },
    "includeSeedQuestions": { "type": "boolean", "default": false }
  }
}

/**
 * JSON Schema for POST /discover responses.
 */
export const discoverResponseSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://www.vistabylara.com/schemas/question-discovery-response.json",
  "type": "object",
  "required": ["ok", "data"],
  "properties": {
    "ok": { "type": "boolean", "const": true },
    "data": {
      "type": "object",
      "required": ["seed", "market", "language", "providers", "sourceQueries", "questions", "providerErrors"],
      "properties": {
        "seed": { "type": "string" },
        "market": { "type": "string" },
        "language": { "type": "string" },
        "providers": { "type": "array", "items": { "type": "string" } },
        "sourceQueries": { "type": "array", "items": { "type": "string" } },
        "questions": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["question", "normalized", "intent", "sourceProvider", "sourceQuery", "confidence", "market", "language"],
            "properties": {
              "question": { "type": "string" },
              "normalized": { "type": "string" },
              "intent": { "type": "string", "enum": ["informational", "commercial", "local", "transactional"] },
              "sourceProvider": { "type": "string" },
              "sourceQuery": { "type": "string" },
              "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
              "market": { "type": "string" },
              "language": { "type": "string" }
            }
          }
        },
        "providerErrors": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["provider", "sourceQuery", "code", "message"],
            "properties": {
              "provider": { "type": "string" },
              "sourceQuery": { "type": "string" },
              "code": { "type": "string" },
              "message": { "type": "string" }
            }
          }
        }
      }
    }
  }
}

/**
 * Returns all public schemas exposed by the worker.
 * @returns {{discoverRequest: typeof discoverRequestSchema, discoverResponse: typeof discoverResponseSchema}}
 */
export function getSchemas() {
  return {
    discoverRequest: discoverRequestSchema,
    discoverResponse: discoverResponseSchema
  }
}
