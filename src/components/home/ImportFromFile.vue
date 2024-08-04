<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { FileIcon } from '@radix-icons/vue'
import { useField } from 'vee-validate'

const { errorMessage, handleBlur, handleChange } = useField('file')
</script>

<template>
  <div class="relative grid max-w-sm w-full items-center">
    <Input
      @blur="handleBlur"
      @change="handleChange"
      accept="application/json"
      class="justify-center pl-10 pt-1.5 text-center"
      type="file"
    />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <FileIcon class="size-6 text-muted-foreground" />
    </span>
    {{ errorMessage }}
  </div>

  <!-- <form @submit="onSubmit">
    <FormField name="file" v-slot="{ handleBlur, handleChange, componentField }">
      <FormItem class="relative grid max-w-sm w-full items-center">
        <FormControl>
          <Input
            @blur="handleBlur"
            @change="handleChange"
            accept="application/json"
            class="justify-center pl-10 pt-1.5 text-center"
            type="file"
            v-bind="componentField"
          />
        </FormControl>
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 !my-0">
          <FileIcon class="size-6 text-muted-foreground" />
        </span>
        <FormMessage />
      </FormItem>
    </FormField>
  </form> -->
</template>
