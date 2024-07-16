<template>
  <div :class="loadingClass">
  <!--
      if its needed, we can add an interstitial loading thing
      <div class="loadingLabel" v-if="loading">Loading...</div>
    -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import { set } from 'date-fns';

  console.log("✨ https://ka.lt/jobs ✨")
  const nuxtApp = useNuxtApp();
  const loading = ref(true);
  const loadingClass = computed(() => {
    return loading.value ? 'loadingCurrently' : (!loading.value ? 'loadingComplete' : '');
  });
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  });
</script>
<style lang="scss">
  .loadingLabel{
    height:100vh;
    line-height:100vh;
    width:100vw;
    text-align:center;
    position:fixed;
    top:0;
    bottom:0;
  }
  .loadingCurrently {
    footer,
    main{
      opacity: 0;
      transition: opacity 200ms;
    }
  }
  .loadingComplete {
    footer,
    main{
      opacity: 1;
      transition: opacity 200ms;
    }
  }
  
</style>