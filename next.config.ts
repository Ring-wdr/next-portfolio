import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Decided at build time: serverless ISR renders can't see public/ on disk.
const resumePath = existsSync(path.join(process.cwd(), "public", "resume.pdf"))
	? "/resume.pdf"
	: "";

const nextConfig: NextConfig = {
	env: { NEXT_PUBLIC_RESUME_PATH: resumePath },
	reactStrictMode: true,
	reactCompiler: true,
	images: {
		minimumCacheTTL: 86400,
		qualities: [75, 90],
		deviceSizes: [360, 480, 640, 768, 1024, 1366, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			// Published portfolio content (Ring-wdr/portfolio-content)
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
