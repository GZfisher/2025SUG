import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative paths for assets to work with GitHub Pages
  base: './',
  build: {
    // Make sure the output assets use the correct relative paths
    assetsDir: 'assets',
    outDir: 'dist',
  }
})
