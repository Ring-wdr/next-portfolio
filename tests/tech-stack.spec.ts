import { expect, test } from "@playwright/test";

test.describe("Tech Stack page", () => {
  test("shows the stack inventory and agent engineering section", async ({ page }) => {
    await page.goto("/en/tech-stack");

    await expect(
      page.getByRole("heading", { name: /Tech Stack/i, level: 1 }),
    ).toBeVisible();
    await expect(page.getByTestId("tech-stack-showcase")).toHaveCount(0);

    const agentEngineering = page.getByTestId("agent-engineering-section");
    await expect(agentEngineering).toBeVisible();
    await expect(agentEngineering).toContainText(/Opus 5\.5 with Claude Code/);

    const proofLinks = agentEngineering.getByTestId("agent-proof-link");
    await expect(proofLinks).toHaveCount(2);
    await expect(
      proofLinks.filter({ hasText: /Agent workflow doc/i }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Ring-wdr/next-portfolio/blob/main/docs/agent-engineering.md",
    );
    await expect(
      proofLinks.filter({ hasText: /react-devtool-cli case study/i }),
    ).toHaveAttribute("href", "/en/project/react-devtool-cli");

    await expect(page.getByTestId("agent-engineering-harness")).toContainText(
      "pnpm lint && pnpm test -- --run && pnpm build",
    );
  });
});
