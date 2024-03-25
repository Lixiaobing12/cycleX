import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://app.whaleflow.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/wapi": {
        target: "https://api.whaleflow.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wapi/, ""),
      },
    },
  },
});
