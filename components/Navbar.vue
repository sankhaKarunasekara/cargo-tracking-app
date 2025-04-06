<template>
  <nav class="sticky top-0 z-20 w-full bg-white border-b border-gray-100 shadow-sm">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Mobile menu button-->
          <button
            @click="toggleSidebar"
            class="inline-flex items-center justify-center p-2 text-gray-500 rounded-md md:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Toggle sidebar navigation"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              class="w-6 h-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          
          <!-- Site title - visible on medium and up -->
          <div class="flex items-center md:ml-4">
            <span class="text-xl font-semibold text-gray-900">Cargo Tracker</span>
          </div>
        </div>
        
        <div class="flex items-center">
          <!-- Search -->
          <div class="flex items-center mx-2">
            <div class="relative w-full max-w-xs">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="w-5 h-5 text-gray-400" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                class="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <!-- User avatar dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                @click="toggleUserMenu"
                class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <div class="flex items-center justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-full">
                  A
                </div>
              </button>
            </div>
            
            <!-- User dropdown menu -->
            <div 
              v-if="userMenuOpen"
              class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
              @click.outside="closeUserMenu"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Mobile sidebar (only shown when toggled) -->
  <div v-if="showMobileSidebar" class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" @click="closeSidebar">
    <div class="w-64 h-full bg-white shadow-lg" @click.stop>
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
            <path d="M17 7l-3-3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-3-3h-2z"></path>
            <path d="M13 7V4"></path>
            <polyline points="8 16 10 18 16 12"></polyline>
          </svg>
          <span class="text-lg font-semibold">Cargo Tracking</span>
        </div>
        <button 
          @click="closeSidebar" 
          class="inline-flex items-center justify-center p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link to="/" class="flex items-center p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-gray-500">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/ContainerTracking" class="flex items-center p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-gray-500">
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path>
                <line x1="9" y1="9" x2="10" y2="9"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
              </svg>
              <span>Container Tracking</span>
            </router-link>
          </li>
          <li>
            <router-link to="/CusDecTracking" class="flex items-center p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-gray-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>CusDec Tracking</span>
            </router-link>
          </li>
          <li>
            <router-link to="/CusDecOwnership" class="flex items-center p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-gray-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>CusDec Ownership</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useSidebar } from './ui/sidebar'

// Mobile sidebar state
const showMobileSidebar = ref(false)

// User menu state
const userMenuOpen = ref(false)

// Try to get sidebar context, but don't fail if not available
let sidebarToggle = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

// Check if we're inside a SidebarProvider
try {
  const { toggleSidebar } = useSidebar()
  sidebarToggle = toggleSidebar
} catch (error) {
  // Use the default mobile sidebar toggle if outside a SidebarProvider
  console.warn('Sidebar provider not found, using fallback mobile navigation')
}

const toggleSidebar = () => {
  sidebarToggle()
  // Also toggle mobile sidebar for mobile view 
  showMobileSidebar.value = !showMobileSidebar.value
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

// Close user menu when clicking outside
const closeUserMenu = () => {
  userMenuOpen.value = false
}

const closeSidebar = () => {
  showMobileSidebar.value = false
}
</script>