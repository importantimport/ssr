<script lang="ts" setup>
import AccountSwitcher from '@/components/AccountSwitcher.vue'
import Nav, { type LinkProp } from '@/components/Nav.vue'
import { AutoForm } from '@/components/ui/auto-form'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { schema } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import * as z from 'zod'

interface MailProps {
  defaultCollapsed?: boolean
  defaultLayout?: number[]
  navCollapsedSize: number
}

const props = withDefaults(defineProps<MailProps>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 440, 655],
  navCollapsedSize: 4,
})

const isCollapsed = ref(props.defaultCollapsed)

const accounts = [
  {
    email: 'alicia@example.com',
    icon: 'ion:logo-vercel',
    label: 'Alicia Koch',
  },
  {
    email: 'alicia@gmail.com',
    icon: 'mdi:google',
    label: 'Alicia Koch',
  },
  {
    email: 'alicia@me.com',
    icon: 'bx:bxl-gmail',
    label: 'Alicia Koch',
  },
]

const links: LinkProp[] = [
  {
    icon: 'lucide:inbox',
    label: '128',
    title: 'Inbox',
    variant: 'default',
  },
  {
    icon: 'lucide:file',
    label: '9',
    title: 'Drafts',
    variant: 'ghost',
  },
  {
    icon: 'lucide:send',
    label: '',
    title: 'Sent',
    variant: 'ghost',
  },
  {
    icon: 'lucide:archive',
    label: '23',
    title: 'Junk',
    variant: 'ghost',
  },
  {
    icon: 'lucide:trash',
    label: '',
    title: 'Trash',
    variant: 'ghost',
  },
  {
    icon: 'lucide:archive',
    label: '',
    title: 'Archive',
    variant: 'ghost',
  },
]

const links2: LinkProp[] = [
  {
    icon: 'lucide:user-2',
    label: '972',
    title: 'Social',
    variant: 'ghost',
  },
  {
    icon: 'lucide:alert-circle',
    label: '342',
    title: 'Updates',
    variant: 'ghost',
  },
  {
    icon: 'lucide:message-square',
    label: '128',
    title: 'Forums',
    variant: 'ghost',
  },
  {
    icon: 'lucide:shopping-cart',
    label: '8',
    title: 'Shopping',
    variant: 'ghost',
  },
  {
    icon: 'lucide:archive',
    label: '21',
    title: 'Promotions',
    variant: 'ghost',
  },
]

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <ResizablePanelGroup
      class="min-h-screen items-stretch"
      direction="horizontal"
      id="resize-panel-group-1"
    >
      <ResizablePanel
        :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
        :collapsed-size="navCollapsedSize"
        :default-size="defaultLayout[0]"
        :max-size="20"
        :min-size="15"
        @collapse="onCollapse"
        @expand="onExpand"
        collapsible
        id="resize-panel-1"
      >
        <div :class="cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')">
          <AccountSwitcher :accounts="accounts" :is-collapsed="isCollapsed" />
        </div>
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links"
        />
        <Separator />
        <Nav
          :is-collapsed="isCollapsed"
          :links="links2"
        />
      </ResizablePanel>
      <ResizableHandle id="resize-handle-1" with-handle />
      <ResizablePanel :default-size="defaultLayout[1]" :min-size="30" id="resize-panel-2">
        <div class="px-2">
          <AutoForm :form="form" :schema="schema" />
        </div>
      </ResizablePanel>
      <ResizableHandle id="resiz-handle-2" with-handle />
      <ResizablePanel :default-size="defaultLayout[2]" id="resize-panel-3">
        <h1>Resume</h1>
      </ResizablePanel>
    </ResizablePanelGroup>
  </TooltipProvider>
</template>
