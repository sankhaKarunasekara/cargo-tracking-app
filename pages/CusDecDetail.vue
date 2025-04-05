<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonComponent from '../components/ui/button/index'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card/card.vue'
import StatusTimeline from '../components/StatusTimeline.vue'
import AppBottomNavigation from '../components/AppBottomNavigation.vue'

const route = useRoute()
const router = useRouter()

// Define CusDec types
interface CusDecDetails {
  consignee: string;
  declarant: string;
  invoiceValue: string;
  blNumber: string;
  numberOfItems: string;
  tinNumber: string;
  ownershipConfirmed: boolean;
  declarationType: string;
}

interface CusDec {
  id: string;
  number: string;
  declarantCompany: string;
  consigneeCompany: string;
  status: string;
  details: CusDecDetails;
}

// CusDec state
const cusdec = ref<CusDec>({
  id: '',
  number: '',
  declarantCompany: '',
  consigneeCompany: '',
  status: '',
  details: {
    consignee: '',
    declarant: '',
    invoiceValue: '',
    blNumber: '',
    numberOfItems: '',
    tinNumber: '',
    ownershipConfirmed: false,
    declarationType: 'Standard'
  }
})

// Status items for CusDec
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

// UI states
const isLoadingData = ref(true)
const showOwnershipConfirmation = ref(false)
const otpCode = ref('')
const enteredOtp = ref('')
const otpSent = ref(false)
const isVerifying = ref(false)
const verificationError = ref('')

// Get status color based on status value
const getStatusColor = () => {
  switch (cusdec.value.status.toLowerCase()) {
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

// Mock features for display (can be replaced with actual data)
const features = computed(() => {
  // Convert status to lowercase for case-insensitive comparison
  const status = (cusdec.value.status || '').toLowerCase()
  
  return {
    submission: true,
    assessment: status !== 'submitted',
    payment: status === 'paid' || status === 'paid invoice',
    release: status === 'paid invoice'
  }
})

// Fetch CusDec details from backend
onMounted(async () => {
  // In real app, fetch data from API
  // const { id } = route.params
  // const response = await fetch(`/api/cusdecs/${id}`)
  // const data = await response.json()
  
  // For now, use mock data
  setTimeout(() => {
    // Get ID safely from route params
    const id = typeof route.params.id === 'string' ? route.params.id : '1'
    
    cusdec.value = {
      id: id,
      number: 'TEST987',
      declarantCompany: 'CDS Group',
      consigneeCompany: 'ABC Group',
      status: 'Paid',
      details: {
        consignee: 'ABC Group',
        declarant: 'CDS Group',
        invoiceValue: '1000.00',
        blNumber: '56454',
        numberOfItems: '3',
        tinNumber: '234567890',
        ownershipConfirmed: false,
        declarationType: 'Standard'
      }
    }
    isLoadingData.value = false
  }, 1000)
})

// Initialize OTP confirmation
const initiateOwnershipConfirmation = () => {
  showOwnershipConfirmation.value = true
  otpCode.value = Math.floor(100000 + Math.random() * 900000).toString() // Generate 6 digit OTP
}

// Request OTP to be sent
const requestOtp = () => {
  // In real app, would send OTP via SMS or email
  console.log('Sending OTP:', otpCode.value)
  otpSent.value = true
  // Simulate OTP delivery
  alert(`OTP Code: ${otpCode.value} (In real app this would be sent via SMS/email)`)
}

// Verify entered OTP
const verifyOtp = () => {
  isVerifying.value = true
  verificationError.value = ''
  
  // Simulate API verification
  setTimeout(() => {
    if (enteredOtp.value === otpCode.value) {
      cusdec.value.details.ownershipConfirmed = true
      showOwnershipConfirmation.value = false
      otpSent.value = false
      enteredOtp.value = ''
    } else {
      verificationError.value = 'Incorrect OTP code. Please try again.'
    }
    isVerifying.value = false
  }, 1500)
}

// Handle cancellation of OTP verification
const cancelOwnershipConfirmation = () => {
  showOwnershipConfirmation.value = false
  otpSent.value = false
  enteredOtp.value = ''
  verificationError.value = ''
}

// Navigation
const goBack = () => {
  router.push('/CusDecTracking')
}
</script>

<template>
  <div class="min-h-screen pb-20 bg-gray-50">
    <!-- Header with sticky position -->
    <div class="sticky top-0 z-10 bg-white shadow-sm">
      <div class="container mx-auto">
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center">
            <button @click="goBack" class="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <h1 class="text-xl font-bold">CusDec Details</h1>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container px-4 mx-auto">
      <!-- Loading state -->
      <div v-if="isLoadingData" class="flex items-center justify-center h-64">
        <div class="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <!-- CusDec details -->
      <div v-else class="mt-4">
        <div class="p-5 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm">
          <!-- Header with icon and status -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-start">
              <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ cusdec.number }}</h2>
                <p class="mt-1 text-sm text-gray-600">{{ cusdec.declarantCompany }}</p>
              </div>
            </div>

            <div :class="['px-3 py-1 text-sm font-medium rounded-full', getStatusColor()]">
              {{ cusdec.status }}
            </div>
          </div>
          
          <!-- Ownership confirmation status badge -->
          <div class="mb-4">
            <span 
              :class="[
                'px-3 py-1 text-sm font-medium rounded-full inline-flex items-center',
                cusdec.details.ownershipConfirmed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              ]"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="w-4 h-4 mr-1" 
                :class="[cusdec.details.ownershipConfirmed ? 'text-green-800' : 'text-yellow-800']" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <path v-if="cusdec.details.ownershipConfirmed" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {{ cusdec.details.ownershipConfirmed ? 'Ownership Confirmed' : 'Ownership Not Confirmed' }}
            </span>
          </div>
          
          <!-- Features -->
          <div class="flex flex-wrap gap-3 mb-5">
            <div class="flex items-center" :class="features.submission ? 'text-blue-600' : 'text-gray-400'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Submission</span>
            </div>

            <div class="flex items-center" :class="features.assessment ? 'text-blue-600' : 'text-gray-400'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Assessment</span>
            </div>

            <div class="flex items-center" :class="features.payment ? 'text-blue-600' : 'text-gray-400'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm">Payment</span>
            </div>

            <div class="flex items-center" :class="features.release ? 'text-blue-600' : 'text-gray-400'">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
              </svg>
              <span class="text-sm">Release</span>
            </div>
          </div>
        </div>
        
        <!-- Button to confirm ownership -->
        <div v-if="!cusdec.details.ownershipConfirmed" class="p-4 mb-4 bg-white border border-blue-200 rounded-lg shadow-sm">
          <h3 class="mb-2 text-lg font-semibold text-gray-900">Ownership Confirmation</h3>
          <p class="mb-4 text-sm text-gray-700">Confirm that this CusDec belongs to you by verifying your identity with OTP.</p>
          <ButtonComponent 
            variant="primary" 
            size="md" 
            class="w-full" 
            @click="initiateOwnershipConfirmation"
          >
            Confirm Ownership
          </ButtonComponent>
        </div>
        
        <!-- CusDec details sections -->
        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div class="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Basic Information</h3>
            <div class="space-y-3">
              <div>
                <label class="text-sm text-gray-500">CusDec Number</label>
                <p class="font-medium">{{ cusdec.number }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Declaration Type</label>
                <p class="font-medium">{{ cusdec.details.declarationType }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Status</label>
                <p class="font-medium">{{ cusdec.status }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">TIN Number</label>
                <p class="font-medium">{{ cusdec.details.tinNumber }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Invoice Value</label>
                <p class="font-medium">{{ cusdec.details.invoiceValue }}</p>
              </div>
            </div>
          </div>
          
          <div class="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Company Information</h3>
            <div class="space-y-3">
              <div>
                <label class="text-sm text-gray-500">Consignee</label>
                <p class="font-medium">{{ cusdec.details.consignee }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">Declarant</label>
                <p class="font-medium">{{ cusdec.details.declarant }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">B/L Number</label>
                <p class="font-medium">{{ cusdec.details.blNumber }}</p>
              </div>
              <div>
                <label class="text-sm text-gray-500">No. of Items</label>
                <p class="font-medium">{{ cusdec.details.numberOfItems }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Status timeline -->
        <div class="p-4 mb-4 bg-white border border-gray-100 rounded-lg shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Status Timeline</h3>
            
            <!-- Action buttons in a row on desktop -->
            <div class="flex flex-wrap gap-2 mt-3 sm:mt-0">
              <ButtonComponent variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export PDF
              </ButtonComponent>
              <ButtonComponent variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                View Details
              </ButtonComponent>
            </div>
          </div>
          <StatusTimeline 
            :status-items="statusItems" 
            :show-back-button="false"
          />
        </div>
      </div>
    </div>
    
    <!-- Bottom navigation -->
    <AppBottomNavigation />
    
    <!-- Ownership confirmation modal -->
    <div 
      v-if="showOwnershipConfirmation" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-semibold text-gray-900">Confirm Ownership</h2>
        
        <div v-if="!otpSent">
          <p class="mb-6 text-gray-700">
            To confirm ownership of this CusDec document, we'll send a verification code to your registered mobile number or email address.
          </p>
          <div class="flex gap-4">
            <ButtonComponent 
              variant="outline" 
              size="md" 
              class="flex-1" 
              @click="cancelOwnershipConfirmation"
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent 
              variant="primary" 
              size="md" 
              class="flex-1" 
              @click="requestOtp"
            >
              Send Verification Code
            </ButtonComponent>
          </div>
        </div>
        
        <div v-else>
          <p class="mb-4 text-gray-700">
            Please enter the verification code sent to your registered contact details.
          </p>
          
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Verification Code</label>
            <input 
              v-model="enteredOtp"
              type="text" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code" 
              maxlength="6"
            />
            <p v-if="verificationError" class="mt-1 text-sm text-red-600">{{ verificationError }}</p>
          </div>
          
          <div class="flex gap-4">
            <ButtonComponent 
              variant="outline" 
              size="md" 
              class="flex-1" 
              @click="cancelOwnershipConfirmation"
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent 
              variant="primary" 
              size="md" 
              class="flex-1" 
              :disabled="isVerifying || enteredOtp.length !== 6"
              @click="verifyOtp"
            >
              <span v-if="isVerifying" class="flex items-center">
                <svg class="w-4 h-4 mr-2 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
              <span v-else>Verify</span>
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 