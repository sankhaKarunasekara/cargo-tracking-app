<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import { cn } from '../../../lib/utils'
import { AccordionContextValue } from './types'
import { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'single',
    validator: (value: string) => ['single', 'multiple'].includes(value)
  },
  collapsible: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Array] as PropType<string | string[] | undefined>,
    default: undefined
  },
  defaultValue: {
    type: [String, Array] as PropType<string | string[] | undefined>,
    default: undefined
  },
  class: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value'])

const internalValue = ref<string | string[] | undefined>(
  props.value !== undefined ? (props.value as string | string[] | undefined) : props.defaultValue
)

// Watch for value changes from parent - use any to avoid type issues
watch(() => props.value, (newValue: any) => {
  if (newValue !== undefined) {
    internalValue.value = newValue as string | string[] | undefined
  }
}, { immediate: true })

const updateValue = (itemValue: string) => {
  if (props.type === 'single') {
    const newValue = internalValue.value === itemValue && props.collapsible ? undefined : itemValue
    internalValue.value = newValue
    emit('update:value', newValue)
  } else {
    const currentValues = Array.isArray(internalValue.value) ? (internalValue.value as string[]) : []
    const newValue = currentValues.includes(itemValue)
      ? currentValues.filter(v => v !== itemValue)
      : [...currentValues, itemValue]
    internalValue.value = newValue
    emit('update:value', newValue)
  }
}

provide<AccordionContextValue>('accordion', {
  type: props.type,
  value: internalValue,
  updateValue
})
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <slot />
  </div>
</template> 