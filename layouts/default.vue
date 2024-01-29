<template>
  <div class="container">
    <SpeedInsights />
    <navbar-top />
    <slot></slot>
    <navbar-bottom />
    <update-fixed :count="3" />
  </div>
</template>
<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>