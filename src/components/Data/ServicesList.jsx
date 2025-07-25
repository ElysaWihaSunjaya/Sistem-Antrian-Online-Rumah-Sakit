import { useEffect, useState } from "react";
import { servicesAPI } from "../../lib/supabase";

export default function ServicesList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await servicesAPI.fetchAll();
      setData(result);
    } catch (err) {
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
      await fetchData();
    } catch {
      setError("Gagal menghapus layanan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Memuat layanan...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (data.length === 0) return <p>Belum ada data layanan.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">
        <a href="/services" className="hover:underline">Services</a>
      </h2>
      <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Judul</th>
            <th className="px-4 py-2">Deskripsi</th>
            <th className="px-4 py-2">Ikon</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.desc}</td>
              <td className="px-4 py-2">{item.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
