import { faCircleCheck, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueueCard } from "./QueueCard";

export function QueueSidebar({ waiting }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 p-6 h-fit max-h-[calc(100vh-120px)] overflow-y-auto sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-blue-500 via-sky-500 to-indigo-500" />
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faLayerGroup} className="text-sky-600" size="sm" />
            Antrian Menunggu
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Daftar antrian aktif</div>
        </div>
        <div className="w-6 h-6   p-4 flex items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 border border-blue-400 shadow-sm">
          <span className="text-sm font-bold text-white">{waiting.length}</span>
        </div>
      </div>

      {/* Content */}
      {waiting.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <FontAwesomeIcon icon={faCircleCheck} className="text-sky-300" size="2x" />
          </div>
          <div className="text-sm font-semibold text-gray-800 mb-1">Tidak ada antrian</div>
          <div className="text-xs text-gray-500">Semua antrian telah selesai</div>
        </div>
      ) : (
        <div className="space-y-3">
          {waiting.map((q, i) => (
            <QueueCard key={q.id} queue={q} isNext={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}