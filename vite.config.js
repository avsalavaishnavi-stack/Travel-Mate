import { defineConfig } from 'vite'
import react from '@vitejs/react-plugin'

export default defineConfig({
  base: process.env.DEPLOY_TARGET === 'gh-pages' ? '/Travel-Mate/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})

