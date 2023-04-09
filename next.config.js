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
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
