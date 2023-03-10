<template>
  <nuxt-link :to="props.to">
    <div class="bomb">
      {{props.text}}
    </div>
  </nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
})
</script>