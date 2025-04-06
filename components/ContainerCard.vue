<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card/card.vue'
import ButtonComponent from './ui/button/index'

// Define the props
interface Container {
  id: string;
  number: string;
  location: string;
  status: string;
  shippingLine: string;
  vesselName: string;
  voyage: string;
  size: string;
}

interface Props {
  container: Container;
}

const props = defineProps<Props>();

// Define the emits
const emit = defineEmits<{
  'viewDetails': [container: Container];
}>();

// Method to handle view details click
const handleViewDetails = () => {
  emit('viewDetails', props.container);
};

// Get status color based on status value
const getStatusColor = () => {
  switch (props.container.status.toLowerCase()) {
    case 'scanning':
    case 'registered':
      return 'status-bg-submitted'
    case 'doc checked':
      return 'status-bg-review'
    case 'acknowledgedgate':
    case 'acknowledgedyard':
      return 'status-bg-review'
    case 'exitedyard':
    case 'send to yard':
    case 'officer checked':
      return 'status-bg-paid'
    case 'cancelled':
    case 'detained':
      return 'status-bg-error'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Generate progress indicator based on status
const getProgressPercentage = () => {
  const statusOrder = [
    'registered', 
    'doc checked', 
    'acknowledgedgate', 
    'acknowledgedyard', 
    'exitedyard'
  ]
  
  const currentStatus = props.container.status.toLowerCase()
  const index = statusOrder.indexOf(currentStatus)
  
  if (index >= 0) {
    return (index + 1) / statusOrder.length * 100
  }
  
  return 0 // For cancelled or other statuses
}

// Mock features for display (can be replaced with actual data)
const features = {
  registration: props.container.status !== '',
  docCheck: ['Doc Checked', 'AcknowledgedGate', 'AcknowledgedYard', 'ExitedYard'].includes(props.container.status),
  gate: ['AcknowledgedGate', 'AcknowledgedYard', 'ExitedYard'].includes(props.container.status),
  yard: ['AcknowledgedYard', 'ExitedYard'].includes(props.container.status)
}
</script>

<template>
  <Card class="mb-4 overflow-hidden transition-shadow duration-200 hover:shadow-md">
    <div class="p-5">
      <!-- Header with container icon and status -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start">
          <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path>
              <path d="m7 16.5-4.74-2.85"></path>
              <path d="m7 16.5 5-3"></path>
              <path d="M7 16.5V21"></path>
              <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path>
              <path d="m17 16.5-5-3"></path>
              <path d="m17 16.5 4.74-2.85"></path>
              <path d="M17 16.5V21"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ container.number }}</h3>
            <p class="mt-1 text-sm text-gray-600">{{ container.shippingLine }}</p>
          </div>
        </div>

        <div :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor()]">
          {{ container.status }}
        </div>
      </div>

      <!-- Description -->
      <div class="mb-3">
        <p class="text-sm leading-relaxed text-gray-700">
          {{ container.vesselName }}, {{ container.voyage }}, Size: {{ container.size }}
        </p>
      </div>
      
      <!-- Progress bar -->
      <div class="mb-5">
        <div class="flex justify-between text-xs text-gray-500 mb-1">
          <span>Processing</span>
          <span>{{ container.status === 'ExitedYard' ? 'Completed' : 'In Progress' }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="h-2 rounded-full bg-blue-600" 
            :style="{ width: `${getProgressPercentage()}%` }"
          ></div>
        </div>
      </div>

      <!-- Features -->
      <div class="flex flex-wrap gap-3 mb-5">
        <div class="flex items-center" :class="features.registration ? 'text-blue-600' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Registration</span>
        </div>

        <div class="flex items-center" :class="features.docCheck ? 'text-blue-600' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Doc Check</span>
        </div>

        <div class="flex items-center" :class="features.gate ? 'text-blue-600' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm">Gate Pass</span>
        </div>

        <div class="flex items-center" :class="features.yard ? 'text-blue-600' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
            <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
          <span class="text-sm">Yard</span>
        </div>
      </div>
    </div>

    <!-- Updated Action buttons in CardFooter to match table-like layout -->
    <CardFooter class="px-5 pt-0 pb-5">
      <div class="flex flex-col sm:flex-row items-center justify-end gap-2 w-full sm:ms-auto">
        <ButtonComponent 
          variant="outline"
          size="sm" 
          class="w-full sm:w-28"
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
          :to="`/StatusTimelinePage?type=container&id=${container.id}`"
          class="inline-flex items-center justify-center px-3.5 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-28"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            class="mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
          </svg>
          View Status
        </NuxtLink>
      </div>
    </CardFooter>
  </Card>
</template> 