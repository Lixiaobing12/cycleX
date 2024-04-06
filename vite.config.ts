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
      "/sapi": {
        target: "http://m.quliantechnology.com/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sapi/, ""),
      },
      "/images": {
        target: "https://app.whaleflow.co/uploads",
        changeOrigin: true,
      },
      "/static/file": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
      },
    },
  },
});
