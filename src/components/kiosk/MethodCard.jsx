import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colorConfig = {
  blue: {
    bg: "bg-blue-600/10",
    border: "border-blue-500/30 hover:border-blue-400/60",
    text: "text-blue-400",
    iconBg: "bg-blue-600/20",
  },
  purple: {
    bg: "bg-purple-600/10",
    border: "border-purple-500/30 hover:border-purple-400/60",
    text: "text-purple-400",
    iconBg: "bg-purple-600/20",
  },
  orange: {
    bg: "bg-orange-600/10",
    border: "border-orange-500/30 hover:border-orange-400/60",
    text: "text-orange-400",
    iconBg: "bg-orange-600/20",
  },
  green: {
    bg: "bg-rose-600/10",
    border: "border-rose-500/30 hover:border-rose-400/60",
    text: "text-rose-400",
    iconBg: "bg-rose-600/20",
  },
};

export default function MethodCard({
  Icon,
  title,
  desc,
  color,
  badge,
  onClick,
}) {
  const cfg = colorConfig[color] || colorConfig.blue;

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border p-5 text-left cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl ${cfg.bg} ${cfg.border}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cfg.iconBg}`}
        >
          <FontAwesomeIcon icon={Icon} className={cfg.text} size="lg" />
        </div>
        <div className="flex-1">
          <div className="font-black text-white">{title}</div>
          <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
        </div>
        {badge && (
          <span className="text-xs text-slate-400 bg-white/10 rounded-full px-2 py-1 shrink-0">
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}