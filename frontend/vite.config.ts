import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get backend URL from environment or use default
// Vite config runs in Node.js, so we can access process.env directly
const BACKEND_URL = (process.env as { BACKEND_URL?: string }).BACKEND_URL || 'http://localhost:3000'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy specific API endpoints to the backend server
      '/api/historical-orders': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/api/open-orders': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/api/live-prices': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/api/readme': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

