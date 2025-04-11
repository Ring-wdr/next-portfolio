import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { NavBar } from "@/component/NavBar";
import { ScrollUpButton } from "@/component/common";
import { Footer } from "@/component/Footer";
import { GA_TRACKING_ID } from "../../lib/gtag";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://localhost:3000"
  ),
  title: "포트폴리오에 오신 것을 환영합니다",
  manifest: "/icon/manifest.json",
  openGraph: {
    title: "Ringwanderung의 포트폴리오입니다.",
    url: "https://next-portfolio-ringring.vercel.app",
    images: [
      {
        url: "/icon/ms-icon-150x150.png",
        width: 150,
        height: 150,
      },
    ],
  },
  robots: {
    index: true,
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

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div id="modal"></div>
          <div id="bottom-sheet"></div>
          <NavBar />
          <div id="container">{children}</div>
        </NextIntlClientProvider>
        <ScrollUpButton />
        <Footer />
      </body>
    </html>
  );
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}
