import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import {
  faUserPlus,
  faArrowLeft,
  faChevronRight,
  faSpinner,
  faIdCard,
  faHashtag,
  faPhone,
  faEnvelope,
  faPiggyBank,
  faCamera,
  faUpload,
  faTimes,
  faRedo,
  faMagic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KioskWrapper from "@/components/kiosk/KioskWrapper";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Dropdown from "@/components/ui/Dropdown";
import PredictionBox from "@/components/kiosk/PredictionBox";
import ErrorBox from "@/components/kiosk/ErrorBox";
import KioskResult from "@/components/kiosk/KioskResult";
import { OCR_API_URL } from "@/constant/api";
import { PostalCodeServices } from "@/services/PostalCodeServices";

export default function KioskAccountRegistration() {
  const navigate = useNavigate();
  const {
    csService,
    servicePreds,
    result,
    err,
    isTakingQueue,
    handleTakeQueue,
    reset,
  } = useOutletContext();

  const accountForm = useForm({
    defaultValues: {
      customer_name: "",
      id_type: "KTP",
      id_number: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      golongan_darah: "",
      alamat: "",
      rt_rw: "",
      kelurahan_desa: "",
      kecamatan: "",
      kabupaten_kota: "",
      provinsi: "",
      kode_pos: "",
      agama: "",
      status_perkawinan: "",
      pekerjaan: "",
      kewarganegaraan: "",
      berlaku_hingga: "",
      phone: "",
      email: "",
      account_type: "",
    },
  });

  const [showOCRModal, setShowOCRModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [ocrError, setOcrError] = useState(null);
  const [loadingKodePos, setLoadingKodePos] = useState(false);
  
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOcrError(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setOcrError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin kamera.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `ktp-scan-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      setSelectedFile(file);
      setPreview(canvas.toDataURL('image/jpeg'));
      setOcrError(null);
      
      stopCamera();
    }, 'image/jpeg', 0.95);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const fetchKodePos = async (kelurahan) => {
    if (!kelurahan || kelurahan.trim() === "") {
      return;
    }

    setLoadingKodePos(true);
    try {
      const data = await PostalCodeServices.getByKelurahan(kelurahan);

      if (data.success && data.postal_code) {
        accountForm.setValue("kode_pos", data.postal_code);
      } else {
        console.log("Kode pos tidak ditemukan untuk kelurahan:", kelurahan);
      }
    } catch (err) {
      console.error("Error fetching kode pos:", err.message);
    } finally {
      setLoadingKodePos(false);
    }
  };

  const kelurahanValue = accountForm.watch("kelurahan_desa");
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (kelurahanValue && kelurahanValue.trim() !== "") {
        fetchKodePos(kelurahanValue);
      }
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [kelurahanValue]);

  const handleExtractKTP = async () => {
    if (!selectedFile) {
      setOcrError("Silakan pilih file atau scan KTP terlebih dahulu");
      return;
    }

    setLoadingOCR(true);
    setOcrError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${OCR_API_URL}/api/hybrid`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data) {
        accountForm.setValue("customer_name", data.data.Nama || "");
        accountForm.setValue("id_number", data.data.NIK || "");
        accountForm.setValue("tempat_lahir", data.data.Tempat_Lahir || "");
        accountForm.setValue("tanggal_lahir", data.data.Tanggal_Lahir || "");
        accountForm.setValue("jenis_kelamin", data.data.Jenis_Kelamin || "");
        accountForm.setValue("golongan_darah", data.data.Golongan_Darah || "");
        accountForm.setValue("alamat", data.data.Alamat || "");
        accountForm.setValue("rt_rw", data.data.RT_RW || "");
        accountForm.setValue("kelurahan_desa", data.data.Kelurahan_Desa || "");
        accountForm.setValue("kecamatan", data.data.Kecamatan || "");
        accountForm.setValue("kabupaten_kota", data.data.Kabupaten_Kota || "");
        accountForm.setValue("provinsi", data.data.Provinsi || "");
        accountForm.setValue("agama", data.data.Agama || "");
        accountForm.setValue("status_perkawinan", data.data.Status_Perkawinan || "");
        accountForm.setValue("pekerjaan", data.data.Pekerjaan || "");
        accountForm.setValue("kewarganegaraan", data.data.Kewarganegaraan || "");
        accountForm.setValue("berlaku_hingga", data.data.Berlaku_Hingga || "");
        
        if (data.data.Kelurahan_Desa) {
          await fetchKodePos(data.data.Kelurahan_Desa);
        }
        
        setShowOCRModal(false);
        setSelectedFile(null);
        setPreview(null);
        
        alert("Data KTP berhasil diisi ke semua field!");
      } else {
        setOcrError(data.error || "Gagal mengekstrak data KTP");
      }
    } catch (err) {
      setOcrError(`Error koneksi: ${err.message}. Pastikan Flask API berjalan pada port 5005`);
    } finally {
      setLoadingOCR(false);
    }
  };

  const onSubmit = (data) => {
    if (!csService) {
      return;
    }
    handleTakeQueue(csService.id, "ACCOUNT_REG", data);
  };

  if (result) {
    return <KioskResult result={result} onBack={reset} />;
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

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUserPlus} className="text-sky-600" size="lg" />
            </div>
            <div>
              <div className="font-black text-slate-900">Pembukaan Rekening</div>
              <div className="text-xs text-slate-500">Isi data diri Anda atau scan KTP</div>
            </div>
          </div>

          <PredictionBox
            pred={csService ? servicePreds[csService.id] : null}
            serviceLabel="Customer Service"
            color="sky"
          />

          {err && <ErrorBox msg={err} />}

          {/* OCR Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowOCRModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <FontAwesomeIcon icon={faMagic} />
              <span>Scan KTP & Isi Otomatis</span>
            </button>
          </div>

          <form onSubmit={accountForm.handleSubmit(onSubmit)} className="space-y-3 mt-3">
            {/* Nama Lengkap */}
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

            {/* Jenis Identitas */}
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

            {/* NIK */}
            <Controller
              name="id_number"
              control={accountForm.control}
              rules={{ required: "Nomor identitas harus diisi" }}
              render={({ field }) => (
                <InputField
                  label="Nomor Identitas (NIK) *"
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

            {/* Tempat Lahir */}
            <Controller
              name="tempat_lahir"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Tempat Lahir"
                  placeholder="Kota tempat lahir"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Tanggal Lahir */}
            <Controller
              name="tanggal_lahir"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Tanggal Lahir"
                  placeholder="DD-MM-YYYY"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Jenis Kelamin */}
            <Controller
              name="jenis_kelamin"
              control={accountForm.control}
              render={({ field }) => (
                <Dropdown
                  placeholder="Jenis Kelamin"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: "LAKI-LAKI", label: "Laki-laki" },
                    { value: "PEREMPUAN", label: "Perempuan" },
                  ]}
                  leftIcon={faIdCard}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Golongan Darah */}
            <Controller
              name="golongan_darah"
              control={accountForm.control}
              render={({ field }) => (
                <Dropdown
                  placeholder="Golongan Darah"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: "A", label: "A" },
                    { value: "B", label: "B" },
                    { value: "AB", label: "AB" },
                    { value: "O", label: "O" },
                  ]}
                  leftIcon={faIdCard}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Alamat */}
            <Controller
              name="alamat"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Alamat"
                  placeholder="Jalan, nomor rumah"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* RT/RW */}
            <Controller
              name="rt_rw"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="RT/RW"
                  placeholder="000/000"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Kelurahan/Desa */}
            <Controller
              name="kelurahan_desa"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Kelurahan/Desa"
                  placeholder="Nama kelurahan/desa"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Kecamatan */}
            <Controller
              name="kecamatan"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Kecamatan"
                  placeholder="Nama kecamatan"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Kabupaten/Kota */}
            <Controller
              name="kabupaten_kota"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Kabupaten/Kota"
                  placeholder="Nama kabupaten/kota"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Provinsi */}
            <Controller
              name="provinsi"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Provinsi"
                  placeholder="Nama provinsi"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Kode Pos */}
            <Controller
              name="kode_pos"
              control={accountForm.control}
              render={({ field }) => (
                <div className="relative">
                  <InputField
                    label="Kode Pos"
                    placeholder="Kode pos otomatis dari kelurahan"
                    value={field.value}
                    onChange={field.onChange}
                    leftIcon={faIdCard}
                    showRightIcon={false}
                    showHelperText={false}
                    size="medium"
                  />
                  {loadingKodePos && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-600" />
                    </div>
                  )}
                </div>
              )}
            />

            {/* Agama */}
            <Controller
              name="agama"
              control={accountForm.control}
              render={({ field }) => (
                <Dropdown
                  placeholder="Agama"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: "ISLAM", label: "Islam" },
                    { value: "KRISTEN", label: "Kristen" },
                    { value: "KATOLIK", label: "Katolik" },
                    { value: "HINDU", label: "Hindu" },
                    { value: "BUDDHA", label: "Buddha" },
                    { value: "KONGHUCU", label: "Konghucu" },
                  ]}
                  leftIcon={faIdCard}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Status Perkawinan */}
            <Controller
              name="status_perkawinan"
              control={accountForm.control}
              render={({ field }) => (
                <Dropdown
                  placeholder="Status Perkawinan"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: "BELUM KAWIN", label: "Belum Kawin" },
                    { value: "KAWIN", label: "Kawin" },
                    { value: "CERAI HIDUP", label: "Cerai Hidup" },
                    { value: "CERAI MATI", label: "Cerai Mati" },
                  ]}
                  leftIcon={faIdCard}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Pekerjaan */}
            <Controller
              name="pekerjaan"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Pekerjaan"
                  placeholder="Nama pekerjaan"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Kewarganegaraan */}
            <Controller
              name="kewarganegaraan"
              control={accountForm.control}
              render={({ field }) => (
                <Dropdown
                  placeholder="Kewarganegaraan"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: "WNI", label: "WNI" },
                    { value: "WNA", label: "WNA" },
                  ]}
                  leftIcon={faIdCard}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Berlaku Hingga */}
            <Controller
              name="berlaku_hingga"
              control={accountForm.control}
              render={({ field }) => (
                <InputField
                  label="Berlaku Hingga"
                  placeholder="DD-MM-YYYY atau SEUMUR HIDUP"
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={faIdCard}
                  showRightIcon={false}
                  showHelperText={false}
                  size="medium"
                />
              )}
            />

            {/* Divider */}
            <div className="border-t-2 border-slate-200 my-4 pt-4">
              <p className="text-sm font-semibold text-slate-700 mb-3">Informasi Kontak & Rekening</p>
            </div>

            {/* No. Telepon */}
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

            {/* Email */}
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

            {/* Jenis Rekening */}
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
            <p className="text-center text-slate-500 text-xs mt-3">
              Antrian akan masuk ke layanan Customer Service
            </p>
          </form>
        </div>
      </div>

      {/* OCR Modal */}
      {showOCRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Scan KTP</h3>
              <button
                onClick={() => {
                  setShowOCRModal(false);
                  setSelectedFile(null);
                  setPreview(null);
                  setOcrError(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>

            <div className="p-6">
              {/* Camera Modal */}
              {showCamera && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4">
                  <div className="w-full max-w-4xl">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-white text-lg font-semibold">Posisikan KTP di dalam frame</h3>
                      <button
                        onClick={stopCamera}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                      </button>
                    </div>
                    
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-auto"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-4 border-white border-dashed rounded-lg w-4/5 h-3/5 opacity-50"></div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center gap-3">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faCamera} />
                        Ambil Foto
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* Preview or Upload Area */}
              {preview ? (
                <div className="mb-4">
                  <img src={preview} alt="Preview KTP" className="max-h-64 mx-auto rounded-lg shadow-lg mb-3" />
                  <p className="text-xs text-slate-600 text-center mb-3">{selectedFile?.name}</p>
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => {setSelectedFile(null); setPreview(null);}}
                      className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                      Hapus
                    </button>
                    <button 
                      onClick={startCamera}
                      className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faRedo} />
                      Scan Ulang
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  <button
                    onClick={startCamera}
                    className="w-full border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-100 transition-colors"
                  >
                    <FontAwesomeIcon icon={faCamera} size="2x" className="text-blue-600 mb-2" />
                    <p className="text-sm text-blue-700 font-semibold">Scan KTP dengan Kamera</p>
                    <p className="text-xs text-blue-600 mt-1">Klik untuk membuka kamera</p>
                  </button>

                  <div className="text-center text-xs text-slate-500 font-medium">ATAU</div>

                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                      <FontAwesomeIcon icon={faUpload} size="2x" className="text-slate-400 mb-2" />
                      <p className="text-sm text-slate-700 font-medium">Upload gambar KTP</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG maksimal 10MB</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />
                  </label>
                </div>
              )}

              {/* Error Message */}
              {ocrError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{ocrError}</p>
                </div>
              )}

              {/* Extract Button */}
              <button
                onClick={handleExtractKTP}
                disabled={!selectedFile || loadingOCR}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loadingOCR ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    <span>Memproses dengan AI...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faMagic} />
                    <span>Ekstrak & Isi Form</span>
                  </>
                )}
              </button>

              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-slate-700">
                  <strong>Tips:</strong> Pastikan foto KTP jelas, tidak blur, dan seluruh bagian KTP terlihat untuk hasil terbaik.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </KioskWrapper>
  );
}