"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Camera,
  Bell,
  Crown,
  MousePointerClick,
} from "lucide-react";

type Tab = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  src: string;
  alt: string;
  caption: string;
};

const TABS: Tab[] = [
  {
    id: "tray",
    label: "Tray menu",
    Icon: MousePointerClick,
    src: "/screenshots/tray-menu.png",
    alt: "PromptPixel system tray menu showing capture options",
    caption:
      "Lives in your system tray. Right-click the camera icon for instant capture, recent captures, or settings.",
  },
  {
    id: "capture",
    label: "Capture",
    Icon: Camera,
    src: "/screenshots/settings-capture.png",
    alt: "PromptPixel Capture settings showing fullscreen and region hotkeys",
    caption:
      "Bind your own hotkeys. Set a default prompt that auto-types right after the screenshot pastes — perfect for AI chats.",
  },
  {
    id: "feedback",
    label: "Feedback",
    Icon: Bell,
    src: "/screenshots/settings-feedback.png",
    alt: "PromptPixel Feedback settings showing sound, toast, and history options",
    caption:
      "Sound on capture, thumbnail toast, optional preview-before-send, and a recent-captures history you can replay later.",
  },
  {
    id: "pro",
    label: "Pro features",
    Icon: Crown,
    src: "/screenshots/settings-pro.png",
    alt: "PromptPixel Pro features: OCR, Voice prompt, Multi-target hotkeys",
    caption:
      "Pro unlocks OCR text extraction, voice prompting, and multi-target hotkeys that fire pre-set prompts in one keystroke.",
  },
];

export function PromptPixelShowcase({ className }: { className?: string }) {
  const [active, setActive] = useState<string>(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* ambient glow behind the showcase */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-glow-blue/20 via-transparent to-glow-cyan/20 blur-2xl" />

      <div className="circuit-border relative rounded-2xl">
        <div className="rounded-2xl bg-ink-900/90 p-1 backdrop-blur-xl">
          {/* window chrome */}
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <div className="mono-tag ml-4 text-white/30">
              promptpixel — v2.0.0-alpha
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-glow-blue/10 px-2.5 py-0.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow-blue" />
              <span className="mono-tag text-[10px] text-glow-blue">live</span>
            </div>
          </div>

          {/* tab strip */}
          <div className="flex flex-wrap gap-1 border-b border-white/5 px-2 py-2">
            {TABS.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`mono-tag flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] transition ${
                    isActive
                      ? "bg-glow-blue/15 text-glow-blue ring-1 ring-glow-blue/30"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <t.Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* image area */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-b-xl bg-gradient-to-br from-ink-800 to-ink-900 sm:aspect-[5/6]">
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <Image
              key={tab.src}
              src={tab.src}
              alt={tab.alt}
              fill
              className="object-contain p-4 animate-fade-in"
              sizes="(min-width: 1024px) 600px, 100vw"
              priority={tab.id === "tray"}
            />
          </div>
        </div>
      </div>

      {/* caption under the showcase */}
      <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
        <span className="mono-tag text-glow-cyan">// {tab.label.toLowerCase()}</span>
        <br />
        {tab.caption}
      </p>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
