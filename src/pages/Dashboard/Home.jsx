import Services from "../../components/Antrian/services";
import Riwayat from "../../components/Antrian/riwayat";
import Testimonials from "../../components/Antrian/testimonials";
import Faq from "../../components/Antrian/faq"; 
import Antrian from "../../components/Antrian/Antrian";
import Jadwal from "../../components/Antrian/jadwal_dokter"
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7">
          <Antrian />
          <Faq />
          <Jadwal />
          <Riwayat />
          <Services />  
          <Testimonials />
        </div>
      </div>
    </>
  );
}
