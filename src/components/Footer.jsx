import previewImage from "../assets/preview-medical-booking.png";
import {
  FaTabletAlt,
  FaUserMd,
  FaCalendarAlt,
  FaBell,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-800 mt-24 py-16">
      {/* Container Utama */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Kiri: Gambar */}
          <div className="flex justify-center">
            <div className="rounded-2xl border-2 border-blue-100 p-2 bg-white shadow-md">
              <img
                src={previewImage}
                alt="Preview Sistem Antrian Online Rumah Sakit"
                className="rounded-xl max-w-full h-auto"
              />
            </div>
          </div>

          {/* Kanan: Teks dan Fitur */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Judul & Deskripsi */}
            <div>
              <h2 className="text-3xl font-bold leading-tight text-gray-800">
                <span className="text-blue-600">Modernisasi</span> Sistem Antrian <br />
                Rumah Sakit Anda
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed text-base">
                Hadirkan pengalaman berobat yang lebih nyaman dengan sistem antrian online yang cepat dan tertata.
                Pasien dapat memilih jadwal, dokter, dan poliklinik langsung dari rumah tanpa harus mengantre lama di lokasi.
                Tingkatkan efisiensi layanan dan kurangi kepadatan ruang tunggu dengan solusi digital yang terintegrasi.
              </p>
            </div>

            {/* Fitur-fitur */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaUserMd className="text-blue-600 text-xl" />
                  Pilih dokter dan poliklinik langsung dari rumah
                </div>
                <div className="flex items-center gap-3">
                  <FaTabletAlt className="text-blue-600 text-xl" />
                  Tampilan responsif di semua perangkat
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-600 text-xl" />
                  Jadwal kunjungan terintegrasi & real-time
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaBell className="text-blue-600 text-xl" />
                  Notifikasi otomatis saat giliran mendekat
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                  Data pasien aman dan terenkripsi
                </div>
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-blue-600 text-xl" />
                  Dashboard antrian untuk staf & admin
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
         <Link
  to="/daftar-antrian"
  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300"
>
  <FaCalendarAlt className="mr-3" />
  Mulai Daftar Online
</Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
