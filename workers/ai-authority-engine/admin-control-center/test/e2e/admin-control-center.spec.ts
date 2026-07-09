import { expect, test } from "@playwright/test"
import { apiPayload } from "../fixtures"

test.beforeEach(async ({ page }) => {
  await page.route("http://127.0.0.1:8787/**", async (route) => {
    const url = new URL(route.request().url())
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: apiPayload(url.pathname), meta: { requestId: "req-e2e" } })
    })
  })
})

test("operates the admin control center core paths", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible()
  await expect(page.getByText("Healthy")).toBeVisible()

  await page.getByRole("link", { name: "Visibility" }).click()
  await expect(page.getByRole("heading", { name: "Visibility", exact: true })).toBeVisible()
  await expect(page.getByText("Improve schema")).toBeVisible()

  await page.getByRole("link", { name: "Search Intelligence" }).click()
  await expect(page.getByRole("heading", { name: "Search Intelligence" })).toBeVisible()
  await page.getByRole("button", { name: "Sitemap" }).click()

  await page.getByRole("link", { name: "Buying Signals" }).click()
  await expect(page.getByRole("heading", { name: "Buying Signals" })).toBeVisible()
  await expect(page.getByText("Dubai Retail: Shopify adoption")).toBeVisible()
})
