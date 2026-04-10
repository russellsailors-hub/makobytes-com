import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "https://makobytes.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-ink-950 text-white">
      <div className="pointer-events-none fixed inset-0 grid-overlay opacity-20" />

      <nav className="border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            MakoBytes
          </Link>
        </div>
      </nav>

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <div className="mono-tag mb-4 text-glow-cyan">// privacy</div>
        <h1 className="mb-8 text-4xl font-black tracking-tight text-gradient">
          Privacy Policy
        </h1>
        <p className="mono-tag mb-12 text-white/40">
          Last updated: April 9, 2026
        </p>

        <div className="prose-dark space-y-8 text-white/70">
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">Overview</h2>
            <p className="leading-relaxed">
              MakoBytes builds desktop software that runs entirely on your
              machine. We believe your data is yours. This policy explains what
              little data we do collect and how we handle it.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              PromptPixel Desktop App
            </h2>
            <p className="leading-relaxed">
              PromptPixel runs 100% locally on your Windows PC. It uses
              Windows-native APIs for screen capture, OCR, and speech
              recognition. No screenshots, prompts, voice recordings, or any
              other user data ever leave your machine. There is no telemetry, no
              analytics, no cloud processing, and no account required. The only
              network activity is initiated by the AI chat application you paste
              into, which is controlled by that provider, not MakoBytes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              MakoBytes Website (makobytes.com)
            </h2>
            <p className="leading-relaxed">
              Our website collects basic, anonymous analytics to understand how
              visitors use the site. This includes page views, button clicks, and
              referrer information. We do not use third-party analytics services.
              Data is stored in a private database and is never shared with or
              sold to third parties. We do not use cookies for tracking. We do
              not collect personally identifiable information through the website
              unless you voluntarily provide it (for example, by emailing us).
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              Purchases and Payments
            </h2>
            <p className="leading-relaxed">
              Payments are processed by our payment provider (Polar). MakoBytes
              does not store credit card numbers or payment details. Your email
              address is collected for license delivery and support purposes
              only. We will never send you marketing emails unless you
              explicitly opt in.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              Your Rights
            </h2>
            <p className="leading-relaxed">
              You can request deletion of any data we hold about you by emailing{" "}
              <a
                href="mailto:hello@makobytes.com"
                className="text-glow-cyan transition hover:text-white"
              >
                hello@makobytes.com
              </a>
              . Since PromptPixel stores everything locally, there is nothing for
              us to delete on our end for the desktop app.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">Contact</h2>
            <p className="leading-relaxed">
              Questions about this policy? Email{" "}
              <a
                href="mailto:hello@makobytes.com"
                className="text-glow-cyan transition hover:text-white"
              >
                hello@makobytes.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
