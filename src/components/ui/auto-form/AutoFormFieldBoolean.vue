<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { computed } from 'vue'

import type { FieldProps } from './interface'

import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName } from './utils'

const props = defineProps<FieldProps>()

const booleanComponent = computed(() => props.config?.component === 'switch' ? Switch : Checkbox)
</script>

<template>
  <FormField :name="fieldName" v-slot="slotProps">
    <FormItem>
      <div class="mb-3 flex items-center gap-3 space-y-0">
        <FormControl>
          <slot v-bind="slotProps">
            <component
              :is="booleanComponent"
              v-bind="{ ...slotProps.componentField }"
              :checked="slotProps.componentField.modelValue"
              :disabled="disabled"
              @update:checked="slotProps.componentField['onUpdate:modelValue']"
            />
          </slot>
        </FormControl>
        <AutoFormLabel :required="required" v-if="!config?.hideLabel">
          {{ config?.label || beautifyObjectName(label ?? fieldName) }}
        </AutoFormLabel>
      </div>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
