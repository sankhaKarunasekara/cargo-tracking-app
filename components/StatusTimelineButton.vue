<script setup lang="ts">
import { ref } from 'vue'
import StatusTimelineSheet from './StatusTimelineSheet.vue'

const props = defineProps<{
  type?: string;
  id?: string | number;
  status?: string;
  className?: string;
  compact?: boolean;
}>()

const isTimelineOpen = ref(false)

const openTimeline = () => {
  isTimelineOpen.value = true
}
</script>

<template>
  <div>
    <button 
      @click="openTimeline"
      :class="[
        'track-button inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md',
        'text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        className
      ]"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="track-icon" :class="{ 'mr-2': !compact }">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span v-if="!compact">Track Progress</span>
      <span v-else>Track</span>
    </button>
    
    <StatusTimelineSheet
      v-model:isOpen="isTimelineOpen"
      :itemId="id?.toString() || ''"
      :itemType="type || 'cusdec'"
      :status="status || ''"
    />
  </div>
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