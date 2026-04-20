import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faMoneyBill,
  faPhoneVolume,
  faTag,
  faHashtag,
  faMobileScreen,
  faFileLines,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { QueueTypeBadge } from "../ui/QueueTypeBadge";

export function QueueDetailModal({ isOpen, onClose, queue }) {
  if (!isOpen || !queue) return null;

  const detail = queue.detail || {};
  const queueType = queue.queue_type;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-40 animate-fadeIn" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full pointer-events-auto transform animate-slideUp border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 rounded-t-3xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="text-base font-bold text-gray-700">Detail Antrian</h3>
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                  {queue.queue_number}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-white/80 border border-gray-200 flex items-center justify-center transition-all hover:shadow-md"
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {queueType && (
              <div>
                <QueueTypeBadge queueType={queueType} />
              </div>
            )}
            {Object.keys(detail).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <FontAwesomeIcon icon={faInfoCircle} size="2x" className="text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Tidak ada detail tambahan</p>
                <p className="text-xs text-gray-500">Informasi lengkap tidak tersedia</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queueType === "ACCOUNT_REG" && (
                  <>
                    {detail.customer_name && (
                      <DetailRow icon={faUser} label="Nama Pelanggan" value={detail.customer_name} highlight />
                    )}
                    {detail.account_type && (
                      <DetailRow icon={faMoneyBill} label="Jenis Rekening" value={detail.account_type} />
                    )}
                    {detail.phone && <DetailRow icon={faPhoneVolume} label="Telepon" value={detail.phone} />}
                    {detail.email && <DetailRow icon={faEnvelope} label="Email" value={detail.email} />}
                    {detail.id_type && detail.id_number && (
                      <DetailRow icon={faHashtag} label="Identitas" value={`${detail.id_type}: ${detail.id_number}`} />
                    )}
                    {detail.notes && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-4 shadow-sm">
                        <div className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-2">
                          <span><FontAwesomeIcon icon={faComment} size="xs" /></span>
                          Catatan
                        </div>
                        <div className="text-sm text-amber-900 leading-relaxed italic">"{detail.notes}"</div>
                      </div>
                    )}
                  </>
                )}

                {queueType === "PAYMENT" && (
                  <>
                    {detail.payment_category && (
                      <DetailRow icon={faTag} label="Kategori Pembayaran" value={detail.payment_category} highlight />
                    )}
                    {detail.customer_number && (
                      <DetailRow icon={faHashtag} label="Nomor Pelanggan" value={detail.customer_number} />
                    )}
                    {detail.amount && (
                      <DetailRow
                        icon={faMoneyBill}
                        label="Jumlah"
                        value={`Rp ${Number(detail.amount).toLocaleString("id-ID")}`}
                        highlight
                      />
                    )}
                  </>
                )}

                {queueType === "TOPUP" && (
                  <>
                    {detail.emoney_type && (
                      <DetailRow icon={faMobileScreen} label="Jenis E-Money" value={detail.emoney_type} highlight />
                    )}
                    {detail.amount && (
                      <DetailRow
                        icon={faMoneyBill}
                        label="Nominal"
                        value={`Rp ${Number(detail.amount).toLocaleString("id-ID")}`}
                        highlight
                      />
                    )}
                    {detail.customer_number && (
                      <DetailRow icon={faHashtag} label="Nomor Pelanggan" value={detail.customer_number} />
                    )}
                  </>
                )}

                {queueType === "GENERAL" && (
                  <>
                    {detail.purpose && <DetailRow icon={faFileLines} label="Keperluan" value={detail.purpose} highlight />}
                    {detail.description && (
                      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-l-4 border-sky-400 rounded-xl p-4 shadow-sm">
                        <div className="text-xs font-bold text-sky-700 mb-2 flex items-center gap-2">
                          <span><FontAwesomeIcon icon={faFileLines} size="xs" /></span>
                          Deskripsi
                        </div>
                        <div className="text-sm text-sky-900 leading-relaxed italic">"{detail.description}"</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="px-8 py-5 border-t border-gray-100 flex justify-end bg-gray-50 rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold rounded-xl transition-all shadow-sm hover:shadow-md border border-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper component for detail rows
function DetailRow({ icon, label, value, highlight = false }) {
  return (
    <div className="flex items-start gap-4 py-3 px-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        {typeof icon === "string" ? (
          <span className="text-lg">{icon}</span>
        ) : (
          <FontAwesomeIcon icon={icon} className="text-sky-600" size="sm" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</div>
        <div className={`text-sm leading-relaxed ${highlight ? "font-bold text-gray-900" : "text-gray-700"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}