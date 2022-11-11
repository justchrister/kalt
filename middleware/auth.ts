export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // If user is logged in, and they are on the authenticate page, send them to the invest page.
  if (user.value && to.path === '/authenticate') {
    return navigateTo('/invest')
  } else if (!user.value && to.path === '/profile') {
    return navigateTo('/authenticate')
  } 
})
