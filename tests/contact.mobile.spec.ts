import { expect, test } from "@playwright/test";

test.describe("Recruiter mobile smoke @mobile", () => {
  test("opens mobile navigation and submits the contact form", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /메뉴 열기|Open menu/i }).click();
    await page.getByRole("link", { name: /연락하기|Contact/i }).click();

    await expect(
      page.getByRole("heading", { name: /연락하기|Contact/i, level: 1 })
    ).toBeVisible();

    await page
      .getByRole("textbox", { name: /이름|Name/i })
      .fill("Mobile Recruiter");
    await page
      .getByRole("textbox", { name: /이메일|Email/i })
      .fill("recruiter@example.com");
    await page
      .getByRole("textbox", { name: /회사 \/ 팀|Company \/ Team/i })
      .fill("OpenAI");
    await page
      .getByLabel(/문의 목적|Purpose/i)
      .selectOption("job-opportunity");
    await page
      .getByLabel(/메시지|Message/i)
      .fill("I would like to discuss a frontend opportunity.");

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toMatch(/메일이 성공적으로 전송되었습니다.|message has been sent/i);
      await dialog.accept();
    });

    await page.getByRole("button", { name: /보내기|Send/i }).click();

    await expect(page.getByRole("button", { name: /보내기|Send/i })).toBeVisible();
  });
});
