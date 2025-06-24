import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Pendaftaran from "../../components/Antrian/Pendaftaran";
import Riwayat from "../../components/Antrian/Riwayat";
import Status from "../../components/Antrian/Status";
import Jadwal from "../../components/Antrian/Jadwal"; 

export default function BasicTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Tables" />
      <div className="space-y-6">
          <Pendaftaran />
          <Jadwal />
          <Riwayat />
          <Status />
      </div>
    </>
  );
}
