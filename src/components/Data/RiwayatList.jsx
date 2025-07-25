import { useEffect, useState } from "react";
import { riwayatAPI } from "../../lib/supabase";

export default function RiwayatList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await riwayatAPI.fetchAll();
      setData(result);
    } catch (err) {
      setError("Gagal memuat data riwayat.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      setLoading(true);
      await riwayatAPI.delete(id);
      await fetchData();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (data.length === 0) return <p>Belum ada data riwayat.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">
        <a href="/riwayat" className="hover:underline">Riwayat</a>
      </h2>
      <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Poli</th>
            <th className="px-4 py-2">Dokter</th>
            <th className="px-4 py-2">Diagnosa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.tanggal}</td>
              <td className="px-4 py-2">{item.poli}</td>
              <td className="px-4 py-2">{item.dokter}</td>
              <td className="px-4 py-2">{item.diagnosa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
