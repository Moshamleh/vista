import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { App } from "../src/App"
import { AuthProvider } from "../src/auth/AuthContext"
import { createFixtureFetch } from "./fixtures"

beforeEach(() => {
  window.localStorage.clear()
  globalThis.fetch = createFixtureFetch()
})

function renderAdmin(path = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </AuthProvider>
  )
}

describe("Admin Control Center", () => {
  it("renders overview health, provider status, and navigation", async () => {
    renderAdmin()

    expect(await screen.findByText("Overview")).toBeInTheDocument()
    expect(await screen.findByText(/healthy/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Buying Signals" })).toBeInTheDocument()
  })

  it("reviews question discovery items and runs discovery", async () => {
    const user = userEvent.setup()
    renderAdmin("/questions")

    expect(await screen.findByText("Who needs GEO in Dubai?")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Approve" }))
    expect(screen.getByText("approved")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Run discovery" }))
    await waitFor(() => expect(screen.getByRole("button", { name: "Run discovery" })).toBeEnabled())
  })

  it("renders buying signal opportunities and settings API coverage", async () => {
    const user = userEvent.setup()
    renderAdmin("/buying-signals")

    expect(await screen.findByText("Dubai Retail: Shopify adoption")).toBeInTheDocument()
    expect(screen.getByText("Public launch signal")).toBeInTheDocument()
    expect(screen.getAllByText("92%").length).toBeGreaterThan(0)
    await user.selectOptions(screen.getByLabelText("Status"), "reviewed")
    expect(await screen.findByText("Abu Dhabi Services: AI hiring")).toBeInTheDocument()
    expect(screen.queryByText("Dubai Retail: Shopify adoption")).not.toBeInTheDocument()
    await user.clear(screen.getByLabelText("Search"))
    await user.type(screen.getByLabelText("Search"), "Hiring")
    expect(screen.getByText("Hiring Notices")).toBeInTheDocument()
  })

  it("saves engine authentication settings", async () => {
    const user = userEvent.setup()
    renderAdmin("/settings")

    await user.clear(await screen.findByLabelText("Engine API URL"))
    await user.type(screen.getByLabelText("Engine API URL"), "https://engine.vista.test")
    await user.type(screen.getByLabelText("API key"), "new-key")
    await user.click(screen.getByRole("button", { name: "Save connection" }))

    expect(window.localStorage.getItem("vista-admin-session")).toContain("https://engine.vista.test")
  })
})
