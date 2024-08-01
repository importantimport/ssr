<script lang="ts" setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

interface AccountSwitcherProps {
  accounts: {
    email: string
    icon: string
    label: string
  }[]
  isCollapsed: boolean
}

const props = defineProps<AccountSwitcherProps>()

const selectedEmail = ref<string>(props.accounts[0].email)
const selectedEmailData = computed(() => props.accounts.find(item => item.email === selectedEmail.value))
</script>

<template>
  <Select v-model="selectedEmail">
    <SelectTrigger
      :class="cn(
        'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
        { 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden': isCollapsed },
      )"
      aria-label="Select account"
    >
      <SelectValue placeholder="Select an account">
        <div class="flex items-center gap-3">
          <Icon :icon="selectedEmailData!.icon" class="size-4" />
          <span v-if="!isCollapsed">
            {{ selectedEmailData!.label }}
          </span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem :key="account.email" :value="account.email" v-for="account of accounts">
        <div class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
          <Icon :icon="account.icon" class="size-4" />
          {{ account.email }}
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
