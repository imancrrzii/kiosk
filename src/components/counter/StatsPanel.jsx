import { faChartBar, faCircleCheck, faClock, faForward, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Stats Panel Component
export function StatsPanel({ stats }) {
  if (!stats) return null;

  const items = [
    {
      label: "Total Hari Ini",
      val: stats.total_today,
      color: "text-sky-600",
      icon: faHashtag,
    },
    {
      label: "Selesai",
      val: stats.done_today,
      color: "text-rose-600",
      icon: faCircleCheck,
    },
    {
      label: "Menunggu",
      val: stats.waiting,
      color: "text-orange-500",
      icon: faClock,
    },
    {
      label: "Dilewati",
      val: stats.skipped_today,
      color: "text-red-500",
      icon: faForward,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faChartBar} size="sm" />
        Statistik Hari Ini
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className={`flex justify-center mb-1 ${s.color}`}>
              <FontAwesomeIcon icon={s.icon} />
            </div>
            <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}