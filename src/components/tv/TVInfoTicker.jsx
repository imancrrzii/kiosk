import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeXmark,
  faShieldHalved,
  faLightbulb,
  faMobileScreen,
  faCreditCard,
  faHouse,
  faBolt,
  faPhone,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const TICKER_MESSAGES = [
  {
    icon: faVolumeXmark,
    text: "Harap mematikan suara HP selama bertransaksi di dalam bank",
  },
  {
    icon: faShieldHalved,
    text: "Jangan berikan PIN atau OTP kepada siapapun, termasuk petugas bank",
  },
  {
    icon: faLightbulb,
    text: "Tabungan Gold — bunga 5,5% p.a. · Hubungi CS untuk info",
  },
  {
    icon: faMobileScreen,
    text: "Mobile Banking tersedia 24 jam — unduh di App Store & Google Play",
  },
  {
    icon: faCreditCard,
    text: "Kartu Kredit Platinum — cashback 5% semua kategori, limit s.d. Rp 200 juta",
  },
  {
    icon: faHouse,
    text: "KPR — bunga mulai 5,2% fixed 3 tahun · Simulasi di website kami",
  },
  {
    icon: faBolt,
    text: "Bayar tagihan lebih cepat via QRIS & Mobile Banking — tanpa antre!",
  },
  {
    icon: faPhone,
    text: "Call Center 24 jam: 1500-XXX · Hotline Pengaduan: 1500-YYY",
  },
];

export default function TVInfoTicker() {
  return (
    <div
      className="flex items-center overflow-hidden"
      style={{
        background: "#060c1a",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        height: 34,
      }}
    >
      {/* LEFT LABEL */}
      <div
        className="flex items-center gap-2 px-4 shrink-0"
        style={{
          background: "#1d4ed8",
          height: "100%",
          minWidth: 80,
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} className="text-blue-200 text-[10px]" />
        <span className="text-[10px] font-bold text-blue-100 tracking-[2px] uppercase">
          Info
        </span>
      </div>

      {/* TICKER */}
      <div className="overflow-hidden flex-1">
        <div
          className="flex gap-16 items-center"
          style={{
            animation: "tickerScroll 60s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {TICKER_MESSAGES.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={item.icon}
                className="text-blue-500 text-[10px]"
              />
              <span className="text-[10px]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}