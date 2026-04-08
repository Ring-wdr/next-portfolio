import { expect, test } from "@playwright/test";

test.describe("About page", () => {
  test("shows the editorial hero and timeline", async ({ page }) => {
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

    const timeline = page.getByTestId("about-timeline");
    await expect(timeline).toBeVisible();
    await expect(timeline.getByText(/2026/)).toBeVisible();
    await expect(timeline).toContainText(/AI-agent engineering proof/i);
  });
});
