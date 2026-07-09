import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryState {
  readonly message: string | null
}

export class ErrorBoundary extends Component<{ readonly children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { message: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Admin Control Center render failure", { error, info })
  }

  render(): ReactNode {
    if (this.state.message) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
          <section className="max-w-lg rounded-lg border border-red-200 bg-white p-6 shadow-surface" role="alert">
            <h1 className="text-xl font-semibold text-red-800">Admin interface failed to render</h1>
            <p className="mt-3 text-sm text-slate-700">{this.state.message}</p>
          </section>
        </main>
      )
    }
    return this.props.children
  }
}
