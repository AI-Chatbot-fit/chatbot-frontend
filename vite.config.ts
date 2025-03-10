import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    host: true,
    port: 5174,
    allowedHosts: [
      'localhost',
      'chatbot.andyanh.id.vn'
    ]
  }
})
