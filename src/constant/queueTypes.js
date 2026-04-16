import {
  faUserPlus,
  faCreditCard,
  faMobileScreen,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export const QUEUE_TYPE_CONFIG = {
  ACCOUNT_REG: {
    label: "Pembukaan Rekening",
    icon: faUserPlus,
    color: "rose",
    desc: "Daftar rekening baru, ganti data, kartu ATM",
  },
  PAYMENT: {
    label: "Pembayaran Tagihan",
    icon: faCreditCard,
    color: "blue",
    desc: "Listrik, PDAM, Pajak, BPJS, dll",
  },
  TOPUP: {
    label: "Top Up / Isi Saldo",
    icon: faMobileScreen,
    color: "purple",
    desc: "GoPay, OVO, DANA, LinkAja, Flazz, dll",
  },
  GENERAL: {
    label: "Layanan Umum",
    icon: faCircleInfo,
    color: "orange",
    desc: "Informasi, Konsultasi, Layanan lainnya",
  },
};

export const QT_BADGE_COLOR = {
  ACCOUNT_REG: "green",
  PAYMENT: "blue",
  TOPUP: "purple",
  GENERAL: "orange",
};

export const PAYMENT_CATEGORIES = [
  "LISTRIK",
  "PAJAK",
  "PDAM",
  "BPJS",
  "LAINNYA",
];

export const EMONEY_TYPES = [
  "GOPAY",
  "OVO",
  "DANA",
  "LINKAJA",
  "FLAZZ",
  "EMONEY_BCA",
  "LAINNYA",
];