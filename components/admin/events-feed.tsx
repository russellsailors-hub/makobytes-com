import type { EventRecord } from "@/lib/admin/storage";
import {
  Eye,
  Download,
  ShoppingCart,
  MousePointerClick,
  Activity,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  pageview: Eye,
  pageview_home: Eye,
  pageview_promptpixel: Eye,
  click_download: Download,
  click_buy: ShoppingCart,
  click_app_card: MousePointerClick,
  click_cta: MousePointerClick,
};

const COLOR_MAP: Record<string, string> = {
  pageview: "text-white/60",
  pageview_home: "text-glow-cyan",
  pageview_promptpixel: "text-glow-blue",
  click_download: "text-green-400",
  click_buy: "text-glow-magenta",
  click_app_card: "text-glow-cyan",
  click_cta: "text-glow-blue",
};

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function shortenRef(ref?: string): string {
  if (!ref) return "—";
  try {
    const u = new URL(ref);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return ref.slice(0, 32);
  }
}

export function EventsFeed({ events }: { events: EventRecord[] }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-tag mb-1 text-glow-cyan">// activity</div>
          <h3 className="text-lg font-bold text-white">Recent events</h3>
        </div>
        <div className="mono-tag flex items-center gap-1.5 text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          live
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Activity className="mb-3 h-8 w-8 text-white/20" />
          <div className="text-sm text-white/40">
            No events yet. They'll show up here as soon as someone hits the
            site.
          </div>
        </div>
      ) : (
        <div className="max-h-[480px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-ink-900/95 backdrop-blur">
              <tr className="mono-tag text-[10px] text-white/30">
                <th className="px-2 py-2 text-left">type</th>
                <th className="px-2 py-2 text-left">page</th>
                <th className="px-2 py-2 text-left">from</th>
                <th className="px-2 py-2 text-right">when</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => {
                const Icon = ICON_MAP[e.type] || Activity;
                const color = COLOR_MAP[e.type] || "text-white/60";
                return (
                  <tr
                    key={e.id}
                    className="border-t border-white/5 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-2 py-2.5">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${color}`} />
                        <span className={`mono-tag ${color}`}>
                          {e.type.replace(/_/g, " ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 mono-tag text-white/60">
                      {e.page}
                    </td>
                    <td className="px-2 py-2.5 mono-tag text-white/40">
                      {shortenRef(e.ref)}
                    </td>
                    <td className="px-2 py-2.5 text-right mono-tag text-white/40">
                      {formatTimeAgo(e.ts)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
