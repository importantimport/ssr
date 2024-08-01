<script setup lang="ts">
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { FieldProps } from './interface'

import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName } from './utils'

defineProps<{
  options?: string[]
} & FieldProps>()
</script>

<template>
  <FormField :name="fieldName" v-slot="slotProps">
    <FormItem>
      <AutoFormLabel :required="required" v-if="!config?.hideLabel">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <RadioGroup :disabled="disabled" orientation="vertical" v-if="config?.component === 'radio'" v-bind="{ ...slotProps.componentField }">
            <div :key="option" class="mb-2 flex items-center gap-3 space-y-0" v-for="(option, index) in options">
              <RadioGroupItem :id="`${option}-${index}`" :value="option" />
              <Label :for="`${option}-${index}`">{{ beautifyObjectName(option) }}</Label>
            </div>
          </RadioGroup>

          <Select :disabled="disabled" v-else v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :key="option" :value="option" v-for="option in options">
                {{ beautifyObjectName(option) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
