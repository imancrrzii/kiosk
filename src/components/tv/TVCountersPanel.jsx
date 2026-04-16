// import TVCounterCard from "./TVCounterCard";
// import TVPredictionCard from "./TVPredictionCard";
import { formatPredictionDisplay } from "@/utils/helpers";
import TVCounterCard from "./TVCounterCard";
import TVPredictionCard from "./TVPredictionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function TVCountersPanel({ counters, predictions }) {
  const tellers = counters.filter((c) => c.service_name === "TELLER");
  const csItems = counters.filter((c) => c.service_name === "CS");
  const predTeller = predictions?.TELLER;
  const predCS = predictions?.CS;

  return (
    <div
      className="p-6 overflow-y-auto"
      style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-0.5 h-5 rounded-full bg-blue-500" />
        <div className="text-[10px] tracking-[3px] text-slate-600 uppercase font-bold">
          Sedang Dilayani
        </div>
      </div>

      {/* Teller Section */}
      {tellers.length > 0 && (
        <div className="mb-5">
          <div className="text-[9px] tracking-[3px] text-slate-700 uppercase mb-3 font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Teller — Seri A
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {tellers.map((counter) => (
              <TVCounterCard key={counter.id} counter={counter} color="blue" />
            ))}
          </div>
        </div>
      )}

      {/* Customer Service Section */}
      {csItems.length > 0 && (
        <div className="mb-5">
          <div className="text-[9px] tracking-[3px] text-slate-700 uppercase mb-3 font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Customer Service — Seri B
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {csItems.map((counter) => (
              <TVCounterCard key={counter.id} counter={counter} color="purple" />
            ))}
          </div>
        </div>
      )}

      {/* Predictions */}
      {(predTeller || predCS) && (
        <div
          className="rounded-2xl p-4 mt-2"
          style={{
            background: "rgba(6,182,212,0.04)",
            border: "1px solid rgba(6,182,212,0.15)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            {/* <Timer size={12} className="text-cyan-500" /> */}
            <FontAwesomeIcon icon={faClock} className="text-cyan-500" size="xs" />
            <span className="text-[9px] font-bold text-cyan-600 tracking-[3px] uppercase">
              Jika Daftar Sekarang
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {predTeller && (
              <TVPredictionCard
                pred={predTeller}
                label="Teller"
                color="blue"
                formatPredDisplay={formatPredictionDisplay}
              />
            )}
            {predCS && (
              <TVPredictionCard
                pred={predCS}
                label="Customer Service"
                color="purple"
                formatPredDisplay={formatPredictionDisplay}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}