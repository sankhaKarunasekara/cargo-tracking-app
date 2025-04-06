<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  statusItems: Array<{
    title: string;
    date: string;
    description?: string;
    completed: boolean;
    icon?: string;
  }>;
  showBackButton?: boolean;
}>()

// Set default value (but we'll generally hide the back button)
const showBackButton = props.showBackButton ?? false

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
    <div class="timeline">
      <div
        v-for="(item, index) in statusItems"
        :key="index"
        class="timeline-item"
        :class="{'timeline-item-complete': item.completed, 'timeline-item-current': index === statusItems.length - 1 && !item.completed}"
      >
        <div class="timeline-line" v-if="index < statusItems.length - 1"></div>
        
        <div class="timeline-icon-container">
          <div class="timeline-icon" :class="item.completed ? 'completed' : index === statusItems.length - 1 ? 'current' : ''">
            <span v-if="item.icon" v-html="item.icon"></span>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
              <path d="M7 12l5 5 5-5"></path>
            </svg>
          </div>
        </div>
        
        <div class="timeline-content">
          <h3 class="timeline-title" :class="{'font-bold': !item.completed && index === statusItems.length - 1}">
            {{ item.title }}
            <span v-if="index === statusItems.length - 1 && !item.completed" class="current-status-pill">Current</span>
          </h3>
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
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
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
  transition: transform 0.2s ease;
}

.timeline-item:hover {
  transform: translateX(2px);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item-complete .timeline-content {
  opacity: 0.9;
}

.timeline-item-current .timeline-content {
  opacity: 1;
  transform: scale(1.01);
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.timeline-icon.completed {
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.timeline-icon.current {
  background-color: #f59e0b;
  color: #ffffff;
  animation: pulse 2s infinite;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(245, 158, 11, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
  }
}

.timeline-content {
  flex: 1;
  transition: all 0.3s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.timeline-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
  margin-top: 0.25rem;
}

.current-status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #fef3c7;
  color: #d97706;
  border-radius: 9999px;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .timeline-container {
    padding: 1rem;
  }
  
  .timeline-item {
    padding-bottom: 1.5rem;
  }
}
</style> 