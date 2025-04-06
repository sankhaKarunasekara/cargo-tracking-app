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
    icon?: string;
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

// Format date to be human readable
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.round(diffMs / 60000)
  
  if (diffMins < 60) {
    return `${diffMins} minutes ago`
  } else if (diffMins < 1440) {
    return `${Math.floor(diffMins / 60)} hours ago`
  } else {
    return `${Math.floor(diffMins / 1440)} days ago`
  }
}
</script>

<template>
  <div class="timeline-container">
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
        <div class="timeline-line" v-if="index < statusItems.length - 1"></div>
        
        <div class="timeline-icon-container">
          <div class="timeline-icon" :class="item.completed ? 'completed' : ''">
            <span v-if="item.icon" v-html="item.icon"></span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M7 12l5 5 5-5"></path>
            </svg>
          </div>
        </div>
        
        <div class="timeline-content">
          <h3 class="timeline-title">{{ item.title }}</h3>
          <p class="timeline-date">{{ formatDate(item.date) }}</p>
          <p v-if="item.description" class="timeline-description">{{ item.description }}</p>
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
  padding: 1.5rem;
  background-color: #ffffff;
  color: #1f2937;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  position: relative;
}

.timeline-item {
  display: flex;
  position: relative;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-line {
  position: absolute;
  left: 9px;
  top: 24px;
  bottom: 0;
  width: 2px;
  background-color: #e5e7eb;
}

.timeline-icon-container {
  margin-right: 1rem;
  z-index: 1;
}

.timeline-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
}

.timeline-icon.completed {
  background-color: #2563eb;
  color: #ffffff;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.timeline-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 0.875rem;
  color: #4b5563;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .timeline-container {
    padding: 1rem;
  }
  
  .back-button {
    width: 100%;
    justify-content: center;
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
}
</style> 