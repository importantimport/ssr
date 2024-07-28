import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import unoCSS from '@unocss/vite'
import { defineConfig } from 'vite'

import unoConfig from './uno.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unoCSS(unoConfig),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
