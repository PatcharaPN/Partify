import { Icon } from "@iconify/react";

type StatCardProps = {
  icon: string;
  color: "blue" | "violet" | "orange";
  label: string;
  value: string | number;
  change?: string;
};

const colorMap = {
  blue: {
    bar: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-500",
  },
  violet: {
    bar: "bg-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-500",
  },
  orange: {
    bar: "bg-orange-400",
    bg: "bg-orange-50",
    text: "text-orange-400",
  },
};

export default function StatCard({
  icon,
  color,
  label,
  value,
  change,
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-1 h-full ${c.bar} rounded-l-2xl`}
      />

      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 ${c.bg} rounded-xl flex items-center justify-center`}
        >
          <Icon icon={icon} className={`w-4 h-4 ${c.text}`} />
        </div>

        {change ? (
          <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 2l4 8H2z" />
            </svg>
            {change}
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </div>

      <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
        {label}
      </p>

      <p className="text-3xl font-bold text-gray-900 tabular-nums">{value}</p>
    </div>
  );
}
