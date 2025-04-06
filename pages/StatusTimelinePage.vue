<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import StatusTimeline from '../components/StatusTimeline.vue'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetClose
} from '../components/ui/sheet'

const route = useRoute()
const isSheetOpen = ref(true)
const title = ref('Status Timeline')
const isLoading = ref(true)

// Helper function to get dates relative to now
const getRelativeDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

// Simple close function
const closeSheet = () => {
  isSheetOpen.value = false
}

// Simulate loading effect
setTimeout(() => {
  isLoading.value = false
}, 800)

// Default status items
const statusItems = ref([
  {
    title: 'Declaration Submitted',
    date: getRelativeDate(3), // 3 days ago
    description: 'Customs declaration submitted to customs authority for processing.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
  },
  {
    title: 'Channel Assessment',
    date: getRelativeDate(2), // 2 days ago
    description: 'Declaration assessed and assigned to YELLOW channel for document verification.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path><path d="M3 13h3a2 2 0 0 1 2 2v3"></path><path d="M16 13h3a2 2 0 0 1 2 2v3"></path></svg>'
  },
  {
    title: 'Document Verification',
    date: getRelativeDate(1), // 1 day ago
    description: 'Documents reviewed by customs officer. Additional information requested for cargo details.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>'
  },
  {
    title: 'Duty Assessment',
    date: getRelativeDate(0.5), // 12 hours ago
    description: 'Customs duties and taxes calculated. Payment notification sent to declarant.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>'
  },
  {
    title: 'Payment Completed',
    date: getRelativeDate(0.2), // 5 hours ago
    description: 'Payment of customs duties and taxes confirmed. Awaiting release approval.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>'
  },
  {
    title: 'Goods Released',
    date: getRelativeDate(0), // Just now
    description: 'Customs release order issued. Cargo cleared for delivery to consignee.',
    completed: false,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
  }
])

// Create a function to generate rejected timeline
const getRejectedTimeline = () => {
  return [
    {
      title: 'Declaration Submitted',
      date: getRelativeDate(3),
      description: 'Customs declaration submitted to customs authority for processing.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>'
    },
    {
      title: 'Channel Assessment',
      date: getRelativeDate(2),
      description: 'Declaration assessed and assigned to RED channel for full inspection.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path><path d="M3 13h3a2 2 0 0 1 2 2v3"></path><path d="M16 13h3a2 2 0 0 1 2 2v3"></path></svg>'
    },
    {
      title: 'Document Verification',
      date: getRelativeDate(1.5),
      description: 'Documents reviewed by customs officer. Discrepancies found in product classification.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    },
    {
      title: 'Physical Inspection',
      date: getRelativeDate(1),
      description: 'Physical inspection of goods conducted. Goods do not match declaration details.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path><path d="M15 3v6h6"></path><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"></path><path d="M8 13h0"></path><path d="M16 13h0"></path></svg>'
    },
    {
      title: 'Declaration Rejected',
      date: getRelativeDate(0),
      description: 'Declaration rejected due to incorrect product classification and mismatched goods details. Please submit a corrected declaration.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
    }
  ]
}

// Status items for container 
const getContainerTimeline = () => {
  return [
    {
      title: 'Vessel Departed',
      date: getRelativeDate(10),
      description: 'Vessel departed from origin port with container on board.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16l-4-4-4 4-4-4-4 4"></path><path d="M4 8l4 4 4-4 4 4 4-4"></path></svg>'
    },
    {
      title: 'Vessel Arrived',
      date: getRelativeDate(3),
      description: 'Vessel arrived at destination port. Container awaiting unloading.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h20"></path><path d="M22 17H16v4h6v-4z"></path><path d="M8 17H2v4h6v-4z"></path><circle cx="12" cy="17" r="2"></circle></svg>'
    },
    {
      title: 'Container Discharged',
      date: getRelativeDate(2),
      description: 'Container unloaded from vessel and moved to terminal yard.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11v6"></path><path d="M8 11v6"></path><path d="M16 11v6"></path></svg>'
    },
    {
      title: 'Customs Clearance',
      date: getRelativeDate(1),
      description: 'Container undergoing customs inspection and clearance procedures.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
    },
    {
      title: 'Ready for Pickup',
      date: getRelativeDate(0.5),
      description: 'Container cleared and ready for pickup by consignee or transport operator.',
      completed: true,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="9" r="1"></circle><circle cx="19" cy="9" r="1"></circle><circle cx="5" cy="15" r="1"></circle><circle cx="19" cy="15" r="1"></circle><path d="M5 9h14"></path><path d="M5 15h14"></path></svg>'
    },
    {
      title: 'Delivery In Progress',
      date: getRelativeDate(0),
      description: 'Container in transit to final destination.',
      completed: false,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h14V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4z"></path><path d="M21 16V8a2 2 0 0 0-2-2h-5"></path><path d="M3 19h18a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H3"></path><path d="M8 19v2"></path><path d="M16 19v2"></path></svg>'
    }
  ]
}

// Get status color based on status type
const getStatusColor = (status: any) => {
  if (!status) return 'default';
  const statusLower = status.toString().toLowerCase();
  if (statusLower === 'released') return 'success';
  if (statusLower === 'processing') return 'info';
  if (statusLower === 'waiting confirmation') return 'warning';
  if (statusLower === 'on hold') return 'purple';
  if (statusLower === 'rejected') return 'error';
  return 'default';
}

// Load timeline based on route params
onMounted(() => {
  const type = route.query.type || 'cusdec'
  const id = route.query.id

  if (type && id) {
    if (type.toString().toLowerCase() === 'cusdec') {
      title.value = `CusDec ${id.toString()} Status Timeline`
      const itemStatus = route.query.status?.toString().toLowerCase() || ''
      
      if (itemStatus === 'rejected') {
        statusItems.value = getRejectedTimeline()
      }
    } else if (type.toString().toLowerCase() === 'container') {
      title.value = `Container ${id.toString()} Status Timeline`
      statusItems.value = getContainerTimeline()
    } else {
      title.value = `${type.toString().toUpperCase()} ${id.toString()} Status`
    }
  }
})
</script>

<template>
  <Sheet :open="isSheetOpen" @update:open="isSheetOpen = $event">
    <SheetContent side="right" class="timeline-sheet w-full sm:max-w-md md:max-w-lg flex flex-col h-full overflow-hidden">
      <SheetHeader class="timeline-header mb-6 flex-shrink-0">
        <div class="flex items-center justify-between">
          <SheetTitle class="text-xl font-bold text-gray-900">{{ title }}</SheetTitle>
          <SheetClose>
            <button 
              @click="closeSheet" 
              class="close-button inline-flex items-center justify-center p-2 text-gray-400 transition-colors rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span class="sr-only">Close panel</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </SheetClose>
        </div>
        <SheetDescription class="text-gray-600">
          Track the customs clearance progress and current processing stage.
        </SheetDescription>
        
        <!-- Status indicator badge -->
        <div v-if="route.query.status" class="mt-4">
          <div 
            class="status-badge inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-700 border border-green-200': getStatusColor(route.query.status) === 'success',
              'bg-blue-100 text-blue-700 border border-blue-200': getStatusColor(route.query.status) === 'info',
              'bg-amber-100 text-amber-700 border border-amber-200': getStatusColor(route.query.status) === 'warning',
              'bg-purple-100 text-purple-700 border border-purple-200': getStatusColor(route.query.status) === 'purple',
              'bg-red-100 text-red-700 border border-red-200': getStatusColor(route.query.status) === 'error',
              'bg-gray-100 text-gray-700 border border-gray-200': getStatusColor(route.query.status) === 'default'
            }"
          >
            <span class="status-dot" 
              :class="{
                'bg-green-500': getStatusColor(route.query.status) === 'success',
                'bg-blue-500': getStatusColor(route.query.status) === 'info',
                'bg-amber-500': getStatusColor(route.query.status) === 'warning',
                'bg-purple-500': getStatusColor(route.query.status) === 'purple',
                'bg-red-500': getStatusColor(route.query.status) === 'error',
                'bg-gray-500': getStatusColor(route.query.status) === 'default'
              }"
            ></span>
            {{ route.query.status }}
          </div>
        </div>
      </SheetHeader>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <div class="loader"></div>
      </div>
      
      <!-- Timeline content -->
      <div v-else class="timeline-wrapper overflow-y-auto flex-1 custom-scrollbar pr-1">
        <StatusTimeline 
          :status-items="statusItems" 
          :show-back-button="false"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>

<style scoped>
.timeline-sheet {
  animation: slide-in 0.3s ease-out;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.timeline-header {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 1rem;
}

.timeline-wrapper {
  animation: fade-in 0.4s ease-out 0.2s both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-badge {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-dot {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.close-button {
  transition: all 0.2s ease;
}

.close-button:hover {
  transform: rotate(90deg);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(203, 213, 225, 0.4);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(148, 163, 184, 0.6);
}

/* Loader */
.loader {
  width: 36px;
  height: 36px;
  border: 3px solid #e5e7eb;
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 