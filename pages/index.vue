<script setup>
definePageMeta({
  title: 'Home',
  description: 'Customs Documentation System for managing containers and customs declarations'
})

// Mock data for demonstration - replace with actual data fetching
const containerStats = {
  total: 128,
  lastWeek: 24,
  pending: 12
}

const cusDecStats = {
  total: 254,
  lastWeek: 36,
  pending: 8
}
</script>

<template>
  <div class="container p-6 mx-auto">
    <h1 class="mb-5 text-xl font-bold text-gray-900">Dashboard</h1>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <!-- Container Tracking Card -->
      <NuxtLink to="/ContainerTracking" class="block transition-all duration-200 hover:scale-[1.01]">
        <div class="mb-0 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
          <div class="p-3 lg:p-4">
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-md bg-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-green-600">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
                  </svg>
                </div>
                <h2 class="text-base font-semibold text-gray-900">Container Tracking</h2>
              </div>
              <div class="flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Two Column Main Content -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Left Column: Stats -->
              <div class="space-y-2">
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Total</span>
                    <span class="text-lg font-bold text-green-600">{{ containerStats.total }}</span>
                  </div>
                </div>
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Last Week</span>
                    <span class="text-lg font-bold text-green-600">{{ containerStats.lastWeek }}</span>
                  </div>
                </div>
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Pending</span>
                    <span class="text-lg font-bold text-green-600">{{ containerStats.pending }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Right Column: Status & Info -->
              <div class="flex flex-col justify-between">
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-xs mb-1 text-gray-500">Status</div>
                  <div class="grid grid-cols-3 gap-1">
                    <div class="h-1.5 rounded bg-green-600"></div>
                    <div class="h-1.5 rounded bg-green-600"></div>
                    <div class="h-1.5 rounded bg-gray-200"></div>
                  </div>
                  <div class="mt-1 text-xs text-gray-700">
                    <span class="font-semibold">67%</span> on track
                  </div>
                </div>
                
                <div class="mt-2 text-sm text-gray-700">
                  <div class="inline-flex items-center text-xs">
                    <span class="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                    Processing 8
                  </div>
                  <div class="inline-flex items-center text-xs ml-2">
                    <span class="w-2 h-2 mr-1 rounded-full bg-blue-500"></span>
                    Released 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      
      <!-- CusDec Tracking Card -->
      <NuxtLink to="/CusDecTracking" class="block transition-all duration-200 hover:scale-[1.01]">
        <div class="mb-0 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
          <div class="p-3 lg:p-4">
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-md bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h2 class="text-base font-semibold text-gray-900">CusDec Tracking</h2>
              </div>
              <div class="flex items-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Two Column Main Content -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Left Column: Stats -->
              <div class="space-y-2">
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Total</span>
                    <span class="text-lg font-bold text-blue-600">{{ cusDecStats.total }}</span>
                  </div>
                </div>
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Last Week</span>
                    <span class="text-lg font-bold text-blue-600">{{ cusDecStats.lastWeek }}</span>
                  </div>
                </div>
                <div class="p-2 border border-gray-100 rounded-lg bg-white">
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-medium text-gray-500 uppercase">Pending</span>
                    <span class="text-lg font-bold text-blue-600">{{ cusDecStats.pending }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Right Column: Status & Info -->
              <div class="flex flex-col justify-between">
                <div class="p-2 bg-gray-50 rounded-lg">
                  <div class="text-xs mb-1 text-gray-500">Status</div>
                  <div class="grid grid-cols-4 gap-1">
                    <div class="h-1.5 rounded bg-blue-600"></div>
                    <div class="h-1.5 rounded bg-blue-600"></div>
                    <div class="h-1.5 rounded bg-blue-600"></div>
                    <div class="h-1.5 rounded bg-gray-200"></div>
                  </div>
                  <div class="mt-1 text-xs text-gray-700">
                    <span class="font-semibold">75%</span> on track
                  </div>
                </div>
                
                <div class="mt-2 text-sm text-gray-700">
                  <div class="inline-flex items-center text-xs">
                    <span class="w-2 h-2 mr-1 rounded-full bg-amber-500"></span>
                    Pending 8
                  </div>
                  <div class="inline-flex items-center text-xs ml-2">
                    <span class="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                    Released 12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>