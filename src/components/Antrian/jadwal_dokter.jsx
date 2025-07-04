import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { jadwalAPI } from "../../lib/supabase";

export default function JadwalDokter() {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    dokter: "",
    poli: "",
    hari: "",
    jam: "",
    kuota: "",
    sisa: "",
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
        await jadwalAPI.update(editingItem.id, form);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await jadwalAPI.create(form);
        setSuccess("Data berhasil ditambahkan!");
      }

      setForm({
        dokter: "",
        poli: "",
        hari: "",
        jam: "",
        kuota: "",
        sisa: "",
      });
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
    setForm({
      dokter: item.dokter,
      poli: item.poli,
      hari: item.hari,
      jam: item.jam,
      kuota: item.kuota,
      sisa: item.sisa,
    });
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Jadwal Dokter</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white shadow p-4 rounded-xl">
        <input type="text" name="dokter" value={form.dokter} onChange={handleChange} placeholder="Nama Dokter" required className="input" />
        <input type="text" name="poli" value={form.poli} onChange={handleChange} placeholder="Poli" required className="input" />
        <input type="text" name="hari" value={form.hari} onChange={handleChange} placeholder="Hari" required className="input" />
        <input type="text" name="jam" value={form.jam} onChange={handleChange} placeholder="Jam" required className="input" />
        <input type="number" name="kuota" value={form.kuota} onChange={handleChange} placeholder="Kuota" required className="input" />
        <input type="number" name="sisa" value={form.sisa} onChange={handleChange} placeholder="Sisa" required className="input" />
        <button type="submit" className="btn-primary">{loading ? "Memproses..." : "Simpan"}</button>
      </form>

      {loading && <p>Memuat data...</p>}
      {!loading && data.length === 0 && <p>Tidak ada data.</p>}

      {!loading && data.length > 0 && (
        <table className="w-full border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
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
