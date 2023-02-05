<template>
  <div class="infobox" :id="type"> <omoji emoji="ⓘ" /> {{text}}</div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>
