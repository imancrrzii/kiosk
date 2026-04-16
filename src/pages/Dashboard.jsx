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

const hourlyData = [
  { name: "08:00", high: 260 },
  { name: "09:00", high: 400 },
  { name: "10:00", high: 560 },
  { name: "11:00", high: 700 },
  { name: "12:00", high: 480 }, // biasanya turun (jam istirahat)
  { name: "13:00", high: 600 },
  { name: "14:00", high: 760 },
  { name: "15:00", high: 620 },
  { name: "16:00", high: 420 },
];

const Dashboard = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

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

  return (
    <div className=" space-y-4 mt-20">
      {/* Header & Stats Cards Container */}
      <div className="space-y-6 p-6 bg-white rounded-3xl border-2 border-neutral-100">
        <div className="flex items-center justify-between">
          <h1>Laporan Kinerja Loket</h1>
          <div className="px-4 py-1.5 w-fit bg-white rounded-2xl border border-sky-300 text-sm font-semibold flex items-center gap-3">
            <span className="text-sky-600 uppercase tracking-wider text-[11px] font-bold bg-sky-50 px-2 py-0.5 rounded-md">Real Time</span>
            <span className="text-gray-600">{formattedDate}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-200"></span>
            <span className="text-gray-900 font-mono tracking-wider">{formattedTime}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Antrian Selesai"
            value="260"
            percentage="+10%"
            description="Dibandingkan kemarin"
            icon={faUsers}
            color="green"
          />

          <DashboardCard
            title="Rata-rata waktu layanan"
            value="7,4 Menit"
            percentage="+10%"
            description="Efisiensi meningkat"
            icon={faClock}
            color="purple"
          />

          <DashboardCard
            title="Tingkat Pengabaian Antrian"
            value="3,2%"
            percentage="-10%"
            description="dari kemarin"
            icon={faPersonCircleExclamation}
            color="red"
            trendIcon={faArrowDown}
            badgeColor="error"
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
        <DashboardTable />
      </div>

      {/* Jam Sibuk dan Komposisi Layanan */}
      <div className="grid grid-cols-2 gap-6">
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
                  data={[
                    {
                      name: "Pembayaran",
                      value: 42,
                      color: "var(--color-blue-500)",
                    },
                    {
                      name: "Top Up",
                      value: 25,
                      color: "var(--color-emerald-500)",
                    },
                    {
                      name: "Umum",
                      value: 20,
                      color: "var(--color-amber-500)",
                    },
                    {
                      name: "Registrasi",
                      value: 13,
                      color: "var(--color-purple-500)",
                    },
                  ]}
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
                  {[
                    {
                      name: "Pembayaran",
                      value: 42,
                      color: "var(--color-blue-500)",
                    },
                    {
                      name: "Top Up",
                      value: 25,
                      color: "var(--color-emerald-500)",
                    },
                    {
                      name: "Umum",
                      value: 20,
                      color: "var(--color-amber-500)",
                    },
                    {
                      name: "Registrasi",
                      value: 13,
                      color: "var(--color-purple-500)",
                    },
                  ].map((entry, index) => (
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
