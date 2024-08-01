import type { Component, InputHTMLAttributes } from 'vue'
import type { z, ZodAny } from 'zod'

import type { INPUT_COMPONENTS } from './constant'

export interface FieldProps {
  config?: ConfigItem
  disabled?: boolean
  fieldName: string
  label?: string
  required?: boolean
}

export interface Shape {
  default?: any
  options?: string[]
  required?: boolean
  schema?: ZodAny
  type: string
}

export interface ConfigItem {
  /** Pick which component to be rendered. */
  component?: Component | keyof typeof INPUT_COMPONENTS
  /** Value for the `FormDescription` */
  description?: string
  /** Hide `FormLabel`. */
  hideLabel?: boolean
  inputProps?: InputHTMLAttributes
  /** Value for the `FormLabel` */
  label?: string
}

// Define a type to unwrap an array
type UnwrapArray<T> = T extends (infer U)[] ? U : never

export type Config<SchemaType extends object> = {
  // If SchemaType.key is an object, create a nested Config, otherwise ConfigItem
  [Key in keyof SchemaType]?:
  SchemaType[Key] extends any[]
    ? UnwrapArray<Config<SchemaType[Key]>>
    : SchemaType[Key] extends object
      ? Config<SchemaType[Key]>
      : ConfigItem;
}

export enum DependencyType {
  DISABLES,
  REQUIRES,
  HIDES,
  SETS_OPTIONS,
}

interface BaseDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> {
  sourceField: keyof SchemaType
  targetField: keyof SchemaType
  type: DependencyType
  when: (sourceFieldValue: any, targetFieldValue: any) => boolean
}

export type ValueDependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  {
    type:
      | DependencyType.DISABLES
      | DependencyType.HIDES
      | DependencyType.REQUIRES
  } & BaseDependency<SchemaType>

export type EnumValues = readonly [string, ...string[]]

export type OptionsDependency<
  SchemaType extends z.infer<z.ZodObject<any, any>>,
> = {
  // Partial array of values from sourceField that will trigger the dependency
  options: EnumValues

  type: DependencyType.SETS_OPTIONS
} & BaseDependency<SchemaType>

export type Dependency<SchemaType extends z.infer<z.ZodObject<any, any>>> =
  | OptionsDependency<SchemaType>
  | ValueDependency<SchemaType>
