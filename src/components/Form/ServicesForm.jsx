import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { servicesAPI } from "../../lib/supabase";

export default function ServiceForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await servicesAPI.fetchById(id);
          if (data) {
            setForm(data);
          } else {
            setError("Data layanan tidak ditemukan.");
          }
        } catch {
          setError("Gagal memuat data layanan.");
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
        await servicesAPI.update(id, form);
        setSuccess("Layanan berhasil diperbarui!");
      } else {
        await servicesAPI.create(form);
        setSuccess("Layanan berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/services"), 1000);
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan layanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {id ? "Edit Layanan" : "Tambah Layanan"}
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
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Judul
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Judul layanan"
          />
        </div>

        <div>
          <label htmlFor="desc" className="block font-medium mb-1">
            Deskripsi
          </label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={form.desc}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Deskripsi singkat"
          />
        </div>

        <div>
          <label htmlFor="icon" className="block font-medium mb-1">
            Ikon (class/icon name)
          </label>
          <input
            type="text"
            name="icon"
            id="icon"
            value={form.icon}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Contoh: fa-solid fa-stethoscope"
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
