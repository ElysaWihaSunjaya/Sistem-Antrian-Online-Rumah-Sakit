// src/lib/supabase.js

import axios from "axios";

const BASE_URL = "https://wbiozzfahmnbmyqyqudm.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiaW96emZhaG1uYm15cXlxdWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjgyNzcsImV4cCI6MjA2NjM0NDI3N30.iqSrotijjee1DOioDuJPM1zC73KeJ3SIpaLln-8sXzw";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

function createAPI(tableName) {
  const url = `${BASE_URL}/${tableName}`;

  return {
    async fetchAll() {
      const response = await axios.get(url, { headers });
      return response.data;
    },

    async fetchById(id) {
      const response = await axios.get(`${url}?id=eq.${id}&select=*`, { headers });
      return response.data[0];
    },

    async create(data) {
      const response = await axios.post(url, data, { headers });
      return response.data;
    },

    async delete(id) {
      await axios.delete(`${url}?id=eq.${id}`, { headers });
    },

    async update(id, data) {
      const response = await axios.patch(`${url}?id=eq.${id}`, data, {
        headers,
      });
      return response.data;
    },
  };
}

// Export masing-masing API sesuai nama tabel
export const jadwalAPI = createAPI("jadwal_dokter");
export const AntrianAPI = createAPI("Antrian");
export const faqAPI = createAPI("faq");
export const riwayatAPI = createAPI("riwayat");
export const servicesAPI = createAPI("services");
export const testimonialsAPI = createAPI("testimonials");
