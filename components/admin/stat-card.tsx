import { ComponentType } from "react";

export function StatCard({
  label,
  total,
  today,
  Icon,
  accent = "blue",
}: {
  label: string;
  total: number;
  today: number;
  Icon: ComponentType<{ className?: string }>;
  accent?: "blue" | "cyan" | "magenta" | "green";
}) {
  const accentMap = {
    blue: "text-glow-blue from-glow-blue/30 border-glow-blue/30",
    cyan: "text-glow-cyan from-glow-cyan/30 border-glow-cyan/30",
    magenta: "text-glow-magenta from-glow-magenta/30 border-glow-magenta/30",
    green: "text-green-400 from-green-400/30 border-green-400/30",
  };
  const a = accentMap[accent];
  const [iconColor, gradientFrom, borderColor] = a.split(" ");

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg border bg-gradient-to-br to-transparent ${gradientFrom} ${borderColor}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="mono-tag text-[10px] text-white/30">all-time</div>
      </div>
      <div className="mt-5 text-4xl font-black tracking-tight text-white">
        {total.toLocaleString()}
      </div>
      <div className="mt-1 text-sm text-white/50">{label}</div>
      <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-3">
        <span className="mono-tag text-white/40">today</span>
        <span className={`text-sm font-bold ${iconColor}`}>
          {today.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
