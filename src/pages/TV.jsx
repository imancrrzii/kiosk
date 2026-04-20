import { useState, useEffect } from "react";
import { useQueueState } from "@/hooks/useQueueState";
import TVFlashOverlay from "@/components/tv/TVFlashOverlay";
import TVHeader from "@/components/tv/TVHeader";
import TVKursBar from "@/components/tv/TVKursBar";
import TVInfoTicker from "@/components/tv/TVInfoTicker";
import TVQueueTypeStats from "@/components/tv/TVQueueTypeStats";
import TVCountersPanel from "@/components/tv/TVCountersPanel";
import TVWaitingQueue from "@/components/tv/TVWaitingQueue";
import TVFooter from "@/components/tv/TVFooter";

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

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setKurs((prev) => {
        const next = {};
        Object.entries(prev).forEach(([currency, value]) => {
          const delta = (Math.random() - 0.48) * (currency === "JPY" ? 0.3 : currency === "MYR" ? 3 : 8);
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-gray-900 font-sans flex flex-col overflow-hidden">
      <TVFlashOverlay flash={flash} onClose={clearFlash} />
      <TVHeader time={time} kurs={kurs} />
      <TVKursBar kurs={kurs} time={time} />
      <TVInfoTicker />
      <TVQueueTypeStats queueTypeStats={state.queue_type_stats} totalWaiting={state.waiting.length} />
      <div className="grid flex-1 min-h-0" style={{ gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <TVCountersPanel counters={state.counters} predictions={state.service_predictions} />
        <TVWaitingQueue waiting={state.waiting} />
      </div>
      <TVFooter time={time} />
    </div>
  );
}
