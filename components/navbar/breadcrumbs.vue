<template>
  <block margin="none">
    <nuxt-link :to="parentUrl"> {{parent}}</nuxt-link> > {{route.meta.pagename}}
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
  a{
    text-decoration:none;
    &:hover{
      text-decoration:underline;
    }
  }
</style>