import { useNavigate } from "react-router-dom";
import { faUserPlus, faCreditCard, faMobileScreen, faTicket } from "@fortawesome/free-solid-svg-icons";
import MainMenuCard from "@/components/kiosk/MainMenuCard";
import KioskWrapper from "@/components/kiosk/KioskWrapper";

export default function KioskMainMenu() {
  const navigate = useNavigate();

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
            onClick={() => navigate("/kiosk/account")}
          />
          <MainMenuCard
            Icon={faCreditCard}
            badge1="Tagihan"
            badge2="Bayar"
            title="Pembayaran Tagihan"
            desc="Bayar tagihan listrik PLN, air PDAM, pajak kendaraan, BPJS Kesehatan, dan berbagai pembayaran rutin lainnya"
            colorIndex={1}
            onClick={() => navigate("/kiosk/payment")}
          />
          <MainMenuCard
            Icon={faMobileScreen}
            badge1="E-Wallet"
            badge2="Top Up"
            title="Top Up / Isi Saldo"
            desc="Isi saldo e-wallet seperti GoPay, OVO, DANA, LinkAja, ShopeePay, dan kartu uang elektronik seperti BSB Cash"
            colorIndex={2}
            onClick={() => navigate("/kiosk/topup")}
          />
          <MainMenuCard
            Icon={faTicket}
            badge1="Antrian"
            badge2="Layanan"
            title="Ambil Nomor Antrian"
            desc="Ambil nomor antrian untuk layanan Teller, Customer Service, atau konsultasi produk perbankan dengan petugas kami"
            colorIndex={3}
            onClick={() => navigate("/kiosk/queue")}
          />
        </div>
      </div>
    </KioskWrapper>
  );
}
