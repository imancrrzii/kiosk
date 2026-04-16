
// import { QUEUE_TYPE_CONFIG } from "@/config/constants";
import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function TVWaitingQueue({ waiting }) {
  return (
    <div className="p-6 overflow-y-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-0.5 h-5 rounded-full bg-purple-500" />
        <div className="text-[10px] tracking-[3px] text-slate-600 uppercase font-bold">
          Antrian Menunggu
        </div>
        <div
          className="ml-auto rounded-full px-2.5 py-0.5"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-[10px] font-bold text-slate-400">
            {waiting.length} nomor
          </span>
        </div>
      </div>

      {/* Queue Grid */}
      <div
        className="grid max-h-[56vh] overflow-hidden"
        style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}
      >
        {waiting.slice(0, 25).map((queue, index) => {
          const queueTypeConfig = QUEUE_TYPE_CONFIG[queue.queue_type];
          const predMin = queue.prediction?.estimated_wait_minutes;
          const isNext = index === 0;
          const isTeller = queue.service_name === "TELLER";

          const QueueIcon = queueTypeConfig?.icon;

          return (
            <div
              key={queue.id}
              className="rounded-xl text-center py-2.5 px-1.5 flex flex-col items-center"
              style={{
                background: isNext
                  ? "rgba(251,191,36,0.07)"
                  : "rgba(255,255,255,0.02)",
                border: isNext
                  ? "1px solid rgba(251,191,36,0.3)"
                  : "1px solid rgba(255,255,255,0.04)",
                transform: isNext ? "scale(1.05)" : "scale(1)",
                transition: "all 0.2s",
              }}
            >
              {isNext && (
                <div className="text-[8px] font-bold text-amber-400 tracking-[2px] uppercase mb-1">
                  NEXT
                </div>
              )}

              <div
                className={`text-lg font-black leading-none ${
                  isTeller ? "text-blue-400" : "text-purple-400"
                }`}
              >
                {queue.queue_number}
              </div>

              {QueueIcon && (
                <div className="mt-1">
                  <QueueIcon size={11} className="text-slate-600" />
                </div>
              )}

              {predMin != null && (
                <div
                  className={`text-[10px] font-bold mt-1 ${
                    predMin === 0 ? "text-emerald-400" : "text-cyan-500"
                  }`}
                >
                  {predMin === 0 ? "Segera" : `~${predMin}m`}
                </div>
              )}

              {queue.wait_minutes != null && (
                <div
                  className={`text-[9px] mt-0.5 ${
                    queue.wait_minutes > 30 ? "text-amber-600" : "text-slate-700"
                  }`}
                >
                  {queue.wait_minutes}m
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {waiting.length === 0 && (
          <div className="col-span-5 text-center py-16 flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* <CheckCircle size={28} className="text-slate-700" /> */}
                <FontAwesomeIcon icon={faCheckCircle} className="text-slate-700" size="lg" />
            </div>
            <span className="text-slate-700 text-sm">Tidak ada antrian menunggu</span>
          </div>
        )}
      </div>
    </div>
  );
}