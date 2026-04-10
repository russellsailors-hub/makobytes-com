"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type TrendSeries = {
  name: string;
  color: string;
  data: { date: string; count: number }[];
};

export function TrendChart({ series }: { series: TrendSeries[] }) {
  // Merge all series by date
  const dates = Array.from(
    new Set(series.flatMap((s) => s.data.map((d) => d.date))),
  ).sort();

  const merged = dates.map((date) => {
    const row: Record<string, string | number> = { date };
    series.forEach((s) => {
      const found = s.data.find((d) => d.date === date);
      row[s.name] = found?.count ?? 0;
    });
    return row;
  });

  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-tag mb-1 text-glow-cyan">// trend</div>
          <h3 className="text-lg font-bold text-white">Last 14 days</h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-1.5 mono-tag text-white/60"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: s.color }}
              />
              {s.name}
            </div>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={merged}>
            <defs>
              {series.map((s, i) => (
                <linearGradient
                  key={s.name}
                  id={`grad-${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.3)"
              fontSize={11}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              fontSize={11}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0a0a0f",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.5rem",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            {series.map((s, i) => (
              <Area
                key={s.name}
                type="monotone"
                dataKey={s.name}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#grad-${i})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
