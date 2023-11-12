<template>
  <div class="wrap">
    <slot>
    </slot>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.wrap{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap:$clamp-2;
  width: $sitewidth;
  max-width: $maxsitewidth*1.2;
  margin:0 auto;
  padding:$clamp-5 0;
}
</style>