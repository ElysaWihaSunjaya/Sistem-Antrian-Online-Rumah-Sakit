import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const tableData = [
  {
    id: 1,
    nama: "Ani Wijaya",
    nik: "1234567890123456",
    bpjs: "9876543210",
    poli: "Poli Umum",
    tanggal: "2025-06-24",
    dokter: "dr. Budi",
    jadwal: "08.00 - 10.00",
  },
  {
    id: 2,
    nama: "Rizal Hidayat",
    nik: "2345678901234567",
    bpjs: "1234567890",
    poli: "Poli Gigi",
    tanggal: "2025-06-25",
    dokter: "drg. Sari",
    jadwal: "10.00 - 12.00",
  },
];

export default function Pendaftaran() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Pendaftaran Antrian
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 text-sm text-gray-500">Nama Pasien</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">NIK</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">No. BPJS</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Poli Tujuan</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Tanggal Kunjungan</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Dokter</TableCell>
              <TableCell className="py-3 text-sm text-gray-500">Jadwal</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="py-3">{row.nama}</TableCell>
                <TableCell className="py-3">{row.nik}</TableCell>
                <TableCell className="py-3">{row.bpjs}</TableCell>
                <TableCell className="py-3">{row.poli}</TableCell>
                <TableCell className="py-3">{new Date(row.tanggal).toLocaleDateString("id-ID")}</TableCell>
                <TableCell className="py-3">{row.dokter}</TableCell>
                <TableCell className="py-3">{row.jadwal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
