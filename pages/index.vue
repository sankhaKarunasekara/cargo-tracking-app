<script setup>
</script>

<template>
  <div class="container p-6 mx-auto">
    <h1 class="mb-6 text-3xl font-bold">Cargo Tracking App</h1>
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink to="/ContainerTracking" class="p-6 text-white transition bg-green-600 rounded-lg hover:bg-green-700">
        <h2 class="mb-2 text-xl font-semibold">Container Tracking</h2>
        <p>Track your container shipments and view status</p>
      </NuxtLink>
      
      <NuxtLink to="/CusDecTracking" class="p-6 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
        <h2 class="mb-2 text-xl font-semibold">CusDec Tracking</h2>
        <p>Track your CusDec documents and view status</p>
      </NuxtLink>
      
      <NuxtLink to="/CusDecOwnership" class="p-6 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">
        <h2 class="mb-2 text-xl font-semibold">CusDec Ownership</h2>
        <p>Manage and confirm CusDec ownership</p>
      </NuxtLink>
    </div>
  </div>
</template>