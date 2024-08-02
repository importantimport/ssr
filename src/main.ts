import '@unocss/reset/tailwind.css'
import { createPinia } from 'pinia'
import 'uno.css'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

createApp(App)
  .use(createPinia() as any)
  .use(router)
  .mount('#app')
