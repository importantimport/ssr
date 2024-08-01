<script setup lang="ts" generic="T extends ZodRawShape">
import type { ZodAny, ZodObject, ZodRawShape } from 'zod'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FormItem } from '@/components/ui/form'
import { FieldContextKey, useField } from 'vee-validate'
import { computed, provide } from 'vue'

import type { Config, ConfigItem, Shape } from './interface'

import AutoFormField from './AutoFormField.vue'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName, getBaseSchema, getBaseType, getDefaultValueInZodStack } from './utils'

const props = defineProps<{
  config?: Config<T>
  disabled?: boolean
  fieldName: string
  required?: boolean
  schema?: ZodObject<T>
}>()

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}

  if (!props.schema)
    return
  const shape = getBaseSchema(props.schema)?.shape
  if (!shape)
    return
  Object.keys(shape).forEach((name) => {
    const item = shape[name] as ZodAny
    const baseItem = getBaseSchema(item) as ZodAny
    let options = (baseItem && 'values' in baseItem._def) ? baseItem._def.values as string[] : undefined
    if (!Array.isArray(options) && typeof options === 'object')
      options = Object.values(options)

    val[name as keyof T] = {
      default: getDefaultValueInZodStack(item),
      options,
      required: !['ZodNullable', 'ZodOptional'].includes(item._def.typeName),
      schema: item,
      type: getBaseType(item),
    }
  })
  return val
})

const fieldContext = useField(props.fieldName)
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext)
</script>

<template>
  <section>
    <slot v-bind="props">
      <Accordion :disabled="disabled" as-child class="w-full" collapsible type="single">
        <FormItem>
          <AccordionItem :value="fieldName" class="border-none">
            <AccordionTrigger>
              <AutoFormLabel :required="required" class="text-base">
                {{ schema?.description || beautifyObjectName(fieldName) }}
              </AutoFormLabel>
            </AccordionTrigger>
            <AccordionContent class="p-1 space-y-5">
              <template :key="key" v-for="(shape, key) in shapes">
                <AutoFormField
                  :config="config?.[key as keyof typeof config] as ConfigItem"
                  :field-name="`${fieldName}.${key.toString()}`"
                  :label="key.toString()"
                  :shape="shape"
                />
              </template>
            </AccordionContent>
          </AccordionItem>
        </FormItem>
      </Accordion>
    </slot>
  </section>
</template>
