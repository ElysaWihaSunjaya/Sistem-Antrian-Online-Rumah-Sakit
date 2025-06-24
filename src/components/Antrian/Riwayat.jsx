import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// Data dummy riwayat kunjungan pasien
const riwayatData = [
  {
    id: 1,
    tanggal: "2025-06-20",
    poli: "Poli Umum",
    dokter: "dr. Budi Santoso",
    diagnosa: "Demam dan Flu",
  },
  {
    id: 2,
    tanggal: "2025-06-21",
    poli: "Poli Gigi",
    dokter: "drg. Sari Wulandari",
    diagnosa: "Pencabutan Gigi",
  },
  {
    id: 3,
    tanggal: "2025-06-22",
    poli: "Poli Anak",
    dokter: "dr. Hendra Saputra",
    diagnosa: "Batuk Pilek",
  },
];

export default function Riwayat() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Riwayat Kunjungan
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 text-sm text-gray-500">Tanggal</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Poli</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Dokter</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Diagnosa</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {riwayatData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="py-3">{item.poli}</TableCell>
                <TableCell className="py-3">{item.dokter}</TableCell>
                <TableCell className="py-3">{item.diagnosa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
