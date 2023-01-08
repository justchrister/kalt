export default defineNuxtRouteMiddleware((to, _from) => {
  const {data: {user}} = await supabase.auth.getUser()
  if (!user.value) {
    return navigateTo('/auth')
  }
});