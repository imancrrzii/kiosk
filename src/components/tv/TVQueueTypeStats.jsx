import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TVQueueTypeStats({ queueTypeStats, totalWaiting }) {
  if (!queueTypeStats || Object.keys(queueTypeStats).length === 0) {
    return null;
  }

  const colorMap = {
    rose: {
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
      text: "#34d399",
    },
    blue: {
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.2)",
      text: "#60a5fa",
    },
    purple: {
      bg: "rgba(139,92,246,0.1)",
      border: "rgba(139,92,246,0.2)",
      text: "#a78bfa",
    },
    orange: {
      bg: "rgba(251,191,36,0.1)",
      border: "rgba(251,191,36,0.2)",
      text: "#fbbf24",
    },
  };

  return (
    <div
      className="flex items-center gap-5 px-8 py-2"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <span className="text-[9px] text-slate-600 tracking-[3px] uppercase flex items-center gap-1.5 shrink-0">
        <FontAwesomeIcon icon={faUsers} className="text-slate-600" />
        Menunggu per Layanan:
      </span>

      {Object.entries(queueTypeStats).map(([queueType, count]) => {
        const config = QUEUE_TYPE_CONFIG[queueType];
        if (!config) return null;

        const Icon = config.icon;
        const colors = colorMap[config.color] || colorMap.blue;

        return (
          <div
            key={queueType}
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
            }}
          >
            {Icon && <Icon size={11} style={{ color: colors.text }} />}
            <span className="text-[10px] font-semibold text-slate-400">
              {config.label}
            </span>
            <span className="text-[11px] font-black" style={{ color: colors.text }}>
              {count}
            </span>
          </div>
        );
      })}

      <span className="ml-auto text-[10px] text-slate-700">
        Total antrian:{" "}
        <span className="text-slate-500 font-bold">{totalWaiting}</span>
      </span>
    </div>
  );
}