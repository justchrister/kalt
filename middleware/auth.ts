export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/auth')
  }
});
/*

export default defineNuxtRouteMiddleware((to) => {

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  if (user.value && to.path === '/sign-in') {
    return navigateTo('/account/portfolio')
  }
  if (user.value && to.path === '/sign-up') {
    return navigateTo('/account/portfolio')
  }
  if (!user.value && to.path === '/account') {
    return navigateTo('/sign-up-in')
  }
  if (!user.value && to.path === '/account/notifications') {
    return navigateTo('/sign-up-in')
  }
  if (!user.value && to.path === '/account/portfolio') {
    return navigateTo('/sign-up-in')
  }
  if (!user.value && to.path === '/account/transactions') {
    return navigateTo('/sign-up-in')
  }
  
})



*/