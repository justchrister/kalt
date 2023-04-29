<template>
  <div class="block" :id="margin">
    <slot></slot>
  </div>
</template>
<script setup>
  const props = defineProps({
    margin: {
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
  .block {
    width: $sitewidth;
    max-width: $maxsitewidth;
    margin:0 auto clamp($unit-min*10, $unit*10, $unit-max*10) auto;
  }
  .block#half{
    margin-bottom: clamp($unit-min*5, $unit*5, $unit-max*5);
  }
  .block#none{
    margin-bottom: 0;
  }
</style>