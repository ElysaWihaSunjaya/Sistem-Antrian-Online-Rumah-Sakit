import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { servicesAPI } from "../../lib/supabase";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await servicesAPI.fetchAll();
      setServices(res);
    } catch {
      setError("Gagal memuat layanan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;

    try {
      setLoading(true);
      await servicesAPI.delete(id);
      await loadData();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/Form/ServicesForm?id=${item.id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Layanan</h2>
        <button
          onClick={() => navigate("/form/servicesform")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah Layanan
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Memuat layanan...</p>}
      {!loading && services.length === 0 && <p>Belum ada data layanan.</p>}

      {!loading && services.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Judul</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Ikon</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.desc}</td>
                  <td className="px-4 py-2">{item.icon}</td>
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
