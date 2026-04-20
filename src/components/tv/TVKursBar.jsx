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
    <div className="flex items-center gap-0 px-8 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-200 h-10">
      <div className="flex items-center gap-5 overflow-hidden flex-1">
        {Object.entries(kurs).map(([cur, { rate, chg }], i) => (
          <div key={cur} className="flex items-center gap-2 shrink-0">
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: "#e0f2fe",
                }}
              />
            )}
            <span className="text-[11px]">{kursFlags[cur]}</span>
            <span className="text-[10px] font-bold text-sky-600 tracking-wider">{cur}/IDR</span>
            <span className="text-[12px] font-black text-gray-800">{rate.toLocaleString("id-ID")}</span>
            <span className={`text-[10px] font-bold flex items-center gap-0.5 ${chg >= 0 ? "text-green-600" : "text-red-600"}`}>
              {chg >= 0 ? "▲" : "▼"} {Math.abs(chg)}%
            </span>
          </div>
        ))}
      </div>

      <span className="text-[9px] text-gray-500 shrink-0">
        Update {time.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
      </span>
    </div>
  );
}
