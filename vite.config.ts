import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
    assetsDir: "static",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
        // target: "http://127.0.0.1:8000/",
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/sapi": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
      },
      "/images": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
      },
      "/static/file": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
      },
      "/rwa": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
      },
      "/translate": {
        target: "https://test.cyclex.cc/",
        changeOrigin: true,
      },
    },
  },
});
