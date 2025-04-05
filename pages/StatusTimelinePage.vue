<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusTimeline from '../components/StatusTimeline.vue'

const route = useRoute()
const router = useRouter()

const title = ref('Status Timeline')
const statusItems = ref([
  {
    title: 'Submitted',
    date: '01/03/2025',
    completed: true
  },
  {
    title: 'Review',
    date: '02/03/2025',
    completed: true
  },
  {
    title: 'Paid',
    date: '02/03/2025',
    description: 'LKR 2500 paid',
    completed: true
  },
  {
    title: 'Paid Invoice',
    date: '04/03/2025',
    description: 'LKR 20500 paid',
    completed: true
  },
  {
    title: 'Start Container Scanning',
    date: '10/03/2025',
    completed: false
  },
  {
    title: 'Scanning Completed',
    date: '15/03/2025',
    completed: false
  }
])

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
  <div class="min-h-screen bg-white">
    <!-- Header with sticky position -->
    <div class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="container mx-auto">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-0 sm:px-4">
      <StatusTimeline 
        :status-items="statusItems" 
        :show-back-button="true"
        :back-label="'Back'"
      />
    </div>
  </div>
</template> 