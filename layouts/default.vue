<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import Navbar from '../components/Navbar.vue'
import AppSidebar from '../components/AppSidebar.vue'
import { SidebarProvider, useSidebar } from '../components/ui/sidebar'

// Simple device detection
const isMobile = ref(false)
const showDesktopSidebar = ref(true)

// Check if the device is mobile
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
}

// Handle toggle filters event from Navbar
const handleToggleFilters = () => {
  // Create a custom event to notify pages
  const event = new CustomEvent('toggle-filters')
  document.dispatchEvent(event)
}

// Toggle desktop sidebar
const toggleDesktopSidebar = () => {
  showDesktopSidebar.value = !showDesktopSidebar.value
}

onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
})
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <SidebarProvider>
      <Navbar @toggle-filters="handleToggleFilters" />
      
      <div class="flex flex-1 overflow-hidden relative">
        <!-- Sidebar toggle button for desktop when sidebar is hidden -->
        <button
          v-if="!isMobile && !showDesktopSidebar"
          @click="toggleDesktopSidebar"
          class="absolute left-0 top-4 z-20 bg-white shadow-md rounded-r-lg p-2"
          aria-label="Show sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
            <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"></path>
            <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"></path>
            <path d="M12 8 8 12l4 4"></path>
            <path d="m16 12-4 4 4 4"></path>
          </svg>
        </button>
        
        <!-- Desktop sidebar -->
        <AppSidebar v-if="!isMobile && showDesktopSidebar" class="relative">
          <!-- Hide sidebar button -->
          <button
            @click="toggleDesktopSidebar"
            class="absolute right-0 top-4 z-20 bg-white shadow-md rounded-l-lg p-2 -mr-3"
            aria-label="Hide sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
              <path d="M16 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h11"></path>
              <path d="m10 17-5-5 5-5"></path>
            </svg>
          </button>
        </AppSidebar>
        
        <main class="flex-1 min-w-0 h-full overflow-y-auto pb-16 md:pb-0">
          <slot />
        </main>
      </div>
    </SidebarProvider>
  </div>
</template>

<style>
/* Add custom styles for the sidebar */
:root {
  --sidebar-background: 0 0% 100%;
  --sidebar-foreground: 222.2 47.4% 11.2%;
  --sidebar-primary: 221.2 83.2% 53.3%;
  --sidebar-primary-foreground: 210 40% 98%;
  --sidebar-accent: 210 40% 96.1%;
  --sidebar-accent-foreground: 222.2 47.4% 11.2%;
  --sidebar-border: 214.3 31.8% 91.4%;
  --sidebar-ring: 221.2 83.2% 53.3%;
}

.dark {
  --sidebar-background: 222.2 84% 4.9%;
  --sidebar-foreground: 210 40% 98%;
  --sidebar-primary: 217.2 91.2% 59.8%;
  --sidebar-primary-foreground: 222.2 47.4% 11.2%;
  --sidebar-accent: 217.2 32.6% 17.5%;
  --sidebar-accent-foreground: 210 40% 98%;
  --sidebar-border: 217.2 32.6% 17.5%;
  --sidebar-ring: 224.3 76.3% 48%;
}

.bg-sidebar-background {
  background-color: hsl(var(--sidebar-background));
}

.text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}

.bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}

.text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}

.border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
</style> 