// Generated by @vite-pwa/nuxt
import { defineNuxtPlugin } from '#imports'
import type { PWAIcons } from '#build/pwa-icons/pwa-icons'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pwaIcons: {
        transparent: {},
        maskable: {},
        favicon: {},
        apple: {},
        appleSplashScreen: {}
      } satisfies PWAIcons
    }
  }
})
