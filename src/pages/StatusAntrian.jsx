import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const StatusAntrian = () => {
  const [antrian, setAntrian] = useState([]);
  const [sedangDilayani, setSedangDilayani] = useState(null);

  useEffect(() => {
    fetchAntrian();
  }, []);

  const fetchAntrian = async () => {
    const { data, error } = await supabase
      .from('Antrian')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error) {
      setAntrian(data);
      setSedangDilayani(data.find((a) => a.status === 'dipanggil') || null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Status Antrian</h2>

      {sedangDilayani && (
        <div className="p-4 bg-green-100 rounded mb-6 text-center text-lg font-semibold">
          Sedang Dilayani: {sedangDilayani.nama} ({sedangDilayani.id})
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Daftar Antrian</h3>
      <ul className="space-y-2">
        {antrian.map((item) => (
          <li
            key={item.id}
            className={`p-2 rounded ${
              item.status === 'dipanggil' ? 'bg-green-200' : 'bg-gray-100'
            }`}
          >
            {item.nama} — {item.poli_tujuan} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusAntrian;