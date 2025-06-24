import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; 
import JadwalTable from "./JadwalTable";

export default function Jadwal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await supabase.fetchJadwal();
        setData(res);
      } catch (err) {
        console.error("Gagal fetch jadwal:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : (
        <JadwalTable data={data} />
      )}
    </>
  );
}
