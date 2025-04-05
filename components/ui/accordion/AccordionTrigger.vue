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
const isDisabled = computed(() => accordionItemContext?.disabled?.value || false)

const handleClick = () => {
  if (accordionItemContext) {
    accordionItemContext.toggle()
  }
}
</script>

<template>
  <h3 class="flex">
    <button
      type="button"
      :class="cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        props.class
      )"
      :data-state="isOpen ? 'open' : 'closed'"
      :disabled="isDisabled"
      @click="handleClick"
    >
      <slot />
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="h-4 w-4 shrink-0 transition-transform duration-200"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  </h3>
</template> 