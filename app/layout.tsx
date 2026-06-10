import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Sk Akash Ali — AI PM & Builder",
    template: "%s — Sk Akash Ali",
  },
  description:
    "Portfolio of Sk Akash Ali: AI PM and builder. Case studies, shipped products, and proof of work.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sk Akash Ali",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
