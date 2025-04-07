<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import ButtonComponent from './ui/button/index'
import StatusTimelineButton from './StatusTimelineButton.vue'
import { ref, computed } from 'vue'
import { AnonymizedCusDecRecord, AnonymizedContainer, yardLocationColors, YardLocations } from '../lib/data/anonymizedCusDecData'
import { mapCusDecStatusToYardLocation } from '../lib/data'
import { useRouter } from 'vue-router'
import ItemDetailsSheet from './ItemDetailsSheet.vue'

// Add additional type information to support the component properties
interface ExtendedCusDecRecord extends AnonymizedCusDecRecord {
  countryOfExport?: string;
  containers?: AnonymizedContainer[];
}

// Define the props
interface Props {
  cusdec: ExtendedCusDecRecord;
}

const props = defineProps<Props>();
const router = useRouter();

// Define the emits
const emit = defineEmits<{
  'view-details': [cusdec: ExtendedCusDecRecord];
  'view-timeline': [cusdec: ExtendedCusDecRecord];
  'acknowledge': [cusdec: ExtendedCusDecRecord];
}>();

// Add state for the details sheet
const showDetailsSheet = ref(false)

// Method to handle view details click
const handleViewDetails = () => {
  emit('view-details', props.cusdec);

  // Show the details sheet instead of navigating
  showDetailsSheet.value = true;

  // Only navigate if you still want that behavior as well
  // router.push(`/cusdec/${props.cusdec.id}`);
};

// Method to handle view timeline click
const handleViewTimeline = () => {
  emit('view-timeline', props.cusdec);
};

// Method to handle acknowledge click
const handleAcknowledge = () => {
  emit('acknowledge', props.cusdec);
};

// Method to handle view containers click
const handleViewContainers = () => {
  router.push(`/ContainerTracking?cusdec=${encodeURIComponent(props.cusdec.cusdecNumber)}`);
};

// Compute card class based on status
const cardClass = computed(() => {
  const baseClass = "mb-5 overflow-hidden transition-all duration-200 rounded-lg shadow-sm hover:shadow-md";

  // Add yellow background and border for waiting confirmation status
  if (props.cusdec.status.toLowerCase() === 'waiting confirmation') {
    return `${baseClass} bg-yellow-50 border-2 border-yellow-300`;
  }

  return `${baseClass} border border-gray-100`;
});

// Get default office code if not provided
const officeCode = computed(() => {
  return props.cusdec.officeCode || 'CBHQ1';
});

// Get BL number with fallback
const blNumber = computed(() => {
  return props.cusdec.blNumber || 'BL-000000000';
});

// Get container channel if available
const containerChannel = computed(() => {
  if (props.cusdec.containers && props.cusdec.containers.length > 0) {
    return props.cusdec.containers[0].channel;
  }
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

// Get country of export with default
const countryOfExport = computed(() => {
  return props.cusdec.originCountry || 'Singapore';
});

// Get yard location based on status
const yardLocation = computed(() => {
  return mapCusDecStatusToYardLocation(props.cusdec.status);
});

// Get the color styling for a yard location
const getYardLocationColor = computed(() => {
  const location = yardLocation.value;

  if (location in yardLocationColors) {
    return {
      bg: yardLocationColors[location].bg,
      text: yardLocationColors[location].text,
      border: yardLocationColors[location].border
    };
  }

  // Default styling if location not found
  return {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200'
  };
});

// Get channel color based on channel value
const getChannelColor = computed(() => {
  const channelValue = containerChannel.value;

  switch (channelValue) {
    case 'red':
    case 'Red':
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-200'
      }
    case 'yellow':
    case 'Yellow':
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-200'
      }
    case 'green':
    case 'Green':
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-200'
      }
    case 'blue':
    case 'Blue':
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
  <Card :class="cardClass">
    <!-- Mobile Card Layout (display only on small screens) -->
    <div class="lg:hidden">
      <!-- Card Header -->
      <div class="p-3">
        <!-- Top Row: Document Number and Status -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 truncate">{{ cusdec.cusdecNumber }}</h3>
              <div class="flex items-center text-xs text-gray-500">
                <span>{{ formattedDate }}</span>
                <span class="mx-1">•</span>
                <span class="inline-flex items-center text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-0.5">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="13 2 13 8 19 8"></polyline>
                  </svg> {{ blNumber }} </span>
              </div>
            </div>
          </div>
          <div :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor()]"> {{ cusdec.status }} </div>
        </div>
        <!-- Two-Column Content -->
        <div class="grid grid-cols-2 gap-3 mt-3">
          <!-- Left Column: Companies -->
          <div class="space-y-2 text-xs">
            <div>
              <p class="text-gray-500 font-medium">Consignee</p>
              <p class="text-gray-900 truncate">{{ cusdec.consigneeName }}</p>
            </div>
            <div>
              <p class="text-gray-500 font-medium">Declarant</p>
              <p class="text-gray-900 truncate">{{ cusdec.declarantName }}</p>
            </div>
          </div>
          <!-- Right Column: Container Info and Tags -->
          <div class="space-y-2">
            <!-- Container Count -->
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                  class="mr-1 text-blue-600">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
                </svg> Containers </span>
              <span class="text-gray-900 font-semibold">{{ containerCount }}</span>
            </div>
            <!-- Origin Country -->
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-purple-600">
                  <path
                    d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z">
                  </path>
                </svg> Origin </span>
              <span class="text-gray-900">{{ countryOfExport }}</span>
            </div>
          </div>
        </div>
        <!-- System Tags Row (below main content) -->
        <div class="flex flex-wrap gap-1 mt-3" v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'">
          <!-- Yard Location - hide for Waiting Confirmation -->
          <div :class="[
            'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
            getYardLocationColor.bg,
            getYardLocationColor.text
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-0.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg> {{ yardLocation }}
          </div>
          <!-- Channel -->
          <div :class="[
            'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
            getChannelColor.bg,
            getChannelColor.text
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-0.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
              <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
              <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
            </svg> {{ containerChannel.toUpperCase() }}
          </div>
        </div>
      </div>
      <!-- Mobile Card Layout Footer -->
      <div class="flex items-center justify-between px-3 py-2 border-t"
        :class="cusdec.status.toLowerCase() === 'waiting confirmation' ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-100'">
        <!-- Action buttons -->
        <div class="flex space-x-2">
          <!-- Show Acknowledge button for Waiting Confirmation status -->
          <ButtonComponent v-if="cusdec.status.toLowerCase() === 'waiting confirmation'" variant="primary"
            class="inline-flex items-center text-xs font-medium text-white bg-blue-600 rounded-md px-2 py-1 hover:bg-blue-700"
            @click="handleAcknowledge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M20 6L9 17l-5-5"></path>
            </svg> Acknowledge
          </ButtonComponent>
          <!-- Show Timeline button only if not in "Waiting Confirmation" status -->
          <button v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'" @click="handleViewTimeline"
            class="inline-flex items-center px-2 py-1 text-xs font-medium transition-colors rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg> Track </button>
          <!-- View Containers Button - hide for Waiting Confirmation status -->
          <button v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'" @click="handleViewContainers"
            class="inline-flex items-center px-2 py-1 text-xs font-medium transition-colors rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <rect x="1" y="3" width="15" height="13" rx="1"></rect>
              <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
              <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
            </svg> Containers </button>
        </div>
        <ButtonComponent variant="custom"
          class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
          @click="handleViewDetails">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z">
            </path>
          </svg> Details
        </ButtonComponent>
      </div>
    </div>
    <!-- Desktop Card Layout (display only on large screens) -->
    <div class="hidden lg:flex">
      <div class="flex-grow min-w-0 p-5">
        <!-- Top Section: Document info and status -->
        <div class="flex items-start justify-between">
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-semibold text-gray-900 truncate">{{ cusdec.cusdecNumber }}</h3>
              <div class="flex items-center mt-1 text-sm text-gray-500">
                <span class="flex items-center px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-medium text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-0.5">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="13 2 13 8 19 8"></polyline>
                  </svg> {{ blNumber }} </span>
                <span class="mx-2">•</span>
                <span class="text-xs">{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          <div :class="['px-2.5 py-1 text-xs font-medium rounded-full', getStatusColor()]"> {{ cusdec.status }} </div>
        </div>
        <!-- Two-Column Content for Desktop -->
        <div class="grid grid-cols-2 gap-6 mt-5">
          <!-- Left Column: Company Info -->
          <div class="space-y-3">
            <div>
              <p class="text-xs font-medium text-gray-500 mb-1">Consignee</p>
              <p class="text-sm text-gray-900">{{ cusdec.consigneeName }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 mb-1">Declarant</p>
              <p class="text-sm text-gray-900">{{ cusdec.declarantName }}</p>
            </div>
          </div>
          <!-- Right Column: Details -->
          <div>
            <!-- Container and Origin details -->
            <div class="flex space-x-6 mb-3">
              <div>
                <p class="flex items-center text-xs font-medium text-gray-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
                    class="mr-1 text-blue-600">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
                  </svg> Containers
                </p>
                <p class="text-sm font-semibold text-gray-900">{{ containerCount }}</p>
              </div>
              <div>
                <p class="flex items-center text-xs font-medium text-gray-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-1 text-purple-600">
                    <path
                      d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z">
                    </path>
                  </svg> Origin
                </p>
                <p class="text-sm text-gray-900">{{ countryOfExport }}</p>
              </div>
            </div>
            <!-- System Tags - shown as a separate row -->
            <div v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'"
              class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              <!-- Yard Location -->
              <div :class="[
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                getYardLocationColor.bg,
                getYardLocationColor.text,
                getYardLocationColor.border
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg> {{ yardLocation }}
              </div>
              <!-- Channel -->
              <div :class="[
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                getChannelColor.bg,
                getChannelColor.text
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
                  <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
                </svg> {{ containerChannel.toUpperCase() }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Column for Action Buttons -->
      <div class="flex flex-col justify-center flex-shrink-0 w-52 p-4 border-l"
        :class="cusdec.status.toLowerCase() === 'waiting confirmation' ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-100'">
        <div class="flex flex-col gap-3">
          <!-- Show Acknowledge button for Waiting Confirmation status -->
          <ButtonComponent v-if="cusdec.status.toLowerCase() === 'waiting confirmation'" variant="primary"
            class="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            @click="handleAcknowledge">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5">
              <path d="M20 6L9 17l-5-5"></path>
            </svg> Acknowledge
          </ButtonComponent>
          <!-- Show Timeline button only if not in "Waiting Confirmation" status -->
          <button v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'" @click="handleViewTimeline"
            class="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg> Track </button>
          <!-- View Containers Button - hide for Waiting Confirmation status -->
          <button v-if="cusdec.status.toLowerCase() !== 'waiting confirmation'" @click="handleViewContainers"
            class="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5">
              <rect x="1" y="3" width="15" height="13" rx="1"></rect>
              <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
              <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
            </svg> Containers </button>
          <ButtonComponent variant="custom"
            class="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-blue-700 transition-colors border border-transparent rounded-md shadow-sm bg-blue-50 hover:bg-blue-100"
            @click="handleViewDetails">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z">
              </path>
            </svg> Details
          </ButtonComponent>
        </div>
      </div>
    </div>
  </Card>
  <!-- Add the item details sheet at the bottom of the template -->
  <ItemDetailsSheet v-model:isOpen="showDetailsSheet" :itemId="cusdec.id" itemType="cusdec" />
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