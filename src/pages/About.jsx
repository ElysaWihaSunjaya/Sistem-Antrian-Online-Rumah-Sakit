import { motion } from "framer-motion";
import heroImg from "../assets/GAMBAR2.png";

export default function About() {
  return (
    <motion.div
      className="max-w-3xl mx-auto py-12 px-4"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <img
        src={heroImg}
        alt="Banner Rumah Sakit"
        className="w-60 md:w-96 mx-auto mb-6 rounded-xl shadow-lg border-4 border-white"
      />

      <h2 className="text-3xl font-bold text-blue-700 mb-4">Tentang Kami</h2>
      <p className="mb-4 text-justify">
        <b>Sistem Antrian Online Rumah Sakit</b> adalah proyek kolaboratif yang dikembangkan dalam rangka tugas akhir dari dua mata kuliah di Politeknik Caltex Riau, yaitu <b>Manajemen Proyek</b> dan <b>Bengkel Pemrograman Web 2 (BPF)</b>.
        Proyek ini bertujuan untuk menciptakan solusi digital yang membantu rumah sakit dalam mengelola antrian pasien secara lebih efisien, modern, dan user-friendly.
      </p>

      <p className="mb-4 text-justify">
        Dari sisi <b>Manajemen Proyek</b>, tim menyusun dokumen lengkap seperti project charter, analisis risiko, estimasi biaya, hingga studi kelayakan. 
        Sedangkan dari sisi <b>Bengkel Pemrograman Web 2</b>, sistem ini diimplementasikan menggunakan framework web modern dengan fokus pada desain antarmuka, responsivitas, dan pengalaman pengguna.
      </p>

      <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-2">Latar Belakang</h3>
      <p className="mb-4 text-justify">
        Antrian manual di rumah sakit seringkali menyebabkan ketidaknyamanan bagi pasien. 
        Dengan menggabungkan pengetahuan manajemen proyek dan keterampilan pemrograman web, kami berupaya menciptakan sistem yang mempercepat proses pendaftaran dan meningkatkan kualitas layanan kesehatan secara keseluruhan.
      </p>

      <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-2">Visi</h3>
      <p className="mb-4">
        Menjadi solusi digital antrian rumah sakit yang efisien, terjangkau, dan mudah diimplementasikan di berbagai institusi kesehatan.
      </p>

      <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-2">Misi</h3>
      <ul className="list-disc ml-8 mb-6">
        <li>Menggabungkan teori manajemen proyek dengan praktik pemrograman modern.</li>
        <li>Mengurangi waktu tunggu pasien melalui sistem antrian online.</li>
        <li>Memberikan pengalaman digital yang ramah pengguna.</li>
        <li>Meningkatkan efisiensi kerja staf rumah sakit melalui otomasi proses pendaftaran.</li>
      </ul>

      <h3 className="text-2xl font-semibold text-blue-600 mt-10 mb-2">Dosen Pembimbing</h3>
      <ul className="ml-6 list-disc">
        <li><b>Jan Alif Kreshna, S.ST., M.Sc.</b> — Dosen Mata Kuliah Manajemen Proyek</li>
        <li><b>Erzi Hidayat, S.T., M.Kom.</b> — Dosen Mata Kuliah Bengkel Pemrograman Web 2</li>
      </ul>
    </motion.div>
  );
}
