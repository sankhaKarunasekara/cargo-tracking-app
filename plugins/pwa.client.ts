// plugins/pwa.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: any) => {
  if (typeof window !== 'undefined') {
    console.log('PWA Plugin: Initialized')
    
    nuxtApp.hook('app:mounted', () => {
      console.log('PWA Plugin: App mounted, setting up event listeners')
      
      // Listen for PWA installation event
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        console.log('PWA Plugin: beforeinstallprompt event fired!', e)
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        
        // Store the event so it can be triggered later
        // @ts-ignore
        nuxtApp.payload.pwaInstallPrompt = e
        console.log('PWA Plugin: Install prompt stored and ready to be shown')
      })
      
      // Listen for PWA installation completion
      window.addEventListener('appinstalled', () => {
        console.log('PWA Plugin: App was installed successfully')
      })
      
      // Debug check if the app is already installed
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.matchMedia('(display-mode: fullscreen)').matches) {
        console.log('PWA Plugin: App is already installed in standalone/fullscreen mode')
      } else {
        console.log('PWA Plugin: App is running in browser mode, can be installed')
      }
    })
  }
  
  return {
    provide: {
      pwaInstall: {
        // Method to show PWA install prompt
        showPrompt: () => {
          console.log('PWA Plugin: Attempting to show install prompt')
          if (typeof window !== 'undefined' && nuxtApp.payload.pwaInstallPrompt) {
            console.log('PWA Plugin: Install prompt available, showing it')
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.prompt()
            
            // Wait for the user to respond to the prompt
            // @ts-ignore
            nuxtApp.payload.pwaInstallPrompt.userChoice.then((choiceResult: { outcome: string }) => {
              console.log('PWA Plugin: User choice outcome:', choiceResult.outcome)
              if (choiceResult.outcome === 'accepted') {
                console.log('PWA Plugin: User accepted the installation')
              } else {
                console.log('PWA Plugin: User dismissed the installation')
              }
              // Reset the saved prompt since it can't be used again
              // @ts-ignore
              nuxtApp.payload.pwaInstallPrompt = null
            })
          } else {
            console.log('PWA Plugin: Install prompt not available')
          }
        },
        
        // Method to check if install is possible
        checkInstallable: () => {
          console.log('PWA Plugin: Checking if app is installable')
          return !!nuxtApp.payload.pwaInstallPrompt
        }
      }
    }
  }
}) 