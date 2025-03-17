import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "..", "shared"),
    },
  },
  optimizeDeps: {
    include: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-switch",
      "@radix-ui/react-select",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-avatar",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-slot",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-dialog",
    ],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/main.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("wouter") ||
              id.includes("framer-motion") ||
              id.includes("lucide-react") ||
              id.includes("@tanstack/react-query") ||
              id.includes("react-icons") ||
              id.includes("@radix-ui")
            ) {
              return "vendor";
            }
          }
        },
      },
    },
  },
});
