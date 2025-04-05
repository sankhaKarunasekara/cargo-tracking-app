<script>
import { Timeline, TimelineItem } from './index'
import { defineComponent } from 'vue'

// Re-export the components so they can be imported from this file
export { Timeline, TimelineItem }

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<template>
  <slot />
</template> 