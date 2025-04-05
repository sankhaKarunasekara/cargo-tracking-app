<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { cn } from '../../../lib/utils'
import { AccordionContextValue, AccordionItemContextValue } from './types'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})

const accordionContext = inject<AccordionContextValue | null>('accordion', null)
const accordionItemValueProvider = computed(() => props.value)
const open = computed(() => {
  if (!accordionContext) return false
  
  if (Array.isArray(accordionContext.value.value)) {
    return accordionContext.value.value.includes(props.value)
  }
  
  return accordionContext.value.value === props.value
})

provide<AccordionItemContextValue>('accordion-item', {
  value: accordionItemValueProvider,
  disabled: computed(() => props.disabled),
  open,
  toggle: () => {
    if (!accordionContext || props.disabled) return
    accordionContext.updateValue(props.value)
  }
})
</script>

<template>
  <div :class="cn('border-b', props.class)" :data-state="open ? 'open' : 'closed'">
    <slot />
  </div>
</template> 