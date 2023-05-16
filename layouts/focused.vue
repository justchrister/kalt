<template>
  <div class="layout focused">
    <div class="back-button" @click="goBack()">
      ← back
    </div>
    <slot />
  </div>
</template>

<script setup>
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
</script>
<style scoped lang="scss">
.layout.focused .back-button{
  padding: $clamp 0 0 $clamp;
  font-family: $sans-serif;
  font-size:$clamp-2;
  font-weight:300;
  line-height: 150%;
  font-display: optional;
  position:fixed;
}
.layout.focused .back-button:hover{
  cursor:pointer;
}
.layout.focused .section{
  padding-top:0;
}
</style>
