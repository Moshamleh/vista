import { useMemo } from "react"
import { GeneratedEngineClient } from "./generated/client"
import { useAuth } from "../auth/AuthContext"

export function useEngineClient(): GeneratedEngineClient {
  const { session } = useAuth()
  return useMemo(() => new GeneratedEngineClient({ baseUrl: session.baseUrl, apiKey: session.apiKey }), [session])
}
