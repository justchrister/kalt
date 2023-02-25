<template>
  <div class="impact">
    <div class="image" :id="props.type"></div>
    <h4 class="title">{{props.title}}</h4>
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