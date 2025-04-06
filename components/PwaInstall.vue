<template>
  <button 
    v-if="shouldShow"
    @click="installPwa" 
    class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 z-50 flex items-center space-x-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a2 2 0 00-2 2v4H4a2 2 0 100 4h4v4a2 2 0 104 0v-4h4a2 2 0 000-4h-4V4a2 2 0 00-2-2z" />
    </svg>
    <span>Install App</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const shouldShow = ref(false)

interface NuxtAppWithPwa {
  $pwaInstall: {
    showPrompt: () => void,
    checkInstallable: () => boolean
  }
}

// Safely check if installable
const checkInstallable = () => {
  try {
    console.log('PwaInstall Component: Checking if app is installable')
    return (nuxtApp as unknown as NuxtAppWithPwa).$pwaInstall.checkInstallable()
  } catch (error) {
    console.error('PwaInstall Component: Error checking installability', error)
    return false
  }
}

const installPwa = () => {
  console.log('PwaInstall Component: Install button clicked')
  try {
    // @ts-ignore - We know this exists because our plugin provides it
    (nuxtApp as unknown as NuxtAppWithPwa).$pwaInstall.showPrompt()
  } catch (error) {
    console.error('PwaInstall Component: Error showing install prompt', error)
  }
}

onMounted(() => {
  console.log('PwaInstall Component: Mounted')
  
  // Check if the app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches || 
      window.matchMedia('(display-mode: fullscreen)').matches) {
    // App is already installed
    console.log('PwaInstall Component: App is already installed')
    shouldShow.value = false
  } else {
    console.log('PwaInstall Component: App is not installed, checking if installable')
    // App is not installed - check if we have an install prompt
    shouldShow.value = !!nuxtApp.payload.pwaInstallPrompt
    
    // Listen for when the install prompt is available
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PwaInstall Component: beforeinstallprompt event received')
      shouldShow.value = true
    })
    
    // Force check after a short delay
    setTimeout(() => {
      shouldShow.value = checkInstallable()
      console.log('PwaInstall Component: Delayed check, installable:', shouldShow.value)
    }, 2000)
  }
})

// Watch for changes in installability
watch(() => nuxtApp.payload.pwaInstallPrompt, (newVal) => {
  console.log('PwaInstall Component: Install prompt changed', !!newVal)
  shouldShow.value = !!newVal
})
</script> 