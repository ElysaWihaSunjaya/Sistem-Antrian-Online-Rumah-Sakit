import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AntrianAPI } from "../../lib/supabase";

export default function AntrianForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await AntrianAPI.fetchById(id);
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
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      if (id) {
        await AntrianAPI.update(id, form);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await AntrianAPI.create(form);
        setSuccess("Data berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/antrian"), 1000);
    } catch (err) {
      setError(`Gagal menyimpan data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {id ? "Edit Antrian" : "Tambah Antrian"}
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
        {[
          { name: "nama", label: "Nama", required: true },
          { name: "nik", label: "NIK", required: true },
          { name: "nomor_bpjs", label: "Nomor BPJS" },
          { name: "poli_tujuan", label: "Poli Tujuan" },
          { name: "tanggal_kunjungan", label: "Tanggal Kunjungan", type: "date", required: true },
          { name: "dokter", label: "Dokter" },
          { name: "jadwal", label: "Jadwal" },
          { name: "status", label: "Status" },
        ].map(({ name, label, type = "text", required }) => (
          <div key={name}>
            <label htmlFor={name} className="block font-medium mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={form[name]}
              onChange={handleChange}
              required={required}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={label}
            />
          </div>
        ))}

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
