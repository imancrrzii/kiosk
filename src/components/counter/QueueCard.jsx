import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { QueueTypeBadge } from "../ui/QueueTypeBadge";
import { QueueDetails } from "./QueueDetails";

export function QueueCard({ queue: q, isNext }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 transition-all ${
        isNext ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className={`font-black text-lg ${isNext ? "text-sky-600" : "text-gray-800"}`}>{q.queue_number}</div>
          {isNext && (
            <div className="text-xs text-sky-400 font-semibold flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} size="xs" />
              Berikutnya
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
            <FontAwesomeIcon icon={faClock} size="xs" />
            {q.wait_minutes != null ? `${q.wait_minutes}m` : "—"}
          </div>
        </div>
      </div>

      {/* Queue Type Badge */}
      {q.queue_type && (
        <div className="mb-2">
          <QueueTypeBadge queueType={q.queue_type} />
        </div>
      )}

      {/* Details */}
      {q.detail && Object.keys(q.detail).length > 0 && <QueueDetails queueType={q.queue_type} detail={q.detail} />}

      {/* Prediction */}
      {q.prediction && (
        <div className="pt-2 border-t border-gray-200 space-y-1">
          <div className="text-[10px] text-gray-500 flex items-center justify-between">
            <span>Posisi: #{q.prediction.position}</span>
            <span>Est: ~{Math.round(q.prediction.estimated_wait_minutes)}m</span>
          </div>
          {q.prediction.estimated_call_time && (
            <div className="text-[10px] text-gray-500 flex items-center gap-1">
              🕐 Perkiraan dipanggil: {q.prediction.estimated_call_time}
            </div>
          )}
        </div>
      )}
    </div>
  );
}