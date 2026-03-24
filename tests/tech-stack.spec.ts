import { expect, test } from "@playwright/test";

test.describe("Tech Stack page", () => {
  test("shows the before and after showcase", async ({ page }) => {
    await page.goto("/en/tech-stack");

    await expect(
      page.getByRole("heading", { name: /Tech Stack/i, level: 1 })
    ).toBeVisible();

    const showcase = page.getByTestId("tech-stack-showcase");
    await expect(showcase).toBeVisible();

    await expect(page.getByRole("button", { name: "React" })).toBeVisible();

    const expertButton = page.getByTestId("tech-stack-mode-after");
    await expertButton.click();

    await expect(expertButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(/What changed/i)).toBeVisible();

    await page.getByRole("button", { name: "Supabase" }).click();
    await expect(page.getByTestId("tech-stack-showcase")).toContainText(
      /Explanation-only walkthrough/i
    );
  });
});
