import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unoCSS from '@unocss/vite'

import unoConfig from './uno.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unoCSS(unoConfig),
  ],
})
