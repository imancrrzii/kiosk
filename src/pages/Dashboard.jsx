import React from "react";
import DashboardCard from "../components/ui/DashboardCard";

import {
  faArrowDown,
  faDownload,
  faClock,
  faMoneyBill1Wave,
  faPersonCircleExclamation,
  faPersonCircleMinus,
  faUser,
  faUsers,
  faRightFromBracket,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import DashboardTable from "../components/dashboard/Table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useDashboard } from "@/hooks/useDashboard";
import { useNotification } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";

// Mapping tipe layanan ke label Indonesia
const SERVICE_TYPE_LABELS = {
  GENERAL: "Umum",
  PAYMENT: "Pembayaran",
  TOPUP: "Top Up",
  ACCOUNT_REG: "Registrasi",
};

// Warna untuk pie chart berdasarkan tipe layanan
const SERVICE_TYPE_COLORS = {
  GENERAL: "var(--color-amber-500)",
  PAYMENT: "var(--color-blue-500)",
  TOPUP: "var(--color-emerald-500)",
  ACCOUNT_REG: "var(--color-purple-500)",
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const {
    isLoading,
    isError,
    totalQueue,
    totalQueueDiff,
    avgServiceTime,
    avgServiceTimeDiff,
    skipRate,
    skipRateDiff,
    counterPerformance,
    busyHours,
    serviceComposition,
  } = useDashboard();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Transform busy_hours untuk BarChart
  const hourlyData = busyHours.map((item) => ({
    name: item.hour,
    high: item.total,
  }));

  // Transform service_composition untuk PieChart
  const pieData = serviceComposition.map((item) => ({
    name: SERVICE_TYPE_LABELS[item.type] || item.type,
    value: item.percentage,
    color: SERVICE_TYPE_COLORS[item.type] || "var(--color-gray-400)",
  }));

  // Format diff sebagai persentase
  const formatDiff = (diff) => {
    if (diff === 0) return "0%";
    return diff > 0 ? `+${diff}%` : `${diff}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen pt-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-500 font-medium">
            Memuat data dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen pt-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-red-500 font-semibold">
            Gagal memuat data dashboard
          </p>
          <p className="text-neutral-400 text-sm">
            Silakan coba refresh halaman
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" space-y-4 pt-24">
      {/* Header & Stats Cards Container */}
      <div className="space-y-6 p-6 bg-white rounded-3xl border-2 border-neutral-100">
        <div className="flex items-center justify-between">
          <h1>Laporan Kinerja Loket</h1>
          <div className="px-4 py-1.5 w-fit bg-white rounded-2xl border border-sky-300 text-sm font-semibold flex items-center gap-3">
            <span className="text-sky-600 uppercase tracking-wider text-[11px] font-bold bg-sky-50 px-2 py-0.5 rounded-md">
              Real Time
            </span>
            <span className="text-gray-600">{formattedDate}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
            <span className="text-gray-900 font-mono tracking-wider">
              {formattedTime}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Antrian Selesai"
            value={totalQueue.toString()}
            percentage={formatDiff(totalQueueDiff)}
            description="Dibandingkan kemarin"
            icon={faUsers}
            color="green"
          />

          <DashboardCard
            title="Rata-rata waktu layanan"
            value={`${avgServiceTime} Menit`}
            percentage={formatDiff(avgServiceTimeDiff)}
            description="Efisiensi meningkat"
            icon={faClock}
            color="purple"
          />

          <DashboardCard
            title="Tingkat Pengabaian Antrian"
            value={`${skipRate}%`}
            percentage={formatDiff(skipRateDiff)}
            description="dari kemarin"
            icon={faPersonCircleExclamation}
            color="red"
            trendIcon={skipRateDiff < 0 ? faArrowDown : undefined}
            badgeColor={skipRateDiff < 0 ? "error" : undefined}
          />

          <DashboardCard
            title="Total Nilai Transaksi"
            value="Rp 48,7 jt"
            percentage="+10%"
            description="Pertumbuhan transaksi"
            icon={faMoneyBill1Wave}
            color="blue"
          />
        </div>
      </div>

      <div className="p-4 bg-white rounded-3xl border-2 border-neutral-100">
        <h4 className="mb-4">Kinerja Pegawai</h4>
        <DashboardTable data={counterPerformance} />
      </div>

      {/* Jam Sibuk dan Komposisi Layanan */}
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
        {/* Jam Sibuk */}
        <div className="p-4 bg-white rounded-3xl border-2 border-neutral-100">
          <h4>Jam Sibuk</h4>
          <div className="h-[360px] mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hourlyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 10,
                }}
                barSize={40}
              >
                <defs>
                  <linearGradient id="colorSky" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="var(--color-sky-600)" />
                    <stop offset="100%" stopColor="var(--color-sky-300)" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 4"
                  stroke="#e5e7eb"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 13 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 13 }}
                  tickFormatter={(val) =>
                    val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val
                  }
                  dx={-10}
                />
                <Bar
                  dataKey="high"
                  name="Total Pengunjung"
                  fill="url(#colorSky)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Komposisi Layanan */}
        <div className="p-4 bg-white rounded-3xl border-2 border-neutral-100">
          <h4>Komposisi Layanan</h4>
          <div className="h-[360px] mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    padding: "12px",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
