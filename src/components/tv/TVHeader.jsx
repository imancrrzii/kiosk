import { faLandmark } from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex items-center justify-between px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-white to-sky-100">
          <FontAwesomeIcon icon={faLandmark} className="text-sky-600" size="lg" />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.4em] text-sky-100 uppercase font-bold">Bank</div>
          <div className="text-xl font-black tracking-tight text-white leading-tight">Sistem Antrian Digital</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-4">
          {Object.entries(kurs)
            .slice(0, 4)
            .map(([cur, { rate, chg }]) => (
              <div key={cur} className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/80 font-bold tracking-wider">{kursFlags[cur]}</span>
                <span className="text-[10px] font-bold text-white/90">{cur}</span>
                <span className="text-[11px] font-black text-white">{rate.toLocaleString("id-ID")}</span>
                <span className={`text-[9px] font-bold ${chg >= 0 ? "text-green-300" : "text-red-300"}`}>
                  {chg >= 0 ? "▲" : "▼"}
                  {Math.abs(chg)}%
                </span>
              </div>
            ))}
        </div>

        <div style={{ width: 2, height: 36, background: "rgba(255, 255, 255, 0.3)" }} />

        <div className="text-right">
          <div
            className="text-4xl font-black tabular-nums text-white leading-none"
            style={{
              letterSpacing: "-1px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {time.toLocaleTimeString("id-ID")}
          </div>
          <div className="text-[10px] text-sky-100 mt-1 font-medium">
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
