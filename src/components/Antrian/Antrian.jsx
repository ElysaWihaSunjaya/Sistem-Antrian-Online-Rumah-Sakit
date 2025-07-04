import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { AntrianAPI } from "../../lib/supabase";

export default function Antrian() {
  const [editingItem, setEditingItem] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    nomor_bpjs: "",
    poli_tujuan: "",
    tanggal_kunjungan: "",
    dokter: "",
    jadwal: "",
    status: "",
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
        await AntrianAPI.update(editingItem.id, form);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await AntrianAPI.create(form);
        setSuccess("Data berhasil ditambahkan!");
      }

      setForm({
        nama: "",
        nik: "",
        nomor_bpjs: "",
        poli_tujuan: "",
        tanggal_kunjungan: "",
        dokter: "",
        jadwal: "",
        status: "",
      });
      setEditingItem(null);
      await loadData();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
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
    } catch (err) {
      setError("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      nama: item.nama,
      nik: item.nik,
      nomor_bpjs: item.nomor_bpjs,
      poli_tujuan: item.poli_tujuan,
      tanggal_kunjungan: item.tanggal_kunjungan,
      dokter: item.dokter,
      jadwal: item.jadwal,
      status: item.status,
    });
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await AntrianAPI.fetchAll();
      setDataList(data);
    } catch {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Antrian</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white shadow p-4 rounded-xl">
        <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" required className="input" />
        <input type="text" name="nik" value={form.nik} onChange={handleChange} placeholder="NIK" required className="input" />
        <input type="text" name="nomor_bpjs" value={form.nomor_bpjs} onChange={handleChange} placeholder="Nomor BPJS" className="input" />
        <input type="text" name="poli_tujuan" value={form.poli_tujuan} onChange={handleChange} placeholder="Poli Tujuan" className="input" />
        <input type="date" name="tanggal_kunjungan" value={form.tanggal_kunjungan} onChange={handleChange} required className="input" />
        <input type="text" name="dokter" value={form.dokter} onChange={handleChange} placeholder="Dokter" className="input" />
        <input type="text" name="jadwal" value={form.jadwal} onChange={handleChange} placeholder="Jadwal" className="input" />
        <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" className="input" />
        <button type="submit" className="btn-primary">{loading ? "Memproses..." : "Simpan"}</button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && dataList.length === 0 && <p>Belum ada data antrian.</p>}

      {!loading && dataList.length > 0 && (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>BPJS</th>
              <th>Poli</th>
              <th>Tanggal</th>
              <th>Dokter</th>
              <th>Jadwal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.nik}</td>
                <td>{item.nomor_bpjs}</td>
                <td>{item.poli_tujuan}</td>
                <td>{item.tanggal_kunjungan}</td>
                <td>{item.dokter}</td>
                <td>{item.jadwal}</td>
                <td>{item.status}</td>
                <td>
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
