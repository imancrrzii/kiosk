import { faBold, faSpinner, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PredictionBox({ pred, serviceLabel, color = "cyan" }) {
  const colorMap = {
    cyan: { wrap: "bg-cyan-950/40 border-cyan-900/40", icon: "text-cyan-400", val: "text-cyan-300", sub: "text-cyan-600" },
    sky: {
      wrap: "bg-white border-slate-300",
      icon: "text-sky-400",
      val: "text-sky-300",
      sub: "text-sky-600",
    },
    purple: {
      wrap: "bg-purple-950/40 border-purple-900/40",
      icon: "text-purple-400",
      val: "text-purple-300",
      sub: "text-purple-600",
    },
    orange: { wrap: "bg-orange-950/40 border-orange-900/40", icon: "text-orange-400", val: "text-orange-300", sub: "text-orange-600" },
  };
  const c = colorMap[color] || colorMap.cyan;
  const formatPred = (mins) => {
    if (mins == null) return null;
    if (mins === 0) return "Langsung dilayani";
    if (mins >= 60) return `~${Math.floor(mins / 60)}j ${Math.round(mins % 60)}m`;
    return `~${mins} menit`;
  };

  return (
    <div className={`rounded-2xl border p-3 mt-3 ${c.wrap}`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1.5 ${c.icon}`}>
          <FontAwesomeIcon icon={faBold} size="sm" />
          <span className="text-xs font-bold">Estimasi Tunggu — {serviceLabel}</span>
        </div>
        <div className="text-right">
          {pred == null ? (
            <span className="text-xs text-slate-600 flex items-center gap-1">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Memuat…
            </span>
          ) : pred.estimated_wait_minutes === 0 ? (
            <span className={`text-sm font-black ${c.val}`}>Langsung dilayani</span>
          ) : (
            <div>
              <span className={`text-sm font-black ${c.val}`}>{formatPred(pred.estimated_wait_minutes)}</span>
              {pred.estimated_call_time && (
                <span className={`text-xs ml-1 ${c.sub}`}>· dipanggil ~{pred.estimated_call_time}</span>
              )}
            </div>
          )}
        </div>
      </div>
      {pred != null && pred.waiting_count > 0 && (
        <div className={`flex items-center gap-1 text-[10px] text-slate-600 mt-1`}>
          <FontAwesomeIcon icon={faUsers} size="xs" />
          {pred.waiting_count} orang sedang menunggu
        </div>
      )}
    </div>
  );
}
