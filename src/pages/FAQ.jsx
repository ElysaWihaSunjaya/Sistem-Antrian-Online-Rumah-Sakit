import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [faq, setFaq] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaq() {
      const { data, error } = await supabase.from('faq').select('*');
      if (!error) setFaq(data);
      setLoading(false);
    }
    fetchFaq();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faq.map((item, idx) => (
          <div
            key={item.id || idx}
            className="border rounded-xl bg-white shadow"
            onClick={() => setOpenIdx(idx === openIdx ? null : idx)}
          >
            <div className="p-4 cursor-pointer flex justify-between items-center hover:bg-blue-50 transition">
              <span className="font-semibold">{item.question}</span>
              <span>{openIdx === idx ? "▲" : "▼"}</span>
            </div>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  className="p-4 pt-0 text-gray-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
