<template>
  <div class="input-wrap">
    <input type="checkbox" id="marketing" name="marketing" value="marketing" checked>
    <label for="marketing"> I want to be notified about my investment performance</label>
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