<template>
  <block margin="none">
    <span>
    <nuxt-link :to="parentUrl"> {{parent}}</nuxt-link> / {{route.meta.pagename}}
  </span>
  </block>
</template>
<script setup lang="ts">
  const route = useRoute()
  const props = defineProps({
    parent: {
      type: String,
      required: true
    }
  })
  const parentUrl = "/"+props.parent.toLowerCase()
</script>

<style scoped lang="scss">
span,
span a{
  text-transform: lowercase;
  text-transform: uppercase;
  font-family: 'Kalt Monospace', monospace;
  font-size:$clamp;
}
  a{
    text-decoration:none;
    &:hover{
      text-decoration:underline;
    }
  }
</style>