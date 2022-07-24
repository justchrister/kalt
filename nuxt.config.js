
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kalt — Loading...',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ 'assets/base.css'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Authentication configuration

  auth: {
    redirect: {
      login: '/', // redirect user when not connected
      callback: '/invest'
    },
    strategies: {
      local: false,
      auth0: {
        logoutRedirectUri: 'http://localhost:3000',
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
      }
    }
  },
  
  // Set environemnt variables for Contentful integration
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID || 'xdtovtw3dsvp',
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN || 'rZP5wX9KmtkpApVSxPK_e9mnYImLR7wi7MbepyyFxgw'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
