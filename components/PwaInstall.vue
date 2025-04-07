<template>
  <div v-if="shouldShow" class="fixed z-50 w-full max-w-sm px-4 mx-auto -translate-x-1/2 bottom-6 left-1/2">
    <div
      class="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-100 rounded-lg shadow-lg">
      <!-- Left side with icon and text -->
      <div class="flex items-center flex-1 min-w-0">
        <div class="flex-shrink-0 w-8 h-8 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-blue-600" viewBox="0 0 24 20" fill="none"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900">Install Customs App</p>
          <p class="text-xs text-gray-500 truncate">Add to your home screen for quick access</p>
        </div>
      </div>
      <!-- Action buttons -->
      <div class="flex items-center ml-4 space-x-2">
        <button @click="installPwa"
          class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
          Install </button>
        <button @click="dismiss" class="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const shouldShow = ref(false)
const hasBeenDismissed = ref(false)

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: InstallPromptEvent | null = null

const installPwa = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      shouldShow.value = false
    }
    deferredPrompt = null
  }
}

const dismiss = () => {
  shouldShow.value = false
  hasBeenDismissed.value = true
  // Store dismissal in localStorage to prevent showing again in the same session
  localStorage.setItem('pwa-install-dismissed', 'true')
}

onMounted(() => {
  // Check if already installed or previously dismissed
  if (window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    localStorage.getItem('pwa-install-dismissed') === 'true') {
    shouldShow.value = false
    return
  }

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as InstallPromptEvent
    if (!hasBeenDismissed.value) {
      shouldShow.value = true
    }
  })

  // Hide the prompt if the PWA is installed
  window.addEventListener('appinstalled', () => {
    shouldShow.value = false
  })
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>