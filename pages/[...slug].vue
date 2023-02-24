<template>
  <div class="page-wrap">
    <div class="page">
      <div class="section">
        <div class="block">
          <ContentDoc />
        </div>
        <cta/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: "questions",
  });
</script>