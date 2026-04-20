import { faChartBar, faCircleCheck, faClock, faForward, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function StatsPanel({ stats }) {
  if (!stats) return null;

  const items = [
    {
      label: "Total Hari Ini",
      val: stats.total_today,
      color: "from-sky-500 to-blue-600",
      textColor: "text-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      icon: faHashtag,
    },
    {
      label: "Selesai",
      val: stats.done_today,
      color: "from-emerald-500 to-green-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: faCircleCheck,
    },
    {
      label: "Menunggu",
      val: stats.waiting,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: faClock,
    },
    {
      label: "Dilewati",
      val: stats.skipped_today,
      color: "from-rose-500 to-red-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      icon: faForward,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 p-7">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm">
          <FontAwesomeIcon icon={faChartBar} className="text-white" size="sm" />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-800">Statistik Hari Ini</div>
          <div className="text-xs text-gray-500">Ringkasan aktivitas counter</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((s) => (
          <div
            key={s.label}
            className={`${s.bgColor} border ${s.borderColor} rounded-2xl p-4 text-center transition-all hover:shadow-lg hover:scale-105`}
          >
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
            >
              <FontAwesomeIcon icon={s.icon} className="text-white" size="sm" />
            </div>
            <div className={`text-4xl font-black ${s.textColor} mb-2 tracking-tight`}>{s.val}</div>
            <div className="text-xs font-medium text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
