import { faFileLines, faHashtag, faMobileScreen, faMoneyBill, faPhoneVolume, faTag, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function QueueDetails({ queueType, detail }) {
  if (!detail || Object.keys(detail).length === 0) return null;

  return (
    <div className="space-y-2 mb-3">
      {queueType === "ACCOUNT_REG" && (
        <>
          {detail.customer_name && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100">
              <FontAwesomeIcon icon={faUser} size="xs" className="text-sky-600" />
              <span className="text-xs font-semibold text-sky-900">{detail.customer_name}</span>
            </div>
          )}
          {detail.account_type && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 ml-2">
              <FontAwesomeIcon icon={faMoneyBill} size="xs" className="text-emerald-600" />
              <span className="text-xs text-emerald-800">{detail.account_type}</span>
            </div>
          )}
          {detail.phone && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 w-fit">
              <FontAwesomeIcon icon={faPhoneVolume} size="xs" className="text-indigo-600" />
              <span className="text-xs text-indigo-800">{detail.phone}</span>
            </div>
          )}
          {detail.email && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 w-fit truncate">
              <span className="text-xs">📧</span>
              <span className="text-xs text-sky-800 truncate">{detail.email}</span>
            </div>
          )}
          {detail.id_type && detail.id_number && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 w-fit">
              <span className="text-xs">🆔</span>
              <span className="text-xs text-amber-800">{detail.id_type}: {detail.id_number}</span>
            </div>
          )}
          {detail.notes && (
            <div className="px-3 py-2 rounded-lg bg-orange-50 border border-orange-100">
              <span className="text-xs text-orange-800 italic">"{detail.notes}"</span>
            </div>
          )}
        </>
      )}

      {queueType === "PAYMENT" && (
        <>
          {detail.payment_category && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100">
              <FontAwesomeIcon icon={faTag} size="xs" className="text-sky-600" />
              <span className="text-xs font-semibold text-sky-900">{detail.payment_category}</span>
            </div>
          )}
          {detail.customer_number && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 ml-2">
              <FontAwesomeIcon icon={faHashtag} size="xs" className="text-indigo-600" />
              <span className="text-xs text-indigo-800">{detail.customer_number}</span>
            </div>
          )}
          {detail.amount && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 w-fit">
              <span className="text-xs">💰</span>
              <span className="text-xs font-bold text-emerald-800">Rp {Number(detail.amount).toLocaleString("id-ID")}</span>
            </div>
          )}
        </>
      )}

      {queueType === "TOPUP" && (
        <>
          {detail.emoney_type && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100">
              <FontAwesomeIcon icon={faMobileScreen} size="xs" className="text-sky-600" />
              <span className="text-xs font-semibold text-sky-900">{detail.emoney_type}</span>
            </div>
          )}
          {detail.amount && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 w-fit">
              <span className="text-xs">💰</span>
              <span className="text-xs font-bold text-emerald-800">Rp {Number(detail.amount).toLocaleString("id-ID")}</span>
            </div>
          )}
          {detail.customer_number && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 ml-2">
              <FontAwesomeIcon icon={faHashtag} size="xs" className="text-indigo-600" />
              <span className="text-xs text-indigo-800">{detail.customer_number}</span>
            </div>
          )}
        </>
      )}

      {queueType === "GENERAL" && (
        <>
          {detail.purpose && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-100">
              <FontAwesomeIcon icon={faFileLines} size="xs" className="text-sky-600" />
              <span className="text-xs font-semibold text-sky-900">{detail.purpose}</span>
            </div>
          )}
          {detail.description && (
            <div className="px-3 py-2 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-xs text-sky-800 italic">"{detail.description}"</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}