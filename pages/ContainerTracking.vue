<script setup lang="ts">
import { ref, computed, onMounted, provide, onUnmounted, watch, nextTick } from 'vue'
import FilterSection from '../components/FilterSection.vue'
import ContainerCard from '../components/ContainerCard.vue'
import Pagination from '../components/ui/pagination'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'
import StatusTimelineSheet from '../components/StatusTimelineSheet.vue'
import { useWindowSize } from '../lib/hooks/useWindowSize'
import { useRoute, useRouter } from 'vue-router'
import { 
  getAllContainerData, 
  filterContainers, 
  calculateContainerStats,
  AnonymizedContainer,
  containerTrackingData,
  containerStatusTabs,
  containerFilterDefinitions,
  FilterDefinition,
  getDefaultDateRange
} from '../lib/data'

// Get route and router for URL parameter handling
const route = useRoute()
const router = useRouter()

// Define page metadata (this will be defined in a proper way later)
// In Nuxt, definePageMeta is available globally in page components
// But since we're not in a Nuxt context for this project, we'll comment it out
/* 
definePageMeta({
  title: 'Container Tracking',
  description: 'Track and monitor your containers with real-time location and status updates'
})
*/

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
const statusTabs = ref([...containerStatusTabs])

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

// Filters state - ensure correct typing
const filters = ref<FilterDefinition[]>([...containerFilterDefinitions])

// Get data from our data utilities
const allContainers = ref<AnonymizedContainer[]>(getAllContainerData())

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(filteredContainers.value.length / itemsPerPage))
const displayedItemsCount = ref(itemsPerPage)

// Details sheet state
const detailsSheetOpen = ref(false)
const selectedContainerId = ref('')
const showFilters = ref(false)

// Timeline sheet state
const timelineSheetOpen = ref(false)
const selectedTimelineItem = ref({
  id: '',
  type: 'container',
  status: ''
})

// Date range for filtering
const dateRange = ref(getDefaultDateRange())

// Check if any filters are applied
const hasActiveFilters = computed(() => {
  return filters.value.some(filter => filter.value) || 
         dateRange.value.startDate !== getDefaultDateRange().startDate ||
         dateRange.value.endDate !== getDefaultDateRange().endDate ||
         activeStatusFilter.value !== 'all'
})

// Check specifically if cusdec filter is applied
const hasCusdecFilter = computed(() => {
  const containerFilter = filters.value.find(f => f.id === 'cusdec')
  return containerFilter && containerFilter.value
})

// Filter containers based on our filter utilities
const filteredContainers = computed(() => {
  return filterContainers({
    containerNumber: filters.value.find(f => f.id === 'container')?.value,
    cusdecNumber: filters.value.find(f => f.id === 'cusdec')?.value,
    location: filters.value.find(f => f.id === 'location')?.value,
    channel: filters.value.find(f => f.id === 'channel')?.value || undefined,
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
  selectedContainerId.value = container.id
  detailsSheetOpen.value = true
}

// Handle view timeline
const handleViewTimeline = (container: AnonymizedContainer) => {
  // Check if we have tracking data for this container
  const hasTrackingData = containerTrackingData[container.number]?.length > 0
  
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
  dateRange.value = getDefaultDateRange()
  currentPage.value = 1
  displayedItemsCount.value = itemsPerPage
  
  // Remove cusdec query parameter if it exists
  if (route.query.cusdec) {
    router.replace({ query: { ...route.query, cusdec: undefined } })
  }
}

// Provide the toggleFilters function to the navbar
provide('toggleFilters', toggleFilters)

// Add a ref for the container list for scrolling
const containerListRef = ref<HTMLElement | null>(null)

// Function to scroll to the container list
const scrollToContainerList = () => {
  // Wait for next tick to ensure DOM is updated
  nextTick(() => {
    // Add a small delay to ensure complete rendering
    setTimeout(() => {
      if (containerListRef.value && filteredContainers.value.length > 0) {
        // Try smooth scrolling first
        try {
          containerListRef.value.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        } catch (error) {
          // Fallback for browsers that don't support smooth scrolling
          window.scrollTo({
            top: containerListRef.value.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      }
    }, 300);
  });
};

// Initialize with cusdec filter
onMounted(() => {
  document.addEventListener('toggle-filters', toggleFilters)
  
  // Ensure we have a cusdec filter
  if (!filters.value.some(f => f.id === 'cusdec')) {
    filters.value.push({
      id: 'cusdec',
      label: 'CusDec Number',
      placeholder: 'Enter CusDec number',
      type: 'text',
      value: ''
    })
  }
  
  // Check if cusdec parameter exists in URL
  const cusdecParam = route.query.cusdec as string
  if (cusdecParam) {
    // Apply filter for the specified cusdec number
    const cusdecFilter = filters.value.find(f => f.id === 'cusdec')
    if (cusdecFilter) {
      cusdecFilter.value = cusdecParam
      
      // Apply the filter immediately
      handleSearch()
      
      // Keep filters collapsed but indicate they are applied
      showFilters.value = false
      
      // Reset pagination
      currentPage.value = 1
      displayedItemsCount.value = itemsPerPage
      
      // Scroll to container list
      scrollToContainerList();
    }
  }
})

// Watch for filtered containers change to scroll to top container
watch(() => filteredContainers.value.length, (newLength, oldLength) => {
  if (newLength > 0 && hasCusdecFilter.value && oldLength === 0) {
    // If we just got results after having none and have a cusdec filter, scroll to container list
    scrollToContainerList();
  }
}, { immediate: false })

// Watch for URL changes to update filters
watch(() => route.query.cusdec, (newCusdec) => {
  if (newCusdec) {
    // Apply filter for the specified cusdec number
    const cusdecFilter = filters.value.find(f => f.id === 'cusdec')
    if (cusdecFilter) {
      cusdecFilter.value = newCusdec as string
      
      // Reset pagination
      currentPage.value = 1
      displayedItemsCount.value = itemsPerPage
    }
  } else {
    // Reset cusdec filter if cusdec parameter is removed
    const cusdecFilter = filters.value.find(f => f.id === 'cusdec')
    if (cusdecFilter && cusdecFilter.value) {
      cusdecFilter.value = ''
      
      // Reset pagination
      currentPage.value = 1
      displayedItemsCount.value = itemsPerPage
    }
  }
}, { immediate: true })

// Add cleanup if necessary
onUnmounted(() => {
  document.removeEventListener('toggle-filters', toggleFilters)
})
</script>

<template>
  <div class="min-h-screen pb-16 bg-gray-50">
    <div class="container px-4 py-4 mx-auto sm:px-6 lg:px-8">
      <!-- Page Header -->
      <header class="flex items-center justify-between py-4 mb-6 border-b border-gray-200 sm:py-6">
        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">Container Tracking</h1>
        
        <div>
          <button 
            @click="toggleFilters" 
            :class="[
              'flex items-center px-3 py-2 text-sm font-medium transition-colors border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              hasActiveFilters ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
            <!-- Filter applied badge -->
            <span v-if="hasCusdecFilter" class="flex items-center justify-center w-5 h-5 ml-2 text-xs font-medium text-white bg-blue-600 rounded-full">
              1
            </span>
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
              :class="{ 'rotate-0': showFilters, 'rotate-180': !showFilters }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </header>
      
      <!-- Active Filters Display (when filters are applied but not expanded) -->
      <div v-if="hasCusdecFilter && !showFilters" class="flex p-3 mb-4 space-x-2 bg-white rounded-lg shadow-sm">
        <div class="flex items-center">
          <span class="text-sm font-medium text-gray-700">Filtered by:</span>
        </div>
        <div class="flex items-center px-3 py-1 text-sm border border-blue-100 rounded-full bg-blue-50">
          <span class="font-medium text-blue-800">CusDec: {{ filters.find(f => f.id === 'cusdec')?.value }}</span>
          <button 
            @click="() => { 
              const cusdecFilter = filters.find(f => f.id === 'cusdec'); 
              if (cusdecFilter) cusdecFilter.value = ''; 
              if (route.query.cusdec) router.replace({ query: { ...route.query, cusdec: undefined } })
            }" 
            class="ml-1.5 text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Status Tabs -->
      <div class="p-2 mb-6 overflow-x-auto bg-white rounded-lg shadow-sm">
        <div class="flex space-x-2">
          <button 
            v-for="tab in statusTabs" 
            :key="tab.id"
            @click="setActiveStatus(tab.id)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
              tab.active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      
      <!-- Filters panel -->
      <div v-if="showFilters" class="p-4 mb-6 bg-white rounded-lg shadow-sm lg:hidden">
        <FilterSection
          :filters="filters"
          @update:filters="handleFilterUpdate"
          @search="handleSearch"
          @reset="handleReset"
        />
      </div>
      
      <div class="flex flex-col md:flex-row md:space-x-6">
        <!-- Side Panel with filters (larger screens only) -->
        <div 
          class="flex-shrink-0 hidden h-auto mb-6 transition-all duration-200 bg-white rounded-lg shadow-sm lg:block lg:w-64 xl:w-80 lg:sticky lg:top-24 lg:self-start"
          v-if="showFilters"
        >
          <div class="p-4">
            <h2 class="mb-4 text-base font-medium">Advanced Filters</h2>
            
            <!-- Date Range Picker -->
            <div class="mb-5">
              <h3 class="mb-2 text-sm font-medium text-gray-700">Date Range</h3>
              <div class="space-y-3">
                <div>
                  <label for="startDate" class="block mb-1 text-xs text-gray-500">From</label>
                  <input
                    id="startDate"
                    type="date"
                    v-model="dateRange.startDate"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label for="endDate" class="block mb-1 text-xs text-gray-500">To</label>
                  <input
                    id="endDate"
                    type="date"
                    v-model="dateRange.endDate"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <!-- Text filters -->
            <div class="space-y-4">
              <div v-for="filter in filters" :key="filter.id" class="space-y-1">
                <label :for="filter.id" class="block text-sm font-medium text-gray-700">{{ filter.label }}</label>
                
                <select
                  v-if="filter.type === 'select'"
                  :id="filter.id"
                  class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :value="filter.value"
                  @input="(e) => handleFilterUpdate(filters.map(f => f.id === filter.id ? { ...f, value: (e.target as HTMLInputElement).value } : f))"
                />
              </div>
            </div>
            
            <!-- Buttons -->
            <div class="flex flex-col mt-6 space-y-2">
              <button 
                @click="handleSearch" 
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Apply Filters
              </button>
              
              <button 
                @click="handleReset" 
                class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
          <div class="mt-0">
            <!-- Empty state -->
            <div v-if="filteredContainers.length === 0" class="py-12 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p class="mb-4">No containers found matching your filters</p>
              <button 
                @click="handleReset" 
                class="px-5 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
            
            <div v-else>
              <!-- Results count -->
              <div class="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
                <p class="mb-2 text-sm text-gray-500 md:mb-0">Found {{ filteredContainers.length }} containers</p>
              </div>
              
              <!-- Container cards - this ref is used for automatic scrolling -->
              <div class="w-full space-y-4" ref="containerListRef">
                <ContainerCard
                  v-for="container in paginatedContainers"
                  :key="container.id"
                  :container="container"
                  @viewDetails="handleViewDetails"
                  @viewTimeline="handleViewTimeline"
                  class="mb-4"
                />
              </div>
              
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
                  class="w-full px-5 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
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
              
              <!-- Results summary text (desktop) -->
              <div v-if="!isMobile && filteredContainers.length > 0" class="flex items-center justify-center mt-2">
                <p class="text-xs text-gray-500">
                  Showing 
                  <span class="font-medium">{{ ((currentPage - 1) * itemsPerPage) + 1 }}</span> 
                  to 
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredContainers.length) }}</span> 
                  of 
                  <span class="font-medium">{{ filteredContainers.length }}</span> 
                  results
                </p>
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
    
    <!-- Container Details Sheet -->
    <!-- <ItemDetailsSheet
      v-model:isOpen="detailsSheetOpen"
      :itemId="selectedContainerId"
      itemType="container"
    /> -->
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style> 