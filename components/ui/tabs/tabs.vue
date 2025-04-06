<script setup lang="ts">
// This is a placeholder component to satisfy shadcn-nuxt's component lookup
// We're not actually using these components in our app

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <slot />
  </div>
</template> 