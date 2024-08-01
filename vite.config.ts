import unoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import unoConfig from './uno.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueRouter(),
    vue(),
    vueDevTools(),
    unoCSS(unoConfig),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
