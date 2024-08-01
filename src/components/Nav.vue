<script lang="ts" setup>
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

export interface LinkProp {
  icon: string
  label?: string
  title: string
  variant: 'default' | 'ghost'
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}

defineProps<NavProps>()
</script>

<template>
  <div
    :data-collapsed="isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of links">
        <Tooltip :delay-duration="0" :key="`1-${index}`" v-if="isCollapsed">
          <TooltipTrigger as-child>
            <a
              :class="cn(
                buttonVariants({ variant: link.variant, size: 'icon' }),
                'h-9 w-9',
                link.variant === 'default'
                  && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )"
              href="#"
            >
              <Icon :icon="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent class="flex items-center gap-4" side="right">
            {{ link.title }}
            <span class="ml-auto text-muted-foreground" v-if="link.label">
              {{ link.label }}
            </span>
          </TooltipContent>
        </Tooltip>

        <a
          :class="cn(
            buttonVariants({ variant: link.variant, size: 'sm' }),
            link.variant === 'default'
              && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
            'justify-start',
          )"
          :key="`2-${index}`"
          href="#"
          v-else
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            :class="cn(
              'ml-auto',
              link.variant === 'default'
                && 'text-background dark:text-white',
            )"
            v-if="link.label"
          >
            {{ link.label }}
          </span>
        </a>
      </template>
    </nav>
  </div>
</template>
