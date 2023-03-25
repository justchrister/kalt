<template>
  <div class="notify">
    {{props.type}} + {{props.message}}
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  })
</script>