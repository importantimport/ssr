<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import { CalendarGridHead, type CalendarGridHeadProps } from 'radix-vue'

const props = defineProps<{ class?: HTMLAttributes['class'] } & CalendarGridHeadProps>()
</script>

<template>
  <CalendarGridHead v-bind="props">
    <slot />
  </CalendarGridHead>
</template>
