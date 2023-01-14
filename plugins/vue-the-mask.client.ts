import VueTheMask from 'vue-the-mask'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', {
    mounted (el) {
      el.focus()
    },
    getSSRProps (binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  })
})