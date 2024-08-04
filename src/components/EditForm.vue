<script setup lang="ts">
// import LucideSpinner from '~icons/lucide/loader-2'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
// import GitHubLogo from '~icons/radix-icons/github-logo'
import { FileIcon } from '@radix-icons/vue'
import { ref } from 'vue'

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
            <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
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
      <form @submit="onSubmit">
        <div class="relative grid max-w-sm w-full items-center">
          <Input accept="application/json" class="justify-center pl-10 pt-1.5 text-center" type="file" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <FileIcon class="size-6 text-muted-foreground" />
          </span>
        </div>
      </form>
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
      <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
      <!-- <GitHubLogo v-else class="mr-2 h-4 w-4" /> -->
      New Resume
    </Button>
  </div>
</template>
