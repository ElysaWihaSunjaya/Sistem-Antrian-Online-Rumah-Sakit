import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { riwayatAPI } from "../../lib/supabase";

export default function RiwayatForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    tanggal: "",
    poli: "",
    dokter: "",
    diagnosa: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await riwayatAPI.fetchById(id);
          if (data) {
            setForm(data);
          } else {
            setError("Data tidak ditemukan.");
          }
        } catch {
          setError("Gagal memuat data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      if (id) {
        await riwayatAPI.update(id, form);
        setSuccess("Data riwayat berhasil diperbarui!");
      } else {
        await riwayatAPI.create(form);
        setSuccess("Data riwayat berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/riwayat"), 1000);
    } catch (err) {
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {id ? "Edit Riwayat" : "Tambah Riwayat"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <div>
          <label htmlFor="tanggal" className="block font-medium mb-1">
            Tanggal
          </label>
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="poli" className="block font-medium mb-1">
            Poli
          </label>
          <input
            type="text"
            name="poli"
            id="poli"
            value={form.poli}
            onChange={handleChange}
            required
            className="input"
            placeholder="Poli"
          />
        </div>

        <div>
          <label htmlFor="dokter" className="block font-medium mb-1">
            Dokter
          </label>
          <input
            type="text"
            name="dokter"
            id="dokter"
            value={form.dokter}
            onChange={handleChange}
            required
            className="input"
            placeholder="Dokter"
          />
        </div>

        <div>
          <label htmlFor="diagnosa" className="block font-medium mb-1">
            Diagnosa
          </label>
          <input
            type="text"
            name="diagnosa"
            id="diagnosa"
            value={form.diagnosa}
            onChange={handleChange}
            required
            className="input"
            placeholder="Diagnosa"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white rounded-md font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Memproses..." : id ? "Perbarui" : "Simpan"}
        </button>
      </form>
    </div>
  );
}
