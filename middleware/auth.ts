export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (user.value && to.path === '/authenticate/sign-in') {
    return navigateTo('/invest')
  }
  if (user.value && to.path === '/authenticate/sign-up') {
    return navigateTo('/invest')
  }
  if (!user.value && to.path === '/account/portfolio') {
    return navigateTo('/authenticate/sign-up')
  }
  if (!user.value && to.path === '/account') {
    return navigateTo('/authenticate/sign-up')
  }
  if (!user.value && to.path === '/account/transactions') {
    return navigateTo('/authenticate/sign-up')
  }
  if (!user.value && to.path === '/account/notifications') {
    return navigateTo('/authenticate/sign-up')
  }
  
})
