import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { faqAPI } from "../../lib/supabase";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqAPI.fetchAll();
      setFaqs(data);
    } catch {
      setError("Gagal memuat FAQ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;
    try {
      setLoading(true);
      await faqAPI.delete(id);
      await loadFaqs();
    } catch {
      setError("Gagal menghapus FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/Form/FaqForm?id=${item.id}`);
  };

  const handleTambah = () => {
    navigate("/Form/FaqForm");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Daftar FAQ</h2>
        <button
          onClick={handleTambah}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <AiOutlinePlus /> Tambah
        </button>
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p>Memuat FAQ...</p>}
      {!loading && faqs.length === 0 && <p>Belum ada data FAQ.</p>}

      {!loading && faqs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Pertanyaan</th>
                <th className="px-4 py-2">Jawaban</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.question}</td>
                  <td className="px-4 py-2">{item.answer}</td>
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
