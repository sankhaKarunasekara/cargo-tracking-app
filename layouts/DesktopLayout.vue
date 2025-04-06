<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop Header -->
    <header class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div class="container flex items-center justify-between h-16 px-6 mx-auto">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <svg class="w-8 h-8 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16H11V18H13V16Z" fill="currentColor" />
              <path d="M12 6C11.4477 6 11 6.44772 11 7V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V7C13 6.44772 12.5523 6 12 6Z" fill="currentColor" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="currentColor" />
            </svg>
            <span class="text-lg font-semibold text-gray-900">Cargo Tracker</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center space-x-6">
          <NuxtLink to="/" class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Dashboard</NuxtLink>
          <NuxtLink to="/CusDecList" class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">CusDecs</NuxtLink>
          <NuxtLink to="/ContainerList" class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Containers</NuxtLink>
          <NuxtLink to="/Reports" class="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">Reports</NuxtLink>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <button class="p-1 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="flex items-center space-x-1 text-sm font-medium text-gray-700">
            <img class="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Profile" />
            <span class="hidden md:inline">John Doe</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container min-h-screen px-6 py-6 mx-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Desktop layout specific logic can go here
</script> 