const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    domains: [
      "raw.githubusercontent.com",
      "camo.githubusercontent.com",
      "upload.wikimedia.org",
      "www.nextontop.com",
      "techstack-generator.vercel.app",
      "avatars.githubusercontent.com",
      "cdn.discordapp.com",
      "kit.svelte.dev",
      "postfiles.pstatic.net",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
