import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Jadwal from "./pages/Jadwal";
import Riwayat from "./pages/Riwayat";
import FormAntrian from "./pages/FormAntrian";
import StatusAntrian from "./pages/StatusAntrian";
import Footer from "./components/Footer"; 

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/daftar-antrian" element={<FormAntrian />} />
        <Route path="/status-antrian" element={<StatusAntrian />} />
      </Routes>
      <Footer /> {/* ✅ Ini WAJIB ada */}
    </Router>
  );
}