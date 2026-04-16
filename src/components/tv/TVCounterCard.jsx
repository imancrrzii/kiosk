import { faWifi, faWifi3 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWifiSlash } from "@fortawesome/free-solid-svg-icons";

export default function TVCounterCard({ counter, color = "blue" }) {
  const busy = counter.status === "BUSY";

  const colorConfig = {
    blue: {
      num: "text-blue-400",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.2)",
      dot: "bg-blue-400",
      label: "text-blue-500",
    },
    purple: {
      num: "text-purple-400",
      bg: "rgba(139,92,246,0.07)",
      border: "rgba(139,92,246,0.2)",
      dot: "bg-purple-400",
      label: "text-purple-500",
    },
  };

  const cfg = colorConfig[color] || colorConfig.blue;

  return (
    <div
      className="rounded-xl p-3.5 transition-all"
      style={{
        background: busy ? cfg.bg : "rgba(255,255,255,0.02)",
        border: `1px solid ${busy ? cfg.border : "rgba(255,255,255,0.04)"}`,
      }}
    >
      <div className="text-[9px] tracking-[2px] text-slate-600 uppercase font-semibold mb-2">
        {counter.counter_name}
      </div>

      {busy ? (
        <>
          <div className={`text-[38px] font-black leading-none ${cfg.num}`}>
            {counter.current_queue_number}
          </div>
          <div
            className={`mt-1.5 text-[9px] font-bold tracking-wider flex items-center gap-1.5 ${cfg.label}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
            MELAYANI
          </div>
        </>
      ) : (
        <>
          <div className="text-slate-700 text-[13px] italic mt-1">Kosong</div>
          <div className="text-[9px] text-slate-700 mt-1.5 flex items-center gap-1">
            {counter.status === "IDLE" ? (
              <>
                {/* <Zap size={9} className="text-slate-700" /> */}
                <FontAwesomeIcon icon={faWifi} className="text-[9px]" />
                Siap
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faWifi3} className="text-[9px]" />
                Offline
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}