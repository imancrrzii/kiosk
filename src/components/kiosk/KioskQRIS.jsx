import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import Button from "@/components/ui/Button";

export default function KioskQRIS({ amount, onBack }) {
  return (
    <KioskWrapper>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
          <div className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-2">
            Scan untuk membayar
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">
            Rp {amount.toLocaleString("id-ID")}
          </div>

          <div className="my-6 flex items-center justify-center">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 w-52 h-52 flex items-center justify-center">
              <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white" />
                <path d="M10 10 h10 v10 h-10 z M30 10 h10 v10 h-10 z M50 10 h10 v10 h-10 z" fill="black" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
            <span className="w-2 h-2 bg-rose-500 rounded-full inline-block animate-pulse"></span>
            Menunggu pembayaran…
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 mb-4">
            Buka aplikasi GoPay, OVO, DANA, atau e-wallet lainnya · Pilih Scan QR · Konfirmasi pembayaran
          </div>

          <Button
            label="Kembali ke Menu Utama"
            leftIcon={faArrowLeft}
            variant="outline"
            size="large"
            onClick={onBack}
            className="w-full"
          />
        </div>
      </div>
    </KioskWrapper>
  );
}