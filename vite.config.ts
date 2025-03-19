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

  // Xác định các đường dẫn tuyệt đối
  const rootDir = path.resolve(__dirname);
  const clientDir = path.resolve(rootDir, "client");

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
      host: true, // Cho phép tất cả IP kết nối
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "4081481a-2c8d-4085-afa2-5397e16dfc87-00-3t2bpscdladvd.sisko.replit.dev"
      ], // Thêm host bị chặn vào danh sách cho phép
      fs: {
        strict: false, // Allow serving files from outside of project root
        allow: [clientDir], // Explicitly allow the client directory
      },
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true
        }
      }
    }
  };
});
