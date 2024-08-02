import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import type { schema } from './schema'

export const useStore = defineStore('ssr-resume', () => {
  const resume = useLocalStorage<Partial<typeof schema>>('ssr-resume', {})

  return { resume }
})
