import CardAntrian from "../../components/CardAntrian";
import Faq from "../../components/Data/FaqList"; 
import Riwayat from "../../components/Data/RiwayatList"; 
import Testimonials from "../../components/Data/TestimonialsList"; 
import Services from "../../components/Data/ServicesList"; 
import CardJadwalDokter from "../../components/CardJadwalDokter";
import ChartAntrian from "../../components/ChartAntrian";
import TargetAntrian from "../../components/TargetAntrian";
import Statistik from "../../components/Statistik";

export default function Home() {
  return (
      <div className="col-span-12 xl:col-span-7 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CardAntrian />
          </div>
          <div className="flex-1">
            <CardJadwalDokter />
          </div>
        </div>
        <ChartAntrian />
        <TargetAntrian />
        <div className="flex justify-center">
          <Statistik />
        </div>

        <Faq />
        <Riwayat />
        <Services />  
        <Testimonials />
      </div>
  );
}
