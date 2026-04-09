import {
  ArrowRight,
  Check,
  Zap,
  Target,
  Lock,
  Keyboard,
  Clipboard,
  Brain,
  Globe,
  RefreshCw,
  Feather,
  Plus,
  Play,
} from "lucide-react";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

// ───── brand mark (inline svg) ─────
function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-glow-violet via-glow-magenta to-glow-cyan ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 20V4h7a5 5 0 010 10H9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="19" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Page() {
  return (
    <main className="relative min-h-screen bg-ink-950 text-white">
      {/* ───── NAV ───── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-2.5">
            <BrandMark />
            <div className="flex flex-col leading-none">
              <span className="font-bold tracking-tight text-white">
                PromptPixel
              </span>
              <span className="mono-tag text-[10px] text-white/40">
                by makobytes
              </span>
            </div>
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#how" className="transition hover:text-white">
              How it works
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </div>
          <a
            href="#buy"
            className="btn-glow rounded-lg px-5 py-2 text-sm font-semibold text-white"
          >
            Get it — $25
          </a>
        </div>
      </nav>

      {/* ───── HERO with 3D ROBOT ───── */}
      <section id="top" className="relative h-screen w-full overflow-hidden">
        {/* 3D robot background */}
        <div className="absolute inset-0 z-0">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="h-full w-full"
          />
        </div>

        {/* ambient overlays */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
        <div className="pointer-events-none absolute inset-0 z-10 grid-overlay opacity-60" />

        {/* content */}
        <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-4 pt-16 text-center md:px-8">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="mono-tag text-white/80">
              v1.0 · shipping now · windows + macos
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight drop-shadow-2xl sm:text-7xl lg:text-8xl">
            <span className="text-gradient">Screenshot in.</span>
            <br />
            <span className="text-gradient-violet">Perfect prompt out.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 drop-shadow-lg sm:text-xl">
            PromptPixel captures any pixel on your screen, pulls the text with
            precision OCR, and rewrites it as a paste-ready AI prompt — in
            under a second. Say hi to Whobee, your new prompt co-pilot.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#buy"
              className="btn-glow flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white"
            >
              Download for $25
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/50 px-8 py-4 font-semibold text-white/80 backdrop-blur-md transition hover:border-white/30 hover:text-white"
            >
              <Play className="h-4 w-4" fill="currentColor" />
              Watch it work
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" strokeWidth={3} />
              One-time payment
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" strokeWidth={3} />
              No subscription
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-400" strokeWidth={3} />
              Lifetime updates
            </span>
          </div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-float">
          <div className="mono-tag text-white/40">scroll</div>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ───── TRUST ROW ───── */}
      <section className="border-y border-white/5 bg-ink-900/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mono-tag mb-8 text-center text-white/40">
            works with every llm you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 md:gap-14">
            {[
              "ChatGPT",
              "Claude",
              "Gemini",
              "Perplexity",
              "Copilot",
              "Mistral",
            ].map((n) => (
              <span
                key={n}
                className="text-xl font-bold transition hover:text-white"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section id="how" className="relative py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <div className="mono-tag mb-4 text-glow-cyan">// workflow</div>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-gradient sm:text-6xl">
              Three keystrokes. One great prompt.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              No app switching. No copy-paste gymnastics. PromptPixel lives in
              your menu bar and activates with a global hotkey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "step_01",
                title: "Capture",
                body: (
                  <>
                    Press{" "}
                    <span className="mono-tag text-glow-cyan">
                      ⌘ + Shift + P
                    </span>{" "}
                    and drag a region. Any window, any app, any pixel.
                  </>
                ),
                color: "violet" as const,
                Icon: Target,
              },
              {
                step: "step_02",
                title: "Extract",
                body: "State-of-the-art OCR pulls every character — even from low-res screenshots, screenshots of code, and handwriting.",
                color: "cyan" as const,
                Icon: Brain,
              },
              {
                step: "step_03",
                title: "Prompt",
                body: "PromptPixel structures the text into a clean, contextual prompt. Copied to your clipboard. Ready to paste.",
                color: "magenta" as const,
                Icon: Zap,
              },
            ].map(({ step, title, body, color, Icon }) => {
              const colorMap = {
                violet: "text-glow-violet border-glow-violet/30 from-glow-violet/30",
                cyan: "text-glow-cyan border-glow-cyan/30 from-glow-cyan/30",
                magenta: "text-glow-magenta border-glow-magenta/30 from-glow-magenta/30",
              };
              return (
                <div key={step} className="group glass rounded-2xl p-8">
                  <div className={`mono-tag mb-6 ${colorMap[color].split(" ")[0]}`}>
                    {step}
                  </div>
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl border bg-gradient-to-br to-transparent ${colorMap[color]}`}
                  >
                    <Icon className={`h-7 w-7 ${colorMap[color].split(" ")[0]}`} />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
                  <p className="leading-relaxed text-white/60">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section
        id="features"
        className="relative overflow-hidden border-y border-white/5 bg-ink-900/40 py-32"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-glow-violet/10 blur-[150px]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <div className="mono-tag mb-4 text-glow-magenta">// features</div>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-gradient sm:text-6xl">
              Built for people who live in AI.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Every feature exists because we got tired of doing it the slow
              way.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Zap,
                title: "Sub-second OCR",
                body: "Runs locally. No server round trips. No waiting.",
              },
              {
                Icon: Target,
                title: "Smart prompt templates",
                body: "Choose explain, refactor, summarize, translate — or write your own.",
              },
              {
                Icon: Lock,
                title: "Private by default",
                body: "Everything runs on-device. Your screenshots never leave your machine.",
              },
              {
                Icon: Keyboard,
                title: "Global hotkeys",
                body: "Remap anything. Trigger capture without touching the mouse.",
              },
              {
                Icon: Clipboard,
                title: "Clipboard history",
                body: "Last 50 prompts stored locally. Search, reuse, export.",
              },
              {
                Icon: Brain,
                title: "Context-aware",
                body: "Detects code, tables, UI, charts — structures the prompt accordingly.",
              },
              {
                Icon: Globe,
                title: "Model-agnostic",
                body: "Works with every LLM. We don't lock you in.",
              },
              {
                Icon: RefreshCw,
                title: "Lifetime updates",
                body: "One payment. Every future version. Forever.",
              },
              {
                Icon: Feather,
                title: "Lightweight",
                body: "Under 40MB. Zero background drain. Menu-bar only.",
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="glass rounded-2xl p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-glow-violet/20 to-glow-cyan/20">
                  <Icon className="h-5 w-5 text-glow-cyan" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="relative py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <div className="mono-tag mb-4 text-glow-cyan">// pricing</div>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-gradient sm:text-6xl">
              One price. Own it forever.
            </h2>
            <p className="text-lg text-white/60">
              We hate subscriptions. You probably do too.
            </p>
          </div>

          <div className="relative mx-auto max-w-xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-glow-violet via-glow-magenta to-glow-cyan opacity-40 blur-2xl" />
            <div className="relative glass rounded-3xl p-10 md:p-12">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <div className="mono-tag mb-2 text-glow-violet">
                    // promptpixel_pro
                  </div>
                  <h3 className="text-3xl font-black text-white">
                    Everything. Forever.
                  </h3>
                </div>
                <div className="mono-tag rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-green-400">
                  best value
                </div>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-6xl font-black text-white">$25</span>
                <span className="text-white/50 line-through">$49</span>
                <span className="ml-2 text-white/60">one-time</span>
              </div>

              <ul className="mb-10 space-y-4">
                {[
                  "Unlimited captures + prompts",
                  "All prompt templates",
                  "Lifetime updates",
                  "Windows + macOS licenses",
                  "Priority email support",
                  "30-day money-back guarantee",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <Check
                      className="h-5 w-5 flex-shrink-0 text-glow-cyan"
                      strokeWidth={3}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                id="buy"
                href="#buy"
                className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white"
              >
                Buy PromptPixel — $25
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="mono-tag mt-4 text-center text-white/40">
                secure checkout · instant download
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="border-y border-white/5 bg-ink-900/40 py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <div className="mono-tag mb-4 text-glow-magenta">// reviews</div>
            <h2 className="text-4xl font-black tracking-tight text-gradient sm:text-5xl">
              What people say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "This replaced about four different tools in my workflow. I can't believe it's $25.",
                name: "Maya Chen",
                role: "product designer",
                gradient: "from-glow-violet to-glow-magenta",
              },
              {
                quote:
                  "I use it 30+ times a day for pulling code from Stack Overflow screenshots. Instant prompt, instant answer.",
                name: "Devin Ortiz",
                role: "full-stack dev",
                gradient: "from-glow-cyan to-glow-violet",
              },
              {
                quote:
                  "The 'refine' button is genius. It fixes prompts I didn't even know were bad.",
                name: "Sam Patel",
                role: "marketing lead",
                gradient: "from-glow-magenta to-glow-cyan",
              },
            ].map(({ quote, name, role, gradient }) => (
              <div key={name} className="glass rounded-2xl p-7">
                <div className="mb-3 text-yellow-400">★★★★★</div>
                <p className="mb-6 leading-relaxed text-white/80">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${gradient}`}
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {name}
                    </div>
                    <div className="mono-tag text-white/40">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-16 text-center">
            <div className="mono-tag mb-4 text-glow-cyan">// faq</div>
            <h2 className="text-4xl font-black tracking-tight text-gradient sm:text-5xl">
              Questions?
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Does PromptPixel send my screenshots to the cloud?",
                a: "No. OCR and prompt structuring run entirely on your device. Your screens never leave your machine.",
              },
              {
                q: "Which operating systems are supported?",
                a: "Windows 10/11 and macOS 12+ (Intel and Apple Silicon). Linux is on the roadmap.",
              },
              {
                q: "Is $25 really one-time?",
                a: "Yes. No subscriptions, no renewals, no upsells. One payment gets you the current version plus every future update.",
              },
              {
                q: "What if I don't like it?",
                a: "30-day money-back guarantee. Email us, we refund you. No questions, no forms.",
              },
              {
                q: "Does it work offline?",
                a: "Yes. Capture, OCR, and prompt generation all work without an internet connection.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group glass cursor-pointer rounded-xl p-6"
              >
                <summary className="flex list-none items-center justify-between font-semibold text-white">
                  {q}
                  <Plus className="h-5 w-5 text-glow-violet transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-relaxed text-white/60">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-violet/10 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-5xl font-black tracking-tight text-gradient sm:text-7xl">
            Stop typing prompts.
          </h2>
          <p className="mb-10 text-xl text-white/60">
            PromptPixel is $25. It pays for itself the first week you use it.
          </p>
          <a
            href="#buy"
            className="btn-glow inline-flex items-center gap-2 rounded-xl px-10 py-5 text-lg font-bold text-white"
          >
            Get PromptPixel
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-white/5 bg-ink-950 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <BrandMark />
              <div>
                <div className="font-bold text-white">PromptPixel</div>
                <div className="mono-tag text-white/40">
                  a makobytes product
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/60">
              <a href="#how" className="transition hover:text-white">
                How it works
              </a>
              <a href="#pricing" className="transition hover:text-white">
                Pricing
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
              <a
                href="mailto:hello@makobytes.com"
                className="transition hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mono-tag mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-white/30 md:flex-row">
            <div>© 2026 makobytes · built by makologics</div>
            <div className="flex gap-4">
              <a href="#" className="transition hover:text-white">
                privacy
              </a>
              <a href="#" className="transition hover:text-white">
                terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
