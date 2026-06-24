import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Notice it says 'plugin-react' now

export default defineConfig({
  base: process.env.DEPLOY_TARGET === 'gh-pages' ? '/Travel-Mate/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
