<template>
  <div class="impact">
    <div class="image" :id="props.type"></div>
    <p class="title">{{props.title}}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>