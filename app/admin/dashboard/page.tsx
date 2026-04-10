import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  Download,
  ShoppingCart,
  MousePointerClick,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { auth } from "@/auth";
import {
  getTotal,
  getToday,
  getLastNDays,
  getRecentEvents,
  isStorageConfigured,
} from "@/lib/admin/storage";
import { StatCard } from "@/components/admin/stat-card";
import { TrendChart } from "@/components/admin/trend-chart";
import { EventsFeed } from "@/components/admin/events-feed";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: "Dashboard · MakoBytes Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/admin");
  }

  const configured = isStorageConfigured();

  const [
    totalPageviews,
    todayPageviews,
    totalDownloads,
    todayDownloads,
    totalBuys,
    todayBuys,
    totalAppCardClicks,
    todayAppCardClicks,
    pageviewsTrend,
    downloadsTrend,
    recentEvents,
  ] = await Promise.all([
    getTotal("pageview"),
    getToday("pageview"),
    getTotal("click_download"),
    getToday("click_download"),
    getTotal("click_buy"),
    getToday("click_buy"),
    getTotal("click_app_card"),
    getToday("click_app_card"),
    getLastNDays("pageview", 14),
    getLastNDays("click_download", 14),
    getRecentEvents(50),
  ]);

  const productViews = await getTotal("pageview_promptpixel");
  const funnelStops = [
    { label: "Site visits", value: totalPageviews },
    { label: "Product views", value: productViews },
    { label: "Download clicks", value: totalDownloads },
    { label: "Buy clicks", value: totalBuys },
  ];
  const funnelTop = funnelStops[0].value || 1;

  return (
    <main className="relative min-h-screen bg-ink-950 text-white">
      <div className="pointer-events-none fixed inset-0 grid-overlay opacity-20" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-glow-blue/8 blur-[160px]" />

      <nav className="relative border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              MakoBytes
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-bold tracking-tight text-white">
              Admin Dashboard
            </span>
            <span className="mono-tag rounded-full border border-glow-blue/30 bg-glow-blue/10 px-2 py-0.5 text-[10px] text-glow-blue">
              v1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt=""
                  className="h-7 w-7 rounded-full border border-white/10"
                />
              )}
              <span className="mono-tag text-[11px] text-white/60">
                {session.user.email}
              </span>
            </div>
            <a
              href="/admin/dashboard"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </a>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {!configured && (
          <div className="mb-8 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6">
            <div className="mono-tag mb-2 text-yellow-400">// setup required</div>
            <h2 className="mb-2 text-xl font-bold text-white">
              Vercel KV not connected yet
            </h2>
            <p className="text-sm leading-relaxed text-yellow-100/80">
              All counters below will read zero until you create a Vercel KV
              database and connect it to this project. Go to{" "}
              <span className="mono-tag text-white">
                vercel.com/dashboard
              </span>{" "}
              → makobytes-com → Storage → Create Database → KV → Connect.
              Vercel will inject{" "}
              <span className="mono-tag text-white">KV_REST_API_URL</span> and{" "}
              <span className="mono-tag text-white">KV_REST_API_TOKEN</span>{" "}
              automatically. Then redeploy.
            </p>
          </div>
        )}

        <div className="mb-8">
          <div className="mono-tag mb-2 text-glow-cyan">// overview</div>
          <h1 className="text-4xl font-black tracking-tight text-gradient sm:text-5xl">
            What's happening on the site
          </h1>
          <p className="mt-2 text-white/60">
            Live analytics — refreshed every page load. {recentEvents.length}{" "}
            recent event{recentEvents.length === 1 ? "" : "s"} captured.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Page views"
            total={totalPageviews}
            today={todayPageviews}
            Icon={Eye}
            accent="cyan"
          />
          <StatCard
            label="Download clicks"
            total={totalDownloads}
            today={todayDownloads}
            Icon={Download}
            accent="green"
          />
          <StatCard
            label="Buy Pro clicks"
            total={totalBuys}
            today={todayBuys}
            Icon={ShoppingCart}
            accent="magenta"
          />
          <StatCard
            label="App card clicks"
            total={totalAppCardClicks}
            today={todayAppCardClicks}
            Icon={MousePointerClick}
            accent="blue"
          />
        </div>

        <div className="mb-8 glass rounded-2xl p-6">
          <div className="mb-6">
            <div className="mono-tag mb-1 text-glow-magenta">// funnel</div>
            <h3 className="text-lg font-bold text-white">
              Visit → product → download → buy
            </h3>
          </div>
          <div className="space-y-3">
            {funnelStops.map((stop, i) => {
              const pct = Math.round((stop.value / funnelTop) * 100);
              const colors = [
                "from-glow-cyan to-glow-blue",
                "from-glow-blue to-glow-cyan",
                "from-green-400 to-glow-cyan",
                "from-glow-magenta to-glow-blue",
              ];
              return (
                <div key={stop.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-white/70">{stop.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-white">
                        {stop.value.toLocaleString()}
                      </span>
                      <span className="mono-tag text-white/40">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors[i]}`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TrendChart
              series={[
                {
                  name: "page views",
                  color: "#22d3ee",
                  data: pageviewsTrend,
                },
                {
                  name: "downloads",
                  color: "#a3e635",
                  data: downloadsTrend,
                },
              ]}
            />
          </div>
          <div className="lg:col-span-2">
            <EventsFeed events={recentEvents} />
          </div>
        </div>
      </div>
    </main>
  );
}
