import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { QueueTypeBadge } from "../ui/QueueTypeBadge";

export function QueueCard({ queue: q, isNext }) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 transition-all duration-300 ${
        isNext 
          ? "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border border-blue-200 shadow-lg shadow-blue-100/50" 
          : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className={`font-extrabold text-2xl tracking-tight ${isNext ? "text-sky-600" : "text-gray-800"}`}>
            {q.queue_number}
          </div>
          {isNext && (
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-orange-100 border border-orange-200">
              <FontAwesomeIcon icon={faStar} className="text-orange-500" size="xs" />
              <span className="text-xs font-semibold text-orange-700">Berikutnya</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
            isNext ? "bg-blue-100 border border-blue-200" : "bg-gray-100 border border-gray-200"
          }`}>
            <FontAwesomeIcon icon={faClock} className={isNext ? "text-sky-600" : "text-gray-500"} size="xs" />
            <span className={`text-xs font-bold ${isNext ? "text-sky-700" : "text-gray-600"}`}>
              {q.wait_minutes != null ? `${q.wait_minutes}m` : "—"}
            </span>
          </div>
        </div>
      </div>

      {q.queue_type && (
        <div className="mb-3">
          <QueueTypeBadge queueType={q.queue_type} />
        </div>
      )}

      {q.prediction && (
        <div className={`pt-3 border-t space-y-2 ${isNext ? "border-blue-100" : "border-gray-100"}`}>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-200">
              <span className="text-[10px] font-medium text-sky-600">Posisi</span>
              <span className="text-xs font-bold text-sky-700">#{q.prediction.position}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 border border-green-200">
              <span className="text-[10px] font-medium text-green-600">Estimasi</span>
              <span className="text-xs font-bold text-green-700">~{q.prediction.estimated_wait_minutes}m</span>
            </div>
          </div>
          {q.prediction.estimated_call_time && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-200 border border-gray-300">
              <FontAwesomeIcon icon={faClock} className="text-gray-400" size="xs" />
              <span className="text-xs text-gray-600">Perkiraan:</span>
              <span className="text-xs font-semibold text-gray-800">{q.prediction.estimated_call_time}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}