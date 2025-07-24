import { motion } from "framer-motion";
import heroImg from "../assets/GAMBAR1.png";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="w-full bg-gradient-to-br from-blue-700 to-blue-400 py-16 text-white text-center mb-8 shadow-lg flex flex-col items-center"
    >
      <img
  src={heroImg}
  alt="Banner Rumah Sakit"
  className="w-60 md:w-96 mx-auto mb-6 rounded-xl shadow-lg border-4 border-white"
/>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-xl">
        Sistem Antrian Rumah Sakit
      </h1>
      <p className="text-lg md:text-2xl mb-6 font-medium">
        Antrian Cepat, Aman, dan Tanpa Ribet
      </p>
      <a href="#services" className="mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-50 transition"
        >
          Lihat Layanan Unggulan
        </motion.button>
      </a>
    </motion.section>
  );
}
