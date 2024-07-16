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
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
      "/sapi": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
      "/images": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
      "/static/file": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
      "/rwa": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
      "/translate": {
        target: "https://cyclex.cc/",
        changeOrigin: true,
      },
    },
  },
});
