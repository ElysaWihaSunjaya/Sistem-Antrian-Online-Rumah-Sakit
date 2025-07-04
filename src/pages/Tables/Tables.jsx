import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Services from "../../components/Antrian/services";
import Riwayat from "../../components/Antrian/riwayat";
import Testimonials from "../../components/Antrian/testimonials";
import Faq from "../../components/Antrian/faq"; 
import Antrian from "../../components/Antrian/Antrian";
import Jadwal from "../../components/Antrian/jadwal_dokter"


export default function BasicTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Tables" />
      <div className="space-y-6">
        <Antrian />
        <Faq />
        <Jadwal />
        <Riwayat />
        <Services />  
        <Testimonials />
      </div>
    </>
  );
}
