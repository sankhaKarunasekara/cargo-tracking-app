<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from './ui/sidebar'

const router = useRouter()
const route = useRoute()

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

// State for mobile sidebar visibility
const isMobileSidebarOpen = ref(false)

// Toggle mobile sidebar
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

// Close sidebar when clicking outside on mobile
const handleClickOutside = (event: MouseEvent) => {
  const sidebar = document.querySelector('.sidebar')
  const toggleButton = document.querySelector('.sidebar-toggle')
  
  if (sidebar && 
      !sidebar.contains(event.target as Node) && 
      toggleButton && 
      !toggleButton.contains(event.target as Node) && 
      isMobileSidebarOpen.value) {
    isMobileSidebarOpen.value = false
  }
}

// Close sidebar when route changes on mobile
const handleRouteChange = () => {
  if (window.innerWidth < 768) {
    isMobileSidebarOpen.value = false
  }
}

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMobileSidebarOpen.value = true
  } else {
    isMobileSidebarOpen.value = false
  }
}

// Event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  router.afterEach(handleRouteChange)
  
  // Initial check
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})

// Check if route is active
const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <!-- Mobile toggle button -->
  <button 
    @click="toggleMobileSidebar" 
    class="fixed z-50 flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-md shadow-md sidebar-toggle md:hidden top-4 left-4 focus:outline-none"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  
  <!-- Backdrop for mobile -->
  <div 
    v-if="isMobileSidebarOpen" 
    class="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
    @click="isMobileSidebarOpen = false"
  ></div>
  
  <!-- Sidebar content -->
  <div 
    class="fixed top-0 left-0 z-30 flex flex-col flex-shrink-0 h-screen overflow-y-auto transition-all duration-300 transform bg-white border-r border-gray-200 sidebar"
    :class="[
      isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'w-64'
    ]"
  >
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center">
        <img src="/customs-logo.png" alt="Sri Lanka Customs Logo" class="w-12 h-12" />
        <div class="ml-3">
          <div class="text-lg font-bold text-blue-600">CDNS</div>
          <div class="text-xs text-gray-500">Sri Lanka Customs</div>
        </div>
      </div>
    </div>
    
    <!-- Navigation Section Header -->
    <div class="px-4 pt-4 pb-2">
      <h2 class="text-xs font-medium tracking-wider text-gray-500 uppercase">NAVIGATION</h2>
    </div>

    <!-- Navigation Items -->
    <nav class="flex-1 p-2">
      <ul class="space-y-1">
        <li>
          <router-link to="/" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mr-3" :class="[$route.path === '/' ? 'text-blue-600' : 'text-gray-400']">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </router-link>
        </li>
        
        <li>
          <router-link to="/ContainerTracking" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/ContainerTracking' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mr-3" :class="[$route.path === '/ContainerTracking' ? 'text-blue-600' : 'text-gray-400']">
              <rect x="1" y="3" width="15" height="13" rx="1"></rect>
              <path d="M16 8h4l3 5v5a1 1 0 0 1-1 1h-1"></path>
              <path d="M16 16h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4"></path>
              <circle cx="5.5" cy="19.5" r="2.5"></circle>
              <circle cx="18.5" cy="19.5" r="2.5"></circle>
            </svg>
            Container Tracking
          </router-link>
        </li>
        
        <li>
          <router-link to="/CusDecTracking" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/CusDecTracking' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mr-3" :class="[$route.path === '/CusDecTracking' ? 'text-blue-600' : 'text-gray-400']">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            CusDec Tracking
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- Tools Section Header -->
    <div class="px-4 pt-4 pb-2">
      <h2 class="text-xs font-medium tracking-wider text-gray-500 uppercase">TOOLS</h2>
    </div>
    
    <!-- Tools Navigation -->
    <nav class="p-2">
      <ul class="space-y-1">
        <li>
          <router-link to="/reports" class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 mr-3 text-gray-400">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>
            Reports
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- User Section with Account Info -->
    <div class="p-4 mt-auto border-t border-gray-100">
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-full">
          A
        </div>
        <div class="text-sm">
          <div class="font-medium text-gray-900">Admin</div>
          <div class="text-xs text-gray-500">admin@example.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styling */
.sidebar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.sidebar::-webkit-scrollbar {
  width: 5px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* Fix for iOS safari scrolling */
.sidebar {
  -webkit-overflow-scrolling: touch;
}

/* Smooth transitions for hover states */
a, button {
  transition: all 0.2s ease;
}

/* Animation for mobile sidebar */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.sidebar-toggle {
  animation: fadeIn 0.3s ease-in-out;
}
</style> 