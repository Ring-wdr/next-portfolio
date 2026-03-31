import { expect, test } from "@playwright/test";

test.describe("Main Page Navigation", () => {
  test("should load the main page with current portfolio metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Manjoong Kim/);
    await expect(
      page.getByRole("heading", {
        name: /Manjoong Kim/i,
        level: 1,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /프로젝트 보기|View Projects/i }).first(),
    ).toBeVisible();
    await expect(page.getByTestId("home-selected-work")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /선별한 작업|Selected Work/i,
        level: 2,
      }),
    ).toBeVisible();
  });
});
