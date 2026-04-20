import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

export default function TVWaitingQueue({ waiting }) {
  return (
    <div className="p-6 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(125, 211, 252, 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1.5 h-8 rounded-full"
            style={{
              background: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%)",
              boxShadow: "0 0 20px rgba(14, 165, 233, 0.4)",
            }}
          />
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-sky-600 text-sm" />
            <div className="text-[11px] tracking-[2.5px] text-sky-700 uppercase font-bold">Antrian Menunggu</div>
          </div>
          <div
            className="ml-auto flex items-center rounded-full px-4 py-1.5 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(224, 242, 254, 0.8) 0%, rgba(186, 230, 253, 0.8) 100%)",
              border: "1px solid rgba(125, 211, 252, 0.5)",
              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.15)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-sky-500 mr-2 animate-pulse" />
            <span className="text-[11px] font-bold text-sky-700">{waiting.length} Nomor</span>
          </div>
        </div>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            maxHeight: "calc(100vh - 280px)",
          }}
        >
          {waiting.slice(0, 32).map((queue, index) => {
            const queueTypeConfig = QUEUE_TYPE_CONFIG[queue.queue_type];
            const predMin = queue.prediction?.estimated_wait_minutes;
            const isNext = index === 0;
            const QueueIcon = queueTypeConfig?.icon;

            return (
              <div
                key={queue.id}
                className="group rounded-2xl flex flex-col items-center justify-center py-3 px-2 relative overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: isNext
                    ? "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                  border: isNext ? "1px solid #fbbf24" : "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: isNext
                    ? "0 8px 24px rgba(251, 191, 36, 0.3), 0 0 0 4px rgba(251, 191, 36, 0.1)"
                    : "0 2px 8px rgba(0, 0, 0, 0.04)",
                  minHeight: "100px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
                  }}
                />

                {isNext && (
                  <div
                    className="text-[8px] font-black text-white tracking-[1px] uppercase px-2 py-0.5 rounded-full animate-pulse mb-1"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
                    }}
                  >
                    NEXT
                  </div>
                )}

                <div
                  className={`text-2xl font-black leading-none mb-2 ${isNext ? "text-amber-600" : "text-sky-600"}`}
                  style={{
                    textShadow: isNext ? "0 2px 8px rgba(251, 191, 36, 0.2)" : "none",
                  }}
                >
                  {queue.queue_number}
                </div>

                <div className="flex items-center gap-1 mb-1">
                  {QueueIcon && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(224, 242, 254, 0.8) 0%, rgba(186, 230, 253, 0.8) 100%)",
                        border: "1px solid rgba(125, 211, 252, 0.3)",
                      }}
                    >
                      <FontAwesomeIcon icon={QueueIcon} className="text-sky-600" style={{ fontSize: 10 }} />
                    </div>
                  )}

                  {predMin != null && (
                    <div
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        predMin === 0
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-sky-100 text-sky-700 border border-sky-300"
                      }`}
                    >
                      {predMin === 0 ? "Segera" : `${predMin}m`}
                    </div>
                  )}
                </div>

                {queue.wait_minutes != null && (
                  <div
                    className={`text-[8px] font-medium px-2 py-0.5 rounded-full ${
                      queue.wait_minutes > 30
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {queue.wait_minutes}m tunggu
                  </div>
                )}

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-50"
                  style={{
                    background: isNext
                      ? "linear-gradient(90deg, transparent 0%, #fbbf24 50%, transparent 100%)"
                      : "linear-gradient(90deg, transparent 0%, #0ea5e9 50%, transparent 100%)",
                  }}
                />
              </div>
            );
          })}

          {waiting.length === 0 && (
            <div className="col-span-8 text-center py-16 flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto relative"
                style={{
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  border: "2px solid #bae6fd",
                  boxShadow: "0 8px 24px rgba(14, 165, 233, 0.15)",
                }}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="text-sky-400" style={{ fontSize: 32 }} />
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{
                    background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
                  }}
                />
              </div>
              <div className="space-y-1">
                <div className="text-gray-700 text-base font-semibold">Tidak ada antrian</div>
                <div className="text-gray-500 text-xs">Semua pelanggan telah dilayani</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
