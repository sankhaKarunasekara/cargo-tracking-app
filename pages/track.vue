<script setup lang="ts">
const route = useRoute()
const trackingNumber = route.query.id || 'Unknown'

// Mock data - in a real app this would come from an API
const shipment = {
  id: trackingNumber,
  status: 'In Transit',
  origin: 'Shanghai, China',
  destination: 'Los Angeles, USA',
  estimatedDelivery: '2023-12-15',
  lastUpdated: new Date().toLocaleString(),
  updates: [
    { date: '2023-12-01', location: 'Shanghai, China', status: 'Package received' },
    { date: '2023-12-03', location: 'Hong Kong', status: 'In transit' },
    { date: '2023-12-05', location: 'Tokyo, Japan', status: 'In transit' },
    { date: '2023-12-10', location: 'Honolulu, Hawaii', status: 'In transit' }
  ]
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-2">Tracking Details</h1>
    <p class="text-gray-500 mb-6">Tracking Number: {{ trackingNumber }}</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="border rounded-lg p-4">
        <h2 class="font-medium text-gray-500">Status</h2>
        <p class="text-xl font-bold">{{ shipment.status }}</p>
      </div>
      <div class="border rounded-lg p-4">
        <h2 class="font-medium text-gray-500">Estimated Delivery</h2>
        <p class="text-xl font-bold">{{ shipment.estimatedDelivery }}</p>
      </div>
      <div class="border rounded-lg p-4">
        <h2 class="font-medium text-gray-500">Last Updated</h2>
        <p class="text-xl font-bold">{{ shipment.lastUpdated }}</p>
      </div>
    </div>

    <div class="border rounded-lg p-4 mb-8">
      <h2 class="text-xl font-semibold mb-4">Shipment Route</h2>
      <div class="flex justify-between mb-2">
        <div>
          <p class="font-medium">Origin</p>
          <p>{{ shipment.origin }}</p>
        </div>
        <div class="text-right">
          <p class="font-medium">Destination</p>
          <p>{{ shipment.destination }}</p>
        </div>
      </div>
    </div>

    <div class="border rounded-lg p-4">
      <h2 class="text-xl font-semibold mb-4">Tracking History</h2>
      <div class="space-y-4">
        <div v-for="(update, index) in shipment.updates" :key="index" class="border-l-2 pl-4 pb-4">
          <p class="font-medium">{{ update.date }}</p>
          <p>{{ update.location }}</p>
          <p class="text-gray-500">{{ update.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>