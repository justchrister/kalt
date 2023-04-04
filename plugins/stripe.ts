import { loadStripe } from '@stripe/stripe-js/pure'

export default defineNuxtPlugin(nuxtApp => {
  // now available on `nuxtApp.$injected`
  const lol = async () => {
  return 'works!'
  }
  nuxtApp.provide('stripe', () => lol)
})