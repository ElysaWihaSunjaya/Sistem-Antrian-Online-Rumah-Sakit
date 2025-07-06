import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faqAPI } from "../../lib/supabase";

export default function FaqForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await faqAPI.fetchById(id);
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
        await faqAPI.update(id, form);
        setSuccess("FAQ berhasil diperbarui!");
      } else {
        await faqAPI.create(form);
        setSuccess("FAQ berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/faq"), 1000);
    } catch (err) {
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {id ? "Edit FAQ" : "Tambah FAQ"}
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
          <label htmlFor="question" className="block font-medium mb-1">
            Pertanyaan
          </label>
          <input
            type="text"
            name="question"
            id="question"
            value={form.question}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pertanyaan"
          />
        </div>

        <div>
          <label htmlFor="answer" className="block font-medium mb-1">
            Jawaban
          </label>
          <textarea
            name="answer"
            id="answer"
            value={form.answer}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Jawaban"
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
