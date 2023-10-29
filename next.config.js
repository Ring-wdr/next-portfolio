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
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
