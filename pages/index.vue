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
          <div class="flex flex-col lg:flex-row">
            <!-- Card Main Content -->
            <div class="flex-grow min-w-0 p-4">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center flex-shrink-0 rounded-md w-9 h-9 bg-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-green-600">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">Container Tracking</h2>
                </div>
              </div>
              
              <!-- Container Statistics -->
              <div class="grid grid-cols-3 gap-3 mt-4">
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Total</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-green-600">{{ containerStats.total }}</p>
                    <p class="ml-1 text-xs text-gray-500">containers</p>
                  </div>
                </div>
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Last Week</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-green-600">{{ containerStats.lastWeek }}</p>
                    <p class="ml-1 text-xs text-gray-500">new</p>
                  </div>
                </div>
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Pending</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-green-600">{{ containerStats.pending }}</p>
                    <p class="ml-1 text-xs text-gray-500">items</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Card Action Section -->
            <div class="flex flex-col justify-center flex-shrink-0 p-4 border-t border-gray-100 lg:border-t-0 lg:border-l lg:w-40 bg-gray-50">
              <div class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                <span class="text-sm font-medium text-green-700">View Details</span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      
      <!-- CusDec Tracking Card -->
      <NuxtLink to="/CusDecTracking" class="block transition-all duration-200 hover:scale-[1.01]">
        <div class="mb-0 overflow-hidden transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
          <div class="flex flex-col lg:flex-row">
            <!-- Card Main Content -->
            <div class="flex-grow min-w-0 p-4">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center flex-shrink-0 rounded-md w-9 h-9 bg-blue-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">CusDec Tracking</h2>
                </div>
              </div>
              
              <!-- CusDec Statistics -->
              <div class="grid grid-cols-3 gap-3 mt-4">
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Total</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-blue-600">{{ cusDecStats.total }}</p>
                    <p class="ml-1 text-xs text-gray-500">documents</p>
                  </div>
                </div>
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Last Week</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-blue-600">{{ cusDecStats.lastWeek }}</p>
                    <p class="ml-1 text-xs text-gray-500">new</p>
                  </div>
                </div>
                <div class="p-2 bg-white border border-gray-100 rounded-lg">
                  <p class="text-xs font-medium text-gray-500 uppercase">Pending</p>
                  <div class="flex items-baseline">
                    <p class="text-lg font-bold text-blue-600">{{ cusDecStats.pending }}</p>
                    <p class="ml-1 text-xs text-gray-500">items</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Card Action Section -->
            <div class="flex flex-col justify-center flex-shrink-0 p-4 border-t border-gray-100 lg:border-t-0 lg:border-l lg:w-40 bg-gray-50">
              <div class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                <span class="text-sm font-medium text-blue-700">View Details</span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>