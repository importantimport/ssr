<script setup lang="ts" generic="T extends ZodObjectOrWrapped">
import type { FormContext, GenericObject } from 'vee-validate'
import type { z, ZodAny } from 'zod'

import { Form } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { computed, toRefs } from 'vue'

import type { Config, ConfigItem, Dependency, Shape } from './interface'

import AutoFormField from './AutoFormField.vue'
import { provideDependencies } from './dependencies'
import { getBaseSchema, getBaseType, getDefaultValueInZodStack, getObjectFormSchema, type ZodObjectOrWrapped } from './utils'

const props = defineProps<{
  dependencies?: Dependency<z.infer<T>>[]
  fieldConfig?: Config<z.infer<T>>
  form?: FormContext<GenericObject>
  schema: T
}>()

const emits = defineEmits<{
  submit: [event: GenericObject]
}>()

const { dependencies } = toRefs(props)
provideDependencies(dependencies)

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {}
  const baseSchema = getObjectFormSchema(props.schema)
  const shape = baseSchema.shape
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
      schema: baseItem,
      type: getBaseType(item),
    }
  })
  return val
})

const fields = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof z.infer<T>]: { config: ConfigItem, fieldName: string, shape: Shape } } = {}
  for (const key in shapes.value) {
    const shape = shapes.value[key]
    val[key as keyof z.infer<T>] = {
      config: props.fieldConfig?.[key] as ConfigItem,
      fieldName: key,
      shape,
    }
  }
  return val
})

const formComponent = computed(() => props.form ? 'form' : Form)
const formComponentProps = computed(() => {
  if (props.form) {
    return {
      onSubmit: props.form.handleSubmit(val => emits('submit', val)),
    }
  }
  else {
    const formSchema = toTypedSchema(props.schema)
    return {
      keepValues: true,
      onSubmit: (val: GenericObject) => emits('submit', val),
      validationSchema: formSchema,
    }
  }
})
</script>

<template>
  <component
    :is="formComponent"
    v-bind="formComponentProps"
  >
    <slot :fields="fields" name="customAutoForm">
      <template :key="key" v-for="(shape, key) of shapes">
        <slot
          :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
          :field-name="key.toString()"
          :name="key.toString() as keyof z.infer<T>"
          :shape="shape"
        >
          <AutoFormField
            :config="fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem"
            :field-name="key.toString()"
            :shape="shape"
          />
        </slot>
      </template>
    </slot>

    <slot :shapes="shapes" />
  </component>
</template>
