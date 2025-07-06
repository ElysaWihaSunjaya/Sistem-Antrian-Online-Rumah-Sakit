import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { jadwalAPI } from "../../lib/supabase";

export default function JadwalList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await jadwalAPI.fetchAll();
      setData(res);
    } catch {
      setError("Gagal memuat data jadwal dokter.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus jadwal ini?")) return;

    try {
      setLoading(true);
      await jadwalAPI.delete(id);
      await loadData();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/Form/jadwalForm?id=${item.id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Jadwal Dokter</h2>
        <button
          onClick={() => navigate("/form/jadwalform")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Jadwal
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Memuat data...</p>}
      {!loading && data.length === 0 && <p>Tidak ada data.</p>}

      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Dokter</th>
                <th className="px-4 py-2">Poli</th>
                <th className="px-4 py-2">Hari</th>
                <th className="px-4 py-2">Jam</th>
                <th className="px-4 py-2">Kuota</th>
                <th className="px-4 py-2">Sisa</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.dokter}</td>
                  <td className="px-4 py-2">{item.poli}</td>
                  <td className="px-4 py-2">{item.hari}</td>
                  <td className="px-4 py-2">{item.jam}</td>
                  <td className="px-4 py-2">{item.kuota}</td>
                  <td className="px-4 py-2">{item.sisa}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button onClick={() => handleEdit(item)} disabled={loading}>
                      <AiFillEdit className="text-blue-500 text-xl" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} disabled={loading}>
                      <AiFillDelete className="text-red-500 text-xl ml-2" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
