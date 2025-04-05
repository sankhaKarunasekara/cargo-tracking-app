<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()

const classes = computed(() => {
  const variants = {
    default: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }

  const sizes = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  }

  return [
    'inline-flex items-center justify-center rounded font-medium transition-colors',
    variants[props.variant || 'primary'],
    sizes[props.size || 'md'],
    props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ].join(' ')
})
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>