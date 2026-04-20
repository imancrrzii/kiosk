import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  faCreditCard,
  faArrowLeft,
  faChevronRight,
  faSpinner,
  faQrcode,
  faLandmark,
  faFileInvoiceDollar,
  faHashtag,
  faBarcode,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import MethodCard from "@/components/kiosk/MethodCard";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import PredictionBox from "@/components/kiosk/PredictionBox";
import ErrorBox from "@/components/kiosk/ErrorBox";
import KioskResult from "@/components/kiosk/KioskResult";
import KioskQRIS from "@/components/kiosk/KioskQRIS";
import { PAYMENT_CATEGORIES } from "@/constant/queueTypes";

export default function KioskPayment() {
  const navigate = useNavigate();
  const { tellerService, servicePreds, waitCount, result, err, isTakingQueue, handleTakeQueue, reset } = useOutletContext();

  const [step, setStep] = useState("method-selection");
  const [qrisAmount, setQrisAmount] = useState(0);

  const paymentForm = useForm({
    defaultValues: {
      payment_category: "",
      customer_number: "",
      biller_code: "",
      amount: "",
    },
  });

  if (result) {
    return <KioskResult result={result} onBack={reset} />;
  }

  if (step === "qris-display") {
    return <KioskQRIS amount={qrisAmount} onBack={() => navigate("/kiosk")} />;
  }

  if (step === "method-selection") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="clean"
            size="medium"
            onClick={() => navigate("/kiosk")}
            className="mb-4"
          />

          <p className="text-center text-slate-600 text-sm mb-4">Pilih metode pembayaran</p>

          <div className="space-y-3">
            <MethodCard
              Icon={faQrcode}
              title="Bayar via QRIS"
              desc="Scan QR, bayar langsung dari aplikasi e-wallet"
              color="sky"
              badge="Tanpa antre"
              onClick={() => setStep("qris-form")}
            />
            <MethodCard
              Icon={faLandmark}
              title="Bayar di Teller"
              desc="Ambil nomor antrian, bayar tunai atau transfer"
              color="sky"
              badge={tellerService ? `${waitCount(tellerService.id)} menunggu` : ""}
              onClick={() => setStep("teller-form")}
            />
            <PredictionBox pred={tellerService ? servicePreds[tellerService.id] : null} serviceLabel="Teller" color="sky" />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  if (step === "qris-form") {
    const onSubmit = (data) => {
      setQrisAmount(Number(data.amount));
      setStep("qris-display");
    };

    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="clean"
            size="medium"
            onClick={() => setStep("method-selection")}
            className="mb-4"
          />

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faQrcode} className="text-sky-600" size="lg" />
              </div>
              <div>
                <div className="font-black text-slate-900">Pembayaran via QRIS</div>
                <div className="text-xs text-slate-500">Isi detail tagihan</div>
              </div>
            </div>

            {err && <ErrorBox msg={err} />}

            <form onSubmit={paymentForm.handleSubmit(onSubmit)} className="space-y-3">
              <Controller
                name="payment_category"
                control={paymentForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Kategori Pembayaran *"
                    value={field.value}
                    onChange={field.onChange}
                    options={PAYMENT_CATEGORIES.map((c) => ({ value: c, label: c }))}
                    leftIcon={faFileInvoiceDollar}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="customer_number"
                control={paymentForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Nomor Pelanggan *"
                    placeholder="ID Pelanggan / No. Rekening"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faHashtag}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="amount"
                control={paymentForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Jumlah (Rp) *"
                    placeholder="0"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faMoneyBill}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Button
                type="submit"
                label="Tampilkan QRIS"
                rightIcon={faQrcode}
                variant="primary"
                size="large"
                className="w-full mt-5"
              />
            </form>
          </div>
        </div>
      </KioskWrapper>
    );
  }

  if (step === "teller-form") {
    const onSubmit = (data) => {
      if (!tellerService) return;
      handleTakeQueue(tellerService.id, "PAYMENT", data);
    };

    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="clean"
            size="medium"
            onClick={() => setStep("method-selection")}
            className="mb-4"
          />

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faCreditCard} className="text-sky-600" size="lg" />
              </div>
              <div>
                <div className="font-black text-slate-900">Pembayaran — Teller</div>
                <div className="text-xs text-slate-500">Isi detail tagihan (opsional)</div>
              </div>
            </div>

            {err && <ErrorBox msg={err} />}

            <form onSubmit={paymentForm.handleSubmit(onSubmit)} className="space-y-3">
              <Controller
                name="payment_category"
                control={paymentForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Kategori Pembayaran *"
                    value={field.value}
                    onChange={field.onChange}
                    options={PAYMENT_CATEGORIES.map((c) => ({ value: c, label: c }))}
                    leftIcon={faFileInvoiceDollar}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="customer_number"
                control={paymentForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Nomor Pelanggan *"
                    placeholder="ID Pelanggan / No. Rekening"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faHashtag}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="biller_code"
                control={paymentForm.control}
                render={({ field }) => (
                  <InputField
                    label="Kode Biller"
                    placeholder="Opsional"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faBarcode}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="amount"
                control={paymentForm.control}
                render={({ field }) => (
                  <InputField
                    label="Jumlah (Rp)"
                    placeholder="0"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faMoneyBill}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Button
                type="submit"
                label={isTakingQueue ? "Mengambil nomor…" : "Ambil Nomor Antrian Teller"}
                leftIcon={isTakingQueue ? faSpinner : null}
                rightIcon={isTakingQueue ? null : faChevronRight}
                variant="primary"
                size="large"
                disabled={isTakingQueue}
                className={`w-full mt-5 ${isTakingQueue ? "animate-pulse" : ""}`}
              />
            </form>
          </div>
        </div>
      </KioskWrapper>
    );
  }

  return null;
}
