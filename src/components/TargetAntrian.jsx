import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { AntrianAPI } from "../lib/supabase";

export default function AntrianHariIni() {
  const [jumlahAntrian, setJumlahAntrian] = useState(0);
  const [kapasitas, setKapasitas] = useState(50);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const persentase = Math.min((jumlahAntrian / kapasitas) * 100, 100).toFixed(2);

  const chartOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: 600,
            color: "#1d2939",
            offsetY: 16,
          },
        },
        track: {
          background: "rgba(228,231,236,0.85)",
          strokeWidth: "100%",
        },
      },
    },
    fill: { colors: ["rgba(70,95,255,0.85)"] },
    labels: ["Antrian"],
  };

  const chartSeries = [Number(persentase)];

  const fetchData = async (tanggal) => {
    try {
      const allData = await AntrianAPI.fetchAll();

      const hariIni = allData.filter((item) => {
        if (!item.tanggal_kunjungan) return false;
        const kunjungan = new Date(item.tanggal_kunjungan).toISOString().split("T")[0];
        return kunjungan === tanggal;
      });

      setJumlahAntrian(hariIni.length);
    } catch (err) {
      console.error("Gagal memuat data antrian:", err);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <div className="shadow-default rounded-2xl bg-white px-5 pb-11 pt-5 dark:bg-gray-900 sm:px-6 sm:pt-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Antrian Hari Ini
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total pasien yang mendaftar pada tanggal:
          </p>
          <input
            type="date"
            className="mt-2 text-sm border rounded-md px-3 py-1 dark:bg-gray-800 dark:text-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="relative h-fit">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`${
              dropdownOpen
                ? "text-gray-700 dark:text-white"
                : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
            } transition`}
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full z-40 w-40 mt-2 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <button className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                View Detail
              </button>
              <button className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                Export
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative max-h-[195px] flex justify-center items-center mt-6">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          width={280}
          height={229}
        />
        <span className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-[85%] rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
          {jumlahAntrian} pasien
        </span>
      </div>

      <p className="mx-auto mt-1.5 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
        Total Target: {kapasitas} pasien.
      </p>
    </div>
  );
}
