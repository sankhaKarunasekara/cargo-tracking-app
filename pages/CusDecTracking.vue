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
import { 
  getAllCusDecData, 
  filterCusDecs, 
  calculateCusDecStats,
  AnonymizedCusDecRecord
} from '../lib/data'

// Define page metadata
definePageMeta({
  title: 'CusDec Tracking',
  description: 'Track and manage your customs declarations with real-time status updates'
})

// Get window size and mobile status
const { isMobile } = useWindowSize()

// Define filter type
type Filter = {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'select' | 'date';
  options?: Array<{ value: string; label: string }>;
  value: string;
};

// Status tabs
const statusTabs = ref([
  { id: 'all', label: 'All', active: true },
  { id: 'waiting confirmation', label: 'Waiting Confirmation', active: false },
  { id: 'processing', label: 'Processing', active: false },
  { id: 'detained', label: 'Detained', active: false },
  { id: 'exited', label: 'Exited', active: false }
])

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

// Set default date range for current year
const getLastMonthDateRange = () => {
  const today = new Date()
  const endDate = today.toISOString().slice(0, 10) // Current date in YYYY-MM-DD format
  
  // Get date from 2025-01-01 (as our data starts from 2025)
  const startDate = new Date('2025-01-01')
  
  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate
  }
}

const dateRange = ref(getLastMonthDateRange())

// Filters state
const filters = ref<Filter[]>([
  {
    id: 'cusdecNumber',
    label: 'CusDec Number',
    type: 'text',
    placeholder: 'Enter CusDec number',
    value: ''
  },
  {
    id: 'declarantTIN',
    label: 'Declarant TIN Number',
    type: 'text',
    placeholder: 'Enter TIN number',
    value: ''
  },
  {
    id: 'consigneeTIN',
    label: 'Consignee TIN Number',
    type: 'text',
    placeholder: 'Enter TIN number',
    value: ''
  }
])

// Get real data from our anonymized dataset
const allCusDecs = ref<AnonymizedCusDecRecord[]>(getAllCusDecData())

// Detail state
const showDetails = ref(false)
const selectedItem = ref<AnonymizedCusDecRecord | null>(null)

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

// Set sidebar visibility based on screen size
onMounted(() => {
  // Check if screen is larger than mobile (md breakpoint)
  const isDesktop = window.innerWidth >= 768
  
  // For mobile view, always start with sidebar hidden
  showSidebar.value = isDesktop
  
  // Add resize listener to update sidebar visibility
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      // For desktop, always show the sidebar in the UI (but not the mobile panel)
      showSidebar.value = true
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
  showSidebar.value = !showSidebar.value
}

// Toggle filters function (for navbar integration)
const toggleFilters = () => {
  // On mobile, toggle the filters panel visibility
  if (isMobile.value) {
    showSidebar.value = !showSidebar.value
  }
}

// Provide the toggle function to allow other components to toggle filters
provide('toggleFilters', toggleFilters)

// Define cusdec stats
const cusDecStats = calculateCusDecStats()

// Map status from data to processing stage
const mapStatusToProcessingStage = (status: string): string => {
  status = status.toLowerCase();
  if (status === 'processing' || status === 'on hold') {
    return 'processing';
  } else if (status === 'rejected') {
    return 'detained';
  } else if (status === 'released' || status === 'exempted') {
    return 'exited';
  } else {
    return status; // Return original for 'waiting confirmation' or unknown statuses
  }
}

// Handle filter update
const handleFilterUpdate = (updatedFilters: Filter[]) => {
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
  dateRange.value = getLastMonthDateRange()
  
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
      return mapStatusToProcessingStage(record.status).toLowerCase() === activeStatusFilter.value.toLowerCase();
    });
  }
  
  // Sort results to prioritize "Processing" items if in "All" tab
  if (activeStatusFilter.value === 'all') {
    filtered.sort((a, b) => {
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

// Handle view details
const handleViewDetails = (cusdec: AnonymizedCusDecRecord) => {
  selectedItem.value = cusdec;
  showDetails.value = true;
}

// Handle close details
const handleCloseDetails = () => {
  showDetails.value = false
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

// Add table headers for desktop view
const tableHeaders = [
  { id: 'cusdec', label: 'CusDec Number' },
  { id: 'consignee', label: 'Consignee' },
  { id: 'declarant', label: 'Declarant' },
  { id: 'status', label: 'Status' },
  { id: 'date', label: 'Date' }
];

// Get status badge class for desktop view
const getStatusBadgeClass = (status: string) => {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'released':
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800';
    case 'processing':
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800';
    case 'on hold':
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800';
    case 'exempted':
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800';
    default:
      return 'inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800';
  }
};

// Format date for display
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
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
      
      <!-- Simple filter toggle button (for mobile) -->
      <div class="p-4 mb-5 bg-white rounded-lg shadow-sm md:hidden">
        <button 
          @click="toggleSidebar" 
          class="flex w-full items-center justify-between text-sm font-medium text-gray-700 focus:outline-none"
        >
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Advanced Filters</span>
          </div>
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
            :class="{ 'rotate-180': showSidebar }"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <!-- Filters panel (for mobile) -->
      <div v-if="showSidebar" class="p-5 mb-5 bg-white rounded-lg shadow-sm md:hidden">
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
          class="hidden md:block md:w-80 xl:w-80 lg:w-64 bg-white shadow-sm md:sticky md:top-16 md:self-start h-auto flex-shrink-0 mb-5 rounded-lg transition-all duration-200"
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
                <p class="text-sm text-gray-500 mb-2 md:mb-0">Found {{ filteredCusDecs.length }} CusDec records</p>
              </div>
              
              <!-- Card-based layout for all screen sizes -->
              <div class="w-full space-y-5">
              <CusDecCard
                v-for="cusdec in paginatedCusDecs"
                :key="cusdec.id"
                :cusdec="cusdec"
                @view-details="handleViewDetails" 
                @view-timeline="handleViewTimeline"
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
    
    <!-- Detail modal -->
    <div 
      v-if="showDetails" 
      class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    >
      <div class="w-full max-w-2xl p-0 mx-4 overflow-hidden bg-white rounded-lg shadow-xl">
        <div class="flex items-center justify-between p-5 border-b">
          <h3 class="text-lg font-semibold text-gray-900">CusDec Details</h3>
          <button @click="handleCloseDetails" class="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div v-if="selectedItem" class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">CusDec Number</p>
              <p class="font-medium">{{ selectedItem.cusdecNumber }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Status</p>
              <p class="font-medium">
                <span :class="getStatusBadgeClass(selectedItem.status)">
                  {{ selectedItem.status }}
                </span>
              </p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Consignee</p>
              <p class="font-medium">{{ selectedItem.consigneeName }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Declarant</p>
              <p class="font-medium">{{ selectedItem.declarantName }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Invoice Value</p>
              <p class="font-medium">{{ selectedItem.invoiceValue }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Origin Country</p>
              <p class="font-medium">{{ selectedItem.originCountry }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Container Count</p>
              <p class="font-medium">{{ selectedItem.containerCount }}</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-lg">
              <p class="text-sm text-gray-500 mb-1">Incoterm</p>
              <p class="font-medium">{{ selectedItem.incoterm }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Status Timeline Sheet -->
    <StatusTimelineSheet
      v-model:isOpen="timelineSheetOpen"
      :itemId="selectedTimelineItem.id"
      :itemType="selectedTimelineItem.type"
      :status="selectedTimelineItem.status"
    />
  </div>
</template> 