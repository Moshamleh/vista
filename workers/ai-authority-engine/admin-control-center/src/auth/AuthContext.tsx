import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { EngineSession } from "../types"

const storageKey = "vista-admin-session"

interface AuthContextValue {
  readonly session: EngineSession
  readonly updateSession: (session: EngineSession) => void
}

const defaultSession: EngineSession = {
  baseUrl:
    typeof import.meta.env.VITE_API_BASE_URL === "string" && import.meta.env.VITE_API_BASE_URL.length > 0
      ? import.meta.env.VITE_API_BASE_URL
      : "https://vista-ai-authority-engine.vistabylara.workers.dev/",
  apiKey: typeof import.meta.env.VITE_ENGINE_API_KEY === "string" ? import.meta.env.VITE_ENGINE_API_KEY : ""
}



const AuthContext = createContext<AuthContextValue | null>(null)


function readInitialSession(): EngineSession {
  const stored = window.localStorage.getItem(storageKey)
  if (!stored) return defaultSession
  try {
    const parsed = JSON.parse(stored) as Partial<EngineSession>
    return {
      baseUrl:
        typeof parsed.baseUrl === "string" && parsed.baseUrl.length > 0 ? parsed.baseUrl : defaultSession.baseUrl,
      apiKey: typeof parsed.apiKey === "string" && parsed.apiKey.length > 0 ? parsed.apiKey : defaultSession.apiKey
    }
  } catch {
    return defaultSession
  }
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [session, setSession] = useState<EngineSession>(() => readInitialSession())
  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      updateSession(nextSession) {
        setSession(nextSession)
        window.localStorage.setItem(storageKey, JSON.stringify(nextSession))
      }
    }),
    [session]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error("AuthProvider is required")
  return value
}
