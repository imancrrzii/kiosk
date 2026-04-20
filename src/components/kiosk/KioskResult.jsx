import {
  faArrowLeft,
  faCircleCheck,
  faUsers,
  faCircleInfo,
  faRobot,
  faClockFour,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import Button from "@/components/ui/Button";
import { QueueTypeBadge } from "@/components/ui/QueueTypeBadge";

export default function KioskResult({ result, onBack }) {
  if (!result) return null;

  return (
    <KioskWrapper>
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-sm overflow-hidden"
        style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {result.queue_type && (
          <div className="bg-white py-6">
            <div className="flex justify-center">
              <QueueTypeBadge queueType={result.queue_type} />
            </div>
          </div>
        )}

        <div className="pb-4 px-8 text-center">
          <div className="mb-8">
            <div className="text-[11px] tracking-[0.35em] uppercase text-slate-400 font-semibold mb-1">
              Nomor Antrian Anda
            </div>
            <div
              className="text-[7rem] tracking-tighter font-black leading-none bg-gradient-to-br from-sky-600 via-blue-400 to-sky-600 bg-clip-text text-transparent py-3"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {result.queue_number}
            </div>
            <div className="h-1 w-24 mx-auto mt-3 bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-full opacity-40"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div
              className={`w-full sm:w-1/2 rounded-3xl p-6 mb-3 border transition-all ${
                result.counter_name
                  ? "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-sm"
                  : "bg-gradient-to-br from-sky-50 to-sky-50 border-sky-200 shadow-sm"
              }`}
            >
              {result.counter_name ? (
                <>
                  <div className="flex flex-col items-center justify-center gap-2 text-[11px] text-rose-600 tracking-[0.25em] uppercase mb-3 font-semibold">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-sm" />
                    Silakan Menuju
                  </div>
                  <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                    {result.counter_name}
                  </div>
                  <div className="text-xs text-rose-600 font-medium">Petugas siap melayani Anda</div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center gap-2 text-[11px] text-sky-600 tracking-[0.25em] uppercase mb-3 font-semibold">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-sm text-white" />
                    </div>
                    Posisi Antrian
                  </div>
                  <div className="text-6xl font-black text-sky-600 tracking-tight mb-2">
                    #{result.position}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200">
                    <FontAwesomeIcon icon={faCircleInfo} className="text-sky-500" />
                    <span>Nomor meja akan tampil di layar TV</span>
                  </div>
                </>
              )}
            </div>

            {result.prediction && (
              <div className="w-full sm:w-1/2 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 p-6 mb-3 shadow-sm">
                <div className="flex flex-col items-center justify-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                    <FontAwesomeIcon icon={faRobot} className="text-white text-sm" />
                  </div>
                  <span className="text-xs text-sky-600 font-bold uppercase tracking-[0.2em]">
                    Prediksi AI Waktu Tunggu
                  </span>
                </div>

                <div className="mb-2">
                  {result.prediction.estimated_wait_minutes === 0 ? (
                    <div className="text-5xl font-black text-sky-600 leading-none tracking-tight">
                      Segera Dipanggil
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-6xl font-black text-sky-600 leading-none tracking-tight">
                        {result.prediction.estimated_wait_minutes}
                      </span>
                      <span className="text-lg font-semibold text-slate-500">menit</span>
                    </div>
                  )}
                </div>

                {result.prediction.estimated_wait_minutes > 0 && (
                  <div className="text-xs text-slate-600 bg-white/50 inline-block px-3 py-1.5 rounded-full border border-slate-200">
                    <FontAwesomeIcon icon={faClockFour} className="text-sky-500 me-1" /> Diperkirakan
                    dipanggil sekitar{" "}
                    <span className="text-sky-700 font-bold">
                      {result.prediction.estimated_call_time}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            label="Kembali ke Menu Utama"
            leftIcon={faArrowLeft}
            variant="primary"
            size="medium"
            onClick={onBack}
            className="w-full"
          />
        </div>
      </div>
    </KioskWrapper>
  );
}