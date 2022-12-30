<template>
  <span :class="emoji">{{emoji}}</span>
</template>
<script setup>
const props = defineProps({
  emoji: {
    type: String,
    required: true
  }
})
</script>
<style scoped>
span { 
  background-size:contain;
  color:transparent;
  background-repeat:no-repeat;
  pointer-events:none;
  background-position:center;
}
</style>
