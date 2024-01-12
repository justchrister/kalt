<template>
  <div :class="{'icon': true, 'unverified': !verified }"></div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }, 
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const verified = false;
</script>
<style scoped lang="scss">
  .icon{
    display:inline-block;
    width: sizer(1.5);
    height: sizer(1.5);
    background-image: url('/omoji/kyc/verified.svg');
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: bottom;
    &.unverified{
      display:none;
    }
  }
</style>