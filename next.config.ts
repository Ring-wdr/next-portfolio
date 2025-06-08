import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
