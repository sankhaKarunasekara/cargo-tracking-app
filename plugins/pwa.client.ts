// plugins/pwa.client.ts
import { defineNuxtPlugin } from 'nuxt/app'

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
        console.log('PWA install prompt is ready to be shown')
      })
      
      // Listen for PWA installation completion
      window.addEventListener('appinstalled', () => {
        console.log('PWA was installed successfully')
      })
    })
  }
  
  return {
    provide: {
      pwa: {
        // Method to show PWA install prompt
        showPWAInstallPrompt: () => {
          if (typeof window !== 'undefined' && nuxtApp.payload.pwaInstallPrompt) {
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.prompt()
            
            // Wait for the user to respond to the prompt
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.userChoice.then((choiceResult: { outcome: string }) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the PWA installation')
              } else {
                console.log('User dismissed the PWA installation')
              }
              // Reset the saved prompt since it can't be used again
              // @ts-ignore
              nuxtApp.payload.pwaInstallPrompt = null
            })
          }
        }
      }
    }
  }
}) 