import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  highcharts: {
    /* module options */
  },
  css: ['@/assets/base.css', '@/assets/fonts/display/stylesheet.css', '@/assets/fonts/body/stylesheet.css'],
})
