<script lang="ts" setup>
import { Slot } from 'radix-vue'

import { useFormField } from './useFormField'

const { error, formDescriptionId, formItemId, formMessageId } = useFormField()
</script>

<template>
  <Slot
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
    :id="formItemId"
  >
    <slot />
  </Slot>
</template>
