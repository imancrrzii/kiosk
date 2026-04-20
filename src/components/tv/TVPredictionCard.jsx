export default function TVPredictionCard({ pred, label, color = "sky", formatPredDisplay }) {
  const colorConfig = {
    sky: {
      val: "text-sky-600",
      bg: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
      border: "#7dd3fc",
      bar: "bg-gradient-to-r from-sky-400 to-sky-500",
    },
    purple: {
      val: "text-purple-600",
      bg: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      border: "#c084fc",
      bar: "bg-gradient-to-r from-purple-400 to-purple-500",
    },
  };

  const cfg = colorConfig[color] || colorConfig.sky;

  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="text-[9px] text-gray-600 uppercase tracking-[2px] font-semibold">{label}</div>

      {pred.waiting_count === 0 ? (
        <div className="text-lg font-bold text-sky-600">Langsung Dilayani</div>
      ) : (
        <>
          {/* Main Info - Horizontal Layout with space-between */}
          <div className="flex items-end justify-between">
            <div className={`text-[24px] font-black leading-none ${cfg.val}`}>
              {formatPredDisplay(pred.estimated_wait_minutes)}
            </div>

            <div className="flex flex-col gap-0.5 pb-0.5 text-right">
              {pred.estimated_call_time && (
                <div className="text-[9px] text-gray-600 font-medium">~{pred.estimated_call_time}</div>
              )}
              <div className="text-[9px] text-gray-500">{pred.waiting_count} orang</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
