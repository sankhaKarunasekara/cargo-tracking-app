<script>
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index'
import { defineComponent } from 'vue'

// Re-export the components so they can be imported from this file
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<template>
  <slot />
</template> 