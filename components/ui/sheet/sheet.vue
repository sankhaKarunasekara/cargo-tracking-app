<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetProvider,
  useSheet
} from './index'

// Re-export all components so they can be imported from this file
defineExpose({
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetProvider,
  useSheet
})
</script>

<template>
  <slot />
</template> 