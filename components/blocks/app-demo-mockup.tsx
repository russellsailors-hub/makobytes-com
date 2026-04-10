"use client";

import { Camera, Clipboard, Sparkles } from "lucide-react";

/**
 * Pure CSS animated mockup showing the PromptPixel workflow:
 *   1. Fake desktop with a screenshot selection drawn
 *   2. Extracted text flies out
 *   3. Becomes a structured AI prompt
 *   4. Copies to clipboard / lands in a chat UI
 *
 * Lives in the hero right column where the 3D robot used to be.
 * No external assets, no 3D, no video — just styled divs + CSS keyframes.
 */
export function AppDemoMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* ambient glow behind the whole mockup */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-glow-blue/20 via-transparent to-glow-cyan/20 blur-2xl" />

      {/* --- Window 1: Screenshot capture --- */}
      <div className="relative">
        <div className="circuit-border rounded-2xl">
          <div className="rounded-2xl bg-ink-900/90 p-1 backdrop-blur-xl">
            {/* window chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="mono-tag ml-4 text-white/30">
                promptpixel — capture mode
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-glow-blue/10 px-2.5 py-0.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow-blue" />
                <span className="mono-tag text-[10px] text-glow-blue">
                  live
                </span>
              </div>
            </div>

            {/* fake desktop content */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-gradient-to-br from-ink-800 to-ink-900">
              <div className="absolute inset-0 grid-overlay opacity-40" />

              {/* fake code editor */}
              <div className="absolute left-5 top-5 right-5 rounded-lg border border-white/5 bg-ink-950/70 p-4 font-mono text-[10px] leading-relaxed text-white/70">
                <div className="mb-2 flex items-center gap-2 text-white/30">
                  <div className="h-2 w-2 rounded-full bg-glow-blue/60" />
                  <span>dashboard.tsx</span>
                </div>
                <div>
                  <span className="text-glow-blue">const</span>{" "}
                  <span className="text-glow-cyan">revenue</span> ={" "}
                  <span className="text-white/60">[</span>
                </div>
                <div className="pl-4 text-white/50">
                  {`{ month: "Oct", value: 42000 },`}
                </div>
                <div className="pl-4 text-white/50">
                  {`{ month: "Nov", value: 38000 },`}
                </div>
                <div className="pl-4 text-white/50">
                  {`{ month: "Dec", value: 31500 },`}
                </div>
                <div className="text-white/60">];</div>
                <div className="mt-2">
                  <span className="text-glow-blue">function</span>{" "}
                  <span className="text-glow-cyan">analyzeDrop</span>() {"{"}
                </div>
                <div className="pl-4 text-white/40">
                  // TODO: explain the decline
                </div>
                <div>{"}"}</div>
              </div>

              {/* animated selection rectangle */}
              <div className="animate-selection pointer-events-none absolute left-[12%] top-[22%] h-[58%] w-[76%] rounded-md border-2 border-glow-cyan shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                {/* corner handles */}
                <div className="absolute -left-1 -top-1 h-2 w-2 rounded-sm bg-glow-cyan" />
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-sm bg-glow-cyan" />
                <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm bg-glow-cyan" />
                <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-glow-cyan" />

                {/* dimensions label */}
                <div className="mono-tag absolute -top-6 left-0 rounded bg-glow-cyan px-2 py-0.5 text-[10px] text-ink-950">
                  768 × 412
                </div>
              </div>

              {/* capture flash */}
              <div className="animate-flash pointer-events-none absolute inset-0 bg-white opacity-0" />
            </div>
          </div>
        </div>

        {/* --- Floating result card (the generated prompt) --- */}
        <div className="animate-result absolute -bottom-8 -right-4 w-[88%] sm:-right-8 sm:w-[78%]">
          <div className="circuit-border rounded-xl">
            <div className="rounded-xl bg-ink-900/95 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-glow-blue to-glow-cyan">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="mono-tag text-glow-cyan">
                  // prompt generated
                </span>
                <span className="mono-tag ml-auto text-white/30">0.8s</span>
              </div>

              <div className="font-mono text-[11px] leading-relaxed">
                <div className="text-glow-blue">&gt; Context:</div>
                <div className="mb-2 text-white/60">
                  Revenue array showing Oct $42k, Nov $38k, Dec $31.5k. 25%
                  decline across Q4. Empty analyzeDrop() function.
                </div>
                <div className="text-glow-blue">&gt; Task:</div>
                <div className="text-white/60">
                  Analyze the revenue decline and suggest three data-backed
                  recovery strategies the team can test in January.
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button className="mono-tag flex items-center gap-1.5 rounded bg-gradient-to-r from-glow-blue to-glow-cyan px-3 py-1.5 text-[10px] font-semibold text-white">
                  <Clipboard className="h-3 w-3" />
                  copy prompt
                </button>
                <button className="mono-tag rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-white/60">
                  refine
                </button>
                <div className="ml-auto flex items-center gap-1.5">
                  <Camera className="h-3 w-3 text-white/30" />
                  <span className="mono-tag text-[10px] text-white/30">
                    from screen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes selection {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
          15% {
            opacity: 1;
            transform: scale(1);
          }
          55% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 0;
            transform: scale(1.02);
          }
        }
        .animate-selection {
          animation: selection 5s ease-in-out infinite;
        }

        @keyframes flash {
          0%,
          100% {
            opacity: 0;
          }
          58% {
            opacity: 0;
          }
          60% {
            opacity: 0.9;
          }
          65% {
            opacity: 0;
          }
        }
        .animate-flash {
          animation: flash 5s ease-out infinite;
        }

        @keyframes result {
          0%,
          65% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          75% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          92% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
        }
        .animate-result {
          animation: result 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
