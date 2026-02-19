import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/app/_provider/theme";
import { env } from "@/env";
import { routing } from "@/i18n/routing";
import { Footer } from "@/shared/ui/footer";
import { Header } from "@/shared/ui/header";
import { RouteTransition } from "@/shared/ui/route-transition";
import { classNames } from "@/shared/utils/classnames";

const displayFont = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-display",
});

const bodyFont = Noto_Sans_KR({
	subsets: ["latin"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: "https://localhost:3000",
	),
	title: {
		default: "Manjoong Kim | Frontend Portfolio",
		template: "%s | Manjoong Kim",
	},
	description:
		"Frontend developer portfolio focused on product UX, modern web architecture, and performance-aware implementation.",
	applicationName: "Manjoong Kim Portfolio",
	keywords: [
		"Frontend Developer",
		"Next.js",
		"React",
		"Portfolio",
		"TypeScript",
	],
	authors: [{ name: "Manjoong Kim" }],
	creator: "Manjoong Kim",
	manifest: "/icon/manifest.json",
	openGraph: {
		title: "Manjoong Kim | Frontend Portfolio",
		description:
			"Portfolio showcasing frontend projects, interaction design, and engineering outcomes.",
		url: "https://next-portfolio-ringring.vercel.app",
		siteName: "Manjoong Kim Portfolio",
		type: "website",
		locale: "ko_KR",
		images: [
			{
				url: "/icon/ms-icon-150x150.png",
				width: 150,
				height: 150,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Manjoong Kim | Frontend Portfolio",
		description:
			"Modern frontend case studies and product-driven engineering work.",
		images: ["/icon/ms-icon-150x150.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [{ url: "/favicon.ico" }],
		apple: [
			{ url: "/icon/apple-icon-57x57.png", sizes: "57x57" },
			{ url: "/icon/apple-icon-60x60.png", sizes: "60x60" },
			{ url: "/icon/apple-icon-72x72.png" },
			{ url: "/icon/apple-icon-76x76.png" },
			{ url: "/icon/apple-icon-120x120.png" },
			{ url: "/icon/apple-icon-144x144.png" },
			{ url: "/icon/apple-icon-152x152.png" },
			{ url: "/icon/apple-icon-180x180.png" },
		],
		other: [
			{ url: "/icon/favicon-16x16.png" },
			{ url: "/icon/favicon-32x32.png" },
			{ url: "/icon/favicon-96x96.png" },
		],
	},
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	modal,
	params,
}: LayoutProps<"/[locale]"> & {
	modal: React.ReactNode;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as "en" | "ko")) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={classNames(
					displayFont.variable,
					bodyFont.variable,
					"antialiased relative flex size-full min-h-screen flex-col overflow-x-hidden bg-background text-foreground",
				)}
			>
				<div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_oklch,var(--color-highlight),transparent_84%),transparent_42%),radial-gradient(circle_at_85%_0%,color-mix(in_oklch,var(--color-surface-strong),transparent_86%),transparent_48%),linear-gradient(180deg,var(--background),color-mix(in_oklch,var(--background),black_5%))]" />
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<RouteTransition>
							<div className="flex h-full grow flex-col">
								<Header />
								{children}
								{modal}
								<Footer />
							</div>
						</RouteTransition>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
			<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
		</html>
	);
}
