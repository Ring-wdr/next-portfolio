import { test, expect } from "@playwright/test";

test.describe("Contact Page E2E Test", () => {
  test("should allow a user to send an email", async ({ page }) => {
    // Navigate to the contact page
    await page.goto("/contact");

    // Check if the main heading is visible
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

    // Fill out the form
    await page.getByPlaceholder("이름").fill("Test User");
    await page
      .getByPlaceholder("내용")
      .fill("This is a test message from Playwright.");

    // Click the send button
    await page.getByRole("button", { name: "Send" }).click();

    // For this test, we assume the server action will succeed.
    // In a real scenario, you might mock the network request or check for a success message.
    // Since our form shows an alert, we can listen for the dialog event.
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("메일이 성공적으로 전송되었습니다.");
      await dialog.accept();
    });

    // Wait for the 'Sending...' text to disappear, indicating the action is complete.
    await expect(page.getByRole("button", { name: "Sending..." })).toBeHidden({
      timeout: 10000,
    });
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });
});
