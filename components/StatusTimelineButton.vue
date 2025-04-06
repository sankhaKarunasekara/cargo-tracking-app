<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  type?: string;
  id?: string | number;
  className?: string;
}>()

const router = useRouter()

const openTimeline = () => {
  const query: Record<string, string> = {}
  
  if (props.type) {
    query.type = props.type.toString()
  }
  
  if (props.id !== undefined) {
    query.id = props.id.toString()
  }
  
  router.push({
    path: '/StatusTimelinePage',
    query
  })
}
</script>

<template>
  <button 
    @click="openTimeline"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md',
      'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
      className
    ]"
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
      <path d="M12 20v-6M12 8V2M15 5.88 12 8l-3-2.12M15 16.88 12 14l-3 2.12"></path>
    </svg>
    <span>View Timeline</span>
  </button>
</template> 