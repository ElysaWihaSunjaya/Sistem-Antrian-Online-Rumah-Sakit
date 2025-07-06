import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AntrianAPI } from "../../lib/supabase";

export default function AntrianList() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await AntrianAPI.fetchAll();
      setDataList(data);
    } catch {
      setError("Gagal memuat data antrian.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      setLoading(true);
      await AntrianAPI.delete(id);
      await loadData();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/Form/AntrianForm?id=${item.id}`);
  };

  const handleTambah = () => {
    navigate("/Form/AntrianForm");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Daftar Antrian</h2>
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <AiOutlinePlus /> Tambah
        </button>
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p>Memuat data...</p>}
      {!loading && dataList.length === 0 && <p>Belum ada data antrian.</p>}

      {!loading && dataList.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">NIK</th>
                <th className="px-4 py-2">BPJS</th>
                <th className="px-4 py-2">Poli</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Dokter</th>
                <th className="px-4 py-2">Jadwal</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.nik}</td>
                  <td className="px-4 py-2">{item.nomor_bpjs}</td>
                  <td className="px-4 py-2">{item.poli_tujuan}</td>
                  <td className="px-4 py-2">{item.tanggal_kunjungan}</td>
                  <td className="px-4 py-2">{item.dokter}</td>
                  <td className="px-4 py-2">{item.jadwal}</td>
                  <td className="px-4 py-2">{item.status}</td>
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
