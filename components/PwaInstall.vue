<template>
  <button 
    v-if="shouldShow"
    @click="installPwa" 
    class="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors duration-200"
  >
    Install App
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const shouldShow = ref(false)

interface NuxtAppWithPwa {
  $pwaInstall: {
    showPrompt: () => void
  }
}

const installPwa = () => {
  // @ts-ignore - We know this exists because our plugin provides it
  (nuxtApp as unknown as NuxtAppWithPwa).$pwaInstall.showPrompt()
}

onMounted(() => {
  // Check if the app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches || 
      window.matchMedia('(display-mode: fullscreen)').matches) {
    // App is already installed
    shouldShow.value = false
  } else {
    // App is not installed - check if we have an install prompt
    shouldShow.value = !!nuxtApp.payload.pwaInstallPrompt
    
    // Listen for when the install prompt is available
    window.addEventListener('beforeinstallprompt', () => {
      shouldShow.value = true
    })
  }
})
</script> 