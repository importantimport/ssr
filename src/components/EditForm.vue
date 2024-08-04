<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { GithubLogoIcon } from '@radix-icons/vue'
import { LucideLoader2 } from 'lucide-vue-next'
import { ref } from 'vue'

import ImportFromFile from './home/ImportFromFile.vue'

const isLoading = ref(false)

const onSubmit = async (event: Event) => {
  // eslint-disable-next-line no-console
  console.log(event)
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="grid gap-2">
      <form @submit="onSubmit">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <Label class="sr-only" for="url">
              Url
            </Label>
            <Input
              :disabled="isLoading"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              id="url"
              placeholder="https://registry.jsonresume.org/thomasdavis.json"
              type="url"
            />
          </div>
          <Button :disabled="isLoading">
            <LucideLoader2 class="mr-2 h-4 w-4 animate-spin" v-if="isLoading" />
            Import from URL
          </Button>
        </div>
      </form>
      <form @submit="onSubmit">
        <div class="grid">
          <Button :disabled="isLoading" variant="secondary">
            Import from Clipboard
          </Button>
        </div>
      </form>
      <ImportFromFile />
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button :disabled="isLoading" type="button" variant="outline">
      <LucideLoader2 class="mr-2 h-4 w-4 animate-spin" v-if="isLoading" />
      <GithubLogoIcon class="mr-2 h-4 w-4" v-else />
      New Resume
    </Button>
  </div>
</template>
