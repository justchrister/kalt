export default defineNuxtRouteMiddleware(() => {
  const colorMode = useColorMode()
  colorMode.preference = 'light';
})