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
  title: "PromptPixel — Screenshot to AI Prompt, Instantly | MakoBytes",
  description:
    "PromptPixel turns any screenshot into a perfectly crafted, paste-ready AI prompt. OCR + prompt engineering in one keystroke. $25 one-time. Built by MakoBytes.",
  keywords: [
    "screenshot to prompt",
    "OCR",
    "AI prompt generator",
    "ChatGPT workflow",
    "Claude workflow",
    "productivity",
    "PromptPixel",
    "MakoBytes",
  ],
  authors: [{ name: "MakoBytes" }],
  openGraph: {
    type: "website",
    url: "https://makobytes.com",
    title: "PromptPixel — Screenshot to AI Prompt, Instantly",
    description:
      "Capture. Extract. Prompt. A $25 desktop tool that turns screenshots into paste-ready AI prompts.",
    siteName: "MakoBytes",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptPixel — Screenshot to AI Prompt",
    description: "OCR + AI prompt engineering in one keystroke. $25 one-time.",
  },
  alternates: {
    canonical: "https://makobytes.com",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PromptPixel",
              description:
                "Desktop utility that converts screenshots into AI-ready prompts using OCR and prompt engineering.",
              url: "https://makobytes.com",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Windows, macOS",
              author: {
                "@type": "Organization",
                name: "MakoBytes",
                url: "https://makobytes.com",
              },
              offers: {
                "@type": "Offer",
                price: "25.00",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                priceValidUntil: "2027-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
