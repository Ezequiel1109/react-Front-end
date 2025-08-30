import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'public',  
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        /* secure: false, */
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Content-Length', req.headers['content-length'] || 0);
          });
        },
        // Aumenta el límite de tamaño
        maxBodySize: 50 * 1024 * 1024, // 50MB
      },
    },
  },
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/ProductService.test.js",
  },
})

