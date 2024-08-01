<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from 'zod'

import { computed } from 'vue'

import type { Config, ConfigItem, Shape } from './interface'

import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant'
import useDependencies from './dependencies'

const props = defineProps<{
  config?: Config<U> | ConfigItem
  fieldName: string
  shape: Shape
}>()

function isValidConfig(config: any): config is ConfigItem {
  return !!config?.component
}

const delegatedProps = computed(() => {
  if (['ZodArray', 'ZodObject'].includes(props.shape?.type))
    return { schema: props.shape?.schema }
  return undefined
})

const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(props.fieldName)
</script>

<template>
  <component
    :config="config"
    :disabled="isDisabled"
    :field-name="fieldName"
    :is="isValidConfig(config)
      ? typeof config.component === 'string'
        ? INPUT_COMPONENTS[config.component!]
        : config.component
      : INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[shape.type]] "
    :label="shape.schema?.description"
    :options="overrideOptions || shape.options"
    :required="isRequired || shape.required"
    v-if="!isHidden"
    v-bind="delegatedProps"
  >
    <slot />
  </component>
</template>
