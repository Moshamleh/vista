import type { ReactElement } from "react"
import { AIGenerationView } from "./views/AIGenerationView"
import { BuyingSignalsView } from "./views/BuyingSignalsView"
import { ContentRepositoryView } from "./views/ContentRepositoryView"
import { ContentPreviewView } from "./views/ContentPreviewView"
import { GeoView } from "./views/GeoView"
import { OverviewView } from "./views/OverviewView"
import { PublishingView } from "./views/PublishingView"
import { QuestionDiscoveryView } from "./views/QuestionDiscoveryView"
import { SearchIntelligenceView } from "./views/SearchIntelligenceView"
import { SettingsView } from "./views/SettingsView"
import { VisibilityView } from "./views/VisibilityView"

export interface AdminRoute {
  readonly path: string
  readonly label: string
  readonly element: ReactElement
  readonly navigation?: boolean
}

export const adminRoutes: readonly AdminRoute[] = [
  { path: "/", label: "Overview", element: <OverviewView /> },
  { path: "/questions", label: "Question Discovery", element: <QuestionDiscoveryView /> },
  { path: "/content", label: "Content Repository", element: <ContentRepositoryView /> },
  { path: "/content/:id/preview", label: "Article Preview", element: <ContentPreviewView />, navigation: false },
  { path: "/generation", label: "AI Generation", element: <AIGenerationView /> },
  { path: "/publishing", label: "Publishing", element: <PublishingView /> },
  { path: "/geo", label: "GEO", element: <GeoView /> },
  { path: "/visibility", label: "Visibility", element: <VisibilityView /> },
  { path: "/search", label: "Search Intelligence", element: <SearchIntelligenceView /> },
  { path: "/buying-signals", label: "Buying Signals", element: <BuyingSignalsView /> },
  { path: "/settings", label: "Settings", element: <SettingsView /> }
]
