import { GuiiAIDevToolsVitePlugin } from '@guiiai/core'
import unoCSS from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
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
    GuiiAIDevToolsVitePlugin({
      appendTo: 'main.ts',
    }),
    unoCSS(unoConfig),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
})
