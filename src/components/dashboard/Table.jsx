import Table from "../table/Table";
import { dashboardTableDummy } from "./dashboardTableDummy";
import Badge from "../ui/Badge";


const DashboardTable = () => {
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
              "Aktif": "success",
              "Normal": "warning",
              "Perlu Perhatian": "error",
            };
            return (

              <Badge label={value} color={variantMap[value]} variant="outline" size="medium" />
            );
          }
        },
      ]}

      data={dashboardTableDummy}
    />
  );
};

export default DashboardTable;
