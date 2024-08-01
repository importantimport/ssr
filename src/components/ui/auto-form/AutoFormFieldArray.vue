<script setup lang="ts" generic="T extends z.ZodAny">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { FormItem, FormMessage } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import { FieldArray, FieldContextKey, useField } from 'vee-validate'
import { computed, provide } from 'vue'
import * as z from 'zod'

import type { Config, ConfigItem } from './interface'

import AutoFormField from './AutoFormField.vue'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName, getBaseType } from './utils'

const props = defineProps<{
  config?: Config<T>
  disabled?: boolean
  fieldName: string
  required?: boolean
  schema?: z.ZodArray<T>
}>()

function isZodArray(
  item: z.ZodArray<any> | z.ZodDefault<any>,
): item is z.ZodArray<any> {
  return item instanceof z.ZodArray
}

function isZodDefault(
  item: z.ZodArray<any> | z.ZodDefault<any>,
): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault
}

const itemShape = computed(() => {
  if (!props.schema)
    return

  const schema: z.ZodAny = isZodArray(props.schema)
    ? props.schema._def.type
    : isZodDefault(props.schema)
    // @ts-expect-error missing schema
      ? props.schema._def.innerType._def.type
      : null

  return {
    schema,
    type: getBaseType(schema),
  }
})

const fieldContext = useField(props.fieldName)
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext)
</script>

<template>
  <FieldArray :name="fieldName" as="section" v-slot="{ fields, remove, push }">
    <slot v-bind="props">
      <Accordion :disabled="disabled" as-child class="w-full" collapsible type="multiple">
        <FormItem>
          <AccordionItem :value="fieldName" class="border-none">
            <AccordionTrigger>
              <AutoFormLabel :required="required" class="text-base">
                {{ schema?.description || beautifyObjectName(fieldName) }}
              </AutoFormLabel>
            </AccordionTrigger>

            <AccordionContent>
              <template :key="field.key" v-for="(field, index) of fields">
                <div class="mb-4 p-1">
                  <AutoFormField
                    :config="config as ConfigItem"
                    :field-name="`${fieldName}[${index}]`"
                    :label="fieldName"
                    :shape="itemShape!"
                  />

                  <div class="flex justify-end !my-4">
                    <Button
                      @click="remove(index)"
                      size="icon"
                      type="button"
                      variant="secondary"
                    >
                      <TrashIcon :size="16" />
                    </Button>
                  </div>
                  <Separator v-if="!field.isLast" />
                </div>
              </template>

              <Button
                @click="push(null)"
                class="mt-4 flex items-center"
                type="button"
                variant="secondary"
              >
                <PlusIcon :size="16" class="mr-2" />
                Add
              </Button>
            </AccordionContent>

            <FormMessage />
          </AccordionItem>
        </FormItem>
      </Accordion>
    </slot>
  </FieldArray>
</template>
