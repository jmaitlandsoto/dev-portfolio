import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  },
  test: {
    environment: 'jsdom',
  },
  server: {
    allowedHosts: ["pi.joshmaitland.ca"],
    // Local dev: run `npm start` in api/ and the widget talks to it via this proxy
    proxy: { "/api": "http://localhost:3300" }
  }
})
