<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar - hidden on mobile, visible on desktop -->
    <div class="hidden md:flex h-screen">
      <AppSidebar />
    </div>
    
    <div class="flex flex-col flex-1 w-full overflow-hidden">
      <!-- Navbar - always visible -->
      <Navbar />
      
      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto pb-16 md:pb-0">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '~/components/AppSidebar.vue'
import Navbar from '~/components/Navbar.vue'
</script>