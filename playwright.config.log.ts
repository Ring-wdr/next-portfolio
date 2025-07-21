import { defineConfig, devices } from "@playwright/test";
import path from "path";

// Re-use the same base URL logic
const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

// This is the config for tests that need server logs
export default defineConfig({
  timeout: 30 * 1000,
  // Point to the directory with tests that need logs
  testDir: path.join(__dirname, "tests-log"),
  retries: 2,
  outputDir: "test-results/",

  // The only difference is here: stdout is set to 'pipe'
  webServer: {
    command: "pnpm dev:test",
    url: baseURL,
    stdout: "pipe",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "retry-with-trace",
  },

  // You can specify a subset of browsers for these tests if you want
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
