export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/auth')
  } else {
    if(user.value.id==='f1359334-a0f2-4b43-a6cc-06a86b8e4d49'){
    } else{
      return navigateTo('/portfolio')
    }
  }
})