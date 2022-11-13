export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (user.value && to.path === '/authenticate') {
    return navigateTo('/profile')
  }
  if (!user.value && to.path === '/profile') {
    return navigateTo('/authenticate')
  }
  
})
