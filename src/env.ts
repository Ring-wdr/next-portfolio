import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_MAIL_ADDRESS: z.email(),
    NEXT_APP_PASSWORD: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_MAIL_ADDRESS: process.env.NEXT_MAIL_ADDRESS,
    NEXT_APP_PASSWORD: process.env.NEXT_APP_PASSWORD,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
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
