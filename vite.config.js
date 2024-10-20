import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath to handle ESM

import react from "@vitejs/plugin-react";

// Resolve __dirname using import.meta.url for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Use the resolved __dirname
    },
  },
});
