<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Redirect to the dynamic route structure
onMounted(() => {
  console.log('CusDecDetail redirector mounted, route:', route.path);
  
  // Extract ID if already in path
  const pathParts = route.path.split('/');
  const id = pathParts.length > 2 ? pathParts[2] : '1';
  
  // Redirect to the proper dynamic route
  router.push(`/CusDecDetail/${id}`);
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500">Redirecting to CusDec details...</p>
  </div>
</template> 