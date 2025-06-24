import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Data dummy status antrian
const statusAntrianData = [
  {
    id: 1,
    nama: "Ani Lestari",
    poli: "Poli Umum",
    dokter: "dr. Budi",
    status: "Menunggu",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    poli: "Poli Gigi",
    dokter: "drg. Sari",
    status: "Diproses",
  },
  {
    id: 3,
    nama: "Citra Dewi",
    poli: "Poli Anak",
    dokter: "dr. Hendra",
    status: "Selesai",
  },
];

export default function Status() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Status Antrian
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 text-sm text-gray-500">Nama</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Poli</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Dokter</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {statusAntrianData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3">{item.nama}</TableCell>
                <TableCell className="py-3">{item.poli}</TableCell>
                <TableCell className="py-3">{item.dokter}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      item.status === "Selesai"
                        ? "success"
                        : item.status === "Diproses"
                        ? "warning"
                        : "error"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
