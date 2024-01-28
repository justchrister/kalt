<template>
  <div class="frame">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.frame {
  width: $sitewidth;
  max-width: $maxsitewidth;
  margin:0 auto sizer(3) auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-end;
  align-content: flex-start;
  height: 50vw;
  max-height: 418px;
}
</style>