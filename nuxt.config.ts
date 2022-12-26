import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  css: ['@/assets/stylesheet.css'],
  build: {
    transpile: ['chart.js'],
  },
  serverMiddleware: [
    // Transactions
    { path: "/api/transactions", handler: "~/server-middleware/transactions/createTransaction.ts" },
    { path: "/api/transactions", handler: "~/server-middleware/transactions/getTransactions.ts" },
    { path: "/api/transactions", handler: "~/server-middleware/transactions/autoInvest.ts" },

    // Exchange
    { path: "/api/exchange", handler: "~/server-middleware/exchange/createOrder.ts" },
    { path: "/api/exchange", handler: "~/server-middleware/exchange/getOrders.ts" },
    { path: "/api/exchange", handler: "~/server-middleware/exchange/matchOrders.ts" },

    // BFF
    { path: "/api/bff", handler: "~/server-middleware/bff/dailyCalculatedPortfolioValue.ts" },
    { path: "/api/bff", handler: "~/server-middleware/bff/dailyCalculatedAccountBalance.ts" },

    // Cards
    { path: "/api/cards", handler: "~/server-middleware/cards/getCards.ts" }
  ],
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
      script: [
        { src: '../omoji.js', defer: '' }
      ],
    }
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    supabaseServiceSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTM4NDQyMCwiZXhwIjoxOTg0OTYwNDIwfQ.Ektf29cT8wufwIutky0xZ1naEc13uz0dVfPt94rTH8g',
    public: {
      supabaseUrl: 'https://urgitfsodtrsbtcbwnpv.supabase.co',
      supabaseSecret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw',
    }
  }
})