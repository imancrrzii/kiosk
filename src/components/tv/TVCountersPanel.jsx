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
    <div className="p-5 overflow-y-auto bg-white" style={{ borderRight: "1px solid #e0f2fe" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-sky-400 to-sky-600" />
        <div className="text-[10px] tracking-[3px] text-sky-700 uppercase font-bold">Sedang Dilayani</div>
      </div>

      {tellers.length > 0 && (
        <div className="mb-5">
          <div className="text-[9px] tracking-[3px] text-sky-600 uppercase mb-3 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            Teller — Seri A
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {tellers.map((counter) => (
              <TVCounterCard key={counter.id} counter={counter} color="sky" />
            ))}
          </div>
        </div>
      )}

      {csItems.length > 0 && (
        <div className="mb-5">
          <div className="text-[9px] tracking-[3px] text-sky-700 uppercase mb-3 font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-600" />
            Customer Service — Seri B
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
            {csItems.map((counter) => (
              <TVCounterCard key={counter.id} counter={counter} color="sky" />
            ))}
          </div>
        </div>
      )}

      {(predTeller || predCS) && (
        <div
          className="rounded-2xl p-4 mt-2"
          style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            border: "1px solid #7dd3fc",
            boxShadow: "0 4px 12px rgba(56, 189, 248, 0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon icon={faClock} className="text-sky-600" size="xs" />
            <span className="text-[9px] font-bold text-sky-700 tracking-[3px] uppercase">Jika Daftar Sekarang</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {predTeller && (
              <TVPredictionCard pred={predTeller} label="Teller" color="sky" formatPredDisplay={formatPredictionDisplay} />
            )}
            {predCS && (
              <TVPredictionCard pred={predCS} label="Customer Service" color="sky" formatPredDisplay={formatPredictionDisplay} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
