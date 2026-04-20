import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { faArrowLeft, faChevronRight, faSpinner, faCircleInfo, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import ErrorBox from "@/components/kiosk/ErrorBox";
import KioskResult from "@/components/kiosk/KioskResult";

export default function KioskQueue() {
  const navigate = useNavigate();
  const { services, servicePreds, waiting, waitCount, result, err, isTakingQueue, handleTakeQueue, reset } = useOutletContext();

  const [selectedService, setSelectedService] = useState(null);

  const generalForm = useForm({
    defaultValues: {
      purpose: "",
      description: "",
    },
  });

  const getPurposeOptions = () => {
    if (!selectedService) return [];

    const serviceType = selectedService?.code || selectedService?.name?.toLowerCase() || "";

    if (serviceType.includes("teller") || serviceType.includes("TELLER")) {
      return [
        { value: "Tabungan", label: "Setor/Tarik Tabungan" },
        { value: "Giro", label: "Setor/Tarik Giro" },
        { value: "Deposito", label: "Pembukaan/Pencairan Deposito" },
        { value: "Transfer", label: "Transfer Antar Bank" },
        { value: "Kliring", label: "Kliring/Inkaso" },
        { value: "Pembayaran", label: "Pembayaran Tagihan" },
        { value: "Lainnya", label: "Lainnya" },
      ];
    }

    if (serviceType.includes("cs") || serviceType.includes("customer") || serviceType.includes("service")) {
      return [
        { value: "Tabungan", label: "Pembukaan Rekening Tabungan" },
        { value: "Giro", label: "Pembukaan Rekening Giro" },
        { value: "Deposito", label: "Konsultasi Deposito" },
        { value: "Kartu", label: "Kartu ATM/Debit/Kredit" },
        { value: "Kredit", label: "Pengajuan Kredit/Pinjaman" },
        { value: "Komplain", label: "Komplain/Kendala Rekening" },
        { value: "Informasi", label: "Informasi Produk & Layanan" },
        { value: "Lainnya", label: "Lainnya" },
      ];
    }

    return [
      { value: "Tabungan", label: "Tabungan" },
      { value: "Giro", label: "Giro" },
      { value: "Deposito", label: "Deposito" },
    ];
  };

  const onSubmit = (data) => {
    if (!selectedService) return;
    handleTakeQueue(selectedService.id, "GENERAL", data);
  };

  const formatPred = (mins) => {
    if (mins == null) return "Memuat…";
    if (mins === 0) return "Langsung dilayani";
    if (mins >= 60) return `~${Math.floor(mins / 60)}j ${Math.round(mins % 60)}m`;
    return `~${mins} menit`;
  };

  if (result) {
    return <KioskResult result={result} onBack={reset} />;
  }

  if (selectedService) {
    const purposeOptions = getPurposeOptions();

    return (
      <KioskWrapper>
        <div className="w-full max-w-7xl">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="primary"
            size="medium"
            onClick={() => setSelectedService(null)}
            className="mb-4"
          />

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCircleInfo} className="text-sky-600" size="lg" />
              </div>
              <div>
                <div className="font-black text-slate-900">Layanan Umum</div>
                <div className="text-xs text-slate-500">{selectedService?.name}</div>
              </div>
            </div>

            {err && <ErrorBox msg={err} />}

            <form onSubmit={generalForm.handleSubmit(onSubmit)} className="space-y-3">
              <Controller
                name="purpose"
                control={generalForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Keperluan"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faCircleInfo}
                    options={purposeOptions}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Button
                type="submit"
                label={isTakingQueue ? "Mengambil nomor…" : "Ambil Nomor Antrian"}
                leftIcon={isTakingQueue ? faSpinner : null}
                rightIcon={isTakingQueue ? null : faChevronRight}
                variant="primary"
                size="medium"
                disabled={isTakingQueue}
                className={`w-full mt-5 ${isTakingQueue ? "animate-pulse" : ""}`}
              />
            </form>
          </div>
        </div>
      </KioskWrapper>
    );
  }

  return (
    <KioskWrapper>
      <div className="w-full max-w-7xl">
        <Button
          label="Kembali"
          leftIcon={faArrowLeft}
          variant="primary"
          size="medium"
          onClick={() => navigate("/kiosk")}
          className="mb-4"
        />

        <div className="flex flex-col md:flex-row items-center gap-2">
          {services?.map((s) => {
            const isTeller = s.name === "TELLER";
            const count = waitCount(s.id);
            const pred = servicePreds[s.id];

            return (
              <button
                key={s.id}
                onClick={() => setSelectedService(s)}
                className={`w-full rounded-3xl border p-5 text-left cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${
                  isTeller
                    ? "bg-white border-sky-200 hover:border-sky-400 hover:bg-sky-100"
                    : "bg-sky-50 border-sky-200 hover:border-sky-400 hover:bg-sky-100"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs tracking-[0.3em] uppercase mb-1 font-bold text-sky-600">
                      Seri {s.prefix} · {s.name}
                    </div>
                    <div className="text-xl font-black text-slate-900">{isTeller ? "Teller" : "Customer Service"}</div>
                    <div className="text-sm text-slate-500 mt-1">
                      {isTeller ? "Setor · Tarik · Transfer" : "Pembukaan Rekening · Informasi"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-sky-600">{count}</div>
                    <div className="text-xs text-slate-500">menunggu</div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-full px-3 py-2 mt-1 bg-sky-50 border border-sky-200">
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faRobot} className="text-slate-500" size="xs" />
                    <span className="text-xs text-slate-600">Estimasi tunggu</span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${pred?.estimated_wait_minutes === 0 ? "text-sky-600" : "text-sky-700"}`}
                  >
                    {pred == null ? "Memuat…" : formatPred(pred.estimated_wait_minutes)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </KioskWrapper>
  );
}
