export default defineNuxtRouteMiddleware(() => {
  const userId = useSupabaseUser()
  if (!userId.value) {
    return navigateTo('/auth')
  }
})