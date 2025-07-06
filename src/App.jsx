import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

import Antrian from "./components/Antrian/Antrian";
import Faq from "./components/Antrian/faq";
import Jadwal from "./components/Antrian/jadwal_dokter";
import Riwayat from "./components/Antrian/riwayat";
import Services from "./components/Antrian/services";
import Testimonials from "./components/Antrian/testimonials";
import AntrianForm from "./components/Form/AntrianForm"; // ✅ tambahkan ini
import FaqForm from "./components/Form/FaqForm"; // ✅ tambahkan ini
import RiwayatForm from "./components/Form/RiwayatForm"; // ✅ tambahkan ini
import ServicesForm from "./components/Form/ServicesForm"; // ✅ tambahkan ini
import TestimonialsForm from "./components/Form/TestimonialsForm"; // ✅ tambahkan ini
import JadwalForm from "./components/Form/JadwalForm"; // ✅ tambahkan ini

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/antrian" element={<Antrian />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/jadwal_dokter" element={<Jadwal />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/Form/AntrianForm" element={<AntrianForm />} /> {/* ✅ ini dia */}
          <Route path="/Form/FaqForm" element={<FaqForm />} /> {/* ✅ ini dia */}
          <Route path="/Form/RiwayatForm" element={<RiwayatForm />} /> {/* ✅ ini dia */}
          <Route path="/Form/ServicesForm" element={<ServicesForm />} /> {/* ✅ ini dia */}
          <Route path="/Form/TestimonialsForm" element={<TestimonialsForm />} /> {/* ✅ ini dia */}
          <Route path="/Form/JadwalForm" element={<JadwalForm />} /> {/* ✅ ini dia */}
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
