import type { Metadata } from "next";
import { getBaseUrl } from "@/shared/constant/site";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return children;
}
