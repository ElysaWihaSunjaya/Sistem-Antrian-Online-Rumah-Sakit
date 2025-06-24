import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import Loading from "../components/Loading"; // pastikan path benar

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('services').select('*');
      if (!error) setServices(data);
      setLoading(false);
    }
    fetchServices();
  }, []);

  if (loading) return <Loading />;

  return (
    <section id="services" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        Layanan Unggulan
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((srv, idx) => (
          <motion.div
            key={srv.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.08, y: -10, boxShadow: "0px 8px 24px #93c5fd" }}
            transition={{ type: "spring", stiffness: 300 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-5xl mb-3">{srv.icon}</div>
            <div className="font-bold text-xl mb-2 text-blue-700">{srv.title}</div>
            <div className="text-gray-600 text-center">{srv.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
