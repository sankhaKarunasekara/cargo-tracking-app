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

  modules: ['shadcn-nuxt'],

  // @ts-ignore - shadcn-nuxt adds this property but TypeScript doesn't know about it
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  compatibilityDate: '2025-04-05'
})