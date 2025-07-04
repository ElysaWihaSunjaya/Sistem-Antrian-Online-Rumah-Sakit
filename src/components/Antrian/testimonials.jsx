import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { testimonialsAPI } from "../../lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", comment: "", avatar: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        await testimonialsAPI.update(editingItem.id, form);
        setSuccess("Testimoni berhasil diperbarui!");
      } else {
        await testimonialsAPI.create(form);
        setSuccess("Testimoni berhasil ditambahkan!");
      }

      setForm({ name: "", comment: "", avatar: "" });
      setEditingItem(null);
      await loadData();
    } catch {
      setError("Gagal menyimpan testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, comment: item.comment, avatar: item.avatar });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      setLoading(true);
      await testimonialsAPI.delete(id);
      await loadData();
    } catch {
      setError("Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await testimonialsAPI.fetchAll();
      setTestimonials(res);
    } catch {
      setError("Gagal memuat testimoni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Testimoni</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white shadow p-4 rounded-xl">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
          className="input"
        />
        <input
          type="text"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Komentar"
          required
          className="input"
        />
        <input
          type="text"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Link avatar"
          className="input"
        />
        <button type="submit" className="btn-primary">
          {loading ? "Memproses..." : "Simpan"}
        </button>
      </form>

      {loading && <p>Memuat testimoni...</p>}
      {!loading && testimonials.length === 0 && <p>Belum ada testimoni.</p>}

      {!loading && testimonials.length > 0 && (
        <table className="w-full border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Komentar</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((item, index) => (
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
