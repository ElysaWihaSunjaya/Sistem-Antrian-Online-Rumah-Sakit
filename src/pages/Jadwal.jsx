import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Jadwal() {
  const [jadwalDokter, setJadwalDokter] = useState([]);
  const [filterPoli, setFilterPoli] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJadwal() {
      const { data, error } = await supabase.from('jadwal_dokter').select('*');
      if (!error) setJadwalDokter(data);
      setLoading(false);
    }
    fetchJadwal();
  }, []);

  const poliList = [...new Set(jadwalDokter.map(j => j.poli))];
  const filtered = filterPoli
    ? jadwalDokter.filter(j => j.poli === filterPoli)
    : jadwalDokter;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Jadwal Dokter & Poli</h2>
      <div className="mb-6 flex gap-4">
        <select
          value={filterPoli}
          onChange={e => setFilterPoli(e.target.value)}
          className="px-3 py-2 rounded-xl border focus:outline-none"
        >
          <option value="">Semua Poli</option>
          {poliList.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow text-left">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4">Dokter</th>
              <th className="py-3 px-4">Poli</th>
              <th className="py-3 px-4">Hari</th>
              <th className="py-3 px-4">Jam</th>
              <th className="py-3 px-4">Kuota</th>
              <th className="py-3 px-4">Sisa Slot</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(j => (
                <tr key={j.id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4">{j.dokter}</td>
                  <td className="py-2 px-4">{j.poli}</td>
                  <td className="py-2 px-4">{j.hari}</td>
                  <td className="py-2 px-4">{j.jam}</td>
                  <td className="py-2 px-4">{j.kuota}</td>
                  <td className="py-2 px-4">{j.sisa}</td>
                  <td className="py-2 px-4">
                    {j.sisa > 0
                      ? <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">Ambil Slot</button>
                      : <span className="text-red-400 text-sm">Penuh</span>
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 text-center text-gray-400">Tidak ada jadwal ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
