<script setup lang="ts">
import { ref } from 'vue'
// import LucideSpinner from '~icons/lucide/loader-2'
// import GitHubLogo from '~icons/radix-icons/github-logo'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const isLoading = ref(false)
async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
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
            id="url"
            auto-correct="off"
            placeholder="https://registry.jsonresume.org/thomasdavis.json"
            type="url"
          />
        </div>
        <Button :disabled="isLoading">
          <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
          Import from URL
        </Button>
      </div>
    </form>
  </div>
</template>
