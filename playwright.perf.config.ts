/**
 * Playwright Performance Testing Configuration
 * 
 * Extended configuration specifically for performance benchmarks.
 * Run with: npx playwright test -c playwright.perf.config.ts
 */

import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 60 * 1000, // Longer timeout for performance tests
  testDir: "./tests/benchmarks",
  retries: 1,
  outputDir: "./test-results/perf",
  
  // Use existing server if available, otherwise start new one
  webServer: {
    command: "pnpm dev:test",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  
  // Performance-focused projects
  projects: [
    {
      name: "chromium-performance",
      use: { 
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        },
      },
    },
  ],
  
  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/perf-report' }],
  ],
});
