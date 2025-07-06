import { useEffect, useState } from "react";
import { faqAPI } from "../../lib/supabase";

export default function FaqList() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqAPI.fetchAll();
      setFaqs(data);
    } catch (err) {
      setError("Gagal memuat FAQ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  if (loading) return <p>Memuat FAQ...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (faqs.length === 0) return <p>Belum ada data FAQ.</p>;

  return (
    <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold">
            <a href="/faq" className="hover:underline">FAQ</a>
        </h2>
        <table className="w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Pertanyaan</th>
            <th className="px-4 py-2">Jawaban</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.question}</td>
              <td className="px-4 py-2">{item.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
