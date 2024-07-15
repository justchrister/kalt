<template>
  <div v-if="loading" class="loading">
    Loading
  </div>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
  console.log("✨ https://ka.lt/jobs ✨")
  const nuxtApp = useNuxtApp();
  const loading = ref(true);
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    loading.value = false;
  });
</script>
<style lang="scss" scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $light;
    color: $dark;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-size: sizer(2);
  }
</style>