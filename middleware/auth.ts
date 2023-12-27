export default defineNuxtRouteMiddleware(() => {
  const auth = useSupabaseUser()
  if (!auth.value) {
    return navigateTo('/auth')
  }
})