export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (user.value && to.path === '/account/sign-in') {
    return navigateTo('/account/portfolio')
  }
  if (user.value && to.path === '/account/sign-up') {
    return navigateTo('/account/portfolio')
  }
  if (!user.value && to.path === '/account/portfolio') {
    return navigateTo('/account/sign-in')
  }
  if (!user.value && to.path === '/account') {
    return navigateTo('/account/sign-in')
  }
  if (!user.value && to.path === '/account/transactions') {
    return navigateTo('/account/sign-in')
  }
  if (!user.value && to.path === '/account/notifications') {
    return navigateTo('/account/sign-in')
  }
  
})
