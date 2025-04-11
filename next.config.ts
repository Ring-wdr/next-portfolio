import BundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import stylexPlugin from "@stylexswc/nextjs-plugin";
import path from "path";
const rootDir = __dirname;

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "camo.githubusercontent.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "www.nextontop.com" },
      { hostname: "techstack-generator.vercel.app" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "kit.svelte.dev" },
      { hostname: "postfiles.pstatic.net" },
    ],
  },
} satisfies NextConfig;

export default withBundleAnalyzer(
  withNextIntl(
    stylexPlugin({
      rsOptions: {
        dev: process.env.NODE_ENV !== "production",
        useRemForFontSize: true,
        aliases: {
          "@/*": [path.join(rootDir, "*")],
        },
        unstable_moduleResolution: {
          type: "commonJS",
        },
      },
    })(nextConfig)
  )
);
