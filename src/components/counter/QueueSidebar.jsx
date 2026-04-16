import { faCircleCheck, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueueCard } from "./QueueCard";

// Queue Sidebar Component
export function QueueSidebar({ waiting }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit max-h-[calc(100vh-120px)] overflow-y-auto sticky top-24">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faLayerGroup} size="sm" />
        Antrian Menunggu ({waiting.length})
      </div>
      {waiting.length === 0 ? (
        <div className="text-center text-gray-300 py-12">
          <FontAwesomeIcon icon={faCircleCheck} className="text-gray-200 mb-2" size="2x" />
          <div className="text-sm">Tidak ada antrian</div>
        </div>
      ) : (
        <div className="space-y-2">
          {waiting.map((q, i) => (
            <QueueCard key={q.id} queue={q} isNext={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}