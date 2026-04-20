import { faWifi, faWifiStrong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TVCounterCard({ counter, color = "blue" }) {
  const busy = counter.status === "BUSY";

  const colorConfig = {
    blue: {
      num: "text-sky-600",
      bg: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      border: "#7dd3fc",
      dot: "bg-sky-500",
      label: "text-sky-700",
      shadow: "0 4px 12px rgba(14, 165, 233, 0.15)",
    },
    purple: {
      num: "text-purple-600",
      bg: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      border: "#c084fc",
      dot: "bg-purple-500",
      label: "text-purple-700",
      shadow: "0 4px 12px rgba(168, 85, 247, 0.15)",
    },
  };

  const cfg = colorConfig[color] || colorConfig.blue;

  return (
    <div
      className="rounded-2xl p-3.5 transition-all"
      style={{
        background: busy ? cfg.bg : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        border: `1px solid ${busy ? cfg.border : "#e2e8f0"}`,
        boxShadow: busy ? cfg.shadow : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="text-[9px] tracking-[2px] text-gray-500 uppercase font-semibold mb-1">{counter.counter_name}</div>

      {busy ? (
        <>
          <div className={`text-[36px] font-black leading-none ${cfg.num}`}>{counter.current_queue_number}</div>
          <div className={`mt-1.5 text-[9px] font-bold tracking-wider flex items-center gap-1.5 ${cfg.label}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
            MELAYANI
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-400 text-[13px] italic mt-1">Kosong</div>
          <div className="text-[9px] text-gray-500 mt-1.5 flex items-center gap-1">
            {counter.status === "IDLE" ? (
              <>
                <FontAwesomeIcon icon={faWifi} className="text-[9px] text-green-500" />
                Siap
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faWifiStrong} className="text-[9px] text-gray-400" />
                Offline
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
