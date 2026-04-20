import Table from "../table/Table";
import Badge from "../ui/Badge";


const DashboardTable = ({ data = [] }) => {
  // Map API data ke format tabel
  const tableData = data.map((item, index) => ({
    no: index + 1,
    name: item.employee,
    role: item.role === "CS" ? "Customer Service" : item.role === "TELLER" ? "Teller" : item.role,
    total: item.total_done,
    avgTime: `${item.avg_minutes} menit`,
    skip: item.total_skip,
    status: item.status,
  }));

  return (
    <Table
      columns={[
        {
          header: "No",
          accessor: "no",
        },
        {
          header: "Pegawai",
          accessor: "name",
        },
        {
          header: "Jabatan",
          accessor: "role",
        },
        {
          header: "Selesai",
          accessor: "total",
          headerClassName: "justify-center",
          cellClassName: "text-center"
        },
        {
          header: "Rata-rata Waktu Layanan",
          accessor: "avgTime",
          headerClassName: "justify-center",
          cellClassName: "text-center",
        },
        {
          header: "Skip",
          accessor: "skip",
          headerClassName: "justify-center",
          cellClassName: "text-center"
        },
        {
          header: "Status",
          accessor: "status",
          headerClassName:"justify-center",
          cellClassName:"text-center",
          render: (value) => {
            const variantMap = {
              "Baik": "success",
              "Aktif": "success",
              "Normal": "warning",
              "Perlu Perhatian": "error",
            };
            return (

              <Badge label={value} color={variantMap[value] || "default"} variant="outline" size="medium" />
            );
          }
        },
      ]}

      data={tableData}
    />
  );
};

export default DashboardTable;

