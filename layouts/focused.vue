<template>
  <div class="layout focused">
    <div class="back-button" @click="goBack()">
      ← back
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
<style scoped lang="scss">
.layout.focused .back-button{
  padding: sizer(1) 0 0 sizer(1);
  font-family: $sans-serif;
  font-size: sizer(2);
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
