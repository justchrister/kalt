<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup>
  mounted() {
    const omoji = require('https://ka.lt/omoji.js');
  };
</script>