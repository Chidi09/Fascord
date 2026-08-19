import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { MswProvider } from "@/mocks/MswProvider";
import QueryProvider from "@/providers/QueryProvider";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LogisticsServiceJsonLd,
} from "@/components/seo/JsonLd";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fascord.co.uk",
  ),
  title: {
    default:
      "Fascord Limited | Premium Global Express Logistics & Courier Services",
    template: "%s | Fascord Limited",
  },
  description:
    "Fascord Limited provides fast, reliable UK domestic courier deliveries and international freight forwarding across 240+ global destinations. Get instant quotes, track live milestones, and book parcel collections online.",
  keywords: [
    "logistics UK",
    "express courier",
    "international parcel shipping",
    "global cargo freight",
    "London courier service",
    "Nigeria freight forwarding",
    "door-to-door delivery",
    "live parcel tracking",
  ],
  authors: [{ name: "Fascord Limited", url: "https://fascord.co.uk" }],
  creator: "Fascord Limited",
  publisher: "Fascord Limited",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://fascord.co.uk",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://fascord.co.uk",
    siteName: "Fascord Limited",
    title:
      "Fascord Limited | Premium Global Express Logistics & Courier Services",
    description:
      "Fast, secure, and trackable door-to-door shipping across the UK and worldwide. Calculate instant quotes and track shipments in real-time.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fascord Limited Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fascord Limited | Global Logistics & Courier",
    description:
      "Door-to-door domestic UK and international cargo delivery to 240+ countries. Fast, verified, and trackable.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LogisticsServiceJsonLd />
      </head>
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <QueryProvider>
          <MswProvider>{children}</MswProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
