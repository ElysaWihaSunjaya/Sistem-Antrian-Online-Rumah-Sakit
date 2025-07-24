import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "FAQ", to: "/faq" },
    { label: "Jadwal Dokter", to: "/jadwal" },
    { label: "Riwayat", to: "/riwayat" },
    { label: "Daftar Antrian", to: "/daftar-antrian" },     // ⬅️ Tambahkan ini
    { label: "Status Antrian", to: "/status-antrian" },     // ⬅️ Tambahkan ini
  ];

  return (
    <motion.nav
      className="bg-blue-700 text-white shadow sticky top-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Antrian<span className="text-blue-300">RS</span>
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "px-3 py-2 rounded transition " +
                (isActive
                  ? "bg-blue-900 font-bold"
                  : "hover:bg-blue-600")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
