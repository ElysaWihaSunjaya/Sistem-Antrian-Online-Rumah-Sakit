import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { testimonialsAPI } from "../../lib/supabase";

export default function TestimonialsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await testimonialsAPI.fetchAll();
      setData(result);
    } catch (err) {
      setError("Gagal memuat testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      setLoading(true);
      await testimonialsAPI.delete(id);
      await fetchData();
    } catch {
      setError("Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Memuat testimoni...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (data.length === 0) return <p>Belum ada testimoni.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">
        <a href="/testimonials" className="hover:underline">Testimoni</a>
      </h2>
      <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Komentar</th>
            <th className="px-4 py-2">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.comment}</td>
              <td className="px-4 py-2">
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
