export default defineNuxtRouteMiddleware(() => {
  const auth = useSupabaseUser()
  if (userId?.value?.id==='ae7aa0e5-cabe-4c62-b80c-fd8cc061a4c4'){
    console.log('HQ user')
  } else if (!auth.value){
    return navigateTo('/auth')
  } else {
    return navigateTo('/portfolio')
  }
})