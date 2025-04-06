<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import ButtonComponent from './ui/button/index'
import StatusTimelineButton from './StatusTimelineButton.vue'
import { ref, computed } from 'vue'
import { 
  AnonymizedContainer, 
  yardLocationColors, 
  YardLocations,
  formatContainerDate,
  getContainerDefaults,
  getContainerStatusColorClass,
  mapContainerStatusToProcessingStage,
  getContainerProgressPercentage,
  getContainerFeatures
} from '../lib/data'
import { useRouter } from 'vue-router'

// Add additional type information to support the component properties
interface ExtendedContainer extends AnonymizedContainer {
  destination?: string;
  origin?: string;
}

// Define the props
interface Props {
  container: ExtendedContainer;
}

const props = defineProps<Props>();
const router = useRouter();

// Define the emits
const emit = defineEmits<{
  'view-details': [container: ExtendedContainer];
  'view-timeline': [container: ExtendedContainer];
}>();

// Method to handle view details click
const handleViewDetails = () => {
  emit('view-details', props.container);
  router.push(`/container/${props.container.id}`);
};

// Method to handle view timeline click
const handleViewTimeline = () => {
  emit('view-timeline', props.container);
};

// Get container defaults
const containerDefaults = computed(() => getContainerDefaults(props.container));

// Format arrival date for display
const formattedDate = computed(() => formatContainerDate(props.container.arrivalDate));

// Get container size with default
const containerSize = computed(() => containerDefaults.value.size);

// Get container type with default
const containerType = computed(() => containerDefaults.value.type);

// Get origin with default
const origin = computed(() => props.container.origin || containerDefaults.value.origin);

// Get destination with default
const destination = computed(() => props.container.destination || containerDefaults.value.destination);

// Get status color based on status value
const getStatusColor = () => getContainerStatusColorClass(props.container.status);

// Map status to processing stage
const processingStage = computed(() => mapContainerStatusToProcessingStage(props.container.status));

// Generate progress indicator based on status
const getProgressPercentage = () => getContainerProgressPercentage(props.container.status);

// Features based on status
const features = computed(() => getContainerFeatures(props.container.status));

// Get the color styling for a yard location
const getLocationColor = computed(() => {
  const location = props.container.location || '';
  
  // Type guard to check if the location is a valid yard location
  const isValidYardLocation = (loc: string): loc is YardLocations => {
    return loc in yardLocationColors;
  };
  
  if (isValidYardLocation(location)) {
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
</script>

<template>
  <Card class="mb-5 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
    <!-- Mobile Card Layout (display only on small screens) -->
    <div class="lg:hidden">
      <!-- Card Header -->
      <div class="p-6 pb-4">
        <div class="flex items-start justify-between gap-4">
          <!-- Left: Container icon and number -->
          <div class="flex items-start min-w-0">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
                <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
                <circle cx="5.5" cy="19.5" r="2.5"></circle>
                <circle cx="18.5" cy="19.5" r="2.5"></circle>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-semibold text-gray-900 truncate">{{ container.number }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <span class="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded font-medium">{{ container.cusdecId }}</span>
                <span class="mx-1.5">•</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          
          <!-- Right: Status badge -->
          <div class="flex flex-col items-end flex-shrink-0">
            <div :class="['px-3 py-1 text-xs font-medium rounded-full', getStatusColor()]">
              {{ container.status }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card Divider -->
      <div class="h-px bg-gray-100"></div>
      
      <!-- Card Content -->
      <div class="p-6 pt-4">
        <!-- Type and Size -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Container Type -->
          <div class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
            </svg>
            {{ containerType }}
          </div>
          
          <!-- Container Size -->
          <div class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            {{ containerSize }}
          </div>
        </div>
        
        <!-- Vessel Info -->
        <div class="space-y-2 text-sm">
          <div class="flex">
            <span class="flex-shrink-0 w-20 text-gray-500">Vessel:</span>
            <span class="font-medium text-gray-700 truncate">{{ container.vesselName }}</span>
          </div>
          <div class="flex">
            <span class="flex-shrink-0 w-20 text-gray-500">Voyage:</span>
            <span class="font-medium text-gray-700 truncate">{{ container.voyage }}</span>
          </div>
          <div class="flex">
            <span class="flex-shrink-0 w-20 text-gray-500">BL No:</span>
            <span class="font-medium text-gray-700 truncate">{{ container.cusdecId }}</span>
          </div>
        </div>
        
        <!-- Add separator here above origin and location -->
        <div class="h-px my-4 bg-gray-100"></div>
        
        <!-- Origin and Location (bottom of content) -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Origin -->
          <div class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z"></path>
            </svg>
            {{ origin }}
          </div>
          
          <!-- Yard Location -->
          <div :class="[
            'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap',
            getLocationColor.bg, 
            getLocationColor.text
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {{ container.location || destination }}
          </div>
        </div>
      </div>
      
      <!-- Mobile Card Layout Footer -->
      <div class="flex items-center justify-end px-6 py-4 bg-gray-50">
        <!-- Action buttons -->
        <div class="flex space-x-2">
          <button 
            @click="handleViewTimeline"
            class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium transition-colors rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Track
          </button>
          
          <ButtonComponent
            variant="custom"
            class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="handleViewDetails"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"></path>
            </svg>
            View
          </ButtonComponent>
        </div>
      </div>
    </div>
    
    <!-- Desktop Card Layout (display only on large screens) -->
    <div class="hidden lg:flex">
      <div class="flex-grow min-w-0 p-6">
        <div class="flex items-start gap-4">
          <!-- Left: Container icon and number -->
          <div class="flex items-start min-w-0">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
                <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
                <circle cx="5.5" cy="19.5" r="2.5"></circle>
                <circle cx="18.5" cy="19.5" r="2.5"></circle>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-semibold text-gray-900 truncate">{{ container.number }}</h3>
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <span class="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded font-medium">{{ container.cusdecId }}</span>
                <span class="mx-1.5">•</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          
          <!-- Status badge -->
          <div :class="['px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 whitespace-nowrap', getStatusColor()]">
            {{ container.status }}
          </div>
        </div>
        
        <div class="mt-4">
          <!-- Type and Size -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <!-- Container Type -->
            <div class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
              </svg>
              {{ containerType }}
            </div>
            
            <!-- Container Size -->
            <div class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              {{ containerSize }}
            </div>
          </div>
          
          <!-- Vessel Info -->
          <div class="space-y-2 text-sm">
            <div class="flex min-w-0">
              <span class="flex-shrink-0 w-20 text-gray-500">Vessel:</span>
              <span class="font-medium text-gray-700 truncate">{{ container.vesselName }}</span>
            </div>
            <div class="flex min-w-0">
              <span class="flex-shrink-0 w-20 text-gray-500">Voyage:</span>
              <span class="font-medium text-gray-700 truncate">{{ container.voyage }}</span>
            </div>
            <div class="flex min-w-0">
              <span class="flex-shrink-0 w-20 text-gray-500">BL No:</span>
              <span class="font-medium text-gray-700 truncate">{{ container.cusdecId }}</span>
            </div>
          </div>
          
          <!-- Add separator here above origin and location -->
          <div class="h-px my-4 bg-gray-100"></div>
          
          <!-- Origin and Location (desktop bottom content) -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Origin -->
            <div class="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <path d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z"></path>
              </svg>
              {{ origin }}
            </div>
            
            <!-- Yard Location -->
            <div :class="[
              'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap',
              getLocationColor.bg, 
              getLocationColor.text
            ]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {{ container.location || destination }}
            </div>
            
            <!-- Channel Badge -->
            <div v-if="container.channel" :class="[
              'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap',
              container.channel.toLowerCase() === 'red' ? 'bg-red-100 text-red-700' :
              container.channel.toLowerCase() === 'yellow' ? 'bg-amber-100 text-amber-700' :
              container.channel.toLowerCase() === 'green' ? 'bg-green-100 text-green-700' :
              container.channel.toLowerCase() === 'blue' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            ]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
                <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
                <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
              </svg>
              Channel {{ container.channel }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column for Action Buttons -->
      <div class="flex flex-col justify-center flex-shrink-0 w-56 p-6 border-l border-gray-100 bg-gray-50">
        <div class="flex flex-col gap-3">
          <button 
            @click="handleViewTimeline"
            class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
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
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Track
          </button>
          
          <ButtonComponent
            variant="custom"
            class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 transition-colors border border-transparent rounded-md shadow-sm bg-blue-50 hover:bg-blue-100"
            @click="handleViewDetails"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"></path>
            </svg>
            Details
          </ButtonComponent>
        </div>
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