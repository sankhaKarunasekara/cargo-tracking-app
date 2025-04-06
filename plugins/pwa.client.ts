// plugins/pwa.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: any) => {
  if (typeof window !== 'undefined') {
    nuxtApp.hook('app:mounted', () => {
      // Listen for PWA installation event
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        
        // Store the event so it can be triggered later
        // @ts-ignore
        nuxtApp.payload.pwaInstallPrompt = e
      })
      
      // Listen for PWA installation completion
      window.addEventListener('appinstalled', () => {
        // App was installed successfully
      })
    })
  }
  
  return {
    provide: {
      pwaInstall: {
        // Method to show PWA install prompt
        showPrompt: () => {
          if (typeof window !== 'undefined' && nuxtApp.payload.pwaInstallPrompt) {
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.prompt()
            
            // Wait for the user to respond to the prompt
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.userChoice.then((choiceResult: { outcome: string }) => {
              // Reset the saved prompt since it can't be used again
              // @ts-ignore
              nuxtApp.payload.pwaInstallPrompt = null
            })
          }
        },
        
        // Method to check if install is possible
        checkInstallable: () => {
          return !!nuxtApp.payload.pwaInstallPrompt
        }
      }
    }
  }
}) 