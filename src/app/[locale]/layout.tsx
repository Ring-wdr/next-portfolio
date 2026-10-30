import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Archivo, Gothic_A1, Noto_Sans_KR } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/app/_provider/theme";
import { env } from "@/env";
import { routing } from "@/i18n/routing";
import { buildPersonJsonLd, getBaseUrl, siteConfig, type AppLocale } from "@/shared/constant/site";
import { ChatProvider } from "@/feature/chat/ui/chat-provider";
import { ChatWidget } from "@/feature/chat/ui/chat-widget";
import { Footer } from "@/shared/ui/footer";
import { Header } from "@/shared/ui/header";
import { classNames } from "@/shared/utils/classnames";
import "../globals.css";

// Archivo carries the width axis so display type can run expanded
const displayFont = Archivo({
	subsets: ["latin"],
	axes: ["wdth"],
	variable: "--font-archivo",
});

const headingFont = Gothic_A1({
	subsets: ["latin"],
	weight: ["500", "700", "800", "900"],
	variable: "--font-gothic",
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
		"Product Engineer",
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
		apple: [{ url: "/icon/apple-icon-180x180.png", sizes: "180x180" }],
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

	// Lets next-intl read the locale from params instead of request headers,
	// so [locale] routes can be statically rendered and revalidated (ISR).
	setRequestLocale(locale);

	const messages = await getMessages();
	const personJsonLd = buildPersonJsonLd(locale as AppLocale);

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={classNames(
					displayFont.variable,
					headingFont.variable,
					bodyFont.variable,
					"antialiased relative flex size-full min-h-screen flex-col overflow-x-hidden bg-background text-foreground",
				)}
			>
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
						<ChatProvider>
							<div className="flex h-full grow flex-col">
								<Header />
								<div id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
									{children}
								</div>
								{modal}
								<Footer />
								<ChatWidget />
							</div>
						</ChatProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
				<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
			</body>
		</html>
	);
}
