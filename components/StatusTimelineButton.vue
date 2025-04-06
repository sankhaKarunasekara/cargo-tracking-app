<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  type?: string;
  id?: string | number;
  status?: string;
  className?: string;
}>()

const router = useRouter()

const openTimeline = () => {
  const query: Record<string, string> = {}
  
  if (props.type) query.type = props.type.toString()
  if (props.id !== undefined) query.id = props.id.toString()
  if (props.status) query.status = props.status.toString()
  
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
      'track-button inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md',
      'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
      className
    ]"
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 track-icon">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
    <span>Track Progress</span>
  </button>
</template>

<style scoped>
.track-button {
  transition: all 0.2s ease;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.track-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
}

.track-button:active {
  transform: translateY(0);
}

.track-icon {
  transition: transform 0.2s ease;
}

.track-button:hover .track-icon {
  transform: rotate(15deg);
}
</style> 