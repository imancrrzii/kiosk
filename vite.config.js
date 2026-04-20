import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
  import path from "path";
  import { fileURLToPath } from "url";
  import { dirname } from "path";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

export default defineConfig({
  
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  
  server: {
    port: 3003,
  },
  build: {
    target: "es2020",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-icons": ["@fortawesome/react-fontawesome", "@fortawesome/free-solid-svg-icons"],
        },
      },
    },
  },

});