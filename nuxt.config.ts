import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['@/assets/base.css', '@/assets/fonts/display/stylesheet.css', '@/assets/fonts/body/stylesheet.css'],
  build: {
    transpile: ['chart.js']
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Kalt — Undefined',
      link: [ 
        { rel: 'icon', type: "image/x-icon", href: '/favicon/favicon.ico' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/favicon//favicon-32x32.png' } ,
        { rel: 'icon', type: "image/png", sizes: '16x16', href: '/favicon//favicon-16x16.png' } ,
        { rel: 'manifest', type: "image/x-icon", href: '/favicon/site.webmanifest' }
      ],
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'Make money, make a difference!' }
      ],
    }
  }
})