import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase'
  ],
  css: ['@/assets/stylesheet.scss'],
  build: {
    transpile: ['chart.js'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_utils.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      STRIPE_PUBLIC_KEY: 'will be replaced',
      STRIPE_RETURN_URL: 'will be replaced'
    }
  },
  htmlAttrs: {
    lang: 'en'
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      callback: '/portfolio',
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Undefined',
      link: [ 
        { rel: 'icon', type: "image/x-icon", href: '/icons/favicon/icon.ico' },
        { rel: 'icon', type: "image/png", sizes: '32x32', href: '/icons/favicon/icon-32.png' } ,
        { rel: 'icon', type: "image/png", sizes: '180x180', href: '/icons/favicon/icon-180.png' } ,
        { rel: 'icon', type: "image/svg+xml", href: '/icons/favicon/icon.svg' } ,
        { rel: 'manifest', type: "image/x-icon", href: '/manifest.webmanifest' }
      ],
      meta: [
        { 
          name: 'title', 
          content: 'Kalt — Make money, make a difference.' 
        },
        { 
          name: 'og:title', 
          content: 'Kalt — Make money, make a difference.' 
        },
        { 
          name: 'twitter:title', 
          content: 'Kalt — Make money, make a difference.' 
        },
        { 
          name: 'description', 
          content: 'Invest in the future, today.' 
        },
        { 
          name: 'og:description', 
          content: 'Invest in the future, today.' 
        },
        { 
          name: 'twitter:description', 
          content: 'Invest in the future, today.'
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1"
        },
        { 
          name: 'image',
          content: 'https://ka.lt/images/meta.png' 
        },
        { 
          name: 'og:image',
          content: 'https://ka.lt/images/meta.png' 
        },
        { 
          name: 'twitter:image',
          content: 'https://ka.lt/images/meta.png' 
        }
      ],
    }
  },
  components: [{
    path: '~/components',
    global: true
  }],
  imports: {
    dirs: [
      'composables'
    ]
  }
})