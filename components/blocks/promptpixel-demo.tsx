"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

/**
 * PromptPixelDemo
 *
 * Auto-playing "video reel" of the real app screenshots. Each frame:
 *   - Crossfades in from the previous one
 *   - Has a Ken Burns slow-zoom for life
 *   - Shows an animated narration caption beneath
 *   - Advances on a fixed timer (FRAME_DURATION_MS)
 *
 * Hover/focus the player to see play-pause + restart controls.
 * Click anywhere on the player to pause/resume.
 */

type Frame = {
  src: string;
  alt: string;
  chapter: string;
  title: string;
  subtitle: string;
  // Ken Burns end state — slight zoom + drift, keeps image alive
  kenBurns: {
    fromScale: number;
    toScale: number;
    fromX: number;
    toX: number;
    fromY: number;
    toY: number;
  };
};

const FRAME_DURATION_MS = 5200;

const FRAMES: Frame[] = [
  {
    src: "/screenshots/tray-menu.png",
    alt: "PromptPixel system tray menu",
    chapter: "01 / lives in your tray",
    title: "Always one keystroke away.",
    subtitle:
      "PromptPixel runs from your system tray. Right-click the camera icon for capture, recent shots, or settings.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.06,
      fromX: 0,
      toX: -1.5,
      fromY: 0,
      toY: -1.5,
    },
  },
  {
    src: "/screenshots/settings-capture.png",
    alt: "Capture settings — fullscreen and region hotkeys",
    chapter: "02 / your hotkey, your way",
    title: "Bind any combo.",
    subtitle:
      "Default Ctrl+Alt+S for fullscreen, Ctrl+Shift+Alt+S for region. Reserved keys are blocked so nothing collides with Windows.",
    kenBurns: {
      fromScale: 1.04,
      toScale: 1.0,
      fromX: 0,
      toX: 0,
      fromY: -2,
      toY: 0,
    },
  },
  {
    src: "/screenshots/settings-capture.png",
    alt: "Capture settings — auto-type prompt for AI chats",
    chapter: "03 / auto-type your prompt",
    title: "Type your prompt for you.",
    subtitle:
      "Set a default prompt once. Every capture pastes the image AND auto-types your prompt right after — perfect for AI chats.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.08,
      fromX: 0,
      toX: 0,
      fromY: 4,
      toY: 8,
    },
  },
  {
    src: "/screenshots/settings-feedback.png",
    alt: "Feedback settings — sound, toast, capture history",
    chapter: "04 / capture feedback",
    title: "Know what just happened.",
    subtitle:
      "Soft confirmation sound, thumbnail toast, or a full preview-before-send dialog. Your last 50 captures stay in history.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.05,
      fromX: 1.5,
      toX: -1.5,
      fromY: 0,
      toY: 0,
    },
  },
  {
    src: "/screenshots/settings-prompt-picker.png",
    alt: "Pro tab — Prompt Picker with saved prompts list",
    chapter: "05 / pro: prompt picker",
    title: "A library of prompts, one keystroke away.",
    subtitle:
      "Press Ctrl+Alt+P. A popup of your saved prompts opens. Pick one — PromptPixel captures the screen, pastes the image, and types that prompt. Add as many as you want.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.06,
      fromX: 0,
      toX: 0,
      fromY: -2,
      toY: 4,
    },
  },
  {
    src: "/screenshots/settings-pro.png",
    alt: "Pro tab — OCR text extraction and voice prompt features",
    chapter: "06 / pro: ocr + voice",
    title: "Drag a box. Speak a prompt.",
    subtitle:
      "OCR pulls just the text on your clipboard — no image, no vision tokens. Voice prompts capture the screen while you talk. Both fully on-device.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.06,
      fromX: 0,
      toX: 0,
      fromY: -3,
      toY: 3,
    },
  },
  {
    src: "/screenshots/settings-pro-2.png",
    alt: "Pro tab — Multi-target hotkeys for pre-set prompts",
    chapter: "07 / pro: multi-target hotkeys",
    title: "One hotkey, one workflow.",
    subtitle:
      "Bind extra hotkeys to specific prompts. Ctrl+Alt+1 → 'Explain this code'. Ctrl+Alt+2 → 'What's wrong here?'. One keystroke, full hands-free.",
    kenBurns: {
      fromScale: 1.04,
      toScale: 1.0,
      fromX: -2,
      toX: 2,
      fromY: 0,
      toY: 0,
    },
  },
  {
    src: "/screenshots/settings-backups.png",
    alt: "Pro tab — Auto-Save Backups settings",
    chapter: "08 / pro: auto-save backups",
    title: "Never lose a capture.",
    subtitle:
      "Every screenshot saved as a timestamped PNG to a folder you choose. Default: Pictures\\PromptPixel. Recover, browse, or share any past capture later.",
    kenBurns: {
      fromScale: 1.0,
      toScale: 1.06,
      fromX: 0,
      toX: 0,
      fromY: -2,
      toY: 4,
    },
  },
];

export function PromptPixelDemo({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);

  const frame = FRAMES[index];

  // Animation loop driving progress + auto-advance
  useEffect(() => {
    if (!playing) {
      pausedAtRef.current = progress;
      return;
    }

    startTsRef.current = null;

    const tick = (ts: number) => {
      if (startTsRef.current === null) {
        startTsRef.current = ts - pausedAtRef.current * FRAME_DURATION_MS;
      }
      const elapsed = ts - startTsRef.current;
      const p = Math.min(1, elapsed / FRAME_DURATION_MS);
      setProgress(p);

      if (p >= 1) {
        pausedAtRef.current = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % FRAMES.length);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index]);

  // Reset progress whenever the frame index changes
  useEffect(() => {
    pausedAtRef.current = 0;
    setProgress(0);
  }, [index]);

  const goTo = (i: number) => {
    pausedAtRef.current = 0;
    setProgress(0);
    setIndex(i);
  };

  const restart = () => {
    pausedAtRef.current = 0;
    setProgress(0);
    setIndex(0);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((p) => !p);

  const kb = frame.kenBurns;
  // Lerp Ken Burns from start state to end state across the frame's progress
  const scale = kb.fromScale + (kb.toScale - kb.fromScale) * progress;
  const x = kb.fromX + (kb.toX - kb.fromX) * progress;
  const y = kb.fromY + (kb.toY - kb.fromY) * progress;

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* ambient glow behind the player */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-glow-blue/25 via-transparent to-glow-cyan/25 blur-2xl" />

      <div className="circuit-border relative rounded-2xl">
        <div className="rounded-2xl bg-ink-900/95 p-1 backdrop-blur-xl">
          {/* window chrome */}
          <div className="relative flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <div className="mono-tag ml-4 text-white/30">
              promptpixel — v2.0.0-alpha · live demo
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-glow-blue/10 px-2.5 py-0.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow-blue" />
              <span className="mono-tag text-[10px] text-glow-blue">
                {playing ? "playing" : "paused"}
              </span>
            </div>
          </div>

          {/* viewport */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="group relative block aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900 sm:aspect-[16/13]"
          >
            <div className="absolute inset-0 grid-overlay opacity-30" />

            {/* Ken Burns image stack — render every frame, fade only the active */}
            {FRAMES.map((f, i) => {
              const isActive = i === index;
              return (
                <div
                  key={`${f.src}-${i}`}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: isActive
                        ? `scale(${scale}) translate(${x}%, ${y}%)`
                        : "scale(1)",
                      transition: "none",
                    }}
                  >
                    <Image
                      src={f.src}
                      alt={f.alt}
                      fill
                      className="object-contain p-4 sm:p-6"
                      sizes="(min-width: 1024px) 700px, 100vw"
                      priority={i === 0}
                    />
                  </div>
                </div>
              );
            })}

            {/* Bottom gradient + caption overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent px-6 pb-6 pt-16">
              <div
                key={`caption-${index}`}
                className="animate-caption mx-auto max-w-xl"
              >
                <div className="mono-tag text-glow-cyan">{frame.chapter}</div>
                <div className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  {frame.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">
                  {frame.subtitle}
                </div>
              </div>
            </div>

            {/* Center play overlay (only visible when paused) */}
            {!playing && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-950/30 backdrop-blur-[1px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-glow-blue/90 shadow-[0_0_60px_rgba(59,130,246,0.7)]">
                  <Play
                    className="h-7 w-7 text-white"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>
              </div>
            )}

            {/* Hover-only top-right control buttons */}
            <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  restart();
                }}
                aria-label="Restart demo"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/80 text-white/70 backdrop-blur-md transition hover:border-glow-blue/50 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/80 text-white/70 backdrop-blur-md transition hover:border-glow-blue/50 hover:text-white"
              >
                {playing ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4" fill="currentColor" />
                )}
              </button>
            </div>
          </button>

          {/* Frame chapter dots + progress bar */}
          <div className="border-t border-white/5 bg-ink-950/60 px-4 py-3">
            <div className="flex items-center gap-2">
              {FRAMES.map((_, i) => {
                const isActive = i === index;
                const isPast = i < index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to frame ${i + 1}`}
                    className="group/dot relative h-1 flex-1 overflow-hidden rounded-full bg-white/10 transition hover:bg-white/20"
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-glow-blue to-glow-cyan"
                      style={{
                        width: isActive
                          ? `${progress * 100}%`
                          : isPast
                            ? "100%"
                            : "0%",
                        transition: isActive ? "none" : "width 0.3s ease-out",
                      }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mono-tag mt-2 flex items-center justify-between text-[10px] text-white/30">
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(FRAMES.length).padStart(2, "0")}
              </span>
              <span>click viewport to {playing ? "pause" : "play"}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes caption-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-caption {
          animation: caption-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
