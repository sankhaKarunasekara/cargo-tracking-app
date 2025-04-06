<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FilterSection from '../components/FilterSection.vue'
import ContainerCard from '../components/ContainerCard.vue'
import Pagination from '../components/ui/pagination'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { useWindowSize } from '../lib/hooks/useWindowSize'

// Get window size and mobile status
const { isMobile } = useWindowSize()

// Define filter type
type Filter = {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'select';
  options?: Array<{ value: string; label: string }>;
  value: string;
};

// Status tabs
const statusTabs = ref([
  { id: 'all', label: 'All', active: true },
  { id: 'scanning', label: 'Scanning', active: false },
  { id: 'officer_checked', label: 'Officer Checked', active: false },
  { id: 'send_to_yard', label: 'Send To Yard', active: false }
])

// Active status filter
const activeStatusFilter = ref('all')

// Set active status tab
const setActiveStatus = (statusId: string) => {
  statusTabs.value = statusTabs.value.map(tab => ({
    ...tab,
    active: tab.id === statusId
  }))
  activeStatusFilter.value = statusId
}

// Filters state
const filters = ref<Filter[]>([
  {
    id: 'container',
    label: 'Container',
    type: 'text',
    placeholder: 'Enter container number',
    value: ''
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'Enter location',
    value: ''
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'scanning', label: 'Scanning' },
      { value: 'officer_checked', label: 'Officer Checked' },
      { value: 'send_to_yard', label: 'Send To Yard' }
    ],
    value: ''
  }
])

// Sample data for containers
const allContainers = ref([
  {
    id: '1',
    number: 'Container1',
    location: 'Yard1',
    status: 'Scanning',
    shippingLine: 'MSC',
    vesselName: 'MSC Anna',
    voyage: 'V123',
    size: '40ft'
  },
  {
    id: '2',
    number: 'Container2',
    location: 'Yard2',
    status: 'Officer Checked',
    shippingLine: 'Maersk',
    vesselName: 'Maersk Sealand',
    voyage: 'V456',
    size: '20ft'
  },
  {
    id: '3',
    number: 'Container3',
    location: 'Yard3',
    status: 'Send To Yard',
    shippingLine: 'CMA CGM',
    vesselName: 'CMA CGM Marco Polo',
    voyage: 'V789',
    size: '40ft HC'
  },
  {
    id: '4',
    number: 'Container4',
    location: 'Yard1',
    status: 'Scanning',
    shippingLine: 'Hapag-Lloyd',
    vesselName: 'Hapag Hamburg',
    voyage: 'V321',
    size: '20ft'
  },
  {
    id: '5',
    number: 'Container5',
    location: 'Yard2',
    status: 'Officer Checked',
    shippingLine: 'COSCO',
    vesselName: 'COSCO Europe',
    voyage: 'V654',
    size: '40ft'
  }
])

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(filteredContainers.value.length / itemsPerPage))
const displayedItemsCount = ref(itemsPerPage)

// Modal state
const selectedContainer = ref(null)
const showDetailsModal = ref(false)
const showFilters = ref(false)

// Filter containers based on filters and active status
const filteredContainers = computed(() => {
  return allContainers.value.filter(container => {
    const containerFilter = filters.value.find(f => f.id === 'container')
    const locationFilter = filters.value.find(f => f.id === 'location')
    const statusFilter = filters.value.find(f => f.id === 'status')
    
    const matchesContainer = !containerFilter?.value || 
      container.number.toLowerCase().includes(containerFilter.value.toLowerCase())
    
    const matchesLocation = !locationFilter?.value || 
      container.location.toLowerCase().includes(locationFilter.value.toLowerCase())
    
    const matchesStatus = !statusFilter?.value || 
      container.status.toLowerCase().includes(statusFilter.value.toLowerCase())
    
    const matchesTabStatus = activeStatusFilter.value === 'all' || 
      container.status.toLowerCase().replace(' ', '_') === activeStatusFilter.value
    
    return matchesContainer && matchesLocation && matchesStatus && matchesTabStatus
  })
})

// Get paginated containers
const paginatedContainers = computed(() => {
  // For desktop view - use pagination
  if (!isMobile.value) {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredContainers.value.slice(start, end)
  }
  // For mobile view - use "load more" approach
  return filteredContainers.value.slice(0, displayedItemsCount.value)
})

// Loading state for Load More
const isLoadingMore = ref(false)

// Load more items for mobile view
const loadMoreItems = () => {
  isLoadingMore.value = true
  
  // Add small delay to simulate loading
  setTimeout(() => {
    displayedItemsCount.value += itemsPerPage
    isLoadingMore.value = false
  }, 500)
}

// Check if there are more items to load
const hasMoreItems = computed(() => {
  return displayedItemsCount.value < filteredContainers.value.length
})

// Handle pagination change (for desktop)
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Handle search
const handleSearch = () => {
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
  showFilters.value = false
}

// Handle filter update
const handleFilterUpdate = (updatedFilters: any[]) => {
  filters.value = updatedFilters
}

// Handle view details
const handleViewDetails = (container: any) => {
  selectedContainer.value = container
  showDetailsModal.value = true
}

// Toggle filters visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

// Handle reset
const handleReset = () => {
  filters.value = filters.value.map(filter => ({ ...filter, value: '' }))
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
}
</script>

<template>
  <div class="pb-20 bg-gray-50 min-h-screen">
    <div class="bg-white shadow-sm sticky top-0 z-10">
      <div class="container mx-auto">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-xl font-bold">Container Tracking</h1>
          <button 
            @click="toggleFilters" 
            class="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-4">
      <!-- Status Tabs -->
      <div class="bg-white rounded-lg shadow-sm mt-4 p-2 overflow-x-auto">
        <div class="flex space-x-1 min-w-max">
          <button 
            v-for="tab in statusTabs" 
            :key="tab.id"
            @click="setActiveStatus(tab.id)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              tab.active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      
      <Accordion v-model="showFilters" type="single" collapsible class="mt-4">
        <AccordionItem value="filters">
          <AccordionTrigger class="p-3 bg-white rounded-t-lg shadow-sm">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span>Advanced Filters</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              :filters="filters"
              @update:filters="handleFilterUpdate"
              @search="handleSearch"
              @reset="handleReset"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div class="mt-4">
        <!-- Empty state -->
        <div v-if="filteredContainers.length === 0" class="bg-white rounded-lg shadow-sm py-8 text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <p>No containers found matching your filters</p>
          <button 
            @click="handleReset" 
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
        
        <div v-else>
          <!-- Results count -->
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm text-gray-500">Found {{ filteredContainers.length }} containers</p>
            
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">View:</span>
              <button class="p-1.5 bg-blue-50 text-blue-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Container cards -->
          <ContainerCard
            v-for="container in paginatedContainers"
            :key="container.id"
            :container="container"
            @viewDetails="handleViewDetails"
          />
          
          <!-- Pagination for desktop, Load More for mobile -->
          <div class="flex justify-center mt-6">
            <!-- Pagination (desktop only) -->
            <div class="hidden md:block">
              <Pagination
                :total-pages="totalPages"
                :current-page="currentPage"
                @change="handlePageChange"
              />
            </div>
            
            <!-- Load More button (mobile only) -->
            <button
              v-if="hasMoreItems"
              @click="loadMoreItems"
              :disabled="isLoadingMore"
              class="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            >
              <span v-if="isLoadingMore" class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
              <span v-else>Load More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom navigation -->
    <AppBottomNavigation />
  </div>
</template> 