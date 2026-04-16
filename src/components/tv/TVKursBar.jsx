import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TVKursBar({ kurs, time }) {
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
      className="flex items-center gap-0 px-8"
      style={{
        background: "#07111f",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        height: 40,
      }}
    >
      <div className="flex items-center gap-1.5 mr-5">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-400" />
        <span className="text-[9px] font-bold tracking-[3px] uppercase text-slate-600">
          Kurs
        </span>
      </div>

      <div className="flex items-center gap-5 overflow-hidden flex-1">
        {Object.entries(kurs).map(([cur, { rate, chg }], i) => (
          <div key={cur} className="flex items-center gap-2 shrink-0">
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            )}
            <span className="text-[11px]">{kursFlags[cur]}</span>
            <span className="text-[10px] font-bold text-slate-600 tracking-wider">
              {cur}/IDR
            </span>
            <span className="text-[12px] font-black text-slate-300">
              {rate.toLocaleString("id-ID")}
            </span>
            <span
              className={`text-[10px] font-bold flex items-center gap-0.5 ${
                chg >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {chg >= 0 ? "▲" : "▼"} {Math.abs(chg)}%
            </span>
          </div>
        ))}
      </div>

      <span className="text-[9px] text-slate-700 shrink-0">
        Update {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}{" "}
        WIB
      </span>
    </div>
  );
}