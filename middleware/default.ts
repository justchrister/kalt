export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  const colorMode = useColorMode()
  if (!user.value) {
    colorMode.preference = 'light-mode';
  }
})