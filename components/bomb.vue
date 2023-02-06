<template>
  <span class="element bomb" :id="img">
     {{text}}
  </span>
</template>
<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})
</script>