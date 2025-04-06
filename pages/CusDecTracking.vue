<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FilterSection from '../components/FilterSection.vue'
import CusDecCard from '../components/CusDecCard.vue'
import Pagination from '../components/ui/pagination/pagination.vue'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card/card.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { useRouter } from 'vue-router'

// Define filter type
type Filter = {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'select' | 'date';
  options?: Array<{ value: string; label: string }>;
  value: string;
};

// Define CusDec type
type CusDec = {
  id: string;
  number: string;
  declarantCompany: string;
  consigneeCompany: string;
  status: string;
  officeCode?: string;
  channel?: 'red' | 'yellow' | 'green' | 'blue';
  containerCount?: number;
  date?: string;
};

// Status tabs
const statusTabs = ref([
  { id: 'all', label: 'All', active: true },
  { id: 'waiting_confirmation', label: 'Waiting Confirmation', active: false },
  { id: 'processing', label: 'Processing', active: false },
  { id: 'exited', label: 'Exited', active: false }
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

// Set default date range for last month
const getLastMonthDateRange = () => {
  const today = new Date()
  const endDate = today.toISOString().slice(0, 10) // Current date in YYYY-MM-DD format
  
  // Get date from one month ago
  const startDate = new Date(today)
  startDate.setMonth(startDate.getMonth() - 1)
  
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

// Sample data for CusDec records
const allCusDecs = ref<CusDec[]>([
  {
    id: '20231105789',
    number: 'CBHQ1-I-15789', 
    declarantCompany: 'Freight Solutions Lanka (Pvt) Ltd',
    consigneeCompany: 'Ceylon Biscuits Limited',
    status: 'Processing',
    officeCode: 'CBHQ1',
    channel: 'yellow',
    containerCount: 2,
    date: '15/04/2025'
  },
  {
    id: '20231104562',
    number: 'CBHQ1-I-24562',
    declarantCompany: 'Global Logistics Services',
    consigneeCompany: 'Maliban Biscuit Manufactories (Pvt) Ltd',
    status: 'Waiting Confirmation',
    officeCode: 'KTIM2',
    channel: 'red',
    containerCount: 1,
    date: '08/04/2025'
  },
  {
    id: '20231104123',
    number: 'CBHQ1-I-32123',
    declarantCompany: 'Expeditors Lanka (Pvt) Ltd',
    consigneeCompany: 'Unilever Sri Lanka Ltd',
    status: 'Waiting Confirmation',
    officeCode: 'CBHQ1',
    channel: 'green',
    containerCount: 3,
    date: '05/04/2025'
  },
  {
    id: '20231103891',
    number: 'CBHQ1-I-41891',
    declarantCompany: 'DHL Global Forwarding Lanka',
    consigneeCompany: 'Nestle Lanka PLC',
    status: 'Exited',
    officeCode: 'KTIM3',
    channel: 'blue',
    containerCount: 5,
    date: '01/04/2025'
  }
])

// Detail state
const selectedCusDec = ref<CusDec | null>(null)
const showDetails = ref(false)
const showFilters = ref(false)
// Only show sidebar by default on desktop, hide on mobile initially
const showSidebar = ref(false) 

// Set sidebar visibility based on screen size
onMounted(() => {
  // Check if screen is larger than mobile (md breakpoint)
  const isDesktop = window.innerWidth >= 768
  showSidebar.value = isDesktop
  
  // Add resize listener to update sidebar visibility
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      showSidebar.value = true
    } else {
      showSidebar.value = false
    }
  })
})

// Define cusdec details
const cusDecDetails = ref({
  consignee: 'ABC Group',
  declarant: 'CDS Group',
  invoiceValue: '1000.00',
  blNumber: '56454',
  numberOfItems: '3'
})

// Filter CusDecs based on filters, active status, and date range
const filteredCusDecs = computed(() => {
  let filtered = allCusDecs.value.filter(cusdec => {
    const numberFilter = filters.value.find(f => f.id === 'cusdecNumber')
    const declarantFilter = filters.value.find(f => f.id === 'declarantTIN')
    const consigneeFilter = filters.value.find(f => f.id === 'consigneeTIN')
    
    const matchesNumber = !numberFilter?.value || 
      cusdec.number.toLowerCase().includes(numberFilter.value.toLowerCase())
    
    const matchesDeclarant = !declarantFilter?.value || 
      cusdec.declarantCompany.toLowerCase().includes(declarantFilter.value.toLowerCase())
    
    const matchesConsignee = !consigneeFilter?.value || 
      cusdec.consigneeCompany.toLowerCase().includes(consigneeFilter.value.toLowerCase())
    
    const matchesStatus = activeStatusFilter.value === 'all' || 
      cusdec.status.toLowerCase().replace(' ', '_') === activeStatusFilter.value
    
    // Check date range if the cusdec has a date
    let matchesDateRange = true
    if (cusdec.date) {
      // Convert DD/MM/YYYY to Date object
      const parts = cusdec.date.split('/')
      const cusDecDate = new Date(
        parseInt(parts[2]), // Year
        parseInt(parts[1]) - 1, // Month (0-indexed)
        parseInt(parts[0]) // Day
      )
      
      const startDate = new Date(dateRange.value.startDate)
      const endDate = new Date(dateRange.value.endDate)
      
      matchesDateRange = cusDecDate >= startDate && cusDecDate <= endDate
    }

    return matchesNumber && matchesDeclarant && matchesConsignee && matchesStatus && matchesDateRange
  })

  // Sort results to prioritize "Waiting Confirmation" items if in "All" tab
  if (activeStatusFilter.value === 'all') {
    filtered.sort((a, b) => {
      if (a.status === 'Waiting Confirmation' && b.status !== 'Waiting Confirmation') return -1;
      if (a.status !== 'Waiting Confirmation' && b.status === 'Waiting Confirmation') return 1;
      return 0;
    });
  }
  
  return filtered;
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(filteredCusDecs.value.length / itemsPerPage))

// Get paginated CusDecs
const paginatedCusDecs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCusDecs.value.slice(start, end)
})

// Handle pagination change
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Handle search
const handleSearch = () => {
  currentPage.value = 1
}

// Handle filter update
const handleFilterUpdate = (updatedFilters: Filter[]) => {
  filters.value = updatedFilters
}

// Update date range
const updateDateRange = (start: string, end: string) => {
  dateRange.value = {
    startDate: start,
    endDate: end
  }
  currentPage.value = 1
}

// Handle view details
const handleViewDetails = (cusdec: any) => {
  router.push(`/CusDecDetail/${cusdec.id}`)
}

// Handle close details
const handleCloseDetails = () => {
  showDetails.value = false
}

// Toggle filters visibility
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

// Toggle sidebar visibility
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

// Handle reset
const handleReset = () => {
  filters.value = filters.value.map(filter => ({ ...filter, value: '' }))
  dateRange.value = getLastMonthDateRange()
  currentPage.value = 1
}

const router = useRouter()
</script>

<template>
  <div class="min-h-screen pb-20 bg-gray-50">
    <!-- Header with sticky position -->
    <div class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="container mx-auto">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-xl font-bold">CusDec Status</h1>
          <!-- Filter toggle button -->
          <div class="flex items-center space-x-2">
            <button 
              @click="toggleSidebar" 
              class="flex items-center justify-center p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container px-4 mx-auto">
      <div class="flex flex-col mt-4 md:flex-row">
        <!-- Side Panel with filters (always visible on desktop, togglable on mobile) -->
        <div 
          :class="[
            'transform transition-all duration-300 ease-in-out',
            showSidebar ? 'block' : 'hidden md:block',
            'md:w-80 w-full bg-white shadow-sm md:sticky md:top-16 md:self-start h-auto flex-shrink-0 mb-4 md:mr-4'
          ]"
        >
          <div class="p-4">
            <h2 class="mb-4 text-lg font-medium">Advanced Filters</h2>
            
            <!-- Date Range Picker -->
            <div class="mb-6">
              <h3 class="mb-2 text-sm font-medium text-gray-700">Date Range</h3>
              <div class="space-y-3">
                <div>
                  <label for="startDate" class="block mb-1 text-sm text-gray-500">From</label>
                  <input
                    id="startDate"
                    type="date"
                    v-model="dateRange.startDate"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
                  />
                </div>
                <div>
                  <label for="endDate" class="block mb-1 text-sm text-gray-500">To</label>
                  <input
                    id="endDate"
                    type="date"
                    v-model="dateRange.endDate"
                    class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    @change="updateDateRange(dateRange.startDate, dateRange.endDate)"
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
              
              <!-- Close sidebar button (mobile only) -->
              <button 
                @click="toggleSidebar" 
                class="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-gray-500 transition-colors rounded-md md:hidden bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main content area -->
        <div class="flex-1">
          <!-- Status Tabs - now aligned with card content, not full width -->
          <div class="p-2 mb-4 overflow-x-auto bg-white rounded-lg shadow-sm">
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
          
          <!-- Results area -->
          <div class="mt-0">
            <!-- Empty state with nice UI -->
            <div v-if="filteredCusDecs.length === 0" class="py-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <p>No CusDec records found matching your filters</p>
              <button 
                @click="handleReset" 
                class="px-4 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
            
            <div v-else>
              <!-- Results count indicator -->
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm text-gray-500">Found {{ filteredCusDecs.length }} CusDec records</p>
                
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">View:</span>
                  <button class="p-1.5 bg-blue-50 text-blue-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button class="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- CusDec cards list -->
              <CusDecCard
                v-for="cusdec in paginatedCusDecs"
                :key="cusdec.id"
                :cusdec="cusdec"
              />
              
              <!-- Pagination -->
              <div class="flex justify-center mt-6">
                <Pagination
                  :total-pages="totalPages"
                  :current-page="currentPage"
                  @change="handlePageChange"
                />
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
      v-if="showDetails && selectedCusDec" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-auto">
        <div class="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
          <h2 class="text-lg font-semibold">CusDec Details</h2>
          <button @click="handleCloseDetails" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="p-4 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">CusDec Number</p>
              <p class="font-medium">{{ selectedCusDec.number }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <p class="font-medium">{{ selectedCusDec.status }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Consignee</p>
              <p class="font-medium">{{ cusDecDetails.consignee }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Declarant</p>
              <p class="font-medium">{{ cusDecDetails.declarant }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Invoice Value</p>
              <p class="font-medium">{{ cusDecDetails.invoiceValue }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">B/L Number</p>
              <p class="font-medium">{{ cusDecDetails.blNumber }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">No. of Items</p>
              <p class="font-medium">{{ cusDecDetails.numberOfItems }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 