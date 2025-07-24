import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function Services() {
  const [serviceList, setServiceList] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('jadwal_dokter').select('*');
      if (!error) setServiceList(data);
      setLoading(false);
    }
    fetchServices();
  }, []);

  // Unique poli untuk filter
  const poliList = [...new Set(serviceList.map(s => s.poli))];

  // Filter dan search
  const filtered = serviceList.filter(
    (srv) =>
      (filter === "" || srv.poli === filter) &&
      (srv.dokter?.toLowerCase().includes(search.toLowerCase()) ||
        srv.hospital?.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Daftar Dokter & Poli</h2>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border focus:outline-none"
        >
          <option value="">Semua Poli</option>
          {poliList.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Cari dokter/rumah sakit…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-xl border focus:outline-none w-60"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((srv, idx) => (
            <motion.div
              key={srv.id}
              className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <div className="font-bold text-xl mb-1 text-blue-700">{srv.dokter}</div>
              <div className="mb-1 text-sm text-blue-500">{srv.poli}</div>
              <div className="mb-1 text-sm text-blue-400">{srv.hari} | {srv.jam}</div>
              <div className="text-sm mb-2">
                Kuota: <b>{srv.kuota}</b> | Sisa: <b className={srv.sisa > 0 ? "text-green-600" : "text-red-400"}>{srv.sisa}</b>
              </div>
              {srv.sisa > 0
                ? <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700">Ambil Slot</button>
                : <span className="text-red-400 text-sm">Penuh</span>
              }
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">Tidak ada dokter ditemukan.</div>
        )}
      </div>
    </div>
  );
}
