<template>
  <div class="page-wrap">
    <div class="page">
      <div class="section">
        <div class="block">
          <ContentDoc />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: "focused",
  });
</script>
<style>
  .layout.focused{
    background-image: linear-gradient(#1E96FC, transparent);
  }
</style>
