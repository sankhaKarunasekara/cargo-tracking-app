<script setup lang="ts">
import ButtonComponent from './ui/button/index'
import StatusTimeline from './StatusTimeline.vue'

const props = defineProps<{
  container: {
    id: string;
    number: string;
    status: string;
  };
  statusItems: Array<{
    title: string;
    date: string;
    description?: string;
    completed: boolean;
  }>;
}>()

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col bg-white">
    <div class="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
      <h2 class="text-lg font-medium text-gray-900">Container Status</h2>
      <button @click="handleClose" class="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="flex-grow p-4 overflow-y-auto">
      <div class="mb-4">
        <h3 class="text-lg font-medium text-gray-900">{{ container.number }}</h3>
        <div class="inline-flex px-2 py-1 mt-1 text-sm rounded-full" 
             :class="{
               'bg-blue-100 text-blue-800': ['scanning', 'registered'].includes(container.status.toLowerCase()),
               'bg-amber-100 text-amber-800': ['doc checked', 'acknowledgedgate', 'acknowledgedyard'].includes(container.status.toLowerCase()),
               'bg-green-100 text-green-800': ['exitedyard', 'send to yard', 'officer checked'].includes(container.status.toLowerCase()),
               'bg-red-100 text-red-800': ['cancelled', 'detained'].includes(container.status.toLowerCase()),
               'bg-gray-100 text-gray-800': !['scanning', 'registered', 'doc checked', 'acknowledgedgate', 'acknowledgedyard', 'exitedyard', 'send to yard', 'officer checked', 'cancelled', 'detained'].includes(container.status.toLowerCase())
             }">
          {{ container.status }}
        </div>
      </div>
      
      <div class="px-1">
        <StatusTimeline 
          :status-items="statusItems" 
          :show-back-button="false"
        />
      </div>
    </div>
    
    <div class="sticky bottom-0 p-4 bg-white border-t">
      <ButtonComponent variant="default" class="w-full" @click="handleClose">
        Close
      </ButtonComponent>
    </div>
  </div>
</template> 