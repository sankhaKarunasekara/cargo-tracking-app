<script setup lang="ts">
import ButtonComponent from './index'
</script>

<template>
  <ButtonComponent v-bind="$attrs">
    <slot />
  </ButtonComponent>
</template> 