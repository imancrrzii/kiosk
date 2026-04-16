import { useState, useCallback, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCreditCard,
  faMobileScreen,
  faTicket,
  faArrowLeft,
  faChevronRight,
  faSpinner,
  faQrcode,
  faLandmark,
  faCircleInfo,
  faIdCard,
  faHashtag,
  faPhone,
  faEnvelope,
  faPiggyBank,
  faFileInvoiceDollar,
  faMoneyBill,
  faBarcode,
  faWallet,
  faRobot,
  faUsers,
  faClockFour,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useQueue } from "@/hooks/useQueue";
import { useNotification } from "@/hooks/useNotification";
import MainMenuCard from "@/components/kiosk/MainMenuCard";
import MethodCard from "@/components/kiosk/MethodCard";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import { QueueTypeBadge } from "@/components/ui/QueueTypeBadge";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import PredictionBox from "@/components/kiosk/PredictionBox";
import ErrorBox from "@/components/kiosk/ErrorBox";
import { EMONEY_TYPES, PAYMENT_CATEGORIES } from "@/constant/queueTypes";

export default function Kiosk() {
  const { services, takeQueue, isTakingQueue } = useQueue();
  const { show: showNotification } = useNotification();

  const [step, setStep] = useState("main-menu");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedMainFeature, setSelectedMainFeature] = useState(null);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [qrisAmount, setQrisAmount] = useState(0);

  // WebSocket state
  const [waiting, setWaiting] = useState([]);
  const [servicePreds, setServicePreds] = useState({});
  const rawPredsRef = useRef({});
  const servicesRef = useRef([]);

  const accountForm = useForm({
    defaultValues: {
      customer_name: "",
      id_type: "KTP",
      id_number: "",
      phone: "",
      email: "",
      account_type: "",
    },
  });

  const paymentForm = useForm({
    defaultValues: {
      payment_category: "",
      customer_number: "",
      biller_code: "",
      amount: "",
    },
  });

  const topupForm = useForm({
    defaultValues: {
      emoney_type: "",
      amount: "",
      phone_number: "",
      card_number: "",
    },
  });

  const generalForm = useForm({
    defaultValues: {
      purpose: "",
      description: "",
    },
  });

  useEffect(() => {
    if (services) {
      servicesRef.current = services;
      if (services.length > 0 && Object.keys(rawPredsRef.current).length > 0) {
        const mapped = {};
        Object.entries(rawPredsRef.current).forEach(([name, val]) => {
          const svc = services.find((s) => s.name === name);
          if (svc) mapped[svc.id] = val;
        });
        setServicePreds(mapped);
      }
    }
  }, [services]);

  const handleWebSocketMessage = useCallback((msg) => {
    if (msg.type !== "queue_update") return;

    setWaiting(msg.waiting || []);

    if (msg.service_predictions) {
      rawPredsRef.current = msg.service_predictions;
      const svcs = servicesRef.current;
      if (svcs.length > 0) {
        setServicePreds((prev) => {
          const next = { ...prev };
          Object.entries(msg.service_predictions).forEach(([name, val]) => {
            const svc = svcs.find((s) => s.name === name);
            if (svc) next[svc.id] = val;
          });
          return next;
        });
      }
    }
  }, []);

  useWebSocket(handleWebSocketMessage);

  const waitCount = (sid) => waiting.filter((q) => q.service_id === sid).length;
  const csService = services?.find((s) => s.name === "CS");
  const tellerService = services?.find((s) => s.name === "TELLER");

  const reset = () => {
    setStep("main-menu");
    setSelectedService(null);
    setSelectedType(null);
    setSelectedMainFeature(null);
    setResult(null);
    setErr("");
    setQrisAmount(0);
    accountForm.reset();
    paymentForm.reset();
    topupForm.reset();
    generalForm.reset();
  };

  const handleTakeQueue = async (serviceId, queueType, extraData = {}) => {
    setErr("");
    try {
      const payload = { service_id: serviceId, queue_type: queueType, ...extraData };
      const response = await takeQueue(payload);

      if (response.responseCode === "201" && response.data) {
        setResult(response.data);
        setStep("result");
      } else {
        setErr(response.responseMessage || "Gagal mengambil antrian");
      }
    } catch (e) {
      setErr(e.message || "Terjadi kesalahan");
    }
  };

  // ── MAIN MENU ─────────────────────────────────────────────────────────────
  if (step === "main-menu") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            <MainMenuCard
              Icon={faUserPlus}
              badge1="Rekening"
              badge2="Baru"
              title="Pembukaan Rekening"
              desc="Daftar rekening tabungan baru, perubahan data nasabah, pembuatan kartu ATM, dan layanan perbankan lainnya"
              colorIndex={0}
              onClick={() => {
                setSelectedMainFeature("ACCOUNT_REG");
                setStep("account-form");
              }}
            />
            <MainMenuCard
              Icon={faCreditCard}
              badge1="Tagihan"
              badge2="Bayar"
              title="Pembayaran Tagihan"
              desc="Bayar tagihan listrik PLN, air PDAM, pajak kendaraan, BPJS Kesehatan, dan berbagai pembayaran rutin lainnya"
              colorIndex={1}
              onClick={() => {
                setSelectedMainFeature("PAYMENT");
                setStep("payment-method");
              }}
            />
            <MainMenuCard
              Icon={faMobileScreen}
              badge1="E-Wallet"
              badge2="Top Up"
              title="Top Up / Isi Saldo"
              desc="Isi saldo e-wallet seperti GoPay, OVO, DANA, LinkAja, ShopeePay, dan kartu uang elektronik seperti BSB Cash"
              colorIndex={2}
              onClick={() => {
                setSelectedMainFeature("TOPUP");
                setStep("topup-method");
              }}
            />
            <MainMenuCard
              Icon={faTicket}
              badge1="Antrian"
              badge2="Layanan"
              title="Ambil Nomor Antrian"
              desc="Ambil nomor antrian untuk layanan Teller, Customer Service, atau konsultasi produk perbankan dengan petugas kami"
              colorIndex={3}
              onClick={() => {
                setSelectedMainFeature("QUEUE");
                setStep("queue-select-service");
              }}
            />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── ACCOUNT REGISTRATION FORM ─────────────────────────────────────────────
  if (step === "account-form") {
    const onSubmit = (data) => {
      if (!csService) {
        setErr("Layanan CS tidak tersedia");
        return;
      }
      handleTakeQueue(csService.id, "ACCOUNT_REG", data);
    };

    return (
      <KioskWrapper>
        <div className="w-full max-w-7xl">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="primary"
            size="medium"
            onClick={() => setStep("main-menu")}
            className="mb-4"
          />

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUserPlus} className="text-sky-600" size="lg" />
              </div>
              <div>
                <div className="font-black text-slate-900">Pembukaan Rekening</div>
                <div className="text-xs text-slate-500">Isi data diri Anda</div>
              </div>
            </div>

            <PredictionBox pred={csService ? servicePreds[csService.id] : null} serviceLabel="Customer Service" color="sky" />

            {err && <ErrorBox msg={err} />}

            <form onSubmit={accountForm.handleSubmit(onSubmit)} className="space-y-3 mt-3">
              <Controller
                name="customer_name"
                control={accountForm.control}
                rules={{ required: "Nama harus diisi" }}
                render={({ field }) => (
                  <InputField
                    label="Nama Lengkap *"
                    placeholder="Sesuai identitas"
                    value={field.value}
                    onChange={field.onChange}
                    error={accountForm.formState.errors.customer_name?.message}
                    leftIcon={faUserPlus}
                    showRightIcon={false}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="id_type"
                control={accountForm.control}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Jenis Identitas"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "KTP", label: "KTP" },
                      { value: "SIM", label: "SIM" },
                      { value: "PASSPORT", label: "Passport" },
                    ]}
                    leftIcon={faIdCard}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="id_number"
                control={accountForm.control}
                rules={{ required: "Nomor identitas harus diisi" }}
                render={({ field }) => (
                  <InputField
                    label="Nomor Identitas *"
                    placeholder="NIK / No. SIM / No. Passport"
                    value={field.value}
                    onChange={field.onChange}
                    error={accountForm.formState.errors.id_number?.message}
                    leftIcon={faHashtag}
                    showRightIcon={false}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="phone"
                control={accountForm.control}
                render={({ field }) => (
                  <InputField
                    label="No. Telepon"
                    placeholder="08xx..."
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faPhone}
                    showRightIcon={false}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="email"
                control={accountForm.control}
                render={({ field }) => (
                  <InputField
                    label="Email"
                    placeholder="email@domain.com"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faEnvelope}
                    showRightIcon={false}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="account_type"
                control={accountForm.control}
                render={({ field }) => (
                  <Dropdown
                    placeholder="Jenis Rekening"
                    value={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "Tabungan", label: "Tabungan" },
                      { value: "Giro", label: "Giro" },
                      { value: "Deposito", label: "Deposito" },
                    ]}
                    leftIcon={faPiggyBank}
                    showHelperText={false}
                    size="medium"
                  />
                )}
              />

              <Button
                type="submit"
                label={isTakingQueue ? "Mendaftar…" : "Daftar & Ambil Nomor Antrian CS"}
                leftIcon={isTakingQueue ? faSpinner : null}
                rightIcon={isTakingQueue ? null : faChevronRight}
                variant="primary"
                size="medium"
                disabled={isTakingQueue}
                className={`w-full mt-5 ${isTakingQueue ? "animate-pulse" : ""}`}
              />
              <p className="text-center text-slate-500 text-xs mt-3">Antrian akan masuk ke layanan Customer Service</p>
            </form>
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── PAYMENT METHOD SELECTION ──────────────────────────────────────────────
  if (step === "payment-method") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button label="Kembali" leftIcon={faArrowLeft} variant="clean" size="medium" onClick={() => setStep("main-menu")} className="mb-4" />

          <p className="text-center text-slate-600 text-sm mb-4">Pilih metode pembayaran</p>

          <div className="space-y-3">
            <MethodCard
              Icon={faQrcode}
              title="Bayar via QRIS"
              desc="Scan QR, bayar langsung dari aplikasi e-wallet"
              color="sky"
              badge="Tanpa antre"
              onClick={() => setStep("payment-qris-form")}
            />
            <MethodCard
              Icon={faLandmark}
              title="Bayar di Teller"
              desc="Ambil nomor antrian, bayar tunai atau transfer"
              color="sky"
              badge={tellerService ? `${waitCount(tellerService.id)} menunggu` : ""}
              onClick={() => {
                if (!tellerService) return;
                setSelectedService(tellerService);
                setSelectedType("PAYMENT");
                setStep("payment-teller-form");
              }}
            />
            <PredictionBox pred={tellerService ? servicePreds[tellerService.id] : null} serviceLabel="Teller" color="sky" />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── PAYMENT QRIS FORM ─────────────────────────────────────────────────────
  if (step === "payment-qris-form") {
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
            onClick={() => setStep("payment-method")}
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

  // ── PAYMENT TELLER FORM ───────────────────────────────────────────────────
  if (step === "payment-teller-form") {
    const onSubmit = (data) => {
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
            onClick={() => setStep("payment-method")}
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

  // ── TOPUP METHOD SELECTION ────────────────────────────────────────────────
  if (step === "topup-method") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button label="Kembali" leftIcon={faArrowLeft} variant="clean" size="medium" onClick={() => setStep("main-menu")} className="mb-4" />

          <p className="text-center text-slate-600 text-sm mb-4">Pilih metode top up</p>

          <div className="space-y-3">
            <MethodCard
              Icon={faQrcode}
              title="Top Up via QRIS"
              desc="Scan QR, top up langsung dari aplikasi"
              color="sky"
              badge="Tanpa antre"
              onClick={() => setStep("topup-qris-form")}
            />
            <MethodCard
              Icon={faLandmark}
              title="Top Up di Teller"
              desc="Ambil nomor antrian, top up tunai"
              color="sky"
              badge={tellerService ? `${waitCount(tellerService.id)} menunggu` : ""}
              onClick={() => {
                if (!tellerService) return;
                setSelectedService(tellerService);
                setSelectedType("TOPUP");
                setStep("topup-teller-form");
              }}
            />
            <PredictionBox pred={tellerService ? servicePreds[tellerService.id] : null} serviceLabel="Teller" color="sky" />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── TOPUP QRIS FORM ───────────────────────────────────────────────────────
  if (step === "topup-qris-form") {
    const onSubmit = (data) => {
      setQrisAmount(Number(data.amount));
      setStep("qris-display");
    };

    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <Button label="Kembali" leftIcon={faArrowLeft} variant="clean" size="medium" onClick={() => setStep("topup-method")} className="mb-4" />

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
                    options={EMONEY_TYPES.map((c) => ({ value: c, label: c === "EMONEY_BCA" ? "e-Money BCA" : c }))}
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

              <Button type="submit" label="Tampilkan QRIS" rightIcon={faQrcode} variant="sky" size="large" className="w-full mt-5" />
            </form>
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── TOPUP TELLER FORM ─────────────────────────────────────────────────────
  if (step === "topup-teller-form") {
    const onSubmit = (data) => {
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
          <Button label="Kembali" leftIcon={faArrowLeft} variant="clean" size="medium" onClick={() => setStep("topup-method")} className="mb-4" />

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
                    options={EMONEY_TYPES.map((c) => ({ value: c, label: c === "EMONEY_BCA" ? "e-Money BCA" : c }))}
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

  // ── QRIS DISPLAY ──────────────────────────────────────────────────────────
  if (step === "qris-display") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <div className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-2">Scan untuk membayar</div>
            <div className="text-2xl font-black text-slate-900 mb-1">Rp {qrisAmount.toLocaleString("id-ID")}</div>

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

            <Button label="Kembali ke Menu Utama" leftIcon={faArrowLeft} variant="outline" size="large" onClick={reset} className="w-full" />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  // ── QUEUE SERVICE SELECTION ───────────────────────────────────────────────
  if (step === "queue-select-service") {
    return (
      <KioskWrapper>
        <div className="w-full max-w-7xl">
          <Button label="Kembali" leftIcon={faArrowLeft} variant="primary" size="medium" onClick={() => setStep("main-menu")} className="mb-4" />

          <div className="flex flex-col md:flex-row items-center gap-2">
            {services?.map((s) => {
              const isTeller = s.name === "TELLER";
              const count = waitCount(s.id);
              const pred = servicePreds[s.id];

              const formatPred = (mins) => {
                if (mins == null) return "Memuat…";
                if (mins === 0) return "Langsung dilayani";
                if (mins >= 60) return `~${Math.floor(mins / 60)}j ${Math.round(mins % 60)}m`;
                return `~${mins} menit`;
              };

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedService(s);
                    setSelectedType("GENERAL");
                    setStep("queue-fill-form");
                  }}
                  className={`w-full rounded-3xl border p-5 text-left cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${
                    isTeller
                      ? "bg-white border-sky-200 hover:border-sky-400 hover:bg-sky-100"
                      : "bg-sky-50 border-sky-200 hover:border-sky-400 hover:bg-sky-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`text-xs tracking-[0.3em] uppercase mb-1 font-bold text-sky-600`}>
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
                    <span className={`text-sm font-semibold ${pred?.estimated_wait_minutes === 0 ? "text-sky-600" : "text-sky-700"}`}>
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

  // ── GENERAL QUEUE FORM ────────────────────────────────────────────────────
  if (step === "queue-fill-form") {
    const getPurposeOptions = () => {
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
      handleTakeQueue(selectedService.id, "GENERAL", data);
    };

    const purposeOptions = getPurposeOptions();

    return (
      <KioskWrapper>
        <div className="w-full max-w-7xl">
          <Button
            label="Kembali"
            leftIcon={faArrowLeft}
            variant="primary"
            size="medium"
            onClick={() => setStep("queue-select-service")}
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

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (step === "result" && result) {
    return (
      <KioskWrapper>
        <div
          className="w-full max-w-3xl bg-white rounded-3xl shadow-sm overflow-hidden"
          style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
        >
          {/* Header with Queue Type Badge */}
          {result.queue_type && (
            <div className="bg-white py-6">
              <div className="flex justify-center">
                <QueueTypeBadge queueType={result.queue_type} />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="pb-4 px-8 text-center">
            {/* Queue Number */}
            <div className="mb-8">
              <div className="text-[11px] tracking-[0.35em] uppercase text-slate-400 font-semibold mb-1">Nomor Antrian Anda</div>
              <div
                className="text-[7rem] tracking-tighter font-black leading-none bg-gradient-to-br from-sky-600 via-blue-400 to-sky-600 bg-clip-text text-transparent py-3"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {result.queue_number}
              </div>
              <div className="h-1 w-24 mx-auto mt-3 bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-full opacity-40"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              {/* Counter or Position */}
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
                    <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">{result.counter_name}</div>
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
                    <div className="text-6xl font-black text-sky-600 tracking-tight mb-2">#{result.position}</div>
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
                    <span className="text-xs text-sky-600 font-bold uppercase tracking-[0.2em]">Prediksi AI Waktu Tunggu</span>
                  </div>

                  <div className="mb-2">
                    {result.prediction.estimated_wait_minutes === 0 ? (
                      <div className="text-5xl font-black text-sky-600 leading-none tracking-tight">Segera Dipanggil</div>
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
                      <FontAwesomeIcon icon={faClockFour} className="text-sky-500 me-1" /> Diperkirakan dipanggil sekitar{" "}
                      <span className="text-sky-700 font-bold">{result.prediction.estimated_call_time}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Back Button */}
            <Button label="Kembali ke Menu Utama" leftIcon={faArrowLeft} variant="primary" size="medium" onClick={reset} className="w-full" />
          </div>
        </div>
      </KioskWrapper>
    );
  }

  return null;
}