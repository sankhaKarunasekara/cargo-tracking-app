<script setup lang="ts">
import { ref, computed, onMounted, provide, onUnmounted } from 'vue'
import FilterSection from '../components/FilterSection.vue'
import ContainerCard from '../components/ContainerCard.vue'
import Pagination from '../components/ui/pagination'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'
import StatusTimelineSheet from '../components/StatusTimelineSheet.vue'
import { useWindowSize } from '../lib/hooks/useWindowSize'
import { 
  getAllContainerData, 
  filterContainers, 
  calculateContainerStats,
  AnonymizedContainer
} from '../lib/data'

// Define page metadata
definePageMeta({
  title: 'Container Tracking',
  description: 'Track and monitor your containers with real-time location and status updates'
})

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

// Get data from our data utilities
const allContainers = ref<AnonymizedContainer[]>(getAllContainerData())

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(filteredContainers.value.length / itemsPerPage))
const displayedItemsCount = ref(itemsPerPage)

// Modal state
const selectedContainer = ref<AnonymizedContainer | null>(null)
const showDetailsModal = ref(false)
const showFilters = ref(false)

// Timeline sheet state
const timelineSheetOpen = ref(false)
const selectedTimelineItem = ref({
  id: '',
  type: 'container',
  status: ''
})

// Date range for filtering
const dateRange = ref({
  startDate: '',
  endDate: ''
})

// Filter containers based on our filter utilities
const filteredContainers = computed(() => {
  return filterContainers({
    containerNumber: filters.value.find(f => f.id === 'container')?.value,
    location: filters.value.find(f => f.id === 'location')?.value,
    status: activeStatusFilter.value !== 'all' ? activeStatusFilter.value : undefined,
    startDate: dateRange.value.startDate || undefined,
    endDate: dateRange.value.endDate || undefined
  });
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
const handleViewDetails = (container: AnonymizedContainer) => {
  selectedContainer.value = container
  showDetailsModal.value = true
}

// Handle view timeline
const handleViewTimeline = (container: AnonymizedContainer) => {
  selectedTimelineItem.value = {
    id: container.id,
    type: 'container',
    status: container.status
  }
  timelineSheetOpen.value = true
}

// Toggle filters visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

// Handle reset
const handleReset = () => {
  filters.value = filters.value.map(filter => ({ ...filter, value: '' }))
  dateRange.value = { startDate: '', endDate: '' }
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
}

// Provide the toggleFilters function to the navbar
provide('toggleFilters', toggleFilters)

// Alternatively, if you have a more sophisticated event bus system:
onMounted(() => {
  document.addEventListener('toggle-filters', toggleFilters)
})

// Add cleanup if necessary
onUnmounted(() => {
  document.removeEventListener('toggle-filters', toggleFilters)
})
</script>

<template>
  <div class="min-h-screen pb-20 bg-gray-50">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Status Tabs -->
      <div class="p-3 mt-6 mb-5 overflow-x-auto bg-white rounded-lg shadow-sm">
        <div class="flex space-x-2">
          <button 
            v-for="tab in statusTabs" 
            :key="tab.id"
            @click="setActiveStatus(tab.id)"
            :class="[
              'px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
              tab.active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      
      <!-- Simple filter toggle button -->
      <div class="p-4 mb-5 bg-white rounded-lg shadow-sm">
        <button 
          @click="toggleFilters" 
          class="flex items-center text-sm font-medium text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span>Advanced Filters</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="ml-2 transition-transform" 
            :class="{ 'rotate-180': showFilters }"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <!-- Filters panel -->
      <div v-if="showFilters" class="p-5 mb-5 bg-white rounded-lg shadow-sm">
        <FilterSection
          :filters="filters"
          @update:filters="handleFilterUpdate"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>
      
      <div class="flex flex-col md:flex-row md:space-x-5">
        <!-- Side Panel with filters (larger screens only) -->
        <div 
          class="flex-shrink-0 hidden h-auto mb-5 transition-all duration-200 bg-white rounded-lg shadow-sm lg:block lg:w-64 xl:w-80 lg:sticky lg:top-16 lg:self-start"
        >
          <div class="p-5 lg:p-4">
            <h2 class="mb-5 text-lg font-medium">Advanced Filters</h2>
            
            <!-- Date Range Picker -->
            <div class="mb-6">
              <h3 class="mb-3 text-sm font-medium text-gray-700">Date Range</h3>
              <div class="space-y-4">
                <div>
                  <label for="startDate" class="block mb-2 text-sm text-gray-500">From</label>
                  <input
                    id="startDate"
                    type="date"
                    v-model="dateRange.startDate"
                    class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label for="endDate" class="block mb-2 text-sm text-gray-500">To</label>
                  <input
                    id="endDate"
                    type="date"
                    v-model="dateRange.endDate"
                    class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <!-- Text filters -->
            <div class="space-y-5">
              <div v-for="filter in filters" :key="filter.id" class="space-y-2">
                <label :for="filter.id" class="block text-sm font-medium text-gray-700">{{ filter.label }}</label>
                
                <select
                  v-if="filter.type === 'select'"
                  :id="filter.id"
                  class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :value="filter.value"
                  @change="(e) => handleFilterUpdate(filters.map(f => f.id === filter.id ? { ...f, value: (e.target as HTMLSelectElement).value } : f))"
                >
                  <option value="">Select {{ filter.label }}</option>
                  <option
                    v-for="option in filter.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                
                <input
                  v-else
                  :id="filter.id"
                  type="text"
                  :placeholder="filter.placeholder || `Enter ${filter.label}`"
                  class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :value="filter.value"
                  @input="(e) => handleFilterUpdate(filters.map(f => f.id === filter.id ? { ...f, value: (e.target as HTMLInputElement).value } : f))"
                />
              </div>
            </div>
            
            <!-- Buttons -->
            <div class="flex flex-col mt-8 space-y-3">
              <button 
                @click="handleSearch" 
                class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Apply Filters
              </button>
              
              <button 
                @click="handleReset" 
                class="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <path d="M2 12C2 6.48 6.48 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12"></path>
                  <path d="M8 12H16"></path>
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      
        <!-- Main content area -->
        <div class="flex-1 mt-5">
          <div class="mt-5">
            <!-- Empty state -->
            <div v-if="filteredContainers.length === 0" class="py-10 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p class="mb-4">No containers found matching your filters</p>
              <button 
                @click="handleReset" 
                class="px-5 py-2.5 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
            
            <div v-else>
              <!-- Results count -->
              <div class="flex flex-col mb-5 md:flex-row md:items-center md:justify-between">
                <p class="mb-2 text-sm text-gray-500 md:mb-0">Found {{ filteredContainers.length }} containers</p>
              </div>
              
              <!-- Container cards -->
              <div class="w-full space-y-5">
                <ContainerCard
                  v-for="container in paginatedContainers"
                  :key="container.id"
                  :container="container"
                  @viewDetails="handleViewDetails"
                  @viewTimeline="handleViewTimeline"
                  class="mb-5"
                />
              </div>
              
              <!-- Pagination for desktop, Load More for mobile -->
              <div class="flex justify-center mt-8">
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
                  class="w-full px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-300 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
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
      </div>
    </div>
    
    <!-- Bottom navigation -->
    <AppBottomNavigation />
    
    <!-- Status Timeline Sheet -->
    <StatusTimelineSheet
      v-model:isOpen="timelineSheetOpen"
      :itemId="selectedTimelineItem.id"
      :itemType="selectedTimelineItem.type"
      :status="selectedTimelineItem.status"
    />
  </div>
</template> 