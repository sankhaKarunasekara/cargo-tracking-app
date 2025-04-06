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

  modules: ['shadcn-nuxt', '@nuxt/image'],

  // @ts-ignore - shadcn-nuxt adds this property but TypeScript doesn't know about it
  shadcn: {
    componentDir: './components/ui'
  },

  app: {
    head: {
      titleTemplate: '%s - Customs Documentation System',
      title: 'Customs Documentation System',
      meta: [
        { name: 'description', content: 'Customs Documentation System for tracking containers and customs declarations' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2025-04-05'
})