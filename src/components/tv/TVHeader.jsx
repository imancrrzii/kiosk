import { faBolt, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function TVHeader({ time, kurs }) {
  const kursFlags = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    SGD: "🇸🇬",
    JPY: "🇯🇵",
    MYR: "🇲🇾",
    AUD: "🇦🇺",
  };

  return (
    <div
      className="flex items-center justify-between px-8 py-3"
      style={{
        background: "#0a1628",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}
        >
            <FontAwesomeIcon icon={faLandmark} className="text-white" size="lg" />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] text-blue-400 uppercase font-bold">
            Bank
          </div>
          <div className="text-xl font-black tracking-tight text-white leading-tight">
            Sistem Antrian Digital
          </div>
        </div>
        <div
          className="ml-3 flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
          }}
        >
            <FontAwesomeIcon icon={faBolt} className="text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
            AI Aktif
          </span>
        </div>
      </div>

      {/* Right: Kurs & Time */}
      <div className="flex items-center gap-6">
        {/* Mini Kurs Display */}
        <div className="hidden xl:flex items-center gap-4">
          {Object.entries(kurs)
            .slice(0, 4)
            .map(([cur, { rate, chg }]) => (
              <div key={cur} className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-600 font-bold tracking-wider">
                  {kursFlags[cur]}
                </span>
                <span className="text-[10px] font-bold text-slate-500">{cur}</span>
                <span className="text-[11px] font-black text-slate-300">
                  {rate.toLocaleString("id-ID")}
                </span>
                <span
                  className={`text-[9px] font-bold ${
                    chg >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {chg >= 0 ? "▲" : "▼"}
                  {Math.abs(chg)}%
                </span>
              </div>
            ))}
        </div>

        <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.06)" }} />

        {/* Clock */}
        <div className="text-right">
          <div
            className="text-5xl font-black tabular-nums text-blue-400 leading-none"
            style={{ letterSpacing: "-1px" }}
          >
            {time.toLocaleTimeString("id-ID")}
          </div>
          <div className="text-[10px] text-slate-600 mt-1">
            {time.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}