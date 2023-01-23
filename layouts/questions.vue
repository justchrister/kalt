<template>
  <div class="layout questions">
    <div class="back-button" @click="goBack()">
      <omoji emoji="←" /> back
    </div>
    <slot />
  </div>
</template>
<style scoped>
.layout.questions{
  background-image: linear-gradient(#1E96FC, transparent);
}
p{
  padding-bottom:20px;
}
</style>
<script setup lang="ts">
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
</script>
