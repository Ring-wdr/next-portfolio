<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-e2e-rules -->
# Local E2E On Windows

- Do not assume port `3000` is available. Prefer an explicit non-default port such as `3101` when starting local servers for verification.
- `playwright.config.ts` reads `PORT`, so set `PORT` explicitly when running Playwright against a non-default port.
- On Windows PowerShell, do not rely on `pnpm dev:test` because `E2E_TESTING=true next dev` is POSIX-style env assignment and fails there.
- For manual E2E verification in PowerShell, use commands like `$env:E2E_TESTING='true'; pnpm dev --port 3101` and `$env:PORT='3101'; pnpm exec playwright test ...`.
<!-- END:local-e2e-rules -->
