import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    cors: {
      // the origin you will be accessing via browser
      origin: "http://localhost:5000/",
    },
  },
  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    strictPort: true,
    allowedHosts: ["top-blog-api-bloggerfrontend-production.up.railway.app"],
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      // input: "/path",
    },
  },
});
