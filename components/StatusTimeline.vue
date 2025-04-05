<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  statusItems: Array<{
    title: string;
    date: string;
    description?: string;
    completed: boolean;
  }>;
  showBackButton?: boolean;
  backLabel?: string;
}>()

// Set default values
const showBackButton = props.showBackButton ?? true
const backLabel = props.backLabel ?? 'Back'

// Handle back button click
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="timeline-container bg-white">
    <!-- Back button for mobile -->
    <div v-if="showBackButton" class="back-button-container">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        <span>{{ backLabel }}</span>
      </button>
    </div>
    
    <div class="timeline">
      <div
        v-for="(item, index) in statusItems"
        :key="index"
        class="timeline-item"
      >
        <div class="flex items-start">
          <div class="timeline-indicator-container">
            <div 
              class="timeline-indicator"
              :class="item.completed ? 'bg-primary' : 'bg-secondary'"
            ></div>
            
            <div 
              v-if="index < statusItems.length - 1" 
              class="timeline-connector"
              :class="item.completed ? 'bg-primary' : 'bg-secondary'"
            ></div>
          </div>
          
          <div 
            class="timeline-content"
            :class="item.completed ? 'border-l-4 border-primary' : 'border-l-4 border-secondary'"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
              <span class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">{{ item.date }}</span>
            </div>
            <p 
              v-if="item.description" 
              class="mt-1 text-sm text-gray-600"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
}

.back-button-container {
  margin-bottom: 1.5rem;
  display: flex;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.1s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background-color: #e5e7eb;
}

.back-button:active {
  transform: translateY(1px);
}

.timeline {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.timeline-item {
  margin-bottom: 1.5rem;
  width: 100%;
}

.timeline-indicator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.75rem;
  min-width: 1rem;
}

.timeline-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 10;
}

.timeline-connector {
  height: 2.5rem;
  width: 2px;
  margin-top: 4px;
}

.timeline-content {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.bg-primary {
  background-color: #2563eb;
}

.bg-secondary {
  background-color: #cbd5e1;
}

.border-primary {
  border-color: #2563eb;
}

.border-secondary {
  border-color: #cbd5e1;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .timeline-container {
    padding: 0.75rem;
  }
  
  .timeline-content {
    padding: 0.5rem 0.75rem;
  }
  
  .timeline-connector {
    height: 2rem;
  }
  
  .back-button {
    width: 100%;
    justify-content: center;
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
}
</style> 