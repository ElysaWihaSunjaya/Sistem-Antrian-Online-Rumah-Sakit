import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { jadwalAPI } from "../lib/supabase"; 

export default function CardJadwalDokter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const data = await jadwalAPI.fetchAll();  
        setCount(data.length);
      } catch (err) {
        console.error("Gagal memuat data jadwal dokter:", err.message);
      }
    };

    fetchJadwal();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
        <FiCalendar className="text-gray-800 dark:text-white/90" size={24} />
      </div>

      <div className="mt-5">
        <a href="/jadwal_dokter" className="hover:underline">Jadwal Dokter</a>
        <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
          {count}
        </h4>
      </div>
    </div>
  );
}
