import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from "tailwindcss"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://apxmonstr.pythonanywhere.com',  // Your Flask server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})