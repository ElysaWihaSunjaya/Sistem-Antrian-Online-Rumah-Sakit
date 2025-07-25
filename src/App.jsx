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
import AntrianForm from "./components/Form/AntrianForm"; 
import FaqForm from "./components/Form/FaqForm"; 
import RiwayatForm from "./components/Form/RiwayatForm"; 
import ServicesForm from "./components/Form/ServicesForm"; 
import TestimonialsForm from "./components/Form/TestimonialsForm"; 
import JadwalForm from "./components/Form/JadwalForm"; 

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/antrian" element={<Antrian />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/jadwal_dokter" element={<Jadwal />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/Form/AntrianForm" element={<AntrianForm />} /> 
          <Route path="/Form/FaqForm" element={<FaqForm />} /> 
          <Route path="/Form/RiwayatForm" element={<RiwayatForm />} /> 
          <Route path="/Form/ServicesForm" element={<ServicesForm />} /> 
          <Route path="/Form/TestimonialsForm" element={<TestimonialsForm />} /> 
          <Route path="/Form/JadwalForm" element={<JadwalForm />} /> 
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
