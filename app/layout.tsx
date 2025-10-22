import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/ui/header";
import { classNames } from "@/shared/utils/classnames";
import { ThemeProvider } from "@/app/_provider/theme";
import { Footer } from "@/shared/ui/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={classNames(
          inter.className,
          "antialiased relative flex size-full min-h-screen flex-col overflow-x-hidden"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full grow flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
    </html>
  );
}
