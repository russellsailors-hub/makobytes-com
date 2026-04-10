import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://makobytes.com"),
  title: {
    default: "MakoBytes — Lightweight Desktop Tools for AI Power Users",
    template: "%s | MakoBytes",
  },
  description:
    "MakoBytes builds fast, private, one-time-purchase desktop apps for people who live in AI workflows. PromptPixel and more on the way.",
  keywords: [
    "MakoBytes",
    "desktop apps",
    "AI tools",
    "productivity",
    "PromptPixel",
    "screenshot to prompt",
    "OCR",
    "ChatGPT workflow",
    "Claude workflow",
  ],
  authors: [{ name: "MakoBytes" }],
  openGraph: {
    type: "website",
    url: "https://makobytes.com",
    title: "MakoBytes — Lightweight Desktop Tools for AI Power Users",
    description:
      "Fast. Private. One-time purchase. The MakoBytes app catalog.",
    siteName: "MakoBytes",
  },
  twitter: {
    card: "summary_large_image",
    title: "MakoBytes — Lightweight Desktop Tools",
    description: "Fast. Private. One-time purchase. No subscriptions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
