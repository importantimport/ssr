import AutoFormFieldArray from './AutoFormFieldArray.vue'
import AutoFormFieldBoolean from './AutoFormFieldBoolean.vue'
import AutoFormFieldDate from './AutoFormFieldDate.vue'
import AutoFormFieldEnum from './AutoFormFieldEnum.vue'
import AutoFormFieldFile from './AutoFormFieldFile.vue'
import AutoFormFieldInput from './AutoFormFieldInput.vue'
import AutoFormFieldNumber from './AutoFormFieldNumber.vue'
import AutoFormFieldObject from './AutoFormFieldObject.vue'

export const INPUT_COMPONENTS = {
  array: AutoFormFieldArray,
  checkbox: AutoFormFieldBoolean,
  date: AutoFormFieldDate,
  file: AutoFormFieldFile,
  number: AutoFormFieldNumber,
  object: AutoFormFieldObject,
  radio: AutoFormFieldEnum,
  select: AutoFormFieldEnum,
  string: AutoFormFieldInput,
  switch: AutoFormFieldBoolean,
  textarea: AutoFormFieldInput,
}

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodArray: 'array',
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
  ZodObject: 'object',
  ZodString: 'string',
}
