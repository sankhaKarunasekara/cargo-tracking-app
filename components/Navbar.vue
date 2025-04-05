<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center font-bold text-xl">
            Cargo Tracker
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:flex">
            <NuxtLink to="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              Home
            </NuxtLink>
            <NuxtLink to="/track" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              Track
            </NuxtLink>
            <NuxtLink to="/about" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              About
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center">
          <Button size="sm" variant="default">Login</Button>
        </div>
      </div>
    </div>
  </nav>
</template>