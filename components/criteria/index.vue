<template>
  <li>
    <p><slot></slot></p>
  </li>
</template>
<script setup lang="ts">
  const props = defineProps({
    nr: {
      type: Number,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  li{
    display:grid;
    grid-template-columns: sizer(3.5) 1fr;
  }
  .nr{
    width: sizer(3);
    display:inline-block;
  }
</style>