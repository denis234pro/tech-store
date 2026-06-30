import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   css: {
    postcss: {} // This blocks Vite from searching your computer for outside configs
  }
})
