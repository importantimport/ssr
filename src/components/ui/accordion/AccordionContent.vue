<script setup lang="ts">
import { cn } from '@/lib/utils'
import { AccordionContent, type AccordionContentProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] } & AccordionContentProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
  >
    <div :class="cn('pb-4 pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
