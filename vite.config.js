import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed bundles go to /static so they can be cached forever (see netlify.toml),
    // while unhashed photos in public/assets keep a short cache.
    assetsDir: 'static',
  },
  server: {
    port: 5173,
    open: true,
  },
})
