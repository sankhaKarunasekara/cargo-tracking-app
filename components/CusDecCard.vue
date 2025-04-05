<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card/card.vue'
import ButtonComponent from './ui/button/index'
import { ref } from 'vue'

// Define the props
interface CusDec {
  id: string;
  number: string;
  declarantCompany: string;
  consigneeCompany: string;
  status: string;
}

interface Props {
  cusdec: CusDec;
}

const props = defineProps<Props>();

// Define the emits
const emit = defineEmits<{
  'viewDetails': [cusdec: CusDec];
}>();

// Method to handle view details click
const handleViewDetails = () => {
  emit('viewDetails', props.cusdec);
};

// Get status color based on status value
const getStatusColor = () => {
  switch (props.cusdec.status.toLowerCase()) {
    case 'submitted':
      return 'status-bg-submitted'
    case 'review':
      return 'status-bg-review'
    case 'paid':
      return 'status-bg-paid'
    case 'paid invoice':
      return 'status-bg-paid'
    case 'error':
    case 'cancelled':
    case 'rejected':
      return 'status-bg-error'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Mock features for display (can be replaced with actual data)
const features = {
  submission: true,
  assessment: props.cusdec.status !== 'Submitted',
  payment: ['Paid', 'Paid Invoice'].includes(props.cusdec.status),
  release: props.cusdec.status === 'Paid Invoice'
}
</script>

<template>
  <Card class="mb-4 overflow-hidden transition-shadow duration-200 hover:shadow-md">
    <div class="p-5">
      <!-- Header with flag icon and status -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ cusdec.number }}</h3>
            <p class="mt-1 text-sm text-gray-600">{{ cusdec.declarantCompany }}</p>
          </div>
        </div>

        <div :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor()]">
          {{ cusdec.status }}
        </div>
      </div>

      <!-- Description -->
      <div class="mb-5">
        <p class="text-sm leading-relaxed text-gray-700">
          {{ cusdec.consigneeCompany }}, TIN Number: 234567890, Declaration Type: Standard
        </p>
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

    <!-- Action buttons in CardFooter - right aligned -->
    <CardFooter class="px-5 pt-0 pb-5 flex justify-end gap-3">
      <ButtonComponent 
        variant="outline"
        size="sm" 
        @click="handleViewDetails"
      >
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
          class="mr-2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        More Info
      </ButtonComponent>
      
      <NuxtLink 
        :to="`/StatusTimelinePage?type=cusdec&id=${cusdec.id}`"
        class="inline-flex items-center px-3.5 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
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
          class="mr-2"
        >
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
        View Status
      </NuxtLink>
    </CardFooter>
  </Card>
</template> 