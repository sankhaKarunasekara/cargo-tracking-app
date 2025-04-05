<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Cargo Tracking App</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">Track Shipment</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Tracking Number</label>
          <input type="text" placeholder="Enter tracking number" class="w-full p-2 border rounded" />
        </div>
        <Button class="w-full">Track</Button>
      </div>
      <div class="border rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-4">Recent Shipments</h2>
        <div class="space-y-2">
          <div v-for="i in 3" :key="i" class="border rounded p-3">
            <p class="font-medium">Shipment #{{ 1000 + i }}</p>
            <p class="text-sm">Status: In Transit</p>
            <p class="text-sm">Last Updated: {{ new Date().toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>