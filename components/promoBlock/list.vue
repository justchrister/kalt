<template>
  <div class="scroll-wrap">
    <div class="wrap">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.wrap{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap:sizer(2);
  width: $sitewidth;
  min-width: 500px;
  max-width: $maxsitewidth*1.2;
  margin:0 auto;
  padding:sizer(5) 0;
}
.scroll-wrap{
  width: $sitewidth;
  max-width: $maxsitewidth*1.2;
  padding:0 sizer(4);
  overflow-y: scroll;
  margin:0 auto;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
}
</style>