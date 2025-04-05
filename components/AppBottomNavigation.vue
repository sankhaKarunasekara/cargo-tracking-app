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
    id: 'containers',
    label: 'Containers',
    path: '/ContainerTracking',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"></path><path d="m7 16.5-4.74-2.85"></path><path d="m7 16.5 5-3"></path><path d="M7 16.5V21"></path><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"></path><path d="m17 16.5-5-3"></path><path d="m17 16.5 4.74-2.85"></path><path d="M17 16.5V21"></path><path d="M15.97 5.33l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8a2 2 0 0 0-.97 1.71v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71V7.04a2 2 0 0 0-.97-1.71Z"></path><path d="m7 8.5 5 3 5-3"></path><path d="m7 8.5 5-3 5 3"></path><path d="M12 11.5V17"></path></svg>'
  },
  {
    id: 'cusdec',
    label: 'CusDec',
    path: '/CusDecTracking',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><line x1="9" y1="9" x2="10" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>'
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
  <div class="md:hidden block">
    <BottomNavigation class="theme-bottom-nav">
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
.theme-bottom-nav {
  background-color: hsl(var(--sidebar-background));
  border-color: hsl(var(--sidebar-border));
}

:deep(.text-blue-600) {
  color: hsl(var(--sidebar-primary));
}
</style> 