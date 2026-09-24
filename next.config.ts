import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	reactStrictMode: true,
	reactCompiler: true,
	// The local content image route reads files at runtime.
	outputFileTracingIncludes: {
		"/api/content/local/[...path]": ["./content/images/**/*"],
	},
	images: {
		minimumCacheTTL: 86400,
		qualities: [75, 90],
		deviceSizes: [360, 480, 640, 768, 1024, 1366, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			// Published portfolio content (scripts/content/publish.ts)
			{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
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
