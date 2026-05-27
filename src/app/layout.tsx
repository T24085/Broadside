import type { Metadata } from "next";
import { Oxanium, Inter } from "next/font/google";
import "./globals.css";
import { FloatingDownloadButton } from "@/components/floating-download-button";
import { assetPath } from "@/lib/asset-path";

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Broadside // Community-built sci-fi action FPS-Z",
  description:
    "A cinematic landing page for Broadside, a volunteer-built Unreal Engine 5 sci-fi FPS-Z with gameplay, progress, videos, shorts, and artist recruitment.",
  metadataBase: new URL("https://t24085.github.io/Broadside/"),
  openGraph: {
    title: "Broadside // Community-built sci-fi action FPS-Z",
    description:
      "Community-built sci-fi FPS-Z with a focus on movement, indoor combat, open terrain, vehicles, and base building."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oxanium.variable} ${inter.variable}`}>
      <body style={{ ["--page-shell-bg-image" as string]: `url("${assetPath("/media/bottom-banner.png")}")` }}>
        {children}
        <FloatingDownloadButton />
      </body>
    </html>
  );
}
