import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { AntrianAPI } from "../lib/supabase";

// Register chart modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AntrianChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const data = await AntrianAPI.fetchAll();

        const poliCounts = data.reduce((acc, item) => {
          const poli = item.poli_tujuan?.trim() || "Lainnya";
          acc[poli] = (acc[poli] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(poliCounts);
        const values = Object.values(poliCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Jumlah Antrian",
              data: values,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Gagal memuat data antrian:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Statistik Antrian per Poli
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar pb-4">
        <div
          className="-ml-5 h-full min-w-[690px] pl-2 xl:min-w-full"
          style={{ minHeight: "250px" }}
        >
          {loading ? (
            <p className="text-sm text-gray-500">Memuat chart...</p>
          ) : chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                      stepSize: 1,
                    },
                  },
                },
              }}
              height={250}
            />
          ) : (
            <p className="text-sm text-gray-500">Tidak ada data untuk ditampilkan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
