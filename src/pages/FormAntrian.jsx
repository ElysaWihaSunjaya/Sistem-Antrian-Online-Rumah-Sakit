import { useState } from 'react';
import { supabase } from '../lib/supabase';
import QRCode from 'qrcode.react'; // ✅ default import




const FormAntrian = () => {
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    nomor_bpjs: '',
    poli_tujuan: '',
    tanggal_kunjungan: '',
    dokter: '',
    jadwal: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [nomorAntrian, setNomorAntrian] = useState('');

  // ✅ State untuk cek tiket
  const [tiketCek, setTiketCek] = useState('');
  const [hasilCek, setHasilCek] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.from('Antrian').insert([form]).select();

    if (error) {
      console.error(error);
      setMessage('❌ Gagal menyimpan antrian.');
    } else {
      const tiketId = data[0].id || data[0].nik || 'TIKET';
      setNomorAntrian(tiketId);
      setMessage(`✅ Berhasil mendaftar. Nomor Antrian: ${tiketId}`);
      setForm({
        nama: '',
        nik: '',
        nomor_bpjs: '',
        poli_tujuan: '',
        tanggal_kunjungan: '',
        dokter: '',
        jadwal: '',
      });
    }

    setLoading(false);
  };

  // ✅ Fungsi cek tiket
  const handleCekTiket = async () => {
    setHasilCek(null);

    const { data, error } = await supabase
      .from('Antrian')
      .select('*')
      .eq('id', tiketCek)
      .single();

    if (error || !data) {
      setHasilCek({ error: '❌ Tiket tidak ditemukan.' });
    } else {
      setHasilCek(data);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Pendaftaran Antrian</h2>

      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow space-y-4">
        <h3 className="text-xl font-semibold mb-4">Formulir Pendaftaran</h3>

        {[ 
          { label: 'Nama Lengkap', name: 'nama', placeholder: 'Contoh: Ahmad Setiawan' },
          { label: 'NIK', name: 'nik', placeholder: '16 digit NIK' },
          { label: 'Nomor BPJS', name: 'nomor_bpjs', placeholder: 'Kosongkan jika tidak ada' },
          { label: 'Poli Tujuan', name: 'poli_tujuan', placeholder: 'Poli Umum / Poli Gigi' },
        ].map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium">{field.label}</label>
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required={field.name !== 'nomor_bpjs'}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        ))}

        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-medium">Tanggal Kunjungan</label>
          <input
            type="date"
            name="tanggal_kunjungan"
            value={form.tanggal_kunjungan}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-medium">Pilih Dokter</label>
          <select
            name="dokter"
            value={form.dokter}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Pilih Dokter</option>
            <option value="dr. Andi Sp.PD">dr. Andi Sp.PD</option>
            <option value="dr. Budi Sp.THT">dr. Budi Sp.THT</option>
            <option value="dr. Citra Sp.KK">dr. Citra Sp.KK</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-medium">Pilih Jadwal</label>
          <select
            name="jadwal"
            value={form.jadwal}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Pilih Jadwal</option>
            <option>08:00 - 10:00</option>
            <option>10:00 - 12:00</option>
            <option>13:00 - 15:00</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
        >
          {loading ? 'Mengirim...' : 'Dapatkan Nomor Antrian & QR Code'}
        </button>

        {message && <div className="text-center text-sm mt-4">{message}</div>}
      </form>

      {nomorAntrian && (
        <div className="mt-6 p-4 bg-gray-50 rounded text-center">
          <p className="mb-2 font-medium">Scan QR Code Nomor Antrian Anda</p>
          <QRCode value={String(nomorAntrian)} size={200} />
          <p className="mt-2 text-sm text-gray-500 break-words">{nomorAntrian}</p>
        </div>
      )}

      {/* ✅ Cek Antrian */}
      <div className="mt-10 p-6 bg-white rounded-lg shadow space-y-3">
        <h3 className="text-lg font-semibold mb-2">Cek Nomor Antrian</h3>
        <input
          type="text"
          placeholder="Masukkan Nomor Tiket"
          value={tiketCek}
          onChange={(e) => setTiketCek(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleCekTiket}
          className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Cek Tiket
        </button>

        {hasilCek && (
          <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
            {hasilCek.error ? (
              <p className="text-red-600">{hasilCek.error}</p>
            ) : (
              <>
                <p><strong>Nama:</strong> {hasilCek.nama}</p>
                <p><strong>Poli:</strong> {hasilCek.poli_tujuan}</p>
                <p><strong>Dokter:</strong> {hasilCek.dokter}</p>
                <p><strong>Jadwal:</strong> {hasilCek.jadwal}</p>
                <p><strong>Tanggal:</strong> {hasilCek.tanggal_kunjungan}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAntrian;