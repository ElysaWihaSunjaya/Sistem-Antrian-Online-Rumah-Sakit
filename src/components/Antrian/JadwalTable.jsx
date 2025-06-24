import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

export default function JadwalTable({ data = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Daftar Jadwal Kunjungan
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 text-sm text-gray-500">No</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Nama</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">NIK</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">No. BPJS</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Poli Tujuan</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Tanggal</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Dokter</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Jadwal</TableCell>
              <TableCell isHeader className="py-3 text-sm text-gray-500">Status</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="py-3">{index + 1}</TableCell>
                <TableCell className="py-3">{row.nama}</TableCell>
                <TableCell className="py-3">{row.nik}</TableCell>
                <TableCell className="py-3">{row.nomor_bpjs}</TableCell>
                <TableCell className="py-3">{row.poli_tujuan}</TableCell>
                <TableCell className="py-3">
                  {new Date(row.tanggal_kunjungan).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell className="py-3">{row.dokter}</TableCell>
                <TableCell className="py-3">{row.jadwal}</TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      row.status === "Selesai"
                        ? "success"
                        : row.status === "Diproses"
                        ? "warning"
                        : "error"
                    }
                  >
                    {row.status}
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
