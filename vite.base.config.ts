import { defineConfig } from 'vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@a': path.resolve(__dirname, './src/assets'),
      '@c': path.resolve(__dirname, './src/components'),
      '@s': path.resolve(__dirname, './src/store')
    }
  }
})
