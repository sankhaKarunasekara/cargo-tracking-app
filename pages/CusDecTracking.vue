<script setup lang="ts">
import { ref, computed, onMounted, watch, provide, onUnmounted } from 'vue'
import FilterSection from '../components/FilterSection.vue'
import CusDecCard from '../components/CusDecCard.vue'
import { Pagination } from '../components/ui/pagination'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import StatusTimelineSheet from '../components/StatusTimelineSheet.vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '../lib/hooks/useWindowSize'
// import ItemDetailsSheet from '../components/ItemDetailsSheet.vue'
import { 
  getAllCusDecData, 
  filterCusDecs, 
  calculateCusDecStats,
  AnonymizedCusDecRecord,
  cusDecStatusTabs,
  cusDecFilterDefinitions,
  FilterDefinition,
  getDefaultDateRange,
  formatCusDecDate,
  mapCusDecStatusToProcessingStage,
  getCusDecStatusBadgeClass
} from '../lib/data'

// Define page metadata
// definePageMeta({
//   title: 'CusDec Tracking',
//   description: 'Track and manage your customs declarations with real-time status updates'
// })

// Get window size and mobile status
const { isMobile } = useWindowSize()

// Status tabs
const statusTabs = ref([...cusDecStatusTabs])

// Active status filter
const activeStatusFilter = ref('all')

// Set active status tab
const setActiveStatus = (statusId: string) => {
  console.log("Setting active status to:", statusId);
  
  statusTabs.value = statusTabs.value.map(tab => ({
    ...tab,
    active: tab.id === statusId
  }))
  activeStatusFilter.value = statusId
  
  // When changing tabs, reset to page 1
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
}

// Date range for filtering
const dateRange = ref(getDefaultDateRange())

// Filters state
const filters = ref<FilterDefinition[]>([...cusDecFilterDefinitions])

// Get real data from our anonymized dataset
const allCusDecs = ref<AnonymizedCusDecRecord[]>(getAllCusDecData())

// Sidebar and filter visibility state
const showSidebar = ref(false)
const showFilters = ref(false)

// Timeline sheet state
const timelineSheetOpen = ref(false)
const selectedTimelineItem = ref({
  id: '',
  type: 'cusdec',
  status: ''
})

// Details sheet state
const detailsSheetOpen = ref(false)
const selectedCusDecId = ref('')

// Set sidebar and filters visibility based on screen size
onMounted(() => {
  // Check if screen is larger than mobile (md breakpoint)
  const isDesktop = window.innerWidth >= 768
  
  // For mobile view, always start with sidebar hidden
  if (!isDesktop) {
    showSidebar.value = false
    showFilters.value = false
  } else {
    // For desktop, always show the sidebar in the UI
    showSidebar.value = true
    // But keep filters collapsed initially
    showFilters.value = false
  }
  
  // Add resize listener to update visibility
  const handleResize = () => {
    const isDesktopNow = window.innerWidth >= 768
    if (isDesktopNow && !isMobile.value) {
      // Transitioning to desktop
      showSidebar.value = true
    } else if (!isDesktopNow && isMobile.value) {
      // Transitioning to mobile - hide sidebar by default
      showSidebar.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  // Debug data loading
  console.log("Component mounted with data:", allCusDecs.value.length, "records")
  
  // Set up document listener for filter toggle events from navbar
  document.addEventListener('toggle-filters', toggleFilters)
  
  return () => {
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('toggle-filters', toggleFilters)
  }
})

// Toggle sidebar function
const toggleSidebar = () => {
  // For mobile view, we directly toggle the showSidebar value
  if (isMobile.value) {
    showSidebar.value = !showSidebar.value
  } else {
    // For desktop view, we toggle the showFilters value
    // This is separate from showSidebar which controls visibility on mobile
    showFilters.value = !showFilters.value
  }
}

// Toggle filters function (for navbar integration)
const toggleFilters = () => {
  // This function is called from other components
  // Delegate to toggleSidebar for consistent behavior
  toggleSidebar()
}

// Provide the toggle function to allow other components to toggle filters
provide('toggleFilters', toggleFilters)

// Define cusdec stats
const cusDecStats = calculateCusDecStats()

// Handle filter update
const handleFilterUpdate = (updatedFilters: FilterDefinition[]) => {
  filters.value = updatedFilters
}

// Update date range
const updateDateRange = (start: string, end: string) => {
  dateRange.value.startDate = start
  dateRange.value.endDate = end
}

// Handle search button click
const handleSearch = () => {
  // Reset pagination
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
  
  // On mobile, close the filters panel after search
  if (isMobile.value) {
    showSidebar.value = false
  }
}

// Handle reset
const handleReset = () => {
  // Reset all filters
  filters.value = filters.value.map(filter => ({ ...filter, value: '' }))
  
  // Reset date range
  dateRange.value = getDefaultDateRange()
  
  // Reset pagination
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
}

// Filter CusDecs based on filters, active status, and date range
const filteredCusDecs = computed(() => {
  // First get data filtered by basic criteria
  let filtered = filterCusDecs({
    cusdecNumber: filters.value.find(f => f.id === 'cusdecNumber')?.value,
    declarantTIN: filters.value.find(f => f.id === 'declarantTIN')?.value,
    consigneeTIN: filters.value.find(f => f.id === 'consigneeTIN')?.value,
    startDate: dateRange.value.startDate,
    endDate: dateRange.value.endDate
  });
  
  // Then apply processing stage filter if needed
  if (activeStatusFilter.value !== 'all') {
    filtered = filtered.filter(record => {
      return mapCusDecStatusToProcessingStage(record.status).toLowerCase() === activeStatusFilter.value.toLowerCase();
    });
  }
  
  // Sort results to prioritize "Waiting Confirmation" items first, then "Processing" items if in "All" tab
  if (activeStatusFilter.value === 'all') {
    filtered.sort((a, b) => {
      // First priority: Waiting Confirmation status
      if (a.status.toLowerCase() === 'waiting confirmation' && b.status.toLowerCase() !== 'waiting confirmation') return -1;
      if (a.status.toLowerCase() !== 'waiting confirmation' && b.status.toLowerCase() === 'waiting confirmation') return 1;
      
      // Second priority: Processing status
      if (a.status === 'Processing' && b.status !== 'Processing') return -1;
      if (a.status !== 'Processing' && b.status === 'Processing') return 1;
      
      return 0;
    });
  }
  
  return filtered;
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 10
const totalPages = computed(() => Math.ceil(filteredCusDecs.value.length / itemsPerPage))
const displayedItemsCount = ref(itemsPerPage)

// Get paginated CusDecs
const paginatedCusDecs = computed(() => {
  console.log("isMobile:", isMobile.value);
  
  // For desktop view - use pagination
  if (!isMobile.value) {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCusDecs.value.slice(start, end)
  }
  // For mobile view - use "load more" approach
  return filteredCusDecs.value.slice(0, displayedItemsCount.value)
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
  return displayedItemsCount.value < filteredCusDecs.value.length
})

// Handle pagination change (for desktop)
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Handle view timeline
const handleViewTimeline = (cusdec: AnonymizedCusDecRecord) => {
  selectedTimelineItem.value = {
    id: cusdec.id,
    type: 'cusdec',
    status: cusdec.status
  }
  timelineSheetOpen.value = true
}

// Handle view details
const handleViewDetails = (cusdec: AnonymizedCusDecRecord) => {
  selectedCusDecId.value = cusdec.id
  detailsSheetOpen.value = true
}

// Add table headers for desktop view
const tableHeaders = [
  { id: 'cusdec', label: 'CusDec Number' },
  { id: 'consignee', label: 'Consignee' },
  { id: 'declarant', label: 'Declarant' },
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Date' }
];

// Get status badge class for desktop view
const getStatusBadgeClass = (status: string) => getCusDecStatusBadgeClass(status);

// Format date for display
const formatDate = (dateString: string) => formatCusDecDate(dateString);
</script>

<template>
  <div class="min-h-screen pb-20 bg-gray-50">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Page Header -->
      <header class="flex items-center justify-between py-6">
        <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">CusDec Tracking</h1>
        
        <div>
          <button 
            @click="toggleSidebar" 
            class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 transition-transform" 
              :class="{ 'rotate-0': isMobile ? showSidebar : showFilters, 'rotate-180': isMobile ? !showSidebar : !showFilters }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </header>
      
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
      
      <!-- Filters panel (for mobile) -->
      <div v-if="showSidebar && isMobile" class="p-5 mb-5 bg-white rounded-lg shadow-sm md:hidden">
        <div class="space-y-5">
          <!-- Date Range Picker -->
          <div class="mb-6">
            <h3 class="mb-3 text-sm font-medium text-gray-700">Date Range</h3>
            <div class="space-y-4">
              <div>
                <label for="startDateMobile" class="block mb-2 text-sm text-gray-500">From</label>
                <input
                  id="startDateMobile"
                  type="date"
                  v-model="dateRange.startDate"
                  class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
                />
              </div>
              <div>
                <label for="endDateMobile" class="block mb-2 text-sm text-gray-500">To</label>
                <input
                  id="endDateMobile"
                  type="date"
                  v-model="dateRange.endDate"
                  class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
                />
              </div>
            </div>
          </div>
          
          <!-- Text filters -->
          <div class="space-y-5">
            <div v-for="filter in filters" :key="filter.id" class="space-y-2">
              <label :for="filter.id + 'Mobile'" class="block text-sm font-medium text-gray-700">{{ filter.label }}</label>
              
              <select
                v-if="filter.type === 'select'"
                :id="filter.id + 'Mobile'"
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
                :id="filter.id + 'Mobile'"
                type="text"
                :placeholder="filter.placeholder || `Enter ${filter.label}`"
                class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :value="filter.value"
                @input="(e) => handleFilterUpdate(filters.map(f => f.id === filter.id ? { ...f, value: (e.target as HTMLInputElement).value } : f))"
              />
            </div>
          </div>
          
          <!-- Buttons -->
          <div class="flex flex-col mt-6 space-y-3">
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
    
      <div class="flex flex-col md:flex-row md:space-x-5">
        <!-- Side Panel with filters (only visible on desktop) -->
        <div 
          class="flex-shrink-0 hidden h-auto mb-5 transition-all duration-200 bg-white rounded-lg shadow-sm md:block md:w-80 xl:w-80 lg:w-64 md:sticky md:top-16 md:self-start"
          v-if="!isMobile && showFilters"
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
                    @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
                  />
                </div>
                <div>
                  <label for="endDate" class="block mb-2 text-sm text-gray-500">To</label>
                  <input
                    id="endDate"
                    type="date"
                    v-model="dateRange.endDate"
                    class="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
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
        <div class="flex-1">
          <!-- Results area -->
          <div class="mt-0">
            <!-- Empty state with nice UI -->
            <div v-if="filteredCusDecs.length === 0" class="py-10 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p class="mb-4">No CusDec records found matching your filters</p>
              <button 
                @click="handleReset" 
                class="px-5 py-2.5 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
            
            <div v-else>
              <!-- Results count indicator -->
              <div class="flex flex-col mb-5 md:flex-row md:items-center md:justify-between">
                <p class="mb-2 text-sm text-gray-500 md:mb-0">Found {{ filteredCusDecs.length }} CusDec records</p>
              </div>
              
              <!-- Card-based layout for all screen sizes -->
              <div class="w-full space-y-5">
              <CusDecCard
                v-for="cusdec in paginatedCusDecs"
                :key="cusdec.id"
                :cusdec="cusdec"
                @view-timeline="handleViewTimeline"
                @view-details="handleViewDetails"
                class="mb-5" 
              />
                
                <!-- Load More button (mobile only) -->
                <div v-if="hasMoreItems && isMobile" class="flex justify-center mt-8 mb-20">
                  <button 
                    @click="loadMoreItems"
                    :disabled="isLoadingMore"
                    class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                  >
                    <template v-if="isLoadingMore">
                      <svg class="w-5 h-5 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </template>
                    <template v-else>
                      Load More
                    </template>
                  </button>
                </div>
                
                <!-- Pagination (desktop only) -->
                <div v-if="!isMobile" class="flex justify-center mt-8">
                  <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button 
                      @click="handlePageChange(currentPage - 1)" 
                      :disabled="currentPage === 1"
                      class="inline-flex items-center px-3 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Previous</span>
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    
                    <button 
                      v-for="page in totalPages" 
                      :key="page" 
                      @click="handlePageChange(page)" 
                      :class="[
                        'inline-flex items-center px-4 py-2.5 text-sm font-medium border',
                        currentPage === page 
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      ]"
                    >
                      {{ page }}
                    </button>
                    
                    <button 
                      @click="handlePageChange(currentPage + 1)" 
                      :disabled="currentPage === totalPages"
                      class="inline-flex items-center px-3 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Next</span>
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
                
                <div v-if="!isMobile" class="flex items-center justify-center mt-3">
                  <p class="text-sm text-gray-500">
                    Showing 
                    <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span> 
                    to 
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredCusDecs.length) }}</span> 
                    of 
                    <span class="font-medium">{{ filteredCusDecs.length }}</span> 
                    results
                  </p>
                </div>
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
    
    <!-- Details Sheet for CusDec information -->
    <!-- <ItemDetailsSheet
      v-model:isOpen="detailsSheetOpen"
      :itemId="selectedCusDecId"
      itemType="cusdec"
    /> -->
  </div>
</template> 