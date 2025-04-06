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
  SidebarProvider,
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
  <!-- Provide our own context if used outside a layout with SidebarProvider -->
  <SidebarProvider>
    <!-- Use Sidebar only within context of the layout's SidebarProvider -->
    <Sidebar collapsible="icon" className="bg-white">
      <!-- Sidebar Header with Logo -->
      <SidebarHeader className="border-b border-gray-100">
        <div class="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="text-blue-600"
          >
            <path d="M17 7l-3-3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-3-3h-2z"></path>
            <path d="M13 7V4"></path>
            <polyline points="8 16 10 18 16 12"></polyline>
          </svg>
          <span class="text-lg font-semibold text-gray-900">Cargo Tracker</span>
        </div>
      </SidebarHeader>
      
      <SidebarSeparator className="border-gray-100" />
      
      <!-- Main Navigation -->
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in navItems" :key="item.title">
                <SidebarMenuButton :active="isActive(item.path)" asChild className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-600">
                  <router-link :to="item.path" class="w-full">
                    <!-- Icon -->
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
                      class="flex-shrink-0"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    
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
                      class="flex-shrink-0"
                    >
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                      <path d="M7 21h10"></path>
                      <path d="M12 3v18"></path>
                      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
                    </svg>
                    
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
                      class="flex-shrink-0"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    
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
                      class="flex-shrink-0"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    
                    <span class="truncate">{{ item.title }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <!-- Footer -->
      <SidebarFooter className="border-t border-gray-100">
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-full">
            A
          </div>
          <div class="text-sm">
            <div class="font-medium text-gray-900">Admin</div>
            <div class="text-xs text-gray-500">admin@example.com</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  </SidebarProvider>
</template> 