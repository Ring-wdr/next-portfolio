import { test, expect } from '@playwright/test';

test.describe('Main Page Navigation', () => {
    test('should load the main page and have the correct title and heading', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check if the page title is correct
        // Check if the page title is correct
    await expect(page).toHaveTitle(/포트폴리오에 오신 것을 환영합니다/);

    // Optional: Check if a main heading is visible
        // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Hi, I'm Manjoong, a Front-End Developer/i, level: 1 })).toBeVisible();
  });
});
