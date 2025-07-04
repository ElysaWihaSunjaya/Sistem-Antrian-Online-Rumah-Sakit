import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { servicesAPI } from "../../lib/supabase";

export default function Services() {
  const [services, setServices] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", icon: "" });
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
        await servicesAPI.update(editingItem.id, form);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await servicesAPI.create(form);
        setSuccess("Data berhasil ditambahkan!");
      }

      setForm({ title: "", desc: "", icon: "" });
      setEditingItem(null);
      await loadData();
    } catch {
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ title: item.title, desc: item.desc, icon: item.icon });
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Layanan</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white shadow p-4 rounded-xl">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Judul" required className="input" />
        <input type="text" name="desc" value={form.desc} onChange={handleChange} placeholder="Deskripsi" required className="input" />
        <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="Ikon" required className="input" />
        <button type="submit" className="btn-primary">{loading ? "Memproses..." : "Simpan"}</button>
      </form>

      {loading && <p>Memuat layanan...</p>}
      {!loading && services.length === 0 && <p>Belum ada data layanan.</p>}

      {!loading && services.length > 0 && (
        <table className="w-full border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
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
