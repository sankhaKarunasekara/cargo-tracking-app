<script setup lang="ts">
import { ref } from 'vue'
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
  {
    title: 'CusDec Ownership',
    icon: 'Shield',
    path: '/CusDecOwnership',
  }
]

// Check if route is active
const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="sidebar w-64 flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
    <div class="p-4 border-b border-gray-100">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
          <path d="M17 7l-3-3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-3-3h-2z"></path>
          <path d="M13 7V4"></path>
          <polyline points="8 16 10 18 16 12"></polyline>
        </svg>
        <span class="text-lg font-semibold">Cargo Tracker</span>
      </div>
      <div class="mt-1 text-xs text-gray-500">Shipping Management</div>
    </div>
    
    <!-- Navigation Section Header -->
    <div class="px-4 pt-4 pb-2">
      <h2 class="text-xs font-medium uppercase tracking-wider text-gray-500">NAVIGATION</h2>
    </div>

    <!-- Navigation Items -->
    <nav class="flex-1 p-2">
      <ul class="space-y-1">
        <li>
          <router-link to="/" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 flex-shrink-0" :class="[$route.path === '/' ? 'text-blue-600' : 'text-gray-400']">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </router-link>
        </li>
        
        <li>
          <router-link to="/ContainerTracking" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/ContainerTracking' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 flex-shrink-0" :class="[$route.path === '/ContainerTracking' ? 'text-blue-600' : 'text-gray-400']">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
              <path d="M7 21h10"></path>
              <path d="M12 3v18"></path>
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
            </svg>
            Container Tracking
          </router-link>
        </li>
        
        <li>
          <router-link to="/CusDecTracking" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/CusDecTracking' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 flex-shrink-0" :class="[$route.path === '/CusDecTracking' ? 'text-blue-600' : 'text-gray-400']">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            CusDec Tracking
          </router-link>
        </li>
        
        <li>
          <router-link to="/CusDecOwnership" class="flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[$route.path === '/CusDecOwnership' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50']">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 flex-shrink-0" :class="[$route.path === '/CusDecOwnership' ? 'text-blue-600' : 'text-gray-400']">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            CusDec Ownership
          </router-link>
        </li>
      </ul>
    </nav>
    
    <!-- Tools Section Header -->
    <div class="px-4 pt-4 pb-2">
      <h2 class="text-xs font-medium uppercase tracking-wider text-gray-500">TOOLS</h2>
    </div>
    
    <!-- Tools Navigation -->
    <nav class="p-2">
      <ul class="space-y-1">
        <li>
          <router-link to="/reports" class="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-gray-400">
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
    <div class="border-t border-gray-100 p-4 mt-auto">
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
/* Fix for iOS safari scrolling */
.custom-scrollbar {
  -webkit-overflow-scrolling: touch;
}

/* Make sure sidebar is hidden on mobile until toggled */
@media (max-width: 768px) {
  :deep(.group[data-open="false"]) {
    display: none;
  }
}

/* Shadcn-style focus states */
:deep(a:focus-visible), :deep(button:focus-visible) {
  outline: 2px solid rgba(37, 99, 235, 0.5);
  outline-offset: 2px;
  border-radius: 0.375rem;
}

/* Smooth transitions for hover states */
:deep(a), :deep(button) {
  transition: all 0.2s ease;
}
</style> 