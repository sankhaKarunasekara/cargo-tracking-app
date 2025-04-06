// @ts-ignore
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['shadcn-nuxt', '@nuxt/image', '@vite-pwa/nuxt'],

  // @ts-ignore - shadcn-nuxt adds this property but TypeScript doesn't know about it
  shadcn: {
    componentDir: './components/ui'
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Cargo Tracking App',
      short_name: 'CargoTrack',
      description: 'A modern cargo tracking application for monitoring containers and customs declarations',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'fullscreen',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      id: '/',
      categories: ['business', 'logistics', 'productivity'],
      screenshots: [
        {
          src: '/screenshots/home.png',
          sizes: '1280x720',
          type: 'image/png',
          platform: 'wide',
          label: 'Home Screen'
        }
      ],
      shortcuts: [
        {
          name: 'Track Container',
          short_name: 'Container',
          description: 'Track your container',
          url: '/ContainerTracking',
          icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }]
        },
        {
          name: 'Track CusDec',
          short_name: 'CusDec',
          description: 'Track your customs declaration',
          url: '/CusDecTracking',
          icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192' }]
        }
      ],
      icons: [
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: 'module',
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      vueMajorVersion: 3,
      renderManifestInDevServer: true
    }
  },

  app: {
    head: {
      titleTemplate: '%s - Cargo Tracking App',
      title: 'Cargo Tracking System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: 'A modern cargo tracking application for monitoring containers and customs declarations' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Cargo Tracking' },
        { name: 'application-name', content: 'Cargo Tracking App' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/icons/icon-144x144.png' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Cargo Tracking App' },
        { property: 'og:description', content: 'Track containers and customs declarations with ease' },
        { property: 'og:image', content: '/icons/icon-512x512.png' },
        { property: 'og:url', content: '/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Cargo Tracking App' },
        { name: 'twitter:description', content: 'Track containers and customs declarations with ease' },
        { name: 'twitter:image', content: '/icons/icon-512x512.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-180.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-180.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/icon-72x72.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

  compatibilityDate: '2025-04-05'
})