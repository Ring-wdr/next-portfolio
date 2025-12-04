import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    qualities: [75, 90],
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "camo.githubusercontent.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "www.nextontop.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "postfiles.pstatic.net" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "fastly.picsum.photos" },
    ],
  },
};

export default withNextIntl(nextConfig);
