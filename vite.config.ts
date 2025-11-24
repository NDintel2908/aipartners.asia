import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname, resolve } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

// Cấu hình này sẽ giúp loại bỏ việc sử dụng `await` trực tiếp trong cấu hình
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async () => {
  const rootDir = path.resolve(__dirname);
  const clientDir = path.resolve(rootDir, "client");

  const plugins = [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ];

  // Chỉ thêm plugin cartographer khi cần
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
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
            vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'wouter'],
          },
        },
      },
    },
    server: {
      strictPort: false,
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
      fs: {
        strict: false,
        allow: [clientDir],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      }
    }
  };
});
