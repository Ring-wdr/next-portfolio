import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_MAIL_ADDRESS: z.email(),
    NEXT_APP_PASSWORD: z.string().min(1),
    OPENROUTER_API_KEY: z.string().min(1).optional(),
    OPENROUTER_FREE_MODELS: z.string().optional(),
    /** Blob store holding published content: OIDC store id or a read-write token. */
    BLOB_STORE_ID: z.string().min(1).optional(),
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
    /** Shared secret for POST /api/revalidate (scripts/content/publish.mts). */
    CONTENT_REVALIDATE_SECRET: z.string().min(16).optional(),
  },
  runtimeEnv: {
    NEXT_MAIL_ADDRESS: process.env.NEXT_MAIL_ADDRESS,
    NEXT_APP_PASSWORD: process.env.NEXT_APP_PASSWORD,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    OPENROUTER_FREE_MODELS: process.env.OPENROUTER_FREE_MODELS,
    BLOB_STORE_ID: process.env.BLOB_STORE_ID,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    CONTENT_REVALIDATE_SECRET: process.env.CONTENT_REVALIDATE_SECRET,
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: z.templateLiteral(["G-", z.string().min(1)]),
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION || !!process.env.E2E_TESTING,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
