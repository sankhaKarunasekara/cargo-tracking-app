<template>
  <div class="flex flex-col h-full bg-gray-50">
    <!-- Mobile Header with conditional back button for detail pages -->
    <header class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between h-14 px-4">
        <!-- Conditional Back Button for Detail Pages -->
        <div class="flex items-center">
          <button 
            v-if="shouldShowBackButton" 
            @click="goBack"
            class="flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          
          <!-- Logo (smaller on detail pages) -->
          <NuxtLink to="/" class="flex items-center">
            <svg class="w-7 h-7 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16H11V18H13V16Z" fill="currentColor" />
              <path d="M12 6C11.4477 6 11 6.44772 11 7V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V7C13 6.44772 12.5523 6 12 6Z" fill="currentColor" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="currentColor" />
            </svg>
            <span class="text-lg font-semibold text-gray-900">Cargo Tracker</span>
          </NuxtLink>
        </div>

        <!-- User profile icon -->
        <button class="flex items-center p-1 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100">
          <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Profile" />
        </button>
      </div>
      
      <!-- Page Title - Only for detail pages -->
      <div v-if="shouldShowBackButton" class="px-4 py-2 text-sm font-medium text-gray-600">
        {{ pageTitle }}
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
      <slot />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="sticky bottom-0 z-10 bg-white border-t border-gray-200">
      <div class="grid grid-cols-4 h-16">
        <NuxtLink to="/" class="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs mt-1">Home</span>
        </NuxtLink>

        <NuxtLink to="/CusDecList" class="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-xs mt-1">CusDecs</span>
        </NuxtLink>

        <NuxtLink to="/ContainerList" class="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span class="text-xs mt-1">Containers</span>
        </NuxtLink>

        <NuxtLink to="/Reports" class="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="text-xs mt-1">Reports</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Determine if we should show the back button (for detail pages)
const shouldShowBackButton = computed(() => {
  const path = route.path;
  return path.includes('/ContainerDetail/') ||
         path.includes('/StatusTimelinePage') ||
         path.includes('/AcceptCusDec');
});

// Determine page title based on the current route
const pageTitle = computed(() => {
  const path = route.path;
  
  if (path.includes('/ContainerDetail/')) {
    return 'Container Details';
  } else if (path.includes('/StatusTimelinePage')) {
    return 'Status Timeline';
  } else if (path.includes('/AcceptCusDec')) {
    return 'Accept Declaration';
  }
  
  return '';
});

// Function to handle the back button click
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.custom-scrollbar {
  -webkit-overflow-scrolling: touch;
}
</style> 