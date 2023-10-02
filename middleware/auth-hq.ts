export default defineNuxtRouteMiddleware(() => {
  const userId = useSupabaseUser()
  if (!userId.value) {
    return navigateTo('/auth')
  } else {
    if(userId.value.id==='ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4'){
    } else{
      return navigateTo('/portfolio')
    }
  }
})