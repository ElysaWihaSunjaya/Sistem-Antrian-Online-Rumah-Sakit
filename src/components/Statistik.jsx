import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AntrianAPI, jadwalAPI } from "../lib/supabase";

const COLORS = ["#8884d8", "#82ca9d"]; 

export default function AntrianJadwalChart() {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [antrianData, jadwalData] = await Promise.all([
          AntrianAPI.fetchAll(),
          jadwalAPI.fetchAll(),
        ]);

        const data = [
          { name: "Antrian", value: antrianData.length },
          { name: "Jadwal Dokter", value: jadwalData.length },
        ];

        setDataChart(data);
      } catch (error) {
        console.error("Gagal memuat data chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-white/[0.03] dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Statistik Antrian & Jadwal</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={dataChart}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {dataChart.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
