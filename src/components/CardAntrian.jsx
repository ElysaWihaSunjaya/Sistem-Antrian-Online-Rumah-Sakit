import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { AntrianAPI } from "../lib/supabase";

export default function CardAntrian() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchAntrian = async () => {
      try {
        const data = await AntrianAPI.fetchAll();
        setCount(data.length);
      } catch (err) {
        console.error("Gagal memuat data antrian:", err);
      }
    };

    fetchAntrian();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
        <FiUsers className="text-gray-800 dark:text-white/90" size={24} />
      </div>

      <div className="mt-5">
        <a href="/Antrian" className="hover:underline">Antrian</a>
        <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
          {count}
        </h4>
      </div>
    </div>
  );
}
