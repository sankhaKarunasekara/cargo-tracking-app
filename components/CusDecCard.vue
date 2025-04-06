<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import ButtonComponent from './ui/button/index'
import StatusTimelineButton from './StatusTimelineButton.vue'
import { ref, computed } from 'vue'
import { AnonymizedCusDecRecord } from '../lib/data/anonymizedCusDecData'
import { useRouter } from 'vue-router'

// Define the props
interface Props {
  cusdec: AnonymizedCusDecRecord;
}

const props = defineProps<Props>();
const router = useRouter();

// Define the emits
const emit = defineEmits<{
  'view-details': [cusdec: AnonymizedCusDecRecord];
}>();

// Method to handle view details click
const handleViewDetails = () => {
  emit('view-details', props.cusdec);
  router.push(`/cusdec/${props.cusdec.id}`);
};

// Get default office code if not provided
const officeCode = computed(() => {
  return props.cusdec.officeCode || 'CBHQ1';
});

// Get default channel if not provided
const channel = computed(() => {
  return props.cusdec.channel?.toLowerCase() || 'green';
});

// Format registration date for display
const formattedDate = computed(() => {
  if (!props.cusdec.regDate) return '05/04/2024';
  
  const date = new Date(props.cusdec.regDate);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
});

// Get container count with default
const containerCount = computed(() => {
  return props.cusdec.containerCount || 0;
});

// Get channel color based on channel value
const getChannelColor = computed(() => {
  switch (channel.value) {
    case 'red':
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200'
      }
    case 'yellow':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-200'
      }
    case 'green':
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200'
      }
    case 'blue':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200'
      }
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-200'
      }
  }
});

// Get status color based on status value
const getStatusColor = () => {
  const status = props.cusdec.status.toLowerCase();
  
  switch (status) {
    case 'processing':
      return 'status-bg-review';
    case 'released':
    case 'exempted':
      return 'status-bg-paid';
    case 'waiting confirmation':
      return 'status-bg-pending';
    case 'on hold':
      return 'status-bg-review';
    case 'detained':
    case 'rejected':
      return 'status-bg-error';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Map status to processing stage
const processingStage = computed(() => {
  const status = props.cusdec.status.toLowerCase();
  if (status === 'processing' || status === 'on hold') {
    return 'Processing';
  } else if (status === 'rejected') {
    return 'Detained';
  } else if (status === 'released' || status === 'exempted') {
    return 'Exited';
  } else if (status === 'waiting confirmation') {
    return 'Waiting Confirmation';
  } else {
    return props.cusdec.status;
  }
});

// Features based on status
const features = {
  submission: true,
  assessment: !['Processing', 'On Hold', 'Waiting Confirmation'].includes(props.cusdec.status),
  payment: ['Released', 'Exempted'].includes(props.cusdec.status),
  release: props.cusdec.status === 'Released'
}
</script>

<template>
  <Card class="mb-5 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
    <!-- Mobile Card Layout (display only on small screens) -->
    <div class="lg:hidden">
      <!-- Card Header -->
      <div class="p-6 pb-4">
        <div class="flex items-start justify-between gap-4">
          <!-- Left: Document icon and CusDec number -->
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">{{ cusdec.cusdecNumber }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <span class="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded font-medium">{{ officeCode }}</span>
                <span class="mx-1.5">•</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          
          <!-- Right: Status badge -->
          <div class="flex flex-col items-end">
            <div :class="['px-3 py-1 text-xs font-medium rounded-full', getStatusColor()]">
              {{ cusdec.status }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card Divider -->
      <div class="h-px bg-gray-100"></div>
      
      <!-- Card Content -->
      <div class="p-6 pt-4">
        <!-- Channel and Container Stats -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Channel - shown only if not "Waiting Confirmation" -->
          <div 
            v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'"
            :class="[
              'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium',
              getChannelColor.bg, 
              getChannelColor.text
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
              <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
              <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
            </svg>
            Channel {{ channel.toUpperCase() }}
          </div>
          
          <!-- Container Count -->
          <div class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
            </svg>
            {{ containerCount }} Container<span v-if="containerCount !== 1">s</span>
          </div>
        </div>
        
        <!-- Company Info -->
        <div class="space-y-2 text-sm">
          <div class="flex">
            <span class="w-20 text-gray-500">Consignee:</span>
            <span class="font-medium text-gray-700">{{ cusdec.consigneeName }}</span>
          </div>
          <div class="flex">
            <span class="w-20 text-gray-500">Declarant:</span>
            <span class="font-medium text-gray-700">{{ cusdec.declarantName }}</span>
          </div>
        </div>
      </div>
      
      <!-- Card Footer -->
      <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div class="flex flex-col items-center justify-end gap-2 sm:flex-row">
          <button 
            @click="handleViewDetails"
            class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 sm:w-auto"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="15" 
              height="15"
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
          </button>
          
          <!-- Status Timeline Button -->
          <StatusTimelineButton 
            type="cusdec"
            :id="cusdec.id"
            class="w-full sm:w-auto"
          />
          
          <!-- Show Accept button when status is Waiting Confirmation, otherwise show View Status -->
          <button 
            v-if="cusdec.status.toLowerCase() === 'waiting confirmation'"
            class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md shadow-sm hover:bg-green-700 sm:w-auto"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="15" 
              height="15" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mr-2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Acknowledge
          </button>
        </div>
      </div>
    </div>
    
    <!-- Desktop Card Layout (display only on large screens) -->
    <div class="hidden lg:flex">
      <div class="flex-grow p-6">
        <div class="flex items-start gap-4">
          <!-- Left: Document icon and CusDec number -->
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">{{ cusdec.cusdecNumber }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <span class="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded font-medium">{{ officeCode }}</span>
                <span class="mx-1.5">•</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          
          <!-- Status badge -->
          <div :class="['px-3 py-1 text-xs font-medium rounded-full', getStatusColor()]">
            {{ cusdec.status }}
          </div>
        </div>
        
        <div class="mt-4">
          <!-- Channel and Container Stats -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <!-- Channel - shown only if not "Waiting Confirmation" -->
            <div 
              v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'"
              :class="[
                'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium',
                getChannelColor.bg, 
                getChannelColor.text
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
                <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
                <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
              </svg>
              Channel {{ channel.toUpperCase() }}
            </div>
            
            <!-- Container Count -->
            <div class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
              </svg>
              {{ containerCount }} Container<span v-if="containerCount !== 1">s</span>
            </div>
          </div>
          
          <!-- Company Info -->
          <div class="space-y-2 text-sm">
            <div class="flex">
              <span class="w-20 text-gray-500">Consignee:</span>
              <span class="font-medium text-gray-700">{{ cusdec.consigneeName }}</span>
            </div>
            <div class="flex">
              <span class="w-20 text-gray-500">Declarant:</span>
              <span class="font-medium text-gray-700">{{ cusdec.declarantName }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column for Action Buttons -->
      <div class="flex flex-col justify-center w-56 gap-3 p-6 border-l border-gray-100 bg-gray-50">
        <button 
          @click="handleViewDetails"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="15" 
            height="15"
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
        </button>
        
        <!-- Status Timeline Button -->
        <StatusTimelineButton 
          type="cusdec"
          :id="cusdec.id"
          class="w-full sm:w-auto"
        />
        
        <!-- Show Accept button when status is Waiting Confirmation, otherwise show View Status -->
        <button 
          v-if="cusdec.status.toLowerCase() === 'waiting confirmation'"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-md shadow-sm hover:bg-green-700 sm:w-auto"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="15" 
            height="15" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Acknowledge
        </button>
      </div>
    </div>
  </Card>
</template>

<style scoped>
/* Add any additional styles here */
.status-bg-submitted {
  background-color: rgb(254, 243, 199);
  color: rgb(133, 77, 14);
}

.status-bg-review {
  background-color: rgb(224, 242, 254);
  color: rgb(2, 132, 199);
}

.status-bg-paid {
  background-color: rgb(220, 252, 231);
  color: rgb(22, 163, 74);
}

.status-bg-error {
  background-color: rgb(254, 226, 226);
  color: rgb(220, 38, 38);
}

.status-bg-pending {
  background-color: rgb(238, 242, 255);
  color: rgb(79, 70, 229);
}
</style> 