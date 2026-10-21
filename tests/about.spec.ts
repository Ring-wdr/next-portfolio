import { expect, test } from "@playwright/test";

test.describe("About page", () => {
  test("shows the hero and work experience", async ({ page }) => {
    await page.goto("/en/about");

    const hero = page.getByTestId("about-hero");
    await expect(hero).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      hero.getByRole("img", { name: /portrait of manjoong kim/i }),
    ).toBeVisible();
    const focus = page.getByTestId("about-focus");
    await expect(focus).toBeVisible();
    await expect(focus).toContainText(/Agent orchestration/i);

    const career = page.getByTestId("about-career");
    await expect(career).toBeVisible();
    await expect(career).toContainText(/ScatterX/);
    await expect(career).toContainText(/2023\.05 ~ 2026\.05/);
    await expect(career.getByRole("link", { name: /XMORSE 2\.0/ })).toHaveAttribute(
      "href",
      "/en/project/xmorse",
    );
  });
});
