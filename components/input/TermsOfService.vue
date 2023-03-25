<template>
  <div class="input-wrap">
    <input type="checkbox" id="tos" name="tos" value="tos" checked>
    <label for="tos"> I accept the terms of service</label>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    required: true
  }
})
</script>