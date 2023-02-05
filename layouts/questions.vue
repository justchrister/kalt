<template>
  <div class="layout questions">
    <div class="back-button" @click="goBack()">
      <omoji emoji="←" /> back
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
</script>
