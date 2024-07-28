<script setup lang="ts">
import FormPlaceHolder from '@/components/FormPlaceHolder.vue'
import ShareForm from '@/components/ShareForm.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
</script>

<template>
  <div class="relative grid min-h-screen flex-col items-center justify-center px-4 container lg:grid-cols-2 lg:max-w-none lg:px-0">
    <a
      href="/"
      :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8',
      )"
    >
      Edit
    </a>
    <FormPlaceHolder />
    <div class="lg:p-8">
      <div class="mx-auto w-full flex flex-col justify-center sm:w-[350px] space-y-6">
        <div class="flex flex-col text-center space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Share Resume
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your url below to import
          </p>
        </div>
        <ShareForm />
      </div>
    </div>
  </div>
</template>
