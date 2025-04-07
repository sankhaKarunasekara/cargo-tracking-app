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
import ItemDetailsSheet from './ItemDetailsSheet.vue'

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

// Define the emits
const emit = defineEmits<{
  'view-details': [container: ExtendedContainer];
  'view-timeline': [container: ExtendedContainer];
}>();

// Add state for the details sheet
const showDetailsSheet = ref(false)

// Method to handle view details click
const handleViewDetails = () => {
  emit('view-details', props.container);

  // Show the details sheet instead of navigating
  showDetailsSheet.value = true;

  // Only navigate if you still want that behavior as well
  // router.push(`/container/${props.container.id}`);
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
  <Card
    class="mb-5 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
    <!-- Mobile Card Layout (display only on small screens) -->
    <div class="lg:hidden">
      <!-- Card Header -->
      <div class="p-3">
        <!-- Top Row: Container Number and Status -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-blue-600">
                <rect x="1" y="3" width="15" height="13" rx="1"></rect>
                <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
                <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
                <circle cx="5.5" cy="19.5" r="2.5"></circle>
                <circle cx="18.5" cy="19.5" r="2.5"></circle>
              </svg>
            </div>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-900 truncate">{{ container.number }}</h3>
              <div class="flex items-center text-xs text-gray-500">
                <span>{{ formattedDate }}</span>
                <span class="mx-1">•</span>
                <span class="inline-flex items-center text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-0.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg> {{ container.cusdecId }} </span>
              </div>
            </div>
          </div>
          <div :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusColor()]"> {{ container.status }} </div>
        </div>
        <!-- Two-Column Content -->
        <div class="grid grid-cols-2 gap-3 mt-3">
          <!-- Left Column: Vessel Info -->
          <div class="space-y-2 text-xs">
            <div>
              <p class="flex items-center font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-blue-600">
                  <path d="M22 12s-4-4-10-4-10 4-10 4 4 4 10 4 10-4 10-4z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg> Vessel
              </p>
              <p class="text-gray-900 truncate">{{ container.vesselName }}</p>
            </div>
            <div>
              <p class="flex items-center font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-blue-600">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg> Voyage
              </p>
              <p class="text-gray-900 truncate">{{ container.voyage }}</p>
            </div>
          </div>
          <!-- Right Column: Container Details -->
          <div class="space-y-2">
            <!-- Container Size and Type -->
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-teal-600">
                  <path d="M3 6l9 4.5L21 6"></path>
                  <path d="M3 10l9 4.5 9-4.5"></path>
                  <path d="M3 14l9 4.5 9-4.5"></path>
                </svg> Size </span>
              <span class="text-gray-900">{{ containerSize }}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-teal-600">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg> Type </span>
              <span class="text-gray-900">{{ containerType }}</span>
            </div>
            <!-- Origin -->
            <div class="flex items-center justify-between text-xs">
              <span class="flex items-center font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-purple-600">
                  <path
                    d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z">
                  </path>
                </svg> Origin </span>
              <span class="text-gray-900">{{ origin }}</span>
            </div>
          </div>
        </div>
        <!-- System Tags Row (below main content) -->
        <div class="flex flex-wrap gap-1 mt-3">
          <!-- Location -->
          <div :class="[
            'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
            getLocationColor.bg,
            getLocationColor.text
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-0.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg> {{ container.location || destination }}
          </div>
          <!-- Channel Badge -->
          <div v-if="container.channel" :class="[
            'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium',
            container.channel.toLowerCase() === 'red' ? 'bg-red-100 text-red-700' :
              container.channel.toLowerCase() === 'yellow' ? 'bg-amber-100 text-amber-700' :
                container.channel.toLowerCase() === 'green' ? 'bg-green-100 text-green-700' :
                  container.channel.toLowerCase() === 'blue' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-0.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
              <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
              <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
            </svg> {{ container.channel }}
          </div>
        </div>
      </div>
      <!-- Mobile Card Layout Footer -->
      <div class="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50">
        <!-- Action buttons -->
        <div class="flex space-x-2">
          <button @click="handleViewTimeline"
            class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg> Track </button>
        </div>
        <ButtonComponent variant="custom"
          class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 rounded-md bg-blue-50 hover:bg-blue-100"
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
      <div class="flex-grow min-w-0 p-4">
        <div class="flex items-start justify-between">
          <div class="flex items-start">
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded-md bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-blue-600">
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
                <span class="px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-medium flex items-center text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-0.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg> {{ container.cusdecId }} </span>
                <span class="mx-1">•</span>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
          </div>
          <div :class="['px-2.5 py-1 text-xs font-medium rounded-full', getStatusColor()]"> {{ container.status }}
          </div>
        </div>
        <!-- Two-Column Content for Desktop -->
        <div class="grid grid-cols-3 gap-6 mt-5">
          <!-- Left Column: Vessel Info -->
          <div class="space-y-3">
            <div>
              <p class="flex items-center mb-1 text-xs font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-blue-600">
                  <path d="M22 12s-4-4-10-4-10 4-10 4 4 4 10 4 10-4 10-4z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg> Vessel
              </p>
              <p class="text-sm text-gray-900">{{ container.vesselName }}</p>
            </div>
            <div>
              <p class="flex items-center mb-1 text-xs font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-blue-600">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg> Voyage
              </p>
              <p class="text-sm text-gray-900">{{ container.voyage }}</p>
            </div>
          </div>
          <!-- Middle Column: Container Details -->
          <div>
            <!-- Size and Type details -->
            <div class="space-y-3">
              <div>
                <p class="flex items-center mb-1 text-xs font-medium text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-1 text-teal-600">
                    <path d="M3 6l9 4.5L21 6"></path>
                    <path d="M3 10l9 4.5 9-4.5"></path>
                    <path d="M3 14l9 4.5 9-4.5"></path>
                  </svg> Size
                </p>
                <p class="text-sm font-semibold text-gray-900">{{ containerSize }}</p>
              </div>
              <div>
                <p class="flex items-center mb-1 text-xs font-medium text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="mr-1 text-teal-600">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg> Type
                </p>
                <p class="text-sm text-gray-900">{{ containerType }}</p>
              </div>
            </div>
          </div>
          <!-- Right Column: Origin and Tags -->
          <div>
            <!-- Origin -->
            <div class="mb-3">
              <p class="flex items-center mb-1 text-xs font-medium text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="mr-1 text-purple-600">
                  <path
                    d="M12 12c2-2.96 0-7-1-8c0 3.038-1.773 4.741-3 6c-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5c-1.786 3-2 4-4 2z">
                  </path>
                </svg> Origin
              </p>
              <p class="text-sm text-gray-900">{{ origin }}</p>
            </div>
            <!-- System Tags -->
            <div class="flex flex-wrap gap-2 pt-3 mt-3 border-t border-gray-100">
              <!-- Yard Location -->
              <div :class="[
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                getLocationColor.bg,
                getLocationColor.text
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg> {{ container.location || destination }}
              </div>
              <!-- Channel Badge -->
              <div v-if="container.channel" :class="[
                'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                container.channel.toLowerCase() === 'red' ? 'bg-red-100 text-red-700' :
                  container.channel.toLowerCase() === 'yellow' ? 'bg-amber-100 text-amber-700' :
                    container.channel.toLowerCase() === 'green' ? 'bg-green-100 text-green-700' :
                      container.channel.toLowerCase() === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
              ]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
                  <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
                </svg> {{ container.channel }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Column for Action Buttons -->
      <div class="flex flex-col justify-center flex-shrink-0 p-4 border-l border-gray-100 w-52 bg-gray-50">
        <div class="flex flex-col gap-3">
          <button @click="handleViewTimeline"
            class="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg> Track </button>
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
  <ItemDetailsSheet v-model:isOpen="showDetailsSheet" :itemId="container.id" itemType="container" />
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