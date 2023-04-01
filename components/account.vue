<template>
  <div class="account">
    {{name}}
    {{amount}}
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  .account{
    border:$border;
    padding:$clamp $clamp-2;
  }
</style>