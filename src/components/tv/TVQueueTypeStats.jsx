import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TVQueueTypeStats({ queueTypeStats, totalWaiting }) {
  if (!queueTypeStats || Object.keys(queueTypeStats).length === 0) {
    return null;
  }

  const colorMap = {
    rose: {
      bg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
      border: "#6ee7b7",
      text: "#059669",
    },
    blue: {
      bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      border: "#93c5fd",
      text: "#2563eb",
    },
    purple: {
      bg: "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)",
      border: "#c084fc",
      text: "#9333ea",
    },
    orange: {
      bg: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
      border: "#fb923c",
      text: "#ea580c",
    },
  };

  return (
    <div
      className="flex items-center gap-5 px-8 py-2.5"
      style={{
        background: "linear-gradient(to right, #f8fafc, #f0f9ff)",
        borderBottom: "1px solid #e0f2fe",
      }}
    >
      <span className="text-[9px] text-sky-700 tracking-[3px] uppercase flex items-center gap-1.5 shrink-0 font-semibold">
        <FontAwesomeIcon icon={faUsers} className="text-sky-600" />
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
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
            }}
          >
            {Icon && <FontAwesomeIcon icon={Icon} style={{ color: colors.text, fontSize: 11 }} />}
            <span className="text-[10px] font-semibold text-gray-700">{config.label}</span>
            <span className="text-[11px] font-black" style={{ color: colors.text }}>
              {count}
            </span>
          </div>
        );
      })}

      <span className="ml-auto text-[10px] text-gray-600">
        Total antrian: <span className="text-sky-700 font-bold">{totalWaiting}</span>
      </span>
    </div>
  );
}
