import VueTheMask from 'vue-the-mask'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTheMask, {
    property: {
      id: 'GA_MEASUREMENT_ID'
    }
  })
})