<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Define CusDec interface
interface CusDec {
  id: string;
  number: string;
  status: string;
  declarantCompany: string;
  consigneeCompany: string;
  officeCode: string;
  channel: string;
  containerCount: number;
  date: string;
}

const route = useRoute();
const cusdecId = ref(route.params.id as string);
const cusdec = ref<CusDec | null>(null);
const loading = ref(true);

// Mock API call to get CusDec details
const fetchCusDecDetails = async () => {
  loading.value = true;
  
  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data - in a real app, this would be from an API
    cusdec.value = {
      id: cusdecId.value,
      number: 'CUSDEC-' + cusdecId.value,
      status: 'Processing',
      declarantCompany: 'ABC Shipping Co Ltd',
      consigneeCompany: 'XYZ Import & Export Inc',
      officeCode: 'CBHQ1',
      channel: 'green',
      containerCount: 2,
      date: '05/04/2024'
    };
  } catch (error) {
    console.error('Error fetching CusDec details:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCusDecDetails();
});
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin"></div>
      <p class="mt-4 text-sm text-gray-500">Loading details...</p>
    </div>

    <!-- CusDec details once loaded -->
    <div v-else-if="cusdec" class="space-y-6">
      <!-- Header info -->
      <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
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
              <h1 class="text-xl font-semibold text-gray-900">{{ cusdec.number }}</h1>
              <div class="flex items-center mt-1 text-sm text-gray-500">
                <span class="font-medium px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded">{{ cusdec.officeCode }}</span>
                <span class="mx-1.5">•</span>
                <span>{{ cusdec.date }}</span>
              </div>
            </div>
          </div>

          <!-- Status badge -->
          <div class="px-3 py-1 text-sm font-medium rounded-full status-bg-review">
            {{ cusdec.status }}
          </div>
        </div>
      </div>

      <!-- Details sections -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Left column -->
        <div class="space-y-6">
          <!-- General info -->
          <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <h2 class="mb-4 text-lg font-medium text-gray-900">General Information</h2>
            
            <div class="space-y-3">
              <!-- Company Details -->
              <div class="space-y-2 text-sm">
                <div class="flex">
                  <span class="w-24 text-gray-500">Consignee:</span>
                  <span class="font-medium text-gray-700">{{ cusdec.consigneeCompany }}</span>
                </div>
                <div class="flex">
                  <span class="w-24 text-gray-500">Declarant:</span>
                  <span class="font-medium text-gray-700">{{ cusdec.declarantCompany }}</span>
                </div>
              </div>
              
              <!-- Channel and Container Stats -->
              <div class="pt-3 mt-3 space-y-2 border-t border-gray-100 text-sm">
                <div class="flex">
                  <span class="w-24 text-gray-500">Channel:</span>
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3"></path>
                      <path d="M3 13h3a2 2 0 0 1 2 2v3"></path>
                      <path d="M16 13h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                    {{ cusdec.channel.toUpperCase() }}
                  </span>
                </div>
                <div class="flex">
                  <span class="w-24 text-gray-500">Containers:</span>
                  <span class="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="mr-1">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
                    </svg>
                    {{ cusdec.containerCount }} Container<span v-if="cusdec.containerCount !== 1">s</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="space-y-6">
          <!-- Status panel -->
          <div class="p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-900">Status</h2>
              
              <NuxtLink 
                :to="`/StatusTimelinePage?type=cusdec&id=${cusdec.id}`"
                class="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                View Timeline
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </NuxtLink>
            </div>
            
            <!-- Status steps -->
            <div class="space-y-4">
              <div class="flex">
                <div class="flex flex-col items-center mr-4">
                  <div class="flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="pb-5">
                  <p class="text-sm font-medium text-gray-900">Submission</p>
                  <p class="text-xs text-gray-500">Completed on 05/04/2024</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex flex-col items-center mr-4">
                  <div class="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div class="pb-5">
                  <p class="text-sm font-medium text-gray-900">Processing</p>
                  <p class="text-xs text-gray-500">In progress</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex flex-col items-center mr-4">
                  <div class="flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M7 15h0M2 9.5h20"></path>
                    </svg>
                  </div>
                  <div class="w-px h-full bg-gray-200"></div>
                </div>
                <div class="pb-5">
                  <p class="text-sm font-medium text-gray-400">Payment</p>
                  <p class="text-xs text-gray-400">Pending</p>
                </div>
              </div>
              
              <div class="flex">
                <div class="flex flex-col items-center mr-4">
                  <div class="flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-400">Release</p>
                  <p class="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
        <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download
        </button>
        
        <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
          </svg>
          Edit Details
        </button>
      </div>
    </div>

    <!-- Error state if CusDec not found -->
    <div v-else class="p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">CusDec not found</h3>
      <p class="mt-2 text-sm text-gray-500">We couldn't find the customs declaration with ID {{ cusdecId }}</p>
      <div class="mt-6">
        <NuxtLink to="/CusDecList" class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to CusDec List
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
