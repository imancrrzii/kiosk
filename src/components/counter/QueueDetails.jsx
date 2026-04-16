import { faFileLines, faHashtag, faMobileScreen, faMoneyBill, faPhoneVolume, faTag, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function QueueDetails({ queueType, detail }) {
  if (!detail || Object.keys(detail).length === 0) return null;

  return (
    <div className="space-y-1.5 mb-2">
      {/* ACCOUNT_REG Details */}
      {queueType === "ACCOUNT_REG" && (
        <>
          {detail.customer_name && (
            <div className="text-xs text-gray-700 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faUser} size="xs" className="text-gray-400" />
              <span className="font-semibold">{detail.customer_name}</span>
            </div>
          )}
          {detail.account_type && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faMoneyBill} size="xs" className="text-gray-400" />
              {detail.account_type}
            </div>
          )}
          {detail.phone && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faPhoneVolume} size="xs" className="text-gray-400" />
              {detail.phone}
            </div>
          )}
          {detail.email && <div className="text-xs text-gray-600 flex items-center gap-1.5 truncate">📧 {detail.email}</div>}
          {detail.id_type && detail.id_number && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              🆔 {detail.id_type}: {detail.id_number}
            </div>
          )}
          {detail.notes && <div className="text-xs text-gray-500 italic mt-1">"{detail.notes}"</div>}
        </>
      )}

      {/* PAYMENT Details */}
      {queueType === "PAYMENT" && (
        <>
          {detail.payment_category && (
            <div className="text-xs text-gray-700 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faTag} size="xs" className="text-gray-400" />
              <span className="font-semibold">{detail.payment_category}</span>
            </div>
          )}
          {detail.customer_number && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faHashtag} size="xs" className="text-gray-400" />
              {detail.customer_number}
            </div>
          )}
          {detail.amount && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              💰 Rp {Number(detail.amount).toLocaleString("id-ID")}
            </div>
          )}
        </>
      )}

      {/* TOPUP Details */}
      {queueType === "TOPUP" && (
        <>
          {detail.emoney_type && (
            <div className="text-xs text-gray-700 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faMobileScreen} size="xs" className="text-gray-400" />
              <span className="font-semibold">{detail.emoney_type}</span>
            </div>
          )}
          {detail.amount && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              💰 Rp {Number(detail.amount).toLocaleString("id-ID")}
            </div>
          )}
          {detail.customer_number && (
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faHashtag} size="xs" className="text-gray-400" />
              {detail.customer_number}
            </div>
          )}
        </>
      )}

      {/* GENERAL Details */}
      {queueType === "GENERAL" && (
        <>
          {detail.purpose && (
            <div className="text-xs text-gray-700 flex items-center gap-1.5">
              <FontAwesomeIcon icon={faFileLines} size="xs" className="text-gray-400" />
              <span className="font-semibold">{detail.purpose}</span>
            </div>
          )}
          {detail.description && <div className="text-xs text-gray-500 italic">"{detail.description}"</div>}
        </>
      )}
    </div>
  );
}