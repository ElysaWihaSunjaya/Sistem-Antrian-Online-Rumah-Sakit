import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { faqAPI } from "../../lib/supabase";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      if (editingItem) {
        await faqAPI.update(editingItem.id, form);
        setSuccess("FAQ berhasil diperbarui!");
      } else {
        await faqAPI.create(form);
        setSuccess("FAQ berhasil ditambahkan!");
      }
      setForm({ question: "", answer: "" });
      setEditingItem(null);
      await loadFaqs();
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      question: item.question,
      answer: item.answer,
    });
  };

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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white shadow p-4 rounded-xl">
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Pertanyaan"
          required
          className="input"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Jawaban"
          required
          className="input"
        />
        <button type="submit" className="btn-primary">
          {loading ? "Memproses..." : "Simpan"}
        </button>
      </form>

      {loading && <p>Memuat FAQ...</p>}
      {!loading && faqs.length === 0 && <p>Belum ada data FAQ.</p>}

      {!loading && faqs.length > 0 && (
        <table className="w-full border border-gray-200">
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
                <td className="px-4 py-2">
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
      )}
    </div>
  );
}
