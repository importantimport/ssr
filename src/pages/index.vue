<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EditForm from '@/components/EditForm.vue'
import FormPlaceHolder from '@/components/FormPlaceHolder.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
</script>

<template>
  <div class="relative grid min-h-screen flex-col items-center justify-center px-4 container lg:grid-cols-2 lg:max-w-none lg:px-0">
    <RouterLink
      to="/resume"
      :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8',
      )"
    >
      Share
    </RouterLink>
    <FormPlaceHolder />
    <div class="lg:p-8">
      <div class="mx-auto w-full flex flex-col justify-center sm:w-[350px] space-y-6">
        <div class="flex flex-col text-center space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">
            Edit Resume
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your url below to import
          </p>
        </div>
        <EditForm />
      </div>
    </div>
  </div>
</template>
