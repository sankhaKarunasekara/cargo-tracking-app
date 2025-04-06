<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const router = useRouter()

const title = ref('Status Timeline')
const isSheetOpen = ref(true) // Start with the sheet open by default

// Helper function to get dates relative to now
const getRelativeDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

const statusItems = ref([
  {
    title: 'Forked Repository',
    date: getRelativeDate(0.01), // 15 minutes ago
    description: 'Forked the repository to create a new branch for development.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v3"></path></svg>'
  },
  {
    title: 'Pull Request Submitted',
    date: getRelativeDate(0.007), // 10 minutes ago
    description: 'Submitted PR #342 with new feature implementation. Waiting for code review from team leads.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><path d="M6 9v12"></path></svg>'
  },
  {
    title: 'Comparing Branches',
    date: getRelativeDate(0.0035), // 5 minutes ago
    description: 'Received comments on PR. Minor adjustments needed in error handling and documentation.',
    completed: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 16l-5-5 5-5"></path><path d="M17 21v-2a4 4 0 0 0-4-4H5"></path><path d="M16 16l5-5-5-5"></path></svg>'
  },
  {
    title: 'Merged Branch',
    date: getRelativeDate(0), // Just now
    description: 'Merged the feature branch into the main branch. Ready for deployment.',
    completed: false,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>'
  }
])

// Handle back navigation
const goBack = () => {
  router.back()
}

// Close sheet and then go back
const closeAndGoBack = () => {
  isSheetOpen.value = false
  setTimeout(() => {
    router.back()
  }, 300) // Wait for animation to complete
}

// Watch for sheet close and navigate back when closed
watch(isSheetOpen, (newValue) => {
  if (!newValue) {
    setTimeout(() => {
      router.back()
    }, 300) // Wait for animation to complete
  }
})

// If there's an ID parameter, we could load specific status data
onMounted(() => {
  // Get type and ID from route parameters
  const type = route.query.type || 'cusdec'
  const id = route.query.id
  
  if (type && id) {
    title.value = `${type.toString().toUpperCase()} ${id.toString()} Status`
    // In a real app, we would load status data based on type and id
    // loadStatusData(type, id)
  }
})
</script>

<template>
  <Sheet :open="isSheetOpen" @update:open="isSheetOpen = $event">
    <SheetContent side="right" class="w-full sm:max-w-md md:max-w-lg">
      <SheetHeader class="mb-6">
        <div class="flex items-center justify-between">
          <SheetTitle class="text-xl font-bold text-gray-900">{{ title }}</SheetTitle>
          <SheetClose>
            <button 
              @click="closeAndGoBack" 
              class="inline-flex items-center justify-center p-2 text-gray-400 transition-colors rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span class="sr-only">Close panel</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </SheetClose>
        </div>
        <SheetDescription>
          Track the current status and progress of this item.
        </SheetDescription>
      </SheetHeader>
      
      <div class="overflow-auto">
        <StatusTimeline 
          :status-items="statusItems" 
          :show-back-button="false"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>

<style scoped>
.container {
  max-width: 768px;
}
</style> 