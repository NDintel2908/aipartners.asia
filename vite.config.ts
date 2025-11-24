import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname, resolve } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname);
const clientDir = path.resolve(rootDir, "client");

export default defineConfig(async () => {
  const plugins = [react(), runtimeErrorOverlay(), themePlugin()];

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
  ) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(clientDir, "src"),
        "@shared": path.resolve(rootDir, "shared"),
      },
    },
    root: clientDir,
    publicDir: path.resolve(clientDir, "public"),
    base: "/", // Changed from relative to absolute path
    build: {
      outDir: path.resolve(rootDir, "dist"),
      emptyOutDir: true,
      assetsDir: "assets",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              "react",
              "react-dom",
              "framer-motion",
              "lucide-react",
              "wouter",
            ],
          },
        },
      },
    },
    server: {
      strictPort: true,
      host: "0.0.0.0",
      port: 5000,
      fs: {
        strict: false,
        allow: [clientDir],
      },
      proxy: {
        "/api": {
          target: "http://localhost:5001",
          changeOrigin: true,
        },
      },
    },
  };
});
