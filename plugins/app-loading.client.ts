import { defineNuxtPlugin } from '#app'

interface NuxtApp {
  hook: (hookName: string, callback: (...args: any[]) => void) => void;
  [key: string]: any;
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  if (typeof window !== 'undefined') {
    // Create loading indicator
    const loadingBar = document.createElement('div')
    loadingBar.className = 'nprogress-bar'
    loadingBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: #3b82f6;
      z-index: 9999;
      transition: width 0.3s ease;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
    `
    document.body.appendChild(loadingBar)

    let timeout: number | null = null

    // Show loading bar when page starts loading
    nuxtApp.hook('page:start', () => {
      if (timeout !== null) clearTimeout(timeout)
      loadingBar.style.width = '0%'
      loadingBar.style.opacity = '1'
      
      // Animate loading progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress > 80) {
          clearInterval(interval)
        }
        loadingBar.style.width = `${Math.min(progress, 80)}%`
      }, 100)
      
      nuxtApp.hook('page:finish', () => {
        clearInterval(interval)
        loadingBar.style.width = '100%'
        
        timeout = window.setTimeout(() => {
          loadingBar.style.opacity = '0'
        }, 300)
      })

      nuxtApp.hook('page:error', () => {
        clearInterval(interval)
        loadingBar.style.width = '100%'
        loadingBar.style.backgroundColor = '#ef4444'
        
        timeout = window.setTimeout(() => {
          loadingBar.style.opacity = '0'
          loadingBar.style.backgroundColor = '#3b82f6'
        }, 500)
      })
    })
  }
}) 