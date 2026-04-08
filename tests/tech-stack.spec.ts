import { expect, test } from "@playwright/test";

test.describe("Tech Stack page", () => {
  test("shows the before and after showcase", async ({ page }) => {
    await page.goto("/en/tech-stack");

    await expect(
      page.getByRole("heading", { name: /Tech Stack/i, level: 1 }),
    ).toBeVisible();

    const showcase = page.getByTestId("tech-stack-showcase");
    await expect(showcase).toBeVisible();

    await expect(
      page.getByRole("button", { name: "React" }).first(),
    ).toBeVisible();

    const expertButton = page.getByTestId("tech-stack-mode-after");
    await expertButton.click();

    await expect(expertButton).toHaveAttribute("aria-pressed", "true");
    await expect(showcase.getByText(/What changed/i)).toBeVisible();

    await page.getByRole("button", { name: "Supabase" }).first().click();
    await expect(showcase).toContainText(/Explanation-only walkthrough/i);

    const agentEngineering = page.getByTestId("agent-engineering-section");
    await expect(agentEngineering).toBeVisible();
    await expect(agentEngineering).toContainText(
      /I use agents like working surfaces, not magic shortcuts/i,
    );
    await expect(agentEngineering).toContainText(
      /Task decomposition & spec writing/i,
    );
    await expect(agentEngineering).toContainText(/Codex/i);
    await expect(agentEngineering).toContainText(/Claude Code/i);

    const proofLinks = agentEngineering.getByTestId("agent-proof-link");
    await expect(proofLinks).toHaveCount(6);
    await expect(
      proofLinks.filter({ hasText: /Agent engineering doc/i }).first(),
    ).toBeVisible();
    await expect(
      proofLinks.filter({ hasText: /react-devtool-cli case study/i }).first(),
    ).toBeVisible();

    const harness = page.getByTestId("agent-engineering-harness");
    await expect(harness).toContainText(
      /The workflow I expect an agent task to survive/i,
    );
    await expect(harness).toContainText(
      /pnpm lint && pnpm test -- --run && pnpm build/i,
    );
  });
});
