import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { crx } from "@crxjs/vite-plugin";
import path from "path";
import manifest from "./manifest.ts";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // Source maps in development only — use mode from Vite, not process.env
    sourcemap: mode === "development",
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      // Use a separate port from the dev server to avoid WebSocket conflicts
      // with the CRXJS HMR client injected into content scripts.
      port: 5174,
    },
  },
}));
