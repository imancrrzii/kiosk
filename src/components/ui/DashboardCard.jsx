import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Badge from "./Badge";

const DashboardCard = ({
  title = "Total Antrian",
  value = "260",
  percentage = "15.9%",
  description = "Stay updated with essential details to streamline medical support and management.",
  icon,
  color = "sky", // bisa 'sky', 'green', 'purple', 'orange', dll.
  badgeColor = "success",
  className = "",
  trendIcon = faArrowUp,

}) => {
  // Preset styles agar warna background dan grafik senada
  const colorStyles = {
    sky: { bg: "bg-sky-50/60", graph: "fill-sky-200/50" },
    blue: { bg: "bg-blue-50/70", graph: "fill-blue-200/50" },
    red: { bg: "bg-red-50/70", graph: "fill-red-200/50" },
    green: { bg: "bg-green-50/70", graph: "fill-emerald-200/50" }, // pakai emerald agar tidak bentrok dgn green bg-green-200 dari user, tapi boleh green, kita bikin aja emerald dan green
    purple: { bg: "bg-purple-50/70", graph: "fill-purple-200/50" },
    orange: { bg: "bg-orange-50/70", graph: "fill-orange-200/50" },
    rose: { bg: "bg-rose-50/70", graph: "fill-rose-200/50" },
  };

  const activeColor = colorStyles[color] || colorStyles.sky;

  return (
    <div
      className={`
        relative overflow-hidden
        ${activeColor.bg} backdrop-blur-md
        border border-white/50
        rounded-3xl
        p-5 md:p-6
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        transition-all duration-300 ease-out
        flex flex-col justify-between
        ${className}
      `}
    >
      {/* ── Background Graphic (Chart Placeholder) ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className={`w-full h-20 ${activeColor.graph}`}
        >
          <path d="M0,60 L0,40 C30,30 50,50 90,40 C130,30 160,45 200,25 L200,60 Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-5">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Icon Bubble */}
            <div className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm border border-neutral-100/50">
              {icon && <FontAwesomeIcon icon={icon} size="md" />}
            </div>
            {/* Title */}
            <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
          </div>
        </div>

        {/* ── Value & Badge ── */}
        <div className="items-end gap-3">
          <span className="text-4xl lg:text-[42px] font-bold text-gray-900 leading-none tracking-tight">
            {value}
          </span>
        </div>

        <Badge
          label={percentage}
          color={badgeColor}
          variant="solid"
          size="medium"
          leftIcon={trendIcon}
        />

        <div className="items-end gap-3">
          <span className="text-sm lg:text-[14px] font-bold text-gray-900 leading-none tracking-tight">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
