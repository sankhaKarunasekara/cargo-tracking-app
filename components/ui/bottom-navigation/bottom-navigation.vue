<script>
import { BottomNavigation, BottomNavigationItem } from './index'
import { defineComponent } from 'vue'

// Re-export the components so they can be imported from this file
export { BottomNavigation, BottomNavigationItem }

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<template>
  <slot />
</template> 