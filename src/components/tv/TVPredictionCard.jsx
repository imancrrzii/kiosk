import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";


export default function TVPredictionCard({ pred, label, color = "blue", formatPredDisplay }) {
  const colorConfig = {
    blue: {
      val: "text-blue-400",
      bg: "rgba(59,130,246,0.06)",
      border: "rgba(59,130,246,0.15)",
      bar: "bg-blue-500",
    },
    purple: {
      val: "text-purple-400",
      bg: "rgba(139,92,246,0.06)",
      border: "rgba(139,92,246,0.15)",
      bar: "bg-purple-500",
    },
  };

  const cfg = colorConfig[color] || colorConfig.blue;

  return (
    <div
      className="rounded-xl p-3"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <div className="text-[9px] text-slate-600 uppercase tracking-[2px] mb-1 font-semibold">
        {label}
      </div>

      {pred.waiting_count === 0 ? (
        <div className="text-lg font-black text-emerald-400">Langsung</div>
      ) : (
        <>
          <div className={`text-[28px] font-black leading-none ${cfg.val}`}>
            {formatPredDisplay(pred.estimated_wait_minutes)}
          </div>

          {pred.estimated_call_time && (
            <div className="text-[9px] text-slate-600 mt-1">
              Dipanggil ~{pred.estimated_call_time}
            </div>
          )}

          <div className="text-[9px] text-slate-700 mt-0.5">
            {pred.waiting_count} orang antri
          </div>

          {pred.queue_type_breakdown && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {Object.entries(pred.queue_type_breakdown).map(([qt, cnt]) => {
                const qtConfig = QUEUE_TYPE_CONFIG[qt];
                if (!qtConfig) return null;

                const Icon = qtConfig.icon;
                return (
                  <span
                    key={qt}
                    className="flex items-center gap-0.5 text-[9px] text-slate-600 rounded px-1 py-0.5"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    {Icon && <Icon size={8} />}
                    {cnt}
                  </span>
                );
              })}
            </div>
          )}
        </>
      )}

      <div
        className="mt-2 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          className={`h-full rounded-full transition-all ${cfg.bar}`}
          style={{
            width: `${Math.min((pred.estimated_wait_minutes / 90) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}