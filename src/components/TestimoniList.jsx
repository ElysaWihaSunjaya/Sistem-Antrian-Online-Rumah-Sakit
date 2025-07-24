import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function TestimoniList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (!error) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="bg-blue-50 py-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        Testimoni Pasien
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id || idx}
            className="bg-white rounded-xl shadow-lg p-6 max-w-xs flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-3 border-2 border-blue-200"
            />
            <div className="font-semibold mb-1 text-blue-700">{t.name}</div>
            <div className="text-gray-600 text-center text-sm">{t.comment}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
