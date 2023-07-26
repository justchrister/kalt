export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  const colorMode = useColorMode()
  colorMode.preference = 'light-mode';
})