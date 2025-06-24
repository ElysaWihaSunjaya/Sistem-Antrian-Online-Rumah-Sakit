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
            <p className="mb-4">
                <b>Sistem Antrian Rumah Sakit</b> hadir untuk memudahkan masyarakat mendapatkan pelayanan kesehatan yang efisien dan transparan. Kami percaya semua pasien berhak mendapatkan pelayanan terbaik tanpa harus menghabiskan waktu di ruang tunggu.
            </p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-2">Sejarah</h3>
            <p className="mb-4">
                Aplikasi ini dikembangkan oleh tim profesional di bidang teknologi kesehatan sejak 2024, dan sudah digunakan di berbagai rumah sakit besar di Indonesia.
            </p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-2">Visi & Misi</h3>
            <ul className="list-disc ml-8">
                <li>Mempermudah akses layanan kesehatan bagi seluruh lapisan masyarakat.</li>
                <li>Menjadi solusi antrian kesehatan nomor 1 di Indonesia.</li>
                <li>Memberikan pengalaman antrian yang nyaman dan adil.</li>
            </ul>
        </motion.div>
    );
}
