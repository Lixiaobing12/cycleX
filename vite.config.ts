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
        target: "https://monster-island.top",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/sapi": {
        target: "http://cyclex.monster-island.top",
        changeOrigin: true,
      },
      "/images": {
        target: "https://monster-island.top/uploads",
        changeOrigin: true,
      },
      "/static/file": {
        target: "http://cyclex.monster-island.top",
        changeOrigin: true,
      },
      "/rwa": {
        target: "http://cyclex.monster-island.top",
        changeOrigin: true,
      },
      "/translate": {
        target: "http://cyclex.monster-island.top",
        changeOrigin: true,
      },
    },
  },
});
