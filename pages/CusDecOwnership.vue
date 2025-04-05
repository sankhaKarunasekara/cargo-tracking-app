<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ButtonComponent from '../components/ui/button/index'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card/card.vue'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'

const router = useRouter()

// Search state
const searchInput = ref('')
const isSearching = ref(false)
const searchResults = ref<any[]>([])
const searchPerformed = ref(false)

// Sample data
const sampleCusDecs = [
  {
    id: '1',
    number: 'TEST987',
    declarantCompany: 'CDS Group',
    consigneeCompany: 'ABC Group',
    status: 'Paid',
    ownershipConfirmed: false
  },
  {
    id: '2',
    number: 'TEST564',
    declarantCompany: 'CDS Group',
    consigneeCompany: 'ABC Group',
    status: 'Review',
    ownershipConfirmed: false
  },
  {
    id: '3',
    number: 'TEST345',
    declarantCompany: 'XYZ Group',
    consigneeCompany: 'DEF Group',
    status: 'Submitted',
    ownershipConfirmed: true
  },
  {
    id: '4',
    number: 'TEST789',
    declarantCompany: 'LMN Group',
    consigneeCompany: 'PQR Group',
    status: 'Paid Invoice',
    ownershipConfirmed: false
  }
]

// Handle search
const handleSearch = () => {
  if (!searchInput.value.trim()) return
  
  isSearching.value = true
  searchPerformed.value = true
  
  // Simulate API search
  setTimeout(() => {
    searchResults.value = sampleCusDecs.filter(cusdec => 
      cusdec.number.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      cusdec.declarantCompany.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      cusdec.consigneeCompany.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    isSearching.value = false
  }, 1000)
}

// Get status color based on status value
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'status-bg-submitted'
    case 'review':
      return 'status-bg-review'
    case 'paid':
      return 'status-bg-paid'
    case 'paid invoice':
      return 'status-bg-paid'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// View CusDec details
const viewCusDecDetails = (id: string) => {
  router.push(`/CusDecDetail/${id}`)
}
</script>

<template>
  <div class="min-h-screen pb-20 bg-gray-50">
    <!-- Header with sticky position -->
    <div class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="container mx-auto">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-xl font-bold">CusDec Ownership</h1>
        </div>
      </div>
    </div>
    
    <div class="container px-4 mx-auto">
      <!-- Search section -->
      <div class="p-6 mt-4 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">Find Your CusDec</h2>
        <p class="mb-6 text-sm text-gray-600">
          Search for your CusDec by number, declarant company, or consignee company to confirm ownership.
        </p>
        
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div class="flex-1">
            <input 
              v-model="searchInput"
              type="text" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CusDec number, declarant, or consignee"
              @keyup.enter="handleSearch"
            />
          </div>
          <ButtonComponent 
            variant="primary"
            size="md"
            class="flex items-center justify-center"
            :disabled="isSearching || !searchInput.trim()"
            @click="handleSearch"
          >
            <span v-if="isSearching" class="flex items-center">
              <svg class="w-4 h-4 mr-2 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
            <span v-else class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </span>
          </ButtonComponent>
        </div>
      </div>
      
      <!-- Search results -->
      <div v-if="searchPerformed" class="mt-6">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Search Results</h3>
        
        <!-- Loading state -->
        <div v-if="isSearching" class="flex items-center justify-center h-32">
          <div class="w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        <!-- No results -->
        <div v-else-if="searchResults.length === 0" class="p-8 text-center bg-white rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-600">No CusDec records found matching your search.</p>
          <p class="mt-2 text-sm text-gray-500">Try different search terms or contact your customs broker.</p>
        </div>
        
        <!-- Results list -->
        <div v-else class="space-y-4">
          <div 
            v-for="cusdec in searchResults" 
            :key="cusdec.id"
            class="p-4 transition-shadow duration-200 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div>
                <div class="flex items-center mb-2">
                  <h4 class="text-lg font-semibold text-gray-900">{{ cusdec.number }}</h4>
                  <span 
                    :class="['ml-3 px-3 py-1 text-xs font-medium rounded-full', getStatusColor(cusdec.status)]"
                  >
                    {{ cusdec.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">{{ cusdec.declarantCompany }} / {{ cusdec.consigneeCompany }}</p>
                
                <div class="mt-2">
                  <span 
                    :class="[
                      'px-3 py-1 text-xs font-medium rounded-full inline-flex items-center',
                      cusdec.ownershipConfirmed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      class="w-3 h-3 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      stroke-width="2"
                    >
                      <path 
                        v-if="cusdec.ownershipConfirmed" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                      />
                      <path 
                        v-else 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                      />
                    </svg>
                    {{ cusdec.ownershipConfirmed ? 'Ownership Confirmed' : 'Ownership Not Confirmed' }}
                  </span>
                </div>
              </div>
              
              <ButtonComponent 
                variant="outline" 
                size="sm" 
                @click="viewCusDecDetails(cusdec.id)"
              >
                <span class="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="w-4 h-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                  View Details
                </span>
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Instructions section -->
      <div class="p-6 mt-6 bg-white rounded-lg shadow-sm">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">How Ownership Confirmation Works</h2>
        
        <div class="space-y-4">
          <div class="flex">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 rounded-full bg-blue-50">
              <span class="text-sm font-semibold text-blue-600">1</span>
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">Search for Your CusDec</h3>
              <p class="text-sm text-gray-600">Enter your CusDec number, declarant company name, or consignee company name.</p>
            </div>
          </div>
          
          <div class="flex">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 rounded-full bg-blue-50">
              <span class="text-sm font-semibold text-blue-600">2</span>
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">View CusDec Details</h3>
              <p class="text-sm text-gray-600">Verify the information is correct and belongs to you.</p>
            </div>
          </div>
          
          <div class="flex">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 rounded-full bg-blue-50">
              <span class="text-sm font-semibold text-blue-600">3</span>
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">Confirm Ownership with OTP</h3>
              <p class="text-sm text-gray-600">Receive a one-time password on your registered mobile number or email.</p>
            </div>
          </div>
          
          <div class="flex">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-4 rounded-full bg-blue-50">
              <span class="text-sm font-semibold text-blue-600">4</span>
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">Ownership Confirmed</h3>
              <p class="text-sm text-gray-600">Once confirmed, you'll be able to access detailed tracking information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom navigation -->
    <AppBottomNavigation />
  </div>
</template> 