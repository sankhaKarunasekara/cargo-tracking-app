<script setup lang="ts">
import { ref, computed } from 'vue'
import { BottomNavigation, BottomNavigationItem } from './ui/bottom-navigation/index'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
  },
  {
    id: 'cusdec',
    label: 'CusDec',
    path: '/CusDecTracking',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>'
  },
  {
    id: 'containers',
    label: 'Containers',
    path: '/ContainerTracking',
    icon: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-truck"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4a1 1 0 0 1 1 1h4a1 1 0 0 1 .783 .378l.074 .108l3 5l.055 .103l.04 .107l.029 .109l.016 .11l.003 .085v6a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-6 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m.434 -9h-3.434v3h5.234z" /></svg>'
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
  },
]

// Get active item based on current route
const getActiveItem = computed(() => {
  const path = route.path
  const activeItem = navItems.find(item => path === item.path)
  return activeItem ? activeItem.id : 'home'
})
</script>

<template>
  <!-- Only show on mobile devices (less than md breakpoint) -->
  <div class="block md:hidden">
    <BottomNavigation class="light-theme-bottom-nav">
      <NuxtLink v-for="item in navItems" :key="item.id" :to="item.path" class="focus:outline-none">
        <BottomNavigationItem
          :icon="item.icon"
          :label="item.label"
          :active="getActiveItem === item.id"
        />
      </NuxtLink>
    </BottomNavigation>
  </div>
</template>

<style scoped>
.light-theme-bottom-nav {
  background-color: #ffffff;
  border-color: #e5e7eb;
}

:deep(.text-blue-600) {
  color: #2563eb;
}
</style> 