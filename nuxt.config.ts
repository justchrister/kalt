import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase', 
    '@nuxt/content',
    'nuxt-stripe-module',
  ],
  css: ['@/assets/stylesheet.scss'],
  build: {
    transpile: ['chart.js'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/base/_variables.scss" as *;'
        }
      }
    }
  },
  stripe: {
    publishableKey: 'pk_test_51IMoMpDBFB40Q48wJYOe24B4jfH6W3UYyRAduNHLP5o8IER2ML2cAMoxGKdwKkYnGBkFoe1dJzdPxj2cPJjfgg6000tUWGXJvZ',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Kalt — Undefined',
      link: [ 
        { rel: 'icon', type: "image/x-icon", href: '/icon/icon.ico' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/icon/icon-32.png' } ,
        { rel: 'icon', type: "image/png", sizes: '180x180', href: '/icon/icon-180.png' } ,
        { rel: 'icon', type: "image/svg+xml", href: '/icon/icon.svg' } ,
        { rel: 'manifest', type: "image/x-icon", href: '/manifest.webmanifest' },
        { rel: 'preload', as: 'font', href: "/fonts/display.woff2", crossorigin: true},
        { rel: 'preload', as: 'font', href: "/fonts/body.woff2", crossorigin: true },
        { rel: 'preload', as: 'font', href: "/fonts/body-bold.woff2", crossorigin: true}
      ],
      meta: [
        { name: 'description', content: 'Make money, make a difference!' },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1"
        }
      ],
    }
  },
  runtimeConfig: {
    supabase_service_role: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g',
    supabase_service_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g',
    supabase_url: 'https://urgitfsodtrsbtcbwnpv.supabase.co',
    public: {
      supabase_url: 'https://urgitfsodtrsbtcbwnpv.supabase.co',
      supabase_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw',
    }
  },
  components: [{
    path: '~/components',
    global: true
  }]
})