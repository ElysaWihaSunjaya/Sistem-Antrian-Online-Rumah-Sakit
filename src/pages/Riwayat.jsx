import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRiwayat() {
      const { data, error } = await supabase.from('riwayat').select('*');
      if (!error) setRiwayat(data);
      setLoading(false);
    }
    fetchRiwayat();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Riwayat Kunjungan Saya</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow text-left">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Poli</th>
              <th className="py-3 px-4">Dokter</th>
              <th className="py-3 px-4">Diagnosa</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length > 0 ? (
              riwayat.map(r => (
                <tr key={r.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4">{r.tanggal}</td>
                  <td className="py-2 px-4">{r.poli}</td>
                  <td className="py-2 px-4">{r.dokter}</td>
                  <td className="py-2 px-4">{r.diagnosa}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 text-center text-gray-400">Belum ada riwayat kunjungan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
