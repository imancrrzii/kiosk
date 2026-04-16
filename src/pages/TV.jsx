import { useState, useEffect } from "react";
// import { Clock, MapPin, PhoneCall, ChevronRight } from "lucide-react";
import { useQueueState } from "@/hooks/useQueueState";
// import { QUEUE_TYPE_CONFIG } from "@/config/constants";
import TVFlashOverlay from "@/components/tv/TVFlashOverlay";
import TVHeader from "@/components/tv/TVHeader";
import TVKursBar from "@/components/tv/TVKursBar";
import TVInfoTicker from "@/components/tv/TVInfoTicker";
import TVQueueTypeStats from "@/components/tv/TVQueueTypeStats";
import TVCountersPanel from "@/components/tv/TVCountersPanel";
import TVWaitingQueue from "@/components/tv/TVWaitingQueue";
import { QUEUE_TYPE_CONFIG } from "@/constant/queueTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faClock, faMapPin, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function TV() {
  const { state, flash, clearFlash } = useQueueState();
  const [time, setTime] = useState(new Date());
  const [kurs, setKurs] = useState({
    USD: { rate: 16284, chg: +0.12 },
    EUR: { rate: 17742, chg: -0.08 },
    SGD: { rate: 12185, chg: +0.05 },
    JPY: { rate: 109, chg: -0.03 },
    MYR: { rate: 3612, chg: +0.07 },
    AUD: { rate: 10524, chg: -0.15 },
  });

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate kurs fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setKurs((prev) => {
        const next = {};
        Object.entries(prev).forEach(([currency, value]) => {
          const delta =
            (Math.random() - 0.48) *
            (currency === "JPY" ? 0.3 : currency === "MYR" ? 3 : 8);
          next[currency] = {
            rate: Math.round(value.rate + delta),
            chg: parseFloat(((delta / value.rate) * 100).toFixed(2)),
          };
        });
        return next;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#060d1e] text-white font-sans flex flex-col overflow-hidden">
      {/* Flash Overlay */}
      <TVFlashOverlay flash={flash} onClose={clearFlash} />

      {/* Header */}
      <TVHeader time={time} kurs={kurs} />

      {/* Kurs Bar */}
      <TVKursBar kurs={kurs} time={time} />

      {/* Info Ticker */}
      <TVInfoTicker />

      {/* Queue Type Stats */}
      <TVQueueTypeStats
        queueTypeStats={state.queue_type_stats}
        totalWaiting={state.waiting.length}
      />

      {/* Main Grid: Counters + Waiting Queue */}
      <div
        className="grid flex-1 min-h-0"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 0 }}
      >
        {/* Left Panel: Counters */}
        <TVCountersPanel
          counters={state.counters}
          predictions={state.service_predictions}
        />

        {/* Right Panel: Waiting Queue */}
        <TVWaitingQueue waiting={state.waiting} />
      </div>

      {/* Called Ticker */}
      {state.called.length > 0 && (
        <div
          className="flex items-center gap-5 px-8"
          style={{
            background: "rgba(0,0,0,0.7)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            height: 48,
          }}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            {/* <PhoneCall size={12} className="text-blue-400" /> */}
            <FontAwesomeIcon icon={faPhone} className="text-blue-400" size="xs" />
            <span className="text-[9px] font-bold tracking-[3px] text-blue-500 uppercase">
              Dipanggil
            </span>
          </div>

          <div className="overflow-hidden flex-1">
            <div
              className="flex gap-10 items-center"
              style={{
                animation: "tickerScroll 25s linear infinite",
                whiteSpace: "nowrap",
              }}
            >
              {[...state.called, ...state.called].map((queue, index) => {
                const QueueIcon = QUEUE_TYPE_CONFIG[queue.queue_type]?.icon;
                return (
                  <div
                    key={`${queue.id}-${index}`}
                    className="flex items-center gap-2 shrink-0"
                  >
                    {QueueIcon && <QueueIcon size={13} className="text-slate-600" />}
                    <span className="text-[19px] font-black text-blue-400">
                      {queue.queue_number}
                    </span>
                    {/* <ChevronRight size={13} className="text-slate-700" /> */}
                    <FontAwesomeIcon icon={faChevronRight} className="text-slate-700" size="xs" />
                    <span className="text-[12px] text-slate-400 font-semibold">
                      {queue.counter_name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center gap-6 px-8"
        style={{
          background: "#04090f",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          height: 32,
        }}
      >
        <div className="flex items-center gap-1.5">
          {/* <MapPin size={10} className="text-slate-700" /> */}
            <FontAwesomeIcon icon={faMapPin} className="text-slate-700" size="xs" />
          <span className="text-[10px] text-slate-700">Batam, Kepulauan Riau</span>
        </div>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.05)" }} />
        <div className="flex items-center gap-1.5">
          {/* <Clock size={10} className="text-slate-700" /> */}
            <FontAwesomeIcon icon={faClock} className="text-slate-700" size="xs" />
          <span className="text-[10px] text-slate-700">
            Operasional:{" "}
            <strong className="text-slate-600">Senin–Jumat 08:00–15:00 WIB</strong>
          </span>
        </div>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.05)" }} />
        <span className="text-[10px] text-slate-700">
          📞 <strong className="text-slate-600">1500-XXX</strong>
        </span>
        <div style={{ width: 1, height: 12, background: "rgba(255,255,255,0.05)" }} />
        <span className="text-[10px] text-slate-700">🌐 www.bank.co.id</span>
        <span className="ml-auto text-[9px] text-slate-800">
          v2.0 · Update {time.toLocaleTimeString("id-ID")}
        </span>
      </div>
    </div>
  );
}