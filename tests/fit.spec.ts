import { expect, test } from "@playwright/test";

const report = {
  ok: true,
  report: {
    summary: "React 중심 역할에 잘 맞습니다.",
    requirements: [
      { requirement: "React 실무", match: "strong", evidence: "여러 프로젝트", projectSlugs: ["pocaz"] },
      { requirement: "Vue 경험", match: "gap", evidence: "근거 없음", projectSlugs: [] },
    ],
    gaps: ["Vue"],
    questions: ["팀 구성은?"],
  },
};

test.describe("Role fit page", () => {
  test("analyzes a job post and links evidence to case studies", async ({ page }) => {
    await page.route("**/api/fit", (route) => route.fulfill({ json: report }));
    await page.goto("/en/fit");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Check fit against a job description/);
    const submit = page.getByRole("button", { name: "Analyze fit" });
    await expect(submit).toBeDisabled();

    await page.getByRole("button", { name: "Use a sample job post" }).click();
    await submit.click();

    const result = page.getByTestId("fit-report");
    await expect(result).toContainText("50%");
    await expect(result.getByRole("link", { name: /POCAZ Remake/ })).toHaveAttribute(
      "href",
      "/en/project/pocaz",
    );
  });
});

test.describe("Home hero ask", () => {
  test("sends a persona starter question into the chat panel", async ({ page }) => {
    await page.route("**/api/chat", (route) =>
      route.fulfill({
        headers: { "content-type": "text/event-stream", "x-vercel-ai-ui-message-stream": "v1" },
        body: [
          { type: "start" },
          { type: "text-start", id: "t" },
          { type: "text-delta", id: "t", delta: "모의 답변입니다." },
          { type: "text-end", id: "t" },
          { type: "finish" },
        ]
          .map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`)
          .join("") + "data: [DONE]\n\n",
      }),
    );
    await page.goto("/en");

    const ask = page.getByTestId("home-hero-ask");
    await ask.getByRole("radio", { name: "Engineer" }).click();
    await expect(ask.getByRole("radio", { name: "Engineer" })).toHaveAttribute("aria-checked", "true");
    await ask.getByRole("listitem").first().getByRole("button").click();

    const chat = page.getByRole("dialog", { name: "AI Assistant" });
    await expect(chat).toContainText("모의 답변입니다.");
  });
});
