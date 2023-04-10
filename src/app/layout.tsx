import { ReactNode } from "react";
import Script from "next/script";
import { NavBar } from "@/component/NavBar";
import { ScrollUpButton } from "@/component/common";
import { GA_TRACKING_ID } from "../lib/gtag";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

export const metadata = {
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
        <NavBar />
        <div id="container">{children}</div>
        <ScrollUpButton />
      </body>
    </html>
  );
}
