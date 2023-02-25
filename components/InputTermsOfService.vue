<template>
  <div>
    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked>
    <label for="vehicle1"> I accept the terms of service</label>
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