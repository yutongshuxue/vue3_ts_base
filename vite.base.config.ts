import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@a': path.resolve(__dirname, './src/assets'),
      '@c': path.resolve(__dirname, './src/components'),
      '@s': path.resolve(__dirname, './src/store')
    }
  },
  plugins: [
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/language/**')]
    })
  ]
})
