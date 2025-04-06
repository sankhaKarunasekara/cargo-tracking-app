<template>
  <nav class="sticky top-0 z-20 w-full bg-white border-b border-gray-100 shadow-sm">
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Mobile menu button-->
          <button
            @click="toggleSidebar"
            class="inline-flex items-center justify-center p-2 text-gray-500 rounded-md md:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            :class="{ 'bg-gray-100 text-gray-900': showMobileSidebar }"
            aria-label="Toggle sidebar navigation"
          >
            <svg v-if="!showMobileSidebar"
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
            <svg v-else
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              class="w-6 h-6"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          
          <!-- Hide sidebar button (desktop only) -->
          <button
            v-if="!isMobile && showDesktopSidebar"
            @click="$emit('toggle-desktop-sidebar')"
            class="items-center justify-center hidden p-2 mr-2 text-gray-500 rounded-md md:inline-flex hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Hide sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
              <path d="M16 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h11"></path>
              <path d="m10 17-5-5 5-5"></path>
            </svg>
          </button>
          
          <!-- Logo and page title container -->
          <div class="flex items-center">
            <!-- Logo - only visible on mobile or when sidebar is hidden -->
            <div class="flex items-center" v-if="!showDesktopSidebar || isMobile">
              <img src="/customs-logo.png" alt="Sri Lanka Customs Logo" class="w-8 h-8" />
              <div class="hidden ml-3 sm:block">
                <div class="text-base font-bold text-blue-600">CDNS</div>
                <div class="text-xs text-gray-500">Sri Lanka Customs</div>
              </div>
            </div>
            
            <!-- Dynamic page title -->
            <div class="items-center hidden md:flex" :class="{ 'pl-3 ml-3 border-l border-gray-200': !showDesktopSidebar || isMobile }">
              <h1 class="text-xl font-semibold text-gray-900">Customs Documentation System</h1>
            </div>
            
            <!-- Mobile only - small page title -->
            <h1 class="text-base font-medium text-gray-900 md:hidden">{{ currentPageTitle }}</h1>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Filter button (conditionally shown) with improved mobile appearance -->
          <button 
            v-if="showFilterButton"
            @click="$emit('toggle-filters')"
            class="flex items-center justify-center p-2 text-blue-600 transition-colors rounded-full bg-blue-50 hover:bg-blue-100"
            aria-label="Toggle filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
          
          <!-- Notifications button -->
          <button class="flex items-center justify-center p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </button>
          
          <!-- User avatar dropdown -->
          <div class="relative">
            <div>
              <button
                ref="userButtonRef"
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
              ref="userMenuRef"
              class="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="closeUserMenu">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="closeUserMenu">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" @click="closeUserMenu">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Mobile sidebar (only shown when toggled) -->
  <div class="fixed inset-0 z-40 md:hidden" v-show="showMobileSidebar">
    <!-- Backdrop with transition -->
    <div 
      class="fixed inset-0 transition-opacity duration-300 ease-in-out bg-black"
      :class="{ 'bg-opacity-50 backdrop-blur-sm': showMobileSidebar, 'bg-opacity-0': !showMobileSidebar }"
      @click="closeSidebar"
    ></div>
    
    <!-- Mobile sidebar content with slide-in animation -->
    <div 
      class="relative flex flex-col w-72 max-w-[80%] h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': showMobileSidebar, '-translate-x-full': !showMobileSidebar }"
    >
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <div class="flex items-center">
          <img src="/customs-logo.png" alt="Sri Lanka Customs Logo" class="w-12 h-12" />
          <div class="ml-3">
            <div class="text-lg font-bold text-blue-600">CDNS</div>
            <div class="text-xs text-gray-500">Sri Lanka Customs</div>
          </div>
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
      
      <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.title">
            <a 
              @click="navigateTo(item.path)"
              class="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100"
              :class="{ 'bg-blue-50 text-blue-600': isActive(item.path) }"
            >
              <!-- Home Icon -->
              <svg 
                v-if="item.icon === 'Home'" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="mr-3"
                :class="isActive(item.path) ? 'text-blue-600' : 'text-gray-500'"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              
              <!-- Package Icon -->
              <svg 
                v-if="item.icon === 'Package'" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="mr-3"
                :class="isActive(item.path) ? 'text-blue-600' : 'text-gray-500'"
              >
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                <path d="M7 21h10"></path>
                <path d="M12 3v18"></path>
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
              </svg>
              
              <!-- FileText Icon -->
              <svg 
                v-if="item.icon === 'FileText'" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="mr-3"
                :class="isActive(item.path) ? 'text-blue-600' : 'text-gray-500'"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              
              <!-- Shield Icon -->
              <svg 
                v-if="item.icon === 'Shield'" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="mr-3"
                :class="isActive(item.path) ? 'text-blue-600' : 'text-gray-500'"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              
              <span :class="isActive(item.path) ? 'font-medium' : ''">{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Mobile sidebar footer -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 font-semibold text-white bg-blue-500 rounded-full">
            A
          </div>
          <div>
            <div class="font-medium text-gray-900">Admin User</div>
            <div class="text-xs text-gray-500">admin@example.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSidebar } from './ui/sidebar'

const router = useRouter()
const route = useRoute()

// Props to know if desktop sidebar is shown
const props = defineProps({
  showDesktopSidebar: {
    type: Boolean,
    default: true
  }
})

// Define custom events
const emit = defineEmits(['toggle-filters', 'toggle-desktop-sidebar'])

// Mobile detection
const isMobile = ref(false)

// Check if the device is mobile
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
}

// Mobile sidebar state
const showMobileSidebar = ref(false)

// User menu state
const userMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)
const userButtonRef = ref<HTMLElement | null>(null)

// Try to get sidebar context if it exists
let sidebarContext = null
try {
  sidebarContext = useSidebar()
} catch (error) {
  console.warn('Sidebar provider not found, using fallback mobile navigation')
}

// Define navigation items
const navItems = [
  {
    title: 'Home',
    icon: 'Home',
    path: '/',
  },
  {
    title: 'Container Tracking',
    icon: 'Package',
    path: '/ContainerTracking',
  },
  {
    title: 'CusDec Tracking',
    icon: 'FileText',
    path: '/CusDecTracking',
  },
]

// Define page titles
const pageTitles: Record<string, string> = {
  '/': 'Cargo Tracker',
  '/ContainerTracking': 'Container Tracking',
  '/CusDecTracking': 'CusDec Tracking',
  '/StatusTimelinePage': 'Status Timeline',
}

// Compute current page title based on route
const currentPageTitle = computed(() => {
  return pageTitles[route.path] || 'Cargo Tracker'
})

// Determine if filter button should be shown
const showFilterButton = computed(() => {
  return route.path === '/ContainerTracking' || route.path === '/CusDecTracking'
})

// Check if route is active
const isActive = (path: string): boolean => {
  return route.path === path
}

// Toggle sidebar function that handles both the app sidebar and mobile sidebar
const toggleSidebar = () => {
  // Toggle mobile sidebar
  showMobileSidebar.value = !showMobileSidebar.value
  
  // Also toggle the app sidebar if it exists
  if (sidebarContext) {
    sidebarContext.toggleSidebar()
  }
}

// Navigate to a route and close sidebar
const navigateTo = (path: string): void => {
  closeSidebar()
  router.push(path)
}

// Toggle user menu
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
  
  if (userMenuOpen.value) {
    // Add global click handler on next tick to allow the click to complete first
    nextTick(() => {
      window.addEventListener('click', handleOutsideClick)
    })
  }
}

// Handle clicks outside the user menu
const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const userButton = userButtonRef.value
  const userMenu = userMenuRef.value
  
  if (
    userButton && 
    userMenu && 
    !userButton.contains(target) && 
    !userMenu.contains(target)
  ) {
    closeUserMenu()
  }
}

// Close user menu when clicking outside
const closeUserMenu = () => {
  userMenuOpen.value = false
  window.removeEventListener('click', handleOutsideClick)
}

// Close sidebar function
const closeSidebar = () => {
  showMobileSidebar.value = false
}

// Setup device detection, ESC key to close menus and cleanup
onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('click', handleOutsideClick)
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeUserMenu()
    closeSidebar()
  }
}
</script>

<style scoped>
.transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Fix for iOS safari scrolling */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
</style>