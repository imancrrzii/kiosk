import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  faMobileScreen,
  faArrowLeft,
  faChevronRight,
  faSpinner,
  faQrcode,
  faLandmark,
  faWallet,
  faMoneyBill,
  faPhone,
  faCreditCard,
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
import { EMONEY_TYPES } from "@/constant/queueTypes";

export default function KioskTopUp() {
  const navigate = useNavigate();
  const { tellerService, servicePreds, waitCount, result, err, isTakingQueue, handleTakeQueue, reset } = useOutletContext();

  const [step, setStep] = useState("method-selection");
  const [qrisAmount, setQrisAmount] = useState(0);

  const topupForm = useForm({
    defaultValues: {
      emoney_type: "",
      amount: "",
      phone_number: "",
      card_number: "",
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

          <p className="text-center text-slate-600 text-sm mb-4">Pilih metode top up</p>

          <div className="space-y-3">
            <MethodCard
              Icon={faQrcode}
              title="Top Up via QRIS"
              desc="Scan QR, top up langsung dari aplikasi"
              color="sky"
              badge="Tanpa antre"
              onClick={() => setStep("qris-form")}
            />
            <MethodCard
              Icon={faLandmark}
              title="Top Up di Teller"
              desc="Ambil nomor antrian, top up tunai"
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
                <div className="font-black text-slate-900">Top Up via QRIS</div>
                <div className="text-xs text-slate-500">Isi detail top up</div>
              </div>
            </div>

            {err && <ErrorBox msg={err} />}

            <form onSubmit={topupForm.handleSubmit(onSubmit)} className="space-y-3">
              <Controller
                name="emoney_type"
                control={topupForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Jenis E-Money *"
                    value={field.value}
                    onChange={field.onChange}
                    options={EMONEY_TYPES.map((c) => ({
                      value: c,
                      label: c === "EMONEY_BCA" ? "e-Money BCA" : c,
                    }))}
                    leftIcon={faWallet}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="amount"
                control={topupForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Jumlah Top Up (Rp) *"
                    placeholder="50000"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faMoneyBill}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="phone_number"
                control={topupForm.control}
                render={({ field }) => (
                  <InputField
                    label="No. HP"
                    placeholder="08xx... (untuk GoPay/OVO/DANA/LinkAja)"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faPhone}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Button
                type="submit"
                label="Tampilkan QRIS"
                rightIcon={faQrcode}
                variant="sky"
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
      handleTakeQueue(tellerService.id, "TOPUP", {
        emoney_type: data.emoney_type,
        topup_amount: parseFloat(data.amount),
        phone_number: data.phone_number,
        card_number: data.card_number,
      });
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
                <FontAwesomeIcon icon={faMobileScreen} className="text-sky-600" size="lg" />
              </div>
              <div>
                <div className="font-black text-slate-900">Top Up — Teller</div>
                <div className="text-xs text-slate-500">Isi detail top up</div>
              </div>
            </div>

            {err && <ErrorBox msg={err} />}

            <form onSubmit={topupForm.handleSubmit(onSubmit)} className="space-y-3">
              <Controller
                name="emoney_type"
                control={topupForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Jenis E-Money *"
                    value={field.value}
                    onChange={field.onChange}
                    options={EMONEY_TYPES.map((c) => ({
                      value: c,
                      label: c === "EMONEY_BCA" ? "e-Money BCA" : c,
                    }))}
                    leftIcon={faWallet}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="amount"
                control={topupForm.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="Jumlah Top Up (Rp) *"
                    placeholder="50000"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faMoneyBill}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="phone_number"
                control={topupForm.control}
                render={({ field }) => (
                  <InputField
                    label="No. HP"
                    placeholder="08xx... (untuk GoPay/OVO/DANA/LinkAja)"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faPhone}
                    showRightIcon={false}
                    showHelperText={false}
                  />
                )}
              />

              <Controller
                name="card_number"
                control={topupForm.control}
                render={({ field }) => (
                  <InputField
                    label="No. Kartu"
                    placeholder="Untuk Flazz / e-Money BCA"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faCreditCard}
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
                variant="sky"
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
