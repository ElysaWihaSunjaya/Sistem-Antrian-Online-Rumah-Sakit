import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { testimonialsAPI } from "../../lib/supabase";

export default function TestimonialForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    comment: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await testimonialsAPI.fetchById(id);
          if (data) {
            setForm(data);
          } else {
            setError("Data testimoni tidak ditemukan.");
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
        await testimonialsAPI.update(id, form);
        setSuccess("Testimoni berhasil diperbarui!");
      } else {
        await testimonialsAPI.create(form);
        setSuccess("Testimoni berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/testimonials"), 1000);
    } catch {
      setError("Gagal menyimpan testimoni.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {id ? "Edit Testimoni" : "Tambah Testimoni"}
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
          <label htmlFor="name" className="block font-medium mb-1">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Nama pengguna"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block font-medium mb-1">
            Komentar
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={form.comment}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Komentar pengguna"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block font-medium mb-1">
            Link Avatar (opsional)
          </label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            value={form.avatar}
            onChange={handleChange}
            className="input w-full"
            placeholder="https://..."
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
