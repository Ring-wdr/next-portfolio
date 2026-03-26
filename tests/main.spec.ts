import { expect, test } from "@playwright/test";

test.describe("Main Page Navigation", () => {
  test("should load the main page with current portfolio metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Manjoong Kim/);
    await expect(
      page.getByRole("heading", {
        name: /김만중|Manjoong/i,
        level: 1,
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /프로젝트 보기|View Projects/i })).toBeVisible();
  });
});
