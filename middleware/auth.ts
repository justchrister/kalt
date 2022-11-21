export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (user.value && to.path === '/authenticate') {
    return navigateTo('/portfolio')
  }
  if (!user.value && to.path === '/portfolio') {
    return navigateTo('/authenticate')
  }
  
})
