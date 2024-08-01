<script setup lang="ts">
import { FormLabel } from '@/components/ui/form'

defineProps<{
  required?: boolean
}>()
</script>

<template>
  <FormLabel>
    <slot />
    <span class="text-destructive" v-if="required"> *</span>
  </FormLabel>
</template>
