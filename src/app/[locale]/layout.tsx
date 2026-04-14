import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/app/_provider/theme";
import { env } from "@/env";
import { routing } from "@/i18n/routing";
import { buildPersonJsonLd, getBaseUrl, siteConfig, type AppLocale } from "@/shared/constant/site";
import { ChatWidget } from "@/feature/chat/ui/chat-widget";
import { Footer } from "@/shared/ui/footer";
import { Header } from "@/shared/ui/header";
import { classNames } from "@/shared/utils/classnames";
import "../globals.css";

const displayFont = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-display",
});

const bodyFont = Noto_Sans_KR({
	subsets: ["latin"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	metadataBase: new URL(getBaseUrl()),
	title: {
		default: siteConfig.title,
		template: "%s | Manjoong Kim",
	},
	description: siteConfig.description,
	applicationName: siteConfig.name,
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
		title: siteConfig.title,
		description: siteConfig.defaultDescription,
		siteName: siteConfig.name,
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.title,
		description: siteConfig.defaultDescription,
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

	if (!routing.locales.includes(locale as AppLocale)) {
		notFound();
	}

	const messages = await getMessages();
	const personJsonLd = buildPersonJsonLd(locale as AppLocale);

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
				{personJsonLd.map((schema, index) => (
					<script
						key={`${locale}-structured-data-${index}`}
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(schema),
						}}
					/>
				))}
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="flex h-full grow flex-col">
							<Header />
							{children}
							{modal}
							<Footer />
							<ChatWidget />
						</div>
					</ThemeProvider>
				</NextIntlClientProvider>
				<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
			</body>
		</html>
	);
}
