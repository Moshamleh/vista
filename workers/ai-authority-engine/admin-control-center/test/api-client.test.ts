import { describe, expect, it } from "vitest"
import { GeneratedEngineClient } from "../src/api/generated/client"
import { createFixtureFetch } from "./fixtures"

describe("generated API client", () => {
  it("sends API key authentication and resolves documented endpoints", async () => {
    const requests: Request[] = []
    const fetcher: typeof fetch = async (input, init) => {
      const request = new Request(input, init)
      requests.push(request)
      return createFixtureFetch()(request)
    }
    const client = new GeneratedEngineClient({ baseUrl: "https://engine.test", apiKey: "secret", fetcher })

    const health = await client.getHealth()
    await client.getContent({ path: { id: "content 1" } })

    expect(health.data).toEqual({ status: "healthy", service: "vista-ai-authority-engine" })
    expect(requests[0]?.headers.get("x-api-key")).toBe("secret")
    expect(requests[1]?.url).toBe("https://engine.test/content/content%201")
  })
})
