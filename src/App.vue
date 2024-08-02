<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in" name="fade">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>
