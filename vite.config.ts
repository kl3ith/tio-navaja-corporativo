import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' → rutas relativas.
// Funciona igual en GitHub Pages (subcarpeta), en cualquier hosting
// y abriendo el index.html directamente desde el disco (offline total).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5184, strictPort: true },
  preview: { port: 4174, strictPort: true },
  build: {
    assetsInlineLimit: 0,
  },
})
