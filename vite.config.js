const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const svgr = require("vite-plugin-svgr");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
});
