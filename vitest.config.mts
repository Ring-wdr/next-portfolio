import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    css: true,
    exclude: ["**/node_modules/**", "**/dist/**", "tests-log/**", "tests/**"],
    // next-intl imports `next/navigation` without an extension, which Node ESM can't resolve.
    server: { deps: { inline: ["next-intl"] } },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
