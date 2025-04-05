<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '../../../lib/utils'
import { AccordionItemContextValue } from './types'

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})

const accordionItemContext = inject<AccordionItemContextValue | null>('accordion-item', null)
const isOpen = computed(() => accordionItemContext?.open?.value || false)
</script>

<template>
  <div
    :class="cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      !isOpen && 'hidden',
      props.class
    )"
    :data-state="isOpen ? 'open' : 'closed'"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </div>
</template> 